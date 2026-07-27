import { landingPages } from "./landing-pages";
import { businessWebsites } from "./business-websites";
import { webApplications } from "./web-applications";
import { ecommerceDevelopment } from "./ecommerce-development";
import { apiBackendDevelopment } from "./api-backend-development";
import { workflowAutomation } from "./workflow-automation";
import type { Service } from "./types";

export const services: Service[] = [
  businessWebsites,
  landingPages,
  ecommerceDevelopment,
  webApplications,
  workflowAutomation,
  apiBackendDevelopment,
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}

export type {
  Service,
  LocalizedText,
  ServiceFormField,
  ServiceProcessStep,
  ServiceTechGroup,
  ServiceFAQItem,
} from "./types";
