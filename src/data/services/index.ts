import { landingPages } from "./landing-pages";
import { businessWebsites } from "./business-websites";
import { webApplications } from "./web-applications";
import { ecommerceDevelopment } from "./ecommerce-development";
import { apiBackendDevelopment } from "./api-backend-development";
import { workflowAutomation } from "./workflow-automation";
import type { Service } from "./types";
import type { Locale } from "../../i18n/ui";

export const services: Service[] = [
  businessWebsites,
  landingPages,
  ecommerceDevelopment,
  webApplications,
  workflowAutomation,
  apiBackendDevelopment,
];

/** Lookup by stable id — use this for Sanity `services` values. */
export function getServiceById(id: string): Service | undefined {
  return services.find((service) => service.id === id);
}

/** Lookup by the URL segment of a given language. */
export function getServiceBySlug(
  slug: string,
  lang: Locale,
): Service | undefined {
  return services.find((service) => service.slug[lang] === slug);
}

/** Every service URL segment for a given language (for `getStaticPaths`). */
export function getServiceSlugs(lang: Locale): string[] {
  return services.map((service) => service.slug[lang]);
}

export type {
  Service,
  LocalizedText,
  ServiceFormField,
  ServiceProcessStep,
  ServiceTechGroup,
  ServiceFAQItem,
} from "./types";
