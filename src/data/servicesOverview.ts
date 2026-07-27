import type { LocalizedText } from "./services/types";

export interface ServiceOverviewEntry {
  slug: string;
  /** Represents the need/intent (used in the selector), not the deliverable — kept visually distinct from `service.icon`. */
  selectorIcon: string;
  selectorLabel: LocalizedText;
  useCase: LocalizedText;
  idealFor: LocalizedText;
  comparisonOutcome: LocalizedText;
}

export const servicesOverview: ServiceOverviewEntry[] = [
  {
    slug: "business-websites",
    selectorIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22c-3.75-4-6.5-7.875-6.5-11.5a6.5 6.5 0 0 1 13 0c0 3.625-2.75 7.5-6.5 11.5z"/><circle cx="12" cy="9.25" r="1.75"/><path d="M4 6a4.7 4.7 0 0 0 0 8"/><path d="M20 6a4.7 4.7 0 0 1 0 8"/></svg>`,
    selectorLabel: {
      en: "Establish a professional online presence",
      es: "Tener presencia profesional online",
    },
    useCase: {
      en: "For businesses that need a strong online presence.",
      es: "Para empresas o profesionales que necesitan una presencia sólida online.",
    },
    idealFor: {
      en: "Ideal for communicating what you do and building trust.",
      es: "Ideal para comunicar lo que haces y generar confianza.",
    },
    comparisonOutcome: {
      en: "Online presence",
      es: "Presencia online",
    },
  },
  {
    slug: "landing-pages",
    selectorIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
    selectorLabel: {
      en: "Launch an idea or campaign",
      es: "Lanzar una idea o campaña",
    },
    useCase: {
      en: "For validating ideas, campaigns, or specific offers.",
      es: "Para validar ideas, campañas o productos específicos.",
    },
    idealFor: {
      en: "Ideal if you need to convert traffic into leads or sales.",
      es: "Ideal si necesitas convertir tráfico en leads o ventas.",
    },
    comparisonOutcome: {
      en: "Capture leads",
      es: "Captar leads",
    },
  },
  {
    slug: "ecommerce-development",
    selectorIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41 13.42 20.58a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
    selectorLabel: {
      en: "Sell products or services",
      es: "Vender productos o servicios",
    },
    useCase: {
      en: "For selling products online with an optimized experience.",
      es: "Para vender productos online con una experiencia optimizada.",
    },
    idealFor: {
      en: "Ideal if you want to scale your sales with your own store.",
      es: "Ideal si quieres escalar ventas con una tienda propia.",
    },
    comparisonOutcome: {
      en: "Sell online",
      es: "Vender online",
    },
  },
  {
    slug: "web-applications",
    selectorIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    selectorLabel: {
      en: "Build a custom tool",
      es: "Crear una herramienta a medida",
    },
    useCase: {
      en: "For building digital products or internal tools.",
      es: "Para construir productos digitales o herramientas internas.",
    },
    idealFor: {
      en: "Ideal if you need custom logic or advanced functionality.",
      es: "Ideal si necesitas lógica compleja o funcionalidades a medida.",
    },
    comparisonOutcome: {
      en: "Build a product",
      es: "Construir un producto",
    },
  },
  {
    slug: "workflow-automation",
    selectorIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`,
    selectorLabel: {
      en: "Automate processes",
      es: "Automatizar procesos",
    },
    useCase: {
      en: "For optimizing repetitive tasks and connecting tools.",
      es: "Para optimizar tareas repetitivas y conectar herramientas.",
    },
    idealFor: {
      en: "Ideal for saving time and reducing manual errors.",
      es: "Ideal para ahorrar tiempo y reducir errores manuales.",
    },
    comparisonOutcome: {
      en: "Automate tasks",
      es: "Automatizar tareas",
    },
  },
  {
    slug: "api-backend-development",
    selectorIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    selectorLabel: {
      en: "Connect systems or handle data",
      es: "Conectar sistemas o manejar datos",
    },
    useCase: {
      en: "For structuring the logic, data, and integrations of your product.",
      es: "Para estructurar la lógica, datos e integraciones de tu producto.",
    },
    idealFor: {
      en: "Ideal if you need a solid, scalable foundation for a growing product or complex logic.",
      es: "Ideal si necesitas una base sólida y escalable para un producto en crecimiento o con lógica compleja.",
    },
    comparisonOutcome: {
      en: "Backend & integrations",
      es: "Backend e integraciones",
    },
  },
];
