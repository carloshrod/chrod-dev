import { createClient } from "@sanity/client";
import type { Project } from "../types/project";
import type { Review } from "../types/review";
import type { Post, PortableTextBody } from "../types/post";
import { slugify } from "./slug";

const sanityClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
  useCdn: false,
  apiVersion: "2024-01-01",
});

const REVIEW_PROJECTION = `{
  name,
  "role": select($isEs && defined(roleEs) => roleEs, role),
  company,
  avatar,
  "text": select($isEs && defined(textEs) => textEs, text),
  source,
  sourceLabel,
  rating,
  sourceUrl,
  linkedinUrl,
  "companyLogo": companyLogo.asset->url
}`;

function mapReview(r: Review): Review {
  return {
    name: r.name,
    role: r.role ?? "",
    company: r.company ?? "",
    avatar: r.avatar ?? r.name.slice(0, 2).toUpperCase(),
    text: r.text,
    source: r.source,
    sourceLabel: r.sourceLabel,
    rating: r.rating,
    sourceUrl: r.sourceUrl,
    linkedinUrl: r.linkedinUrl,
    companyLogo: r.companyLogo,
  };
}

export async function getProjects(
  lang: "en" | "es" = "en",
): Promise<Project[]> {
  const isEs = lang === "es";

  const raw = await sanityClient.fetch<
    (Omit<Project, "slug" | "slugs"> & {
      _slugEn?: string;
      _slugEs?: string;
      _titleEn?: string;
      testimonial?: Review;
    })[]
  >(
    `
    *[_type == "project"] | order(order asc) {
      "_slugEn": slug.current,
      "_slugEs": slugEs.current,
      "_titleEn": title,
      "title": select(
        $isEs && defined(titleEs) => titleEs,
        title
      ),
      "description": select(
        $isEs && defined(descriptionEs) => descriptionEs,
        description
      ),
      "seoDescription": select(
        $isEs && defined(seoDescriptionEs) => seoDescriptionEs,
        seoDescription
      ),
      "longDescription": select(
        $isEs && defined(longDescriptionEs) => longDescriptionEs,
        longDescription
      ),
      "role": select(
        $isEs && defined(roleEs) => roleEs,
        role
      ),
      "company": select(
        $isEs && defined(companyEs) => companyEs,
        company
      ),
      year,
      techStack,
      services,
      "keyContributions": select(
        $isEs && defined(keyContributionsEs) => keyContributionsEs,
        keyContributions
      ),
      githubRepos,
      liveUrl,
      websiteUrl,
      videoUrl,
      "coverImage": coverImage.asset->url,
      "screenshots": screenshots[].asset->url,
      "testimonial": testimonialRef->${REVIEW_PROJECTION}
    }
  `,
    { isEs },
  );

  return raw.map((p) => {
    // The EN slug is the fallback for every language: it is required in Sanity
    // and, failing that, derived from the (also required) English title.
    const slugEn = p._slugEn || slugify(p._titleEn ?? p.title);
    const slugs = { en: slugEn, es: p._slugEs || slugEn };

    return {
      slug: slugs[lang],
      slugs,
      title: p.title,
      description: p.description,
      longDescription: p.longDescription,
      seoDescription: p.seoDescription,
      role: p.role,
      company: p.company,
      year: p.year,
      techStack: p.techStack ?? [],
      services: p.services ?? [],
      keyContributions: p.keyContributions,
      githubRepos: p.githubRepos,
      liveUrl: p.liveUrl,
      websiteUrl: p.websiteUrl,
      videoUrl: p.videoUrl,
      coverImage: p.coverImage,
      screenshots: p.screenshots ?? [],
      testimonial: p.testimonial ? mapReview(p.testimonial) : undefined,
    };
  });
}

export async function getReviews(lang: "en" | "es" = "en"): Promise<Review[]> {
  const isEs = lang === "es";

  const raw = await sanityClient.fetch<Review[]>(
    `*[_type == "review" && published != false] | order(order asc) ${REVIEW_PROJECTION}`,
    { isEs },
  );

  return raw.map(mapReview);
}

/** Rough reading speed for an article, in words per minute. */
const WORDS_PER_MINUTE = 200;

function countWords(body: PortableTextBody): number {
  let words = 0;
  for (const block of body) {
    const text =
      block._type === "block"
        ? ((block.children as { text?: string }[] | undefined) ?? [])
            .map((child) => child.text ?? "")
            .join(" ")
        : block._type === "callout"
          ? String(block.text ?? "")
          : "";
    words += text.split(/\s+/).filter(Boolean).length;
  }
  return words;
}

/**
 * The footer asks whether a language has posts on every page it renders, so
 * without a cache each page of a build would query Sanity again.
 *
 * It expires, though, because it does not only live for a build: the pages
 * rendered per request (404, review, connect) run in a long-lived function
 * that would otherwise keep a stale answer until its next cold start. In dev
 * there is no cache at all, so an edit in the Studio shows on the next reload.
 */
const POSTS_CACHE_TTL_MS = import.meta.env.DEV ? 0 : 5 * 60 * 1000;
const postsCache = new Map<
  "en" | "es",
  { at: number; request: Promise<Post[]> }
>();

/** Every published post in one language, newest first. */
export function getPosts(lang: "en" | "es"): Promise<Post[]> {
  const cached = postsCache.get(lang);
  if (cached && Date.now() - cached.at < POSTS_CACHE_TTL_MS) {
    return cached.request;
  }

  const request = fetchPosts(lang);
  postsCache.set(lang, { at: Date.now(), request });
  // A failed fetch must not be served from the cache afterwards.
  request.catch(() => postsCache.delete(lang));
  return request;
}

async function fetchPosts(lang: "en" | "es"): Promise<Post[]> {
  const raw = await sanityClient.fetch<
    (Omit<Post, "readingMinutes" | "seoTitle" | "excerpt" | "services" | "faq"> & {
      seoTitle?: string;
      excerpt?: string;
      services?: string[];
      faq?: Post["faq"];
    })[]
  >(
    `
    *[_type == "post" && language == $lang && defined(slug.current)]
      | order(publishedAt desc, _createdAt desc) {
      language,
      "slug": slug.current,
      title,
      seoTitle,
      seoDescription,
      excerpt,
      publishedAt,
      updatedAt,
      services,
      body[]{
        ...,
        _type == "image" => {
          ...,
          "url": asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height
        }
      },
      faq[]{ question, answer },
      // The link is set on one document and read from both: this post's own
      // reference, or else a post in the other language that references it.
      // Requiring it on both sides meant one forgotten field left hreflang
      // non-reciprocal, which Google ignores. Only a counterpart in the other
      // language counts, since a reference set before a language change could
      // still point at a same-language post.
      "translationSlug": coalesce(
        select(translation->language != language => translation->slug.current),
        *[
          _type == "post" &&
          translation._ref == ^._id &&
          language != ^.language &&
          defined(slug.current)
        ] | order(_createdAt asc)[0].slug.current
      )
    }
  `,
    { lang },
  );

  return raw.map((post) => ({
    ...post,
    seoTitle: post.seoTitle || post.title,
    excerpt: post.excerpt || post.seoDescription,
    services: post.services ?? [],
    faq: post.faq ?? [],
    body: post.body ?? [],
    readingMinutes: Math.max(
      1,
      Math.round(countWords(post.body ?? []) / WORDS_PER_MINUTE),
    ),
    translationSlug: post.translationSlug ?? undefined,
  }));
}
