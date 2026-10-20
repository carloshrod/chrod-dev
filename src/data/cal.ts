import type { Locale } from "../i18n/ui";

/**
 * Cal.com booking links, one per language.
 *
 * Two event types rather than one because a Cal.com event's title,
 * description and booking questions are single-language: one shared event
 * would land an English visitor on a Spanish booking page straight after
 * reading English copy, and the free plan allows unlimited event types, so
 * splitting them costs nothing.
 *
 * Single source of truth: the embed on the contact page and the link that
 * opens it in a new tab both read from here, so the two can never point at
 * different events.
 */
const CAL_LINKS: Record<Locale, string> = {
  es: "chrod/consulta-15min",
  en: "chrod/intro-15min",
};

/** The `calLink` the embed expects: the path, with no origin. */
export function getCalLink(lang: Locale): string {
  return CAL_LINKS[lang];
}

/** Absolute URL, for the link that opens the calendar in a new tab. */
export function getCalUrl(lang: Locale): string {
  return `https://cal.com/${CAL_LINKS[lang]}`;
}
