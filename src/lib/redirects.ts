// Inlined by Vite at build time, resolved against this source file. Reading
// it from disk instead would look for `netlify.toml` next to the bundled
// output, where it does not exist.
import netlifyToml from "../../netlify.toml?raw";
import type { Project } from "../types/project";

/**
 * Keeps `netlify.toml` in step with the project slugs in Sanity.
 *
 * Setting a Spanish slug on a project retires two URLs that Google may already
 * have indexed, and nothing in the build notices:
 *
 *  - `/es/projects/<en-slug>`, the shape from before the Spanish segment was
 *    translated, when the Spanish page fell back to the English slug.
 *  - `/es/proyectos/<en-slug>`, that same fallback under the translated
 *    segment, which was a real live URL until the Spanish slug was set.
 *
 * This went wrong once already, and silently: a `/es/projects/*` splat used to
 * translate the segment while keeping the slug, so every old Spanish URL
 * answered with a permanent redirect to a page that no longer existed. Google
 * followed those redirects and indexed the dead targets too, which is how one
 * stale assumption turned into four shapes of 404 per project. The splat is
 * gone; this assertion is what replaces the comment that used to promise the
 * list was maintained.
 *
 * Only the two derivable shapes are checked. A slug's *previous* value is not
 * in Sanity, so a later rename still has to be caught by hand from the Search
 * Console 404 report.
 */
/** Every `from` in `netlify.toml`, which is the set of paths it answers. */
function readRedirectSources(): Set<string> {
  return new Set(
    [...netlifyToml.matchAll(/^\s*from\s*=\s*"([^"]+)"/gm)].map((m) => m[1]),
  );
}

export function assertProjectRedirects(projects: Project[]): void {
  const sources = readRedirectSources();
  const missing: { path: string; to: string }[] = [];

  for (const project of projects) {
    const { en, es } = project.slugs;
    // Same slug in both languages means the English one is still live in
    // Spanish, so there is nothing to redirect and a rule would loop.
    if (!es || es === en) continue;

    for (const path of [`/es/projects/${en}`, `/es/proyectos/${en}`]) {
      if (!sources.has(path)) missing.push({ path, to: `/es/proyectos/${es}` });
    }
  }

  if (missing.length === 0) return;

  const blocks = missing
    .map(
      ({ path, to }) =>
        `[[redirects]]\n  from = "${path}"\n  to = "${to}"\n  status = 301`,
    )
    .join("\n\n");

  const message =
    `${missing.length} project URL(s) retired by a Spanish slug in Sanity have no redirect in netlify.toml. ` +
    `Left alone they answer 404 to visitors and to Google, which has them indexed. Add:\n\n${blocks}`;

  // Throwing fails the deploy and leaves the previous version serving, which
  // still answers those URLs. Warning in dev keeps editing a slug in Sanity
  // from breaking the dev server before the redirect is written.
  if (import.meta.env.PROD) throw new Error(message);
  console.warn(`[redirects] ${message}`);
}
