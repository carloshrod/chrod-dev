/**
 * Conversion tracking, behind one wrapper.
 *
 * Every call site names an event from `EVENTS` and goes through `track()`,
 * never through the vendor's global. Umami is the current vendor, chosen for
 * being cookieless (no consent banner, which a page whose argument is that it
 * loads fast cannot afford) and for allowing custom events on its free tier.
 * Swapping it for Plausible or GA4 means rewriting the body of `track()` and
 * nothing else.
 *
 * Nothing here ever throws. An ad blocker, a failed CDN or a missing website
 * id all leave `window.umami` undefined, and a tracking call must not take a
 * CTA down with it.
 */

/** The events worth having. Each one answers a question the site cannot. */
export const EVENTS = {
  /** Which surfaces actually drive the wedge, and whether the floating button earns its place. */
  whatsappClick: "whatsapp_click",
  /** Which of the contact triggers get used, and which are decoration. */
  contactOpen: "contact_open",
  /** How many of the people who open the drawer go on to send it. */
  contactSubmit: "contact_submit",
  /** Which service gets asked for a real quote. */
  quoteSubmit: "quote_submit",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

interface Umami {
  track: (
    event?: string | Record<string, unknown>,
    data?: Record<string, unknown>,
  ) => void;
}

declare global {
  interface Window {
    umami?: Umami;
  }
}

/**
 * Where a conversion element sits, read from `data-analytics-location`.
 *
 * Without it every one of the 15 contact triggers reports the same way and
 * the data cannot answer which CTA works, which is the whole point. The dev
 * warning is there because a trigger added later would otherwise go silently
 * unattributed.
 */
export function readLocation(element: Element | null): string {
  const located = element?.closest<HTMLElement>("[data-analytics-location]");
  const location = located?.dataset.analyticsLocation;

  if (location) return location;

  if (import.meta.env.DEV) {
    console.warn(
      "[analytics] Conversion element with no data-analytics-location:",
      element,
      "\nAdd the attribute, or its clicks land in an unattributed bucket.",
    );
  }
  return "unattributed";
}

export function track(
  event: EventName,
  props: Record<string, string> = {},
): void {
  window.umami?.track(event, props);
}

/**
 * One pageview per page view.
 *
 * The script is loaded with `data-auto-track="false"` and this is called from
 * `astro:page-load`, which fires both on first load and after every View
 * Transitions navigation. Left on auto-track, Umami would count the first
 * load and then miss every client-side navigation, since the router swaps the
 * document without a full page load.
 */
export function trackPageview(): void {
  window.umami?.track();
}
