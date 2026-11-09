import type { Locale } from "../../i18n/ui";

/**
 * "9 de noviembre de 2026" / "November 9, 2026".
 *
 * Sanity stores the date as `YYYY-MM-DD`. Parsed as UTC and formatted in UTC,
 * so the build machine's time zone can never shift it a day back.
 */
export function formatPostDate(date: string, lang: Locale): string {
  return new Intl.DateTimeFormat(lang === "es" ? "es-CO" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
