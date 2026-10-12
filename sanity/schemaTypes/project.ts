import { defineField, defineType } from "sanity";
import { services } from "../../src/data/services";

/**
 * Options for a project's `services` field, derived from the service
 * definitions rather than restated here.
 *
 * This list used to be hardcoded with a "keep in sync" comment, and it drifted
 * the first time a service was added: `whatsapp-automation` existed in the
 * data and on the site, but could not be selected in the Studio, so the new
 * service page could never show a related project. Deriving it means a new
 * service shows up here on its own.
 *
 * Values are the stable `id` fields, never the URL slugs, which differ per
 * language. Titles use the English card title purely as a Studio label.
 */
const serviceOptions = services.map((service) => ({
  title: service.card.title.en,
  value: service.id,
}));

export const projectSchema = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title (EN)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "titleEs",
      title: "Title (ES)",
      type: "string",
    }),
    defineField({
      name: "slug",
      title: "Slug (EN)",
      type: "slug",
      description: "URL segment for /en/projects/[slug]",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slugEs",
      title: "Slug (ES)",
      type: "slug",
      description:
        "URL segment for /es/proyectos/[slug]. Falls back to the EN slug when empty.",
      options: { source: "titleEs" },
    }),
    defineField({
      name: "role",
      title: "Role (EN)",
      type: "string",
    }),
    defineField({
      name: "roleEs",
      title: "Role (ES)",
      type: "string",
    }),
    defineField({
      name: "company",
      title: "Company / Client (EN)",
      type: "string",
    }),
    defineField({
      name: "companyEs",
      title: "Company / Client (ES)",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      description: "Single year (e.g. 2024) or range (e.g. 2024–2025)",
    }),
    defineField({
      name: "description",
      title: "Short Description (EN)",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "descriptionEs",
      title: "Short Description (ES)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "longDescription",
      title: "Long Description (EN)",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "longDescriptionEs",
      title: "Long Description (ES)",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description (EN)",
      description:
        "Meta description for search results. 120-160 characters. Falls back to the Short Description when empty, which is usually too short to fill the snippet.",
      type: "text",
      rows: 3,
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "seoDescriptionEs",
      title: "SEO Description (ES)",
      description:
        "Meta description for search results. 120-160 characters. Falls back to SEO Description (EN), then to the Short Description.",
      type: "text",
      rows: 3,
      validation: (r) => r.max(160),
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [{ type: "string" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "keyContributions",
      title: "Key Contributions (EN)",
      type: "array",
      of: [{ type: "string" }],
      description: "List of key contributions or achievements in this project",
    }),
    defineField({
      name: "keyContributionsEs",
      title: "Key Contributions (ES)",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "githubRepos",
      title: "GitHub Repos",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "url", title: "URL", type: "url" },
            { name: "label", title: "Label", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "liveUrl",
      title: "Live URL",
      type: "url",
    }),
    defineField({
      name: "websiteUrl",
      title: "Official Website URL",
      type: "url",
      description:
        "Official product/company website (when live demo is not available)",
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      description:
        "Used exclusively for project cards (grid, related projects). If left empty, the first screenshot is used instead. Screenshots remain dedicated to the project detail gallery.",
    }),
    defineField({
      name: "screenshots",
      title: "Screenshots",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = displayed first",
    }),
    defineField({
      name: "services",
      title: "Related Services",
      type: "array",
      description:
        "Services this project should appear under in the 'Related Projects' section",
      of: [{ type: "string" }],
      options: { list: serviceOptions },
    }),
    defineField({
      name: "testimonialRef",
      title: "Client Testimonial",
      type: "reference",
      to: [{ type: "review" }],
      description:
        "Link to an existing review to feature as this project's client testimonial",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "description" },
  },
});
