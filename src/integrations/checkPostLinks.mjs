import { readdir, readFile, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

/**
 * Warns about links inside blog posts that point to a page this build did
 * not produce.
 *
 * Authors type site paths by hand in Sanity (`/es/servicios/...`), and a
 * route renamed later leaves those links dead with nothing reporting it. This
 * runs after the build, against the real output, so it knows every page that
 * exists without restating the route table.
 *
 * It warns rather than fails on purpose: publishing a post triggers the build,
 * and a typo in one link must not keep a whole article unpublished. The
 * warning lands in the Netlify deploy log.
 *
 * Only links marked `data-post-link` are checked, which `src/lib/portableText.ts`
 * adds to every link written in a post body that is not an external page.
 */
const HREF = /<a href="([^"]+)"[^>]*\bdata-post-link\b/g;

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

/** Every built article file, `dist/<lang>/blog/<slug>/index.html`. */
async function findArticles(outDir) {
  const articles = [];
  for (const lang of ["es", "en"]) {
    const blogDir = path.join(outDir, lang, "blog");
    let entries = [];
    try {
      entries = await readdir(blogDir, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        articles.push(path.join(blogDir, entry.name, "index.html"));
      }
    }
  }
  return articles;
}

/** The site path a link points to, or `null` when it is not a page on this site. */
function sitePath(href) {
  if (href.startsWith("#") || /^(mailto|tel):/i.test(href)) return null;
  if (href.startsWith("/")) return href;
  try {
    const url = new URL(href);
    return url.hostname.replace(/^www\./, "") === "chrod.dev"
      ? url.pathname
      : null;
  } catch {
    // Neither absolute nor rooted: resolved against the article's own URL,
    // which is almost certainly not what the author meant.
    return href;
  }
}

export function checkPostLinks() {
  return {
    name: "check-post-links",
    hooks: {
      "astro:build:done": async ({ dir, logger }) => {
        const outDir = fileURLToPath(dir);
        const problems = [];

        for (const file of await findArticles(outDir)) {
          const html = await readFile(file, "utf8").catch(() => "");
          const page = "/" + path.relative(outDir, path.dirname(file)).split(path.sep).join("/") + "/";

          for (const [, raw] of html.matchAll(HREF)) {
            const href = raw.replace(/&amp;/g, "&");
            const target = sitePath(href);
            if (target === null) continue;

            if (!target.startsWith("/")) {
              problems.push(`${page} links to "${href}", a relative path. Start it with /es/ or /en/.`);
              continue;
            }

            const clean = decodeURI(target.split(/[?#]/)[0]);
            const candidates = [
              path.join(outDir, clean, "index.html"),
              path.join(outDir, clean),
            ];
            const found = (await Promise.all(candidates.map(exists))).some(Boolean);
            if (!found) problems.push(`${page} links to "${href}", which is not a page on the site.`);
          }
        }

        for (const problem of problems) logger.warn(problem);
      },
    },
  };
}
