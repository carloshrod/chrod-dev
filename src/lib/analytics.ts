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

/**
 * Pages that must never load analytics, because their URL is itself a secret.
 *
 * Umami records the full URL, query string included, and these four routes
 * carry credentials and client data in theirs:
 *
 *  - `/connect` and `/conectar`: `?cliente=NAME&email=CLIENT_EMAIL&sig=HMAC`.
 *    That is a client's name and address, plus a signature that stays valid
 *    for 30 days, so logging it hands a third party a replayable link.
 *  - `/review` and `/resena`: `?t=REVIEW_ACCESS_TOKEN`.
 *  - `/admin-links`: `?t=ADMIN_ACCESS_TOKEN`.
 *
 * They are also operational surfaces rather than marketing ones, so their
 * traffic would skew the numbers even if the URLs were harmless. Same set the
 * sitemap filter and robots.txt already exclude, for related reasons.
 *
 * Anchored to a full locale-prefixed path on purpose. A loose match would
 * also silence a page whose slug merely ended in one of these words, and a
 * project slug in Sanity could become that at any time without a build
 * failing. The accepted cost is that nothing is known about how many clients
 * opened their onboarding link, which is the right trade against filing their
 * name and a live signature with a third party.
 */
const EXCLUDED_PATHS =
  /^\/(en|es)\/(review|resena|connect|conectar|admin-links)\/?$/;

export function isAnalyticsExcluded(pathname: string): boolean {
  return EXCLUDED_PATHS.test(pathname);
}

/** The events worth having. Each one answers a question the site cannot. */
export const EVENTS = {
  /** Which surfaces actually drive the wedge, and whether the floating button earns its place. */
  whatsappClick: "whatsapp_click",
  /** Which of the contact triggers get used, and which are decoration. */
  contactOpen: "contact_open",
  /**
   * The service pages' equivalent of `contact_open`.
   *
   * Their CTAs do not open the drawer, they jump to the quote form further
   * down the page, so without this the highest-intent pages were the only
   * ones measuring submissions with no measure of intent. A service page
   * showing few quotes could not be told apart from one whose CTAs nobody
   * clicks, which is the opposite of what those numbers are for.
   */
  quoteFormOpen: "quote_form_open",
  /** How many of the people who open the drawer go on to send it. */
  contactSubmit: "contact_submit",
  /** Which service gets asked for a real quote. */
  quoteSubmit: "quote_submit",
} as const;

export type EventName = (typeof EVENTS)[keyof typeof EVENTS];

interface UmamiPayload extends Record<string, unknown> {
  url?: string;
}

interface Umami {
  /**
   * Umami accepts an event name, a payload object, or a function that takes
   * the default payload and returns the one to send. Only the function form
   * is used here: see `withCurrentUrl`.
   */
  track: (
    event?: string | UmamiPayload | ((payload: UmamiPayload) => UmamiPayload),
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

/**
 * The URL every call reports, read at call time.
 *
 * Umami keeps its own idea of the current URL in a variable it refreshes by
 * patching `pushState`. Relying on that was already wrong once: with
 * `data-auto-track="false"` the patching never happens and the variable stays
 * frozen on the page that first loaded the script, so every event after an
 * internal navigation is filed under the wrong page. The attribute is fixed,
 * but passing the URL ourselves means correctness no longer depends on the
 * vendor's internals, nor on whether a given navigation went through
 * `pushState` at all, which a back-button `popstate` does not.
 *
 * Umami's documented payload-function form receives its default payload and
 * returns the one to send. Keeping the search string preserves UTM
 * attribution on campaign links.
 */
function withCurrentUrl<T extends Record<string, unknown>>(
  payload: T,
): T & { url: string } {
  return { ...payload, url: window.location.href };
}

export function track(
  event: EventName,
  props: Record<string, string> = {},
): void {
  window.umami?.track((payload) => ({
    ...withCurrentUrl(payload),
    name: event,
    data: props,
  }));
}

/**
 * One pageview per page view.
 *
 * The script is loaded with `data-auto-pageview="false"` and this is called
 * from `astro:page-load`, which fires both on first load and after every View
 * Transitions navigation. Leaving Umami to send them itself would tie the
 * count to a 300ms timer after a `pushState` rather than to Astro's own
 * lifecycle, and would miss any navigation that does not go through it.
 */
export function trackPageview(): void {
  window.umami?.track(withCurrentUrl);
}
