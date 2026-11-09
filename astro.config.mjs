// @ts-check
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

import tailwindcss from "@tailwindcss/vite";
import react from "@astrojs/react";
import sanity from "@sanity/astro";
import netlify from "@astrojs/netlify";
import sitemap from "@astrojs/sitemap";
import { checkPostLinks } from "./src/integrations/checkPostLinks.mjs";

const env = loadEnv(process.env.NODE_ENV ?? "development", process.cwd(), "");

/**
 * Languages that have at least one published blog post.
 *
 * An empty blog listing renders `noindex`, and a noindex URL in the sitemap is
 * reported by Search Console as "Submitted URL marked noindex". The sitemap
 * filter is synchronous, so the answer is fetched once here. If Sanity cannot
 * be reached, both listings stay in the sitemap: a warning in Search Console
 * is better than a failed deploy.
 */
async function getLanguagesWithPosts() {
  const projectId = env.PUBLIC_SANITY_PROJECT_ID;
  const dataset = env.PUBLIC_SANITY_DATASET || "production";
  const query = encodeURIComponent(
    'array::unique(*[_type == "post" && defined(slug.current)].language)',
  );
  try {
    const res = await fetch(
      `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${query}`,
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const { result } = await res.json();
    return new Set(result);
  } catch (error) {
    console.warn(`[sitemap] Could not read blog languages from Sanity: ${error}`);
    return new Set(["es", "en"]);
  }
}

const languagesWithPosts = await getLanguagesWithPosts();

// https://astro.build/config
export default defineConfig({
  // Required by @astrojs/sitemap to emit absolute URLs, and read by
  // MainLayout via `Astro.site` for canonical/hreflang/OG tags.
  site: "https://chrod.dev",
  adapter: netlify(),
  image: {
    domains: ["cdn.sanity.io"],
  },
  i18n: {
    defaultLocale: "es",
    locales: ["es", "en"],
    routing: {
      prefixDefaultLocale: true,
      // Astro's own `/` -> `/es/` redirect is off so that
      // `src/pages/index.astro` can run and negotiate the locale from
      // `Accept-Language`. Left at its default (`true`), the i18n middleware
      // intercepts `/` first and that page never executes.
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    plugins: [tailwindcss()],
    cacheDir: "./.vite",
    server: {
      // Vite rejects requests whose Host header isn't localhost-like (DNS
      // rebinding protection). Needed to test Meta's Embedded Signup locally
      // through a cloudflared/ngrok tunnel, since Meta requires HTTPS + a
      // domain registered in the app's settings — plain localhost won't do.
      allowedHosts: [".trycloudflare.com", ".ngrok-free.dev", ".ngrok-free.app"],
    },
    optimizeDeps: {
      include: [
        "sanity",
        "sanity/structure",
        "@sanity/ui",
        "@sanity/icons",
        "styled-components",
      ],
    },
    ssr: {
      noExternal: [
        "@sanity/astro",
        "sanity",
        "@sanity/ui",
        "@sanity/icons",
        "styled-components",
      ],
    },
  },

  integrations: [
    react(),
    checkPostLinks(),
    // Only prerendered pages reach the sitemap, so every `prerender = false`
    // route (the root redirect, 404, /review, /connect, /admin-links and the
    // API endpoints) is already excluded. The filter is a second line of
    // defence in case one of them is ever switched back to prerendering.
    //
    // Deliberately not using the integration's `i18n` option: it pairs
    // locales by assuming the same path under each prefix, which is false
    // here because the ES segments are translated (`/es/servicios/...` vs
    // `/en/services/...`). It would emit alternates pointing at URLs that
    // don't exist. hreflang already ships per page in the HTML head, which
    // Google accepts on its own.
    sitemap({
      filter: (page) => {
        // Derived from the page URL rather than a hardcoded domain, so this
        // keeps working on a preview deploy or if `site` ever changes.
        const { pathname } = new URL(page);

        // The bare root only ever 302s to a locale. Listing a redirect gets
        // it reported as "Page with redirect" in Search Console, so the
        // canonical locale homepages are listed and `/` is not.
        if (pathname === "/") return false;

        // An empty blog listing is noindex until its first post exists.
        const blogIndex = pathname.match(/^\/(en|es)\/blog\/?$/);
        if (blogIndex && !languagesWithPosts.has(blogIndex[1])) return false;

        return (
          !/(^|\/)(studio|api)(\/|$)/.test(pathname) &&
          !/\/(review|resena|connect|conectar|admin-links)\/?$/.test(pathname)
        );
      },
    }),
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET ?? "production",
      useCdn: false,
      studioBasePath: "/es/studio",
    }),
  ],
});
