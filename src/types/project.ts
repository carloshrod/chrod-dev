import type { Review } from "./review";

export interface GitHubRepo {
  url: string;
  label?: string;
}

export interface Project {
  /** URL segment for the language the project was fetched in. */
  slug: string;
  /** Every language's slug — needed for hreflang and the language switcher. */
  slugs: Record<"en" | "es", string>;
  title: string;
  description: string;
  longDescription?: string;
  role?: string;
  company?: string;
  year?: string;
  techStack: string[];
  services?: string[];
  keyContributions?: string[];
  githubRepos?: GitHubRepo[];
  liveUrl?: string;
  websiteUrl?: string;
  videoUrl?: string;
  coverImage?: string;
  screenshots?: string[];
  testimonial?: Review;
}
