import type { Locale } from "./ui";

export type RouteKey =
  | "home"
  | "services"
  | "projects"
  | "about"
  | "review"
  | "privacyPolicy"
  | "terms";

/**
 * Single source of truth for the localized URL segments.
 *
 * Keys are stable identifiers used across the codebase; values are the
 * language-specific paths that end up in the browser (without the `/en` |
 * `/es` prefix that Astro's i18n routing prepends).
 *
 * Terms that are used the same way in both languages (landing pages,
 * ecommerce, API, backend…) stay untranslated on purpose.
 *
 * Changing a value here also requires renaming the matching folder/file in
 * `src/pages/<locale>/`.
 */
const routeBases: Record<RouteKey, Record<Locale, string>> = {
  home: { en: "/", es: "/" },
  services: { en: "/services", es: "/servicios" },
  projects: { en: "/projects", es: "/proyectos" },
  about: { en: "/about", es: "/acerca-de" },
  review: { en: "/review", es: "/resena" },
  privacyPolicy: { en: "/privacy-policy", es: "/politica-de-privacidad" },
  terms: { en: "/terms", es: "/terminos-y-condiciones" },
};

/**
 * Locale-agnostic path for a route, without the locale prefix.
 * e.g. `getRoutePath("es", "services", "landing-pages")` -> `/servicios/landing-pages`
 */
export function getRoutePath(
  lang: Locale,
  key: RouteKey,
  slug?: string,
): string {
  const base = routeBases[key][lang];
  if (!slug) return base;
  return base === "/" ? `/${slug}` : `${base}/${slug}`;
}

/**
 * Prefixes an unprefixed path with its locale.
 *
 * Equivalent to `getRelativeLocaleUrl` for this site's config
 * (`prefixDefaultLocale: true`, no `base`), but deliberately hand-rolled: the
 * `astro:i18n` virtual module is not available inside client-side React
 * components, and `ContactDrawer` / `ServiceQuoteForm` need to link to the
 * privacy policy.
 */
export function withLocale(lang: Locale, path: string): string {
  return path === "/" ? `/${lang}/` : `/${lang}${path}/`;
}

/**
 * Ready-to-use href including the locale prefix.
 * e.g. `getRouteUrl("es", "services", "landing-pages")` -> `/es/servicios/landing-pages/`
 */
export function getRouteUrl(
  lang: Locale,
  key: RouteKey,
  slug?: string,
): string {
  return withLocale(lang, getRoutePath(lang, key, slug));
}

/** Unprefixed path of the current page for every locale. */
export type AlternatePaths = Record<Locale, string>;

/**
 * Both locales' paths for a single page — consumed by the hreflang tags in
 * `MainLayout` and by the language switcher in `Navbar`.
 *
 * `slugs` is only needed for detail pages whose slug differs per language
 * (services, projects); omit it for static routes.
 */
export function getAlternatePaths(
  key: RouteKey,
  slugs?: Partial<Record<Locale, string>>,
): AlternatePaths {
  return {
    en: getRoutePath("en", key, slugs?.en),
    es: getRoutePath("es", key, slugs?.es),
  };
}

/** Strips the `/en` | `/es` prefix from a pathname. */
export function stripLocale(pathname: string): string {
  return pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
}

/** True when `path` (locale prefix already stripped) is the route or a child of it. */
export function isRouteActive(
  path: string,
  lang: Locale,
  key: RouteKey,
): boolean {
  const base = routeBases[key][lang];
  return path === base || path.startsWith(`${base}/`);
}
