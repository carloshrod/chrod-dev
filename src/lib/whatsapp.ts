import type { Locale } from "../i18n/ui";

export const WHATSAPP_NUMBER = "573015783825";

export interface WhatsAppMessageField {
  label: string;
  value: string;
}

export function buildWhatsAppMessage(
  serviceName: string,
  lang: Locale,
  fields: WhatsAppMessageField[],
): string {
  // n8n ("CHRod Dev · WhatsApp entrantes") recognizes a quote request by this
  // first line, `*Nueva solicitud: …*` / `*New inquiry: …*`, and the `*Nombre:*` /
  // `*Name:*` line. Changing either makes the auto-reply fall back to the generic greeting.
  const heading = lang === "es" ? "Nueva solicitud" : "New inquiry";
  const lines = [
    `*${heading}: ${serviceName}*`,
    "",
    ...fields
      .filter((field) => field.value.trim().length > 0)
      .map((field) => `*${field.label}:* ${field.value}`),
  ];
  return lines.join("\n");
}

export function buildWhatsAppUrl(message?: string): string {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
