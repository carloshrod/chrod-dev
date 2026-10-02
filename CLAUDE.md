# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A bilingual (EN/ES) portfolio website for a full stack web developer, built with **Astro 5.x** as a static site generator. Content for projects and reviews is managed via **Sanity CMS**, and the site uses **React** for interactive components, **Tailwind CSS** for styling, and deploys to **Netlify**.

## Commands

All commands run from the project root:

| Command           | Action                                                                                  |
| ----------------- | --------------------------------------------------------------------------------------- |
| `npm run dev`     | Start dev server at `localhost:4321` (pre-clears `.vite` cache to prevent stale builds) |
| `npm run build`   | Build production site to `./dist/`                                                      |
| `npm run preview` | Preview build locally before deployment                                                 |
| `npm run astro`   | Raw Astro CLI (e.g., `npm run astro add`)                                               |

**Notes:**

- Dev server requires environment variables (see setup below)
- Build pre-clears `.vite/` and `node_modules/.vite` to prevent Vite cache issues

## Environment Setup

Copy `.env.example` to `.env.local` and populate with:

- **Resend** (contact form + service quote form): `RESEND_API_KEY`, `RESEND_FROM_EMAIL` (verified sender), `RESEND_TO_EMAIL` (inbox that receives submissions) — server-only, used by `src/pages/api/send-contact-email.ts`
- **Sanity CMS**: `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET` (defaults to "production")
- **WhatsApp onboarding** (CHRod Connect Tech Provider app): `PUBLIC_WHATSAPP_APP_ID`, `PUBLIC_WHATSAPP_CONFIG_ID` (client-side, from Meta's Embedded Signup config), `WHATSAPP_APP_SECRET` (server-only, Meta app secret — also used as an app access token for `debug_token`; see below), `WHATSAPP_SYSTEM_USER_TOKEN` (server-only, optional — reads `/phone_numbers` on the WABA `debug_token` found; see below), `WHATSAPP_LINK_SECRET` (server-only, signs the per-client onboarding link — see below), `ADMIN_ACCESS_TOKEN` (gates `/es/admin-links`), `PUBLIC_SITE_URL`
- **Review Form**: `SANITY_WRITE_TOKEN` (Editor role from Sanity's API tokens), `REVIEW_ACCESS_TOKEN` (random string to protect `/review` endpoint)

## Architecture

### Page Structure

- **`src/pages/`**: Route files, nested per locale under `src/pages/en/` and `src/pages/es/`. **URL segments are translated**, so the two locale trees do not mirror each other by name (see Internationalization below).
  - `en/index.astro` / `es/index.astro`: homepage
  - `en/services/…` / `es/servicios/…`: services overview + `[slug].astro` detail pages
  - `en/projects/…` / `es/proyectos/…`: projects listing + `[slug].astro` case-study pages
  - `en/about.astro` / `es/acerca-de.astro`: about page
  - `en/review.astro` / `es/resena.astro`: client review submission form (SSR, token-gated)
  - `en/privacy-policy.astro` / `es/politica-de-privacidad.astro`, `en/terms.astro` / `es/terminos-y-condiciones.astro`: legal pages
  - `404.astro`: **must stay `prerender = false`.** A prerendered 404 gets baked into a single static HTML string that the Netlify adapter returns for every unmatched path, which would serve the Spanish page to someone who mistyped an `/en` URL. Rendering per request lets it read the locale off `Astro.url.pathname`. Markup lives in `src/components/NotFoundPage.astro`.
- **Layout**: `MainLayout.astro` wraps every page with SEO meta tags, fonts, and WhatsApp button. Pass `noindex` to drop the canonical/hreflang set and mark the page `noindex, follow` (used by the 404).

### Component Organization

- **`src/components/layout/`**: Structural (Navbar, Footer, Container)
- **`src/components/sections/`**: Page sections (HeroSection, AboutSection, ProjectsSection, ReviewsSection, etc.)
- **`src/components/ui/`**: Reusable UI pieces (ProjectCardLink, ReviewsCarousel, ContactDrawer, etc.)
- **`src/components/projects/`**: Projects listing (`overview/`) and case-study detail (`detail/`) page sections, mirroring `src/components/services/` structure

### Content Management

**Sanity Integration** (`src/lib/sanity.ts`):

- `getProjects(lang)`: Fetches projects with language-aware GROQ queries; falls back to EN if ES field missing
- `getReviews(lang)`: Fetches published reviews, also language-aware
- Queries include inline translations via GROQ's `select()` for title, description, role, etc.
- Images (screenshots, company logos) resolved via Sanity asset URLs

### Internationalization

**Simple i18n pattern** in `src/i18n/`:

- `ui.ts`: Key-value translation object keyed by locale ("en", "es")
- `utils.ts`: `useTranslations(lang)` hook returns a `t(key)` function; falls back to EN if key missing in target locale
- Components receive `lang` prop and call `t()` to retrieve strings
- No build-time extraction; keys hardcoded in component calls

**Localized URLs** (`src/i18n/routes.ts`) — the single source of truth for route segments:

- `routeBases` maps a stable `RouteKey` (`services`, `projects`, `about`, …) to its per-locale path. Terms that read the same in both languages (landing pages, ecommerce, API, backend) stay untranslated on purpose.
- **Never hardcode a route.** Build hrefs with `getRouteUrl(lang, key, slug?)`, not `getRelativeLocaleUrl(lang, "/services")`.
- `getAlternatePaths(key, slugs?)` returns both locales' paths. Every page passes the result to `MainLayout` (`alternates` → hreflang tags) **and** to `Navbar` (language switcher) — the switcher cannot derive the counterpart URL from the current path, since the segments differ per language.
- `isRouteActive(stripLocale(pathname), lang, key)` drives nav highlighting.
- Changing a segment requires two coordinated edits: the value in `routes.ts` and the folder/file name under `src/pages/<locale>/`. No redirects are kept for old URLs — `netlify.toml` only holds the `netlify.app` → `chrod.dev` domain redirect.
- `routes.ts` is deliberately free of `astro:i18n` (it hand-rolls `withLocale`) so client-side React components can import it.

**Slugs are localized too:**

- Services: `Service.id` is a stable identifier (what Sanity stores in a project's `services` array, and what the overview anchors use) — it never appears in a URL. `Service.slug` is a `LocalizedText` holding the URL segment per language. Note `id: "business-websites"` maps to the EN slug `professional-websites`; the id is deliberately frozen so existing Sanity content keeps matching.
- Projects: Sanity has `slug` (EN, required) and `slugEs` (optional). `getProjects(lang)` returns `slug` for the requested language plus `slugs: { en, es }` for hreflang. ES falls back to the EN slug when `slugEs` is empty.

### Styling

- **Tailwind CSS**: via `@tailwindcss/vite` plugin (Vite-first integration)
- **Global CSS**: `src/styles/global.css` (imported in MainLayout)
- Dark theme: site uses `bg-[#06060c]` base, `text-slate-200`

### Key Implementation Details

1. **ContactDrawer**: React component (`client:load`) rendered once in root layout; opened via custom `CustomEvent` from other components (avoids prop drilling)
2. **WhatsAppButton**: Astro component in layout, renders floating WhatsApp link
3. **Sanity SSR Config**: `astro.config.mjs` includes `noExternal` and `optimizeDeps` rules for Sanity/React dependencies—critical for SSR builds
4. **Vite Cache Issue**: `.vite` directory cleared on `predev` to prevent stale dependency resolution (Sanity + Vite can conflict)
5. **Language URLs**: both locales are prefixed (`/en`, `/es`) and their segments are translated — see `src/i18n/routes.ts`
6. **Review Form Auth**: `/review` endpoint requires `?t=REVIEW_ACCESS_TOKEN` query parameter; missing/wrong token blocks form
7. **WhatsApp Onboarding**: `/connect` (EN) / `/conectar` (ES) run the WhatsApp Cloud API Embedded Signup flow via `WhatsAppConnectButton.tsx` (FB JS SDK + `FB.login`). Two modes, chosen per client when the link is generated, never by the client: `coexistence` (number stays usable in the WhatsApp Business app — adds `featureType: "whatsapp_business_app_onboarding"` to the `FB.login` extras) and `api_only` (number, new or already in use, gets dedicated fully to the Cloud API, verified from scratch inside the popup, can no longer be used in any WhatsApp app). The card's "what you get / what you should know" copy is mode-aware and lives in `WhatsAppConnectButton.tsx` itself (not `ui.ts`), since it needs to hide once the connection succeeds. The page is gated not by a single shared token but by a per-client signature over `clientName|mode|ts`: `?cliente=NAME&modo=coexistence|api_only&ts=EPOCH_MS&sig=HMAC`, expiring 30 days after generation (`LINK_MAX_AGE_MS` in `src/lib/whatsappOnboard.ts`) since nothing is persisted to mark a link as already used — see that file for the signing/verification logic. Links are generated (no manual env-var editing per client) at `/es/admin-links?t=ADMIN_ACCESS_TOKEN` (admin token compared with `timingSafeStringEqual`), which calls `src/pages/api/generate-onboard-link.ts`. On completion, `src/pages/api/whatsapp-onboard.ts` re-verifies the signature (name + mode + ts + sig must match and not be expired), exchanges the `code` for a token with Meta (confirms the signup actually completed — not stored, since the client's WABA becomes accessible via our own system-user token once shared), then independently verifies `waba_id`/`phone_number_id` against the Graph API rather than trusting the client's postMessage report of them, which is both unverified and was observed arriving empty in practice. This needs **two different credential types for two different calls** — confirmed against Meta directly (each rejected the other's token with its own distinct error), not assumed: `debug_token` (on the exchanged token → `granular_scopes` → first `whatsapp_business_management` target id = the WABA) takes an **app access token** (`${appId}|${appSecret}`, query param) and explicitly rejects a system-user bearer token ("(#100) You must provide an app access token..."); `/phone_numbers` on that WABA does the opposite — it's reading real business asset data, so it needs a **system-user token** (`WHATSAPP_SYSTEM_USER_TOKEN`, same kind n8n already uses) and rejects the app access token ("(#200) You do not have permission to access this field"). Falls back to the client-reported values (no longer labeled — just shown as-is) if `exchangedToken`/`WHATSAPP_SYSTEM_USER_TOKEN` is missing or either lookup errors, and emails the result (mode + both IDs + the real display phone number when the second lookup succeeds) via Resend. No client data is persisted anywhere (deliberate MVP choice — revisit if client volume grows, e.g. Netlify Blobs). `WhatsAppConnectButton.tsx` also reloads the Facebook JS SDK when `lang` changes mid-session (View Transitions can switch between `/es/conectar` and `/en/connect` without a full reload), but this only affects the classic `FB.login` consent dialog's own chrome — verified that it does NOT control the Embedded Signup flow's language (phone entry, QR step...), which follows the Facebook account's own language setting instead, with no documented override. Not a bug to chase further, just a Meta-side constraint.

## Common Workflows

- **Add a new project**: Edit Sanity CMS, ensure project has `titleEs` + `descriptionEs` for bilingual support. `Slug (EN)` is required and drives `/en/projects/[slug]`; `Slug (ES)` is optional and drives `/es/proyectos/[slug]`, falling back to the EN slug when empty
- **Add a new review**: Publish in Sanity with `published: true`; form at `/en/review?t=TOKEN` (ES: `/es/resena?t=TOKEN`) submits reviews to Sanity
- **Onboard a WhatsApp client**: go to `/es/admin-links?t=ADMIN_ACCESS_TOKEN`, enter the client's name, copy the generated link, send it to them. No deploy or env var edit needed per client.
- **Update text/copy**: Edit `src/i18n/ui.ts` for static UI strings; Sanity for dynamic content (projects, reviews)
- **Add a React component**: Use `client:load` directive to hydrate; Astro handles SSR
- **Deploy**: Push to main branch; Netlify auto-deploys (see `netlify.toml` if exists, or Netlify UI config)

## Notes for Future Work

- Review form (`src/pages/api/submit-review.ts`) accepts POST with token validation—inspect if adding/changing review logic
- Netlify adapter assumes Netlify Functions for API routes; see `src/pages/api/` structure
- Simple-icons dependency available for brand icons (review components use it)
- styled-components in Sanity dependencies; not heavily used in portfolio itself but pulled in by Sanity UI
