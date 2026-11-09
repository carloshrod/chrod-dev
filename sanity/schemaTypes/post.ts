import { defineArrayMember, defineField, defineType } from "sanity";
import { services } from "../../src/data/services";
import { BLOG_SEO_TITLE_MAX } from "../../src/lib/seo";

/**
 * A blog article. One document per language, not one document holding both.
 *
 * The two locales are sold on different angles (local SEO in Spanish, the
 * nearshore pitch in English), so an article is often written for one market
 * only, and the ones that exist in both are adaptations rather than
 * translations. Long bodies in two languages inside one form would also be
 * unworkable in the Studio. `translation` links the two documents when a
 * counterpart exists, which is what drives hreflang and the language switcher.
 */

type PostDocument = {
  _id: string;
  language?: string;
  publishedAt?: string;
  seoTitle?: string;
};

const API_VERSION = "2024-01-01";

/** Published and draft ids of the same document, so it never conflicts with itself. */
function bothIds(id: string): [string, string] {
  const published = id.replace(/^drafts\./, "");
  return [published, `drafts.${published}`];
}

/** Today in Bogotá as `YYYY-MM-DD`, the format a Sanity `date` field stores. */
function todayInBogota(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Bogota" }).format(
    new Date(),
  );
}

const serviceOptions = services.map((service) => ({
  title: service.card.title.en,
  value: service.id,
}));

export const postSchema = defineType({
  name: "post",
  title: "Blog post",
  type: "document",
  fields: [
    defineField({
      name: "language",
      title: "Language",
      type: "string",
      options: {
        list: [
          { title: "Español", value: "es" },
          { title: "English", value: "en" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "es",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description:
        "The article's h1. Also the page title, unless SEO Title is filled in.",
      validation: (r) =>
        r.required().custom((title, context) => {
          const seoTitle = (context.document as PostDocument | undefined)
            ?.seoTitle;
          if (!title || title.length <= BLOG_SEO_TITLE_MAX || seoTitle) {
            return true;
          }
          return `Longer than ${BLOG_SEO_TITLE_MAX} characters: fill in SEO Title with a shorter version.`;
        }),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      description: `Only needed when Title is longer than ${BLOG_SEO_TITLE_MAX} characters: Google cuts the page title around 60, and " | CHRod Dev" takes the rest.`,
      validation: (r) => r.max(BLOG_SEO_TITLE_MAX),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "URL segment for /es/blog/[slug] or /en/blog/[slug].",
      options: {
        source: "title",
        // Unique per language, not across the whole dataset: /es/blog/x and
        // /en/blog/x do not collide, and "n8n-vs-zapier" reads the same in both.
        isUnique: async (slug, context) => {
          const doc = context.document as PostDocument | undefined;
          if (!doc) return true;
          const client = context.getClient({ apiVersion: API_VERSION });
          const count = await client.fetch<number>(
            `count(*[_type == "post" && slug.current == $slug && language == $language && !(_id in $ids)])`,
            { slug, language: doc.language ?? "", ids: bothIds(doc._id) },
          );
          return count === 0;
        },
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      description: "Meta description for search results. 120-160 characters.",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      description:
        "Shown on the blog listing. One or two sentences. Falls back to the SEO Description when empty.",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "publishedAt",
      title: "Published",
      type: "date",
      initialValue: todayInBogota,
      // The site has no scheduling: a future date is published right away,
      // showing that date. A warning, since backdating on purpose is valid.
      validation: (r) => [
        r.required(),
        r
          .custom((date: string | undefined) =>
            date && date > todayInBogota()
              ? "This date is in the future, but the post goes live as soon as you publish it."
              : true,
          )
          .warning(),
      ],
    }),
    defineField({
      name: "updatedAt",
      title: "Last meaningful update",
      type: "date",
      description:
        "Only for a real content update, not a typo fix. Shown on the article and sent to search engines.",
      validation: (r) =>
        r.custom((date: string | undefined, context) => {
          const published = (context.document as PostDocument | undefined)
            ?.publishedAt;
          return date && published && date < published
            ? "Cannot be earlier than the publish date."
            : true;
        }),
    }),
    defineField({
      name: "services",
      title: "Related services",
      type: "array",
      of: [{ type: "string" }],
      options: { list: serviceOptions },
      description:
        "The article ends by pointing to these service pages. Pick the one the article actually sells; two at most.",
      validation: (r) => r.max(2),
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      validation: (r) => r.required(),
      of: [
        defineArrayMember({
          type: "block",
          // The h1 is the title. Starting the body at h2 keeps one h1 per page.
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Code", value: "code" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [
                  {
                    name: "href",
                    type: "url",
                    title: "URL",
                    description:
                      "Full URL, or a site path like /es/servicios/automatizacion-whatsapp/",
                    validation: (r) =>
                      r.required().uri({
                        allowRelative: true,
                        scheme: ["http", "https", "mailto"],
                      }),
                  },
                ],
              },
            ],
          },
        }),
        defineArrayMember({
          type: "image",
          fields: [
            {
              name: "alt",
              type: "string",
              title: "Alt text",
              description: "What the image shows, for screen readers and search.",
              validation: (r) => r.required(),
            },
            { name: "caption", type: "string", title: "Caption" },
          ],
        }),
        defineArrayMember({
          name: "callout",
          title: "Callout",
          type: "object",
          fields: [
            {
              name: "tone",
              type: "string",
              title: "Tone",
              options: {
                list: [
                  { title: "Note", value: "note" },
                  { title: "Warning", value: "warning" },
                ],
                layout: "radio",
              },
              initialValue: "note",
            },
            {
              name: "text",
              type: "text",
              title: "Text",
              rows: 3,
              validation: (r) => r.required(),
            },
          ],
          preview: {
            select: { title: "text", subtitle: "tone" },
          },
        }),
        defineArrayMember({
          name: "codeBlock",
          title: "Code block",
          type: "object",
          fields: [
            { name: "language", type: "string", title: "Language" },
            {
              name: "code",
              type: "text",
              title: "Code",
              rows: 8,
              validation: (r) => r.required(),
            },
          ],
          preview: {
            select: { title: "code", subtitle: "language" },
          },
        }),
      ],
    }),
    defineField({
      name: "faq",
      title: "FAQ",
      type: "array",
      description:
        "Optional. Direct question and answer pairs, shown at the end of the article. AI search reads these well.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            {
              name: "question",
              type: "string",
              title: "Question",
              validation: (r) => r.required(),
            },
            {
              name: "answer",
              type: "text",
              title: "Answer",
              rows: 4,
              validation: (r) => r.required(),
            },
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        }),
      ],
    }),
    defineField({
      name: "translation",
      title: "Translation",
      type: "reference",
      to: [{ type: "post" }],
      description:
        "The same article in the other language, if it exists. Set it on either of the two documents: the site reads it from both sides.",
      // A pair must stay a pair. If the chosen post is already linked to a
      // third one, the site would have to guess which link wins.
      validation: (r) =>
        r.custom(async (value: { _ref?: string } | undefined, context) => {
          const doc = context.document as PostDocument | undefined;
          if (!value?._ref || !doc) return true;
          const client = context.getClient({ apiVersion: API_VERSION });
          const [self] = bothIds(doc._id);
          const target = await client.fetch<{
            linkedTo?: string;
            linkedFrom?: string;
          } | null>(
            `*[_type == "post" && _id in $targetIds][0]{
               "linkedTo": translation._ref,
               "linkedFrom": *[_type == "post" && translation._ref == ^._id && !(_id in $selfIds)][0].title
             }`,
            { targetIds: bothIds(value._ref), selfIds: bothIds(self) },
          );
          if (target?.linkedTo && target.linkedTo !== self) {
            return "That post already points to a different translation.";
          }
          if (target?.linkedFrom) {
            return `That post is already the translation of "${target.linkedFrom}".`;
          }
          return true;
        }),
      options: {
        // Only offer posts in the other language.
        filter: ({ document }) => ({
          filter: "language != $language && _id != $id",
          params: {
            language: (document as { language?: string }).language ?? "",
            id: document._id.replace(/^drafts\./, ""),
          },
        }),
      },
    }),
  ],
  orderings: [
    {
      title: "Published, newest first",
      name: "publishedDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", language: "language", date: "publishedAt" },
    prepare: ({ title, language, date }) => ({
      title,
      subtitle: `${String(language ?? "").toUpperCase()} · ${date ?? "no date"}`,
    }),
  },
});
