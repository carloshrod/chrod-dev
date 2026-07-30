import { createClient } from "@sanity/client";
import type { Project } from "../types/project";
import type { Review } from "../types/review";
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
    (Project & { _titleEn?: string; testimonial?: Review })[]
  >(
    `
    *[_type == "project"] | order(order asc) {
      "slug": slug.current,
      "_titleEn": title,
      "title": select(
        $isEs && defined(titleEs) => titleEs,
        title
      ),
      "description": select(
        $isEs && defined(descriptionEs) => descriptionEs,
        description
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

  return raw.map((p) => ({
    slug: p.slug || slugify(p._titleEn ?? p.title),
    title: p.title,
    description: p.description,
    longDescription: p.longDescription,
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
  }));
}

export async function getReviews(lang: "en" | "es" = "en"): Promise<Review[]> {
  const isEs = lang === "es";

  const raw = await sanityClient.fetch<Review[]>(
    `*[_type == "review" && published != false] | order(order asc) ${REVIEW_PROJECTION}`,
    { isEs },
  );

  return raw.map(mapReview);
}
