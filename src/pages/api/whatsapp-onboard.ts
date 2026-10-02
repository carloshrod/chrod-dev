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
  let exchangedToken: string | undefined;
  try {
    const tokenRes = await fetch(
      `https://graph.facebook.com/v23.0/oauth/access_token?client_id=${appId}&client_secret=${appSecret}&code=${encodeURIComponent(code)}`,
    );
    const tokenData = await tokenRes.json();
    exchangeOk = tokenRes.ok && Boolean(tokenData?.access_token);
    if (exchangeOk) {
      exchangedToken = tokenData.access_token as string;
    } else {
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

  // The browser reports wabaId/phoneNumberId from the Embedded Signup
  // postMessage, which isn't reliable (the message can arrive late, get
  // dropped, or simply never fire depending on the exact step the flow
  // finishes on) and isn't independently verified either way. Meta's
  // documented alternative: debug_token on the token we just received
  // exposes which WABA(s) it was actually granted via granular_scopes, and
  // from there /phone_numbers gives the real phone_number_id. This is the
  // source of truth; the client-reported values are only a fallback so the
  // email still shows something if this lookup can't run.
  //
  // The two Graph calls below need two DIFFERENT credential types — confirmed
  // against Meta directly, not assumed, since each rejected the other's token
  // with its own distinct error:
  // - debug_token rejects a system-user bearer token: "(#100) You must
  //   provide an app access token, or a user access token that is an owner
  //   or developer of the app". An app access token (app_id|app_secret,
  //   which we already have) is exactly what it asks for.
  // - /phone_numbers rejects that same app access token: "(#200) You do not
  //   have permission to access this field" — it's reading business asset
  //   data, which needs a token actually granted access to that asset (the
  //   same kind of system-user token n8n already uses for this), not just
  //   the app's own identity token.
  let verifiedWabaId: string | undefined;
  let verifiedPhoneNumberId: string | undefined;
  let verifiedDisplayPhoneNumber: string | undefined;
  let verifiedBusinessName: string | undefined;
  const appAccessToken = `${appId}|${appSecret}`;
  const systemUserToken = import.meta.env.WHATSAPP_SYSTEM_USER_TOKEN;

  if (appId && appSecret && exchangedToken) {
    try {
      const debugRes = await fetch(
        `https://graph.facebook.com/v23.0/debug_token?input_token=${encodeURIComponent(exchangedToken)}&access_token=${encodeURIComponent(appAccessToken)}`,
      );
      const debugData = await debugRes.json();
      // fetch() doesn't throw on 4xx/5xx, and Meta returns errors as a 200
      // with an `error` object rather than an HTTP failure — without this
      // check, any failure here (bad token, missing permission, wrong API
      // version...) silently fell through to the "(sin verificar)" fallback
      // with nothing in the logs to explain why.
      if (!debugRes.ok || debugData?.error) {
        console.error(
          "[whatsapp-onboard] debug_token failed:",
          debugRes.status,
          debugData,
        );
      }
      const scopes: Array<{ scope: string; target_ids?: string[] }> =
        debugData?.data?.granular_scopes ?? [];
      // Most recently onboarded WABA comes first when there's more than one.
      verifiedWabaId = scopes.find(
        (s) => s.scope === "whatsapp_business_management",
      )?.target_ids?.[0];
      if (!verifiedWabaId) {
        console.error(
          "[whatsapp-onboard] no whatsapp_business_management scope in debug_token response:",
          debugData?.data,
        );
      }

      if (verifiedWabaId && !systemUserToken) {
        console.error(
          "[whatsapp-onboard] WHATSAPP_SYSTEM_USER_TOKEN is not set — skipping /phone_numbers lookup.",
        );
      }

      if (verifiedWabaId && systemUserToken) {
        // Graph API endpoints generally only return the fields you ask for;
        // without `fields` here, this can come back with id-only (or even
        // empty) results rather than including display_phone_number.
        const phonesRes = await fetch(
          `https://graph.facebook.com/v23.0/${verifiedWabaId}/phone_numbers?fields=id,display_phone_number,verified_name`,
          { headers: { Authorization: `Bearer ${systemUserToken}` } },
        );
        const phonesData = await phonesRes.json();
        if (!phonesRes.ok || phonesData?.error) {
          console.error(
            "[whatsapp-onboard] /phone_numbers failed:",
            phonesRes.status,
            phonesData,
          );
        }
        const firstPhone = phonesData?.data?.[0];
        verifiedPhoneNumberId = firstPhone?.id;
        verifiedDisplayPhoneNumber = firstPhone?.display_phone_number;
        verifiedBusinessName = firstPhone?.verified_name;
      }
    } catch (err) {
      console.error("WABA/phone verification lookup error:", err);
    }
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  // Friendly label matching what the client saw in the UI (MODE_LABEL in
  // WhatsAppConnectButton.tsx) instead of the raw "coexistence"/"api_only"
  // slug — this email is read by a person, not a log.
  const modeLabel = mode === "coexistence" ? "Coexistence" : "Solo API";

  const fields = [
    { label: "Modo", value: modeLabel },
    {
      label: "WABA ID",
      value: verifiedWabaId ?? (typeof wabaId === "string" ? wabaId : "-"),
    },
    {
      label: "Phone Number ID",
      value:
        verifiedPhoneNumberId ??
        (typeof phoneNumberId === "string" ? phoneNumberId : "-"),
    },
    ...(verifiedDisplayPhoneNumber
      ? [{ label: "Número", value: verifiedDisplayPhoneNumber }]
      : []),
    ...(verifiedBusinessName
      ? [{ label: "Nombre verificado", value: verifiedBusinessName }]
      : []),
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
