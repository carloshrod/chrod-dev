import type { APIRoute } from "astro";
import { Resend } from "resend";
import {
  renderNotificationEmailHtml,
  renderNotificationEmailText,
} from "../../lib/emailTemplates";

export const prerender = false;

interface DetailField {
  label: string;
  value: string;
}

export const POST: APIRoute = async ({ request }) => {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const {
    fromName,
    fromEmail,
    subject,
    heading,
    eyebrow,
    message,
    fields,
    website,
  } = body;

  // Honeypot: a field real visitors never see or fill, left for bots that
  // auto-fill every input. Pretend success so they don't know to retry with
  // a different approach, without spending a Resend send on them.
  if (typeof website === "string" && website.trim()) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!fromName || typeof fromName !== "string" || !fromName.trim()) {
    return new Response(JSON.stringify({ error: "Name is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (
    !fromEmail ||
    typeof fromEmail !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fromEmail)
  ) {
    return new Response(
      JSON.stringify({ error: "A valid email is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
  if (!message && !(Array.isArray(fields) && fields.length > 0)) {
    return new Response(JSON.stringify({ error: "Message is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Strips CR/LF so none of these values can break out of the header they're
  // placed in (subject, or the "From <email>" line) via injected line breaks.
  const sanitize = (val: unknown, max: number): string =>
    typeof val === "string"
      ? val.replace(/[\r\n]+/g, " ").trim().slice(0, max)
      : "";

  const name = sanitize(fromName, 200);
  const email = sanitize(fromEmail, 200);
  const safeMessage = sanitize(message, 5000) || undefined;
  const safeFields: DetailField[] | undefined = Array.isArray(fields)
    ? fields
        .filter(
          (f): f is { label: unknown; value: unknown } =>
            !!f && typeof f === "object",
        )
        .map((f) => ({
          label: sanitize((f as { label: unknown }).label, 100),
          value: sanitize((f as { value: unknown }).value, 1000),
        }))
        .filter((f) => f.label)
    : undefined;

  const safeSubject = sanitize(subject, 200) || `New message from ${name}`;
  const safeHeading = sanitize(heading, 200) || "New contact message";
  const safeEyebrow = sanitize(eyebrow, 100) || "Website contact form";

  const templateOptions = {
    eyebrow: safeEyebrow,
    heading: safeHeading,
    fromName: name,
    fromEmail: email,
    fields: safeFields,
    message: safeMessage,
  };

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: import.meta.env.RESEND_FROM_EMAIL,
      to: import.meta.env.RESEND_TO_EMAIL,
      replyTo: email,
      subject: safeSubject,
      html: renderNotificationEmailHtml(templateOptions),
      text: renderNotificationEmailText(templateOptions),
    });

    if (error) {
      console.error("Resend send error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to send message. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Contact email error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to send message. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
