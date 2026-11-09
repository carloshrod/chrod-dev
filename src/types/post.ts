import type { Locale } from "../i18n/ui";

export interface PostFaqItem {
  question: string;
  answer: string;
}

/** A Portable Text array as stored in Sanity. Rendered by `src/lib/portableText.ts`. */
export type PortableTextBody = Array<Record<string, unknown> & { _type: string }>;

export interface Post {
  language: Locale;
  slug: string;
  title: string;
  /** Keyword for `<title>`. The title itself when no SEO title was set. */
  seoTitle: string;
  seoDescription: string;
  excerpt: string;
  /** `YYYY-MM-DD`. */
  publishedAt: string;
  updatedAt?: string;
  /** Stable service ids, as in a project's `services`. */
  services: string[];
  body: PortableTextBody;
  faq: PostFaqItem[];
  readingMinutes: number;
  /** Slug of the same article in the other language, when one exists. */
  translationSlug?: string;
}
