import type { Locale } from "../../i18n/ui";
import { getRoutePath, type AlternatePaths } from "../../i18n/routes";

export function otherLocale(lang: Locale): Locale {
  return lang === "es" ? "en" : "es";
}

/**
 * Where the language switcher sends a reader of a blog page.
 *
 * The other language may have the same article, only other articles, or
 * nothing yet. In that order it gets the counterpart, that language's blog
 * listing, or that language's home page. The listing is never offered while
 * it is empty: it says "first article coming soon" and is `noindex`, which is
 * a dead end for the reader and an hreflang error for Search Console.
 *
 * hreflang itself is a separate question (`hasTranslation` on MainLayout):
 * only a real counterpart, or two listings that both have posts, are pairs.
 */
export function blogAlternates(
  lang: Locale,
  options: { slug?: string; translationSlug?: string; otherHasPosts: boolean },
): AlternatePaths {
  const other = otherLocale(lang);
  const otherPath = options.translationSlug
    ? getRoutePath(other, "blog", options.translationSlug)
    : options.otherHasPosts
      ? getRoutePath(other, "blog")
      : getRoutePath(other, "home");

  return {
    [lang]: getRoutePath(lang, "blog", options.slug),
    [other]: otherPath,
  } as AlternatePaths;
}
