import type { APIRoute } from "astro";
import { Resend } from "resend";
import { verifyClientSignature, isOnboardMode } from "../../lib/whatsappOnboard";
import {
  renderNotificationEmailHtml,
  renderNotificationEmailText,
} from "../../lib/emailTemplates";

export const prerender = false;

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

  const { code, clientName, mode, ts, sig, wabaId, phoneNumberId } = body;

  if (!code || typeof code !== "string") {
    return new Response(
      JSON.stringify({ error: "Missing authorization code." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }
  if (!clientName || typeof clientName !== "string") {
    return new Response(JSON.stringify({ error: "Missing client name." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!isOnboardMode(mode)) {
    return new Response(JSON.stringify({ error: "Missing or invalid mode." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!sig || typeof sig !== "string") {
    return new Response(JSON.stringify({ error: "Missing signature." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const secret = import.meta.env.WHATSAPP_LINK_SECRET;
  if (!secret || !verifyClientSignature(clientName, mode, ts, sig, secret)) {
    return new Response(JSON.stringify({ error: "Invalid or expired link." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Matches the CRLF-stripping already done in send-contact-email.ts: this
  // value ends up in an email subject/heading, and nothing upstream of here
  // guarantees it's newline-free (the admin UI doesn't block it either).
  const safeClientName = clientName.replace(/[\r\n]+/g, " ").trim().slice(0, 100);

  const appId = import.meta.env.PUBLIC_WHATSAPP_APP_ID;
  const appSecret = import.meta.env.WHATSAPP_APP_SECRET;

  // Exchanging the code confirms the signup actually completed (a forged
  // request could carry a valid signature but a bogus/empty code) and lets
  // us report a real error instead of a false "connected" email.
  let exchangeOk = false;
  try {
    const tokenRes = await fetch(
      `https://graph.facebook.com/v23.0/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&code=${encodeURIComponent(code)}`,
    );
    const tokenData = await tokenRes.json();
    exchangeOk = tokenRes.ok && Boolean(tokenData?.access_token);
    if (!exchangeOk) {
      console.error("WhatsApp code exchange failed:", tokenData);
    }
  } catch (err) {
    console.error("WhatsApp code exchange error:", err);
  }

  if (!exchangeOk) {
    return new Response(
      JSON.stringify({ error: "Could not confirm the connection with Meta." }),
      { status: 502, headers: { "Content-Type": "application/json" } },
    );
  }

  // Once Embedded Signup completes, the client's WABA is shared with our
  // business portfolio — our own system-user token (already in n8n) can
  // operate on it. We don't need to store or email a per-client token, only
  // the IDs needed to start messaging: wabaId + phoneNumberId.
  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  const fields = [
    { label: "Modo", value: mode },
    { label: "WABA ID", value: typeof wabaId === "string" ? wabaId : "-" },
    {
      label: "Phone Number ID",
      value: typeof phoneNumberId === "string" ? phoneNumberId : "-",
    },
    {
      label: "Link generado",
      value:
        typeof ts === "number" || typeof ts === "string"
          ? new Date(Number(ts)).toLocaleString("es-CO")
          : "-",
    },
  ];

  try {
    const { error } = await resend.emails.send({
      from: import.meta.env.RESEND_FROM_EMAIL,
      to: import.meta.env.RESEND_TO_EMAIL,
      subject: `WhatsApp conectado: ${safeClientName}`,
      html: renderNotificationEmailHtml({
        eyebrow: "WhatsApp onboarding",
        heading: `Cliente conectado: ${safeClientName}`,
        fromName: "CHRod Connect",
        fromEmail: "hello@chrod.dev",
        fields,
      }),
      text: renderNotificationEmailText({
        eyebrow: "WhatsApp onboarding",
        heading: `Cliente conectado: ${safeClientName}`,
        fromName: "CHRod Connect",
        fromEmail: "hello@chrod.dev",
        fields,
      }),
    });

    if (error) {
      // The Meta side already succeeded — don't fail the response over a
      // notification email we can also check manually in WhatsApp Manager.
      console.error("Onboarding notification email error:", error);
    }
  } catch (err) {
    console.error("Onboarding notification email error:", err);
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
