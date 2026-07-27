import type { Locale } from "../i18n/ui";

export const WHATSAPP_NUMBER = "573127600792";

export interface WhatsAppMessageField {
  label: string;
  value: string;
}

export function buildWhatsAppMessage(
  serviceName: string,
  lang: Locale,
  fields: WhatsAppMessageField[],
): string {
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
