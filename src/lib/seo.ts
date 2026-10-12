/**
 * Title policy.
 *
 * Every page title is `<keyword> | CHRod Dev`, composed in `MainLayout` from a
 * keyword-only prop. Call sites pass the keyword and never the brand, so the
 * suffix cannot drift.
 *
 * It had drifted: four variants across 52 pages (`- Web Developer` on 29,
 * bare `CHRod Dev` on 12, `- Desarrollador Web` on 9, none on 2), and ten
 * Spanish project pages carried the English suffix from a hardcoded string.
 * The long variants also pushed 18 titles past the point where Google
 * truncates them.
 */
export const BRAND = "CHRod Dev";

/** Google truncates around here. Not a hard rule, but past it the tail is lost. */
export const TITLE_MAX = 60;

/**
 * Pages whose title length is driven by content outside this repo.
 *
 * Project titles come from Sanity and double as the page's `h1`, so they
 * cannot be shortened for the sake of the `<title>` alone. Their keywords lead
 * with the project name, so a truncated tail still reads.
 */
export function composeTitle(keyword: string): string {
  return `${keyword} | ${BRAND}`;
}

/**
 * Fails the build on a title that would be truncated.
 *
 * Warns instead of throwing in dev, so editing a title in the browser does not
 * blank the page mid-keystroke.
 */
export function assertTitleLength(title: string, pathname: string): void {
  if (title.length <= TITLE_MAX) return;

  const message =
    `Title is ${title.length} characters, over the ${TITLE_MAX} Google shows, on ${pathname}: "${title}". ` +
    `Shorten the keyword, or add the route to EXEMPT_TITLE_PATHS in src/lib/seo.ts if the length comes from content outside this repo.`;

  if (import.meta.env.PROD) throw new Error(message);
  console.warn(`[seo] ${message}`);
}

/**
 * Routes excused from the length check, with the reason.
 *
 * Project detail pages only: their keyword is the Sanity title, which is also
 * the `h1`.
 */
export const EXEMPT_TITLE_PATHS = [/^\/(en|es)\/(projects|proyectos)\/[^/]+\/?$/];

export function isTitleLengthExempt(pathname: string): boolean {
  return EXEMPT_TITLE_PATHS.some((re) => re.test(pathname));
}
