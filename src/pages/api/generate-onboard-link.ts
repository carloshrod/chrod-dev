import type { APIRoute } from "astro";
import {
  buildOnboardingUrls,
  isOnboardMode,
  timingSafeStringEqual,
} from "../../lib/whatsappOnboard";

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

  const { clientName, mode, adminToken } = body;

  const validAdminToken = import.meta.env.ADMIN_ACCESS_TOKEN;
  if (
    !validAdminToken ||
    typeof adminToken !== "string" ||
    !timingSafeStringEqual(adminToken, validAdminToken)
  ) {
    return new Response(JSON.stringify({ error: "Unauthorized." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (
    !clientName ||
    typeof clientName !== "string" ||
    !clientName.trim() ||
    clientName.length > 100
  ) {
    return new Response(
      JSON.stringify({ error: "A client name (1-100 chars) is required." }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  if (!isOnboardMode(mode)) {
    return new Response(
      JSON.stringify({
        error: "mode must be 'coexistence' or 'api_only'.",
      }),
      { status: 400, headers: { "Content-Type": "application/json" } },
    );
  }

  const secret = import.meta.env.WHATSAPP_LINK_SECRET;
  if (!secret) {
    console.error("WHATSAPP_LINK_SECRET is not configured.");
    return new Response(JSON.stringify({ error: "Server misconfigured." }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const name = clientName.trim();
  const siteUrl = import.meta.env.PUBLIC_SITE_URL || "https://chrod.dev";
  const urls = buildOnboardingUrls(name, mode, secret, siteUrl);

  return new Response(JSON.stringify({ success: true, clientName: name, urls }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
