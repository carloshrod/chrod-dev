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

- **EmailJS** (contact form): `PUBLIC_EMAILJS_SERVICE_ID`, `PUBLIC_EMAILJS_TEMPLATE_ID`, `PUBLIC_EMAILJS_PUBLIC_KEY`
- **Sanity CMS**: `PUBLIC_SANITY_PROJECT_ID`, `PUBLIC_SANITY_DATASET` (defaults to "production")
- **Review Form**: `SANITY_WRITE_TOKEN` (Editor role from Sanity's API tokens), `REVIEW_ACCESS_TOKEN` (random string to protect `/review` endpoint)

## Architecture

### Page Structure

- **`src/pages/`**: Route files. Language variants nested as `src/pages/es/` for Spanish routes.
  - `index.astro` (EN) + `es/index.astro` (ES): homepage
  - `projects/index.astro` / `projects/[slug].astro` (+ `es/` variants): projects listing and case-study detail pages
  - `review.astro` / `es/review.astro`: client review submission form
  - `privacy-policy.astro` / `terms.astro`: legal pages
- **Layout**: `MainLayout.astro` wraps every page with SEO meta tags, fonts, and WhatsApp button

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

### Styling

- **Tailwind CSS**: via `@tailwindcss/vite` plugin (Vite-first integration)
- **Global CSS**: `src/styles/global.css` (imported in MainLayout)
- Dark theme: site uses `bg-[#06060c]` base, `text-slate-200`

### Key Implementation Details

1. **ContactDrawer**: React component (`client:load`) rendered once in root layout; opened via custom `CustomEvent` from other components (avoids prop drilling)
2. **WhatsAppButton**: Astro component in layout, renders floating WhatsApp link
3. **Sanity SSR Config**: `astro.config.mjs` includes `noExternal` and `optimizeDeps` rules for Sanity/React dependencies—critical for SSR builds
4. **Vite Cache Issue**: `.vite` directory cleared on `predev` to prevent stale dependency resolution (Sanity + Vite can conflict)
5. **Language URLs**: Spanish routes at `/es` prefix; EN is root
6. **Review Form Auth**: `/review` endpoint requires `?t=REVIEW_ACCESS_TOKEN` query parameter; missing/wrong token blocks form

## Common Workflows

- **Add a new project**: Edit Sanity CMS, ensure project has `titleEs` + `descriptionEs` for bilingual support. Add a `slug` field (Sanity slug type) for stable URLs at `/projects/[slug]`; without it, the slug is derived from the English title
- **Add a new review**: Publish in Sanity with `published: true`; form at `/review?t=TOKEN` submits reviews to Sanity
- **Update text/copy**: Edit `src/i18n/ui.ts` for static UI strings; Sanity for dynamic content (projects, reviews)
- **Add a React component**: Use `client:load` directive to hydrate; Astro handles SSR
- **Deploy**: Push to main branch; Netlify auto-deploys (see `netlify.toml` if exists, or Netlify UI config)

## Notes for Future Work

- Review form (`src/pages/api/submit-review.ts`) accepts POST with token validation—inspect if adding/changing review logic
- Netlify adapter assumes Netlify Functions for API routes; see `src/pages/api/` structure
- Simple-icons dependency available for brand icons (review components use it)
- styled-components in Sanity dependencies; not heavily used in portfolio itself but pulled in by Sanity UI
