import type { Locale } from "../i18n/ui";
import type { Service } from "../data/services/types";
import { WHATSAPP_NUMBER } from "./whatsapp";

/**
 * JSON-LD builders.
 *
 * What each type is actually worth, as of October 2026 — worth knowing before
 * adding more, because most "SEO schema" advice online is years out of date:
 *
 *  - `BreadcrumbList` still produces a visible Google rich result. This is the
 *    only type here that does.
 *  - `ProfessionalService`, `Person`, `Service` and `WebSite` produce no rich
 *    result. Their value is entity comprehension: helping Google, Bing and AI
 *    search tie the site, the business and the person together, and answer
 *    questions about them. That matters more every month as people find
 *    developers by asking an assistant instead of searching.
 *  - `FAQPage` lost its Google rich result on 7 May 2026 (restricted to
 *    government and health sites in Aug 2023, retired entirely after that).
 *    The markup is still valid and harmless, and Bing, DuckDuckGo and AI
 *    retrieval still read it, so it stays — but it will not draw an accordion
 *    in Google and should not be expected to.
 *
 * Deliberately NOT here: `Review` and `AggregateRating` for our own reviews.
 * Google treats a review of entity A published on entity A's own site as
 * self-serving and ineligible for review rich results, for `Organization` and
 * every subtype including `ProfessionalService`. Marking it up anyway risks a
 * structured-data manual action and can never earn stars. The reviews still
 * earn their place as on-page social proof; they just must not be marked up as
 * ratings. Stars for the business come from Google Business Profile instead,
 * through a separate mechanism that needs no markup here.
 */

export type JsonLd = Record<string, unknown>;

/** Fallback used only if `site` is ever unset in `astro.config.mjs`. */
export const FALLBACK_SITE_URL = "https://chrod.dev";

/**
 * Origin of the deployed site, without a trailing slash.
 *
 * Single source of truth: every page that builds absolute URLs calls this
 * instead of deriving it again, so canonical tags, OG tags and schema `@id`s
 * can never disagree about the origin.
 */
export function getSiteUrl(site: URL | undefined): string {
  return site?.origin ?? FALLBACK_SITE_URL;
}

const PERSON_NAME = "Carlos Hernández";
const BUSINESS_NAME = "CHRod Dev";

const SOCIAL_PROFILES = [
  "https://github.com/carloshrod",
  "https://www.linkedin.com/in/chrod",
];

/** Stable `@id` anchors so the separate nodes form one linked graph. */
export const schemaIds = {
  person: (site: string) => `${site}/#person`,
  business: (site: string) => `${site}/#business`,
  website: (site: string) => `${site}/#website`,
};

/**
 * The person and the business, as one graph. Emitted on every page so any
 * entry point establishes who this is.
 */
export function buildIdentityGraph(site: string, lang: Locale): JsonLd[] {
  // The entity's `url` is the bare site root, not the current locale's home.
  // It has to be stable across every page and match the website field on the
  // Google Business Profile, or the two describe subtly different entities.
  // `/` negotiates the locale, so it resolves for any visitor.
  const entityUrl = `${site}/`;

  const person: JsonLd = {
    "@type": "Person",
    "@id": schemaIds.person(site),
    name: PERSON_NAME,
    alternateName: BUSINESS_NAME,
    url: entityUrl,
    email: "hello@chrod.dev",
    jobTitle: lang === "es" ? "Desarrollador Full Stack" : "Full Stack Developer",
    sameAs: SOCIAL_PROFILES,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barranquilla",
      addressRegion: "Atlántico",
      addressCountry: "CO",
    },
    knowsAbout: [
      "WhatsApp Business Platform",
      "WhatsApp Cloud API",
      "Workflow automation",
      "n8n",
      "React",
      "Astro",
      "Node.js",
      "TypeScript",
      "API development",
      "Web development",
    ],
  };

  const business: JsonLd = {
    "@type": "ProfessionalService",
    "@id": schemaIds.business(site),
    name: BUSINESS_NAME,
    url: entityUrl,
    founder: { "@id": schemaIds.person(site) },
    email: "hello@chrod.dev",
    telephone: `+${WHATSAPP_NUMBER}`,
    image: `${site}/og-image.png`,
    logo: `${site}/chrod-logo.png`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barranquilla",
      addressRegion: "Atlántico",
      addressCountry: "CO",
    },
    // Based in Colombia, delivered remotely. Listing both keeps local intent
    // in Spanish from implying the work is Colombia-only.
    areaServed: [
      { "@type": "Country", name: "Colombia" },
      { "@type": "Place", name: "Latin America" },
      { "@type": "Place", name: "Worldwide (remote)" },
    ],
    // `availableLanguage` is NOT valid on an Organization or any LocalBusiness
    // subtype, which is what ProfessionalService is despite the name. Its
    // schema.org domain is ContactPoint / Service / ServiceChannel, so the
    // languages live on a contact point instead. Plain BCP 47 strings are
    // accepted and keep this terser than nested Language nodes.
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "hello@chrod.dev",
      telephone: `+${WHATSAPP_NUMBER}`,
      availableLanguage: ["es", "en"],
    },
    sameAs: SOCIAL_PROFILES,
  };

  return [person, business];
}

/**
 * The site entity. Home page only.
 *
 * No `SearchAction`: that markup declares a site search endpoint, and this
 * site has none. Claiming one that does not exist is invalid markup, not a
 * free win.
 */
export function buildWebSiteSchema(site: string): JsonLd {
  return {
    "@type": "WebSite",
    "@id": schemaIds.website(site),
    // One bilingual site, one entity. Both homepages emit this node under the
    // same `@id`, so a locale-specific `url` or a single `inLanguage` would
    // have them contradict each other about the same thing.
    url: `${site}/`,
    name: BUSINESS_NAME,
    inLanguage: ["es-CO", "en-US"],
    publisher: { "@id": schemaIds.business(site) },
  };
}

/**
 * Shape shared with the visible `Breadcrumbs.astro` component, so one trail
 * definition per page feeds both the rendered nav and the markup. Markup that
 * disagrees with the rendered trail is a validation error, and keeping two
 * hand-written lists in step is exactly the kind of thing that silently drifts.
 */
export interface BreadcrumbItem {
  label: string;
  /** Locale-prefixed href, e.g. `/es/servicios/`. Omit on the current page. */
  href?: string;
  /** Inline SVG shown by the visible component; ignored by the markup. */
  icon?: string;
}

/**
 * The one type here that still earns a visible Google rich result.
 *
 * `Breadcrumbs.astro` prepends the Home crumb itself, so this takes the same
 * trail the component is given and prepends Home identically.
 *
 * The final crumb carries no `item`: it is the current page, and pointing a
 * breadcrumb at itself is what trips validators.
 */
export function buildBreadcrumbSchema(
  site: string,
  homeLabel: string,
  homeHref: string,
  items: BreadcrumbItem[],
): JsonLd {
  const trail: BreadcrumbItem[] = [
    { label: homeLabel, href: homeHref },
    ...items,
  ];

  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      // The last crumb is the current page: no `item`, even if a href was
      // passed in for the visible component's benefit.
      ...(item.href && index < trail.length - 1
        ? { item: `${site}${item.href}` }
        : {}),
    })),
  };
}

export function buildServiceSchema(
  site: string,
  lang: Locale,
  service: Service,
  path: string,
): JsonLd {
  return {
    "@type": "Service",
    name: service.card.title[lang],
    description: service.card.description[lang],
    url: `${site}${path}`,
    // No `areaServed` here: `provider` resolves to the business node, which
    // already declares it. Repeating it was both redundant and drifting, since
    // this copy had omitted Latin America.
    provider: { "@id": schemaIds.business(site) },
    serviceType: service.card.title[lang],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${site}${path}`,
      availableLanguage: ["es", "en"],
    },
  };
}

/**
 * No Google rich result since 7 May 2026 — see the note at the top of this
 * file. Kept for Bing, DuckDuckGo and AI retrieval, where it still reads as
 * a clean question/answer pair.
 */
export function buildFaqSchema(lang: Locale, service: Service): JsonLd | null {
  if (service.faq.length === 0) return null;

  return {
    "@type": "FAQPage",
    mainEntity: service.faq.map((item) => ({
      "@type": "Question",
      name: item.question[lang],
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer[lang],
      },
    })),
  };
}

/** Wraps the page's nodes into the single `@graph` document we emit. */
export function buildGraph(nodes: JsonLd[]): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": nodes,
  });
}
