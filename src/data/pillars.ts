import type { LocalizedText } from "./services/types";
import { getServiceById, services, type Service } from "./services";
import type { Locale } from "../i18n/ui";

/**
 * Layer 1 of the offer: three pillars grouped by what the client wants to
 * achieve, each hosting the services that deliver it.
 *
 * Why this exists: a flat grid of seven equal services made the visitor
 * self-classify into a taxonomy built around deliverables rather than
 * outcomes, and offered no page at all for the broad head terms
 * ("automatización para empresas", "desarrollo de software a medida"). The
 * pillars are both the simpler choice at the top of the funnel and three new
 * ranking targets.
 *
 * Pillars live at the same URL depth as services (`/servicios/<slug>/`) on
 * purpose. Nesting them (`/servicios/<pilar>/<servicio>/`) would have rewritten
 * all seven existing service URLs, throwing away whatever authority they have
 * accumulated, in exchange for nothing a visitor can perceive.
 */
export interface Pillar {
  /** Stable identifier. Never appears in a URL. */
  id: string;
  /** URL segment, per language. Must not collide with any service slug. */
  slug: LocalizedText;
  /**
   * Icon for the home cards. Represents the thing itself (automation, a
   * website, built software), so it is picked for recognition first. Overlap
   * with a service glyph is acceptable here because the service icons do not
   * appear on the home, though a distinct mark is still preferred.
   *
   * Not used in the services overview: there the group header sits directly
   * above cards that do show service icons, so it uses a ring instead.
   */
  /**
   * Icon for the selector pill. Represents what the pill's label says, which
   * is a need, not a deliverable, so it is usually a different glyph from
   * `icon`.
   */
  selectorIcon: string;
  icon: string;
  /** Short, need-phrased label for the "what do you need?" selector. */
  selectorLabel: LocalizedText;
  /** Service ids this pillar hosts, in display order. */
  serviceIds: string[];
  card: {
    title: LocalizedText;
    description: LocalizedText;
  };
  hero: {
    headline: LocalizedText;
    subheadline: LocalizedText;
  };
  /** Shown above the service list on the pillar page. */
  intro: LocalizedText;
  seo: {
    title: LocalizedText;
    description: LocalizedText;
  };
}

export const pillars: Pillar[] = [
  {
    id: "automation",
    slug: { en: "automation", es: "automatizacion" },
    selectorLabel: {
      en: "Stop losing sales and time",
      es: "Dejar de perder ventas y tiempo",
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect width="8" height="8" x="3" y="3" rx="2"/><path d="M7 11v4a2 2 0 0 0 2 2h4"/><rect width="8" height="8" x="13" y="13" rx="2"/></svg>`,
    selectorIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    serviceIds: ["whatsapp-automation", "workflow-automation"],
    card: {
      // Just "Automation": the previous "Automation and WhatsApp" sat directly
      // above a service called "WhatsApp Automation", and the two names were
      // close enough to read as a duplicate rather than a hierarchy.
      title: { en: "Automation that sells", es: "Automatización que vende" },
      description: {
        en: "Your WhatsApp replies and your processes run on their own, even when you are not around.",
        es: "Tu WhatsApp responde y tus procesos corren solos, incluso cuando no estás.",
      },
    },
    hero: {
      headline: {
        en: "Stop doing by hand what a process can do for you",
        es: "Deja de hacer a mano lo que un proceso puede hacer por ti",
      },
      subheadline: {
        en: "I connect your WhatsApp to Meta's official API and automate the repetitive work that eats your day, from answering customers to moving data between the tools you already use.",
        es: "Conecto tu WhatsApp a la API oficial de Meta y automatizo el trabajo repetitivo que te consume el día, desde atender clientes hasta mover datos entre las herramientas que ya usas.",
      },
    },
    intro: {
      en: "Most businesses lose hours a day to work nobody chose to do: answering the same question, copying an order into a spreadsheet, chasing a confirmation. That work does not need a person, it needs a process.",
      es: "La mayoría de los negocios pierde horas al día en trabajo que nadie eligió hacer: contestar la misma pregunta, pasar un pedido a una hoja de cálculo, perseguir una confirmación. Ese trabajo no necesita una persona, necesita un proceso.",
    },
    seo: {
      title: {
        en: "Automation and WhatsApp Business API",
        es: "Automatización y WhatsApp Business API",
      },
      description: {
        en: "WhatsApp Business API automation and business process automation. Approved Meta Tech Provider. I connect your number and automate the repetitive work.",
        es: "Automatización de WhatsApp Business API y de procesos de negocio. Proveedor de Tecnología aprobado por Meta. Conecto tu número y automatizo el trabajo repetitivo.",
      },
    },
  },
  {
    id: "websites",
    slug: { en: "websites", es: "sitios-web" },
    selectorLabel: {
      en: "Get more clients online",
      es: "Conseguir más clientes online",
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
    selectorIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6"/><path d="M22 11h-6"/></svg>`,
    serviceIds: ["business-websites", "landing-pages", "ecommerce-development"],
    card: {
      title: {
        en: "Websites that convert",
        es: "Sitios web que convierten",
      },
      description: {
        en: "Sites built to turn visits into customers, not just to exist online.",
        es: "Sitios hechos para convertir visitas en clientes, no solo para estar online.",
      },
    },
    hero: {
      headline: {
        en: "A website is not a brochure, it is a salesperson",
        es: "Un sitio web no es un folleto, es un vendedor",
      },
      subheadline: {
        en: "Fast, clear sites that say what you do, build trust in the first few seconds and make getting in touch effortless. Whether you need a full site, one landing page or an online store.",
        es: "Sitios rápidos y claros que dicen lo que haces, generan confianza en los primeros segundos y hacen que contactarte no cueste nada. Sea un sitio completo, una landing o una tienda online.",
      },
    },
    intro: {
      en: "A site that loads slowly, reads unclear or hides the way to contact you is not a neutral asset. It costs you the customers who were already looking for you.",
      es: "Un sitio que carga lento, no se entiende o esconde cómo contactarte no es un activo neutral. Te cuesta los clientes que ya te estaban buscando.",
    },
    seo: {
      title: {
        en: "Web, Landing Page and Ecommerce Development",
        es: "Desarrollo Web, Landing Pages y Ecommerce",
      },
      description: {
        en: "Professional websites, landing pages and online stores built for speed, clarity and conversion. Full stack development, not a template.",
        es: "Sitios web profesionales, landing pages y tiendas online hechos para velocidad, claridad y conversión. Desarrollo full stack, no una plantilla.",
      },
    },
  },
  {
    id: "software",
    slug: { en: "custom-software", es: "software-a-medida" },
    selectorLabel: {
      en: "Build the tool I am missing",
      es: "Construir la herramienta que me falta",
    },
    icon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/><path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/><path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/></svg>`,
    selectorIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
    serviceIds: ["web-applications", "api-backend-development"],
    card: {
      title: { en: "Custom software", es: "Software a medida" },
      description: {
        en: "Applications and APIs for what no off the shelf tool solves.",
        es: "Aplicaciones y APIs para lo que ninguna herramienta de catálogo resuelve.",
      },
    },
    hero: {
      headline: {
        en: "When the tool you need does not exist yet",
        es: "Cuando la herramienta que necesitas todavía no existe",
      },
      subheadline: {
        en: "Web applications, APIs and backends built around how your business actually works, instead of bending your operation to fit a product somebody else designed.",
        es: "Aplicaciones web, APIs y backends construidos alrededor de cómo funciona tu negocio de verdad, en vez de doblar tu operación para que encaje en un producto que diseñó otro.",
      },
    },
    intro: {
      en: "There is a point where spreadsheets, a dozen subscriptions and manual copying stop holding the operation together. That is where software you own starts paying for itself.",
      es: "Hay un punto donde las hojas de cálculo, una docena de suscripciones y el copiado manual dejan de sostener la operación. Ahí es donde el software propio empieza a pagarse solo.",
    },
    seo: {
      title: {
        en: "Custom Software: Web Apps, APIs and Backend",
        es: "Software a Medida: Apps Web, APIs y Backend",
      },
      description: {
        en: "Custom web applications, APIs and backend development built around your operation. Full stack development with React, Node.js and TypeScript.",
        es: "Aplicaciones web a medida, APIs y desarrollo backend construidos alrededor de tu operación. Desarrollo full stack con React, Node.js y TypeScript.",
      },
    },
  },
];

/**
 * Build-time integrity check.
 *
 * Pillars now live in their own URL namespace, so slug collisions with
 * services are impossible by construction. What still has to hold is the
 * assignment: a service in no pillar vanishes from the navigation while its
 * page stays live, and one in two pillars appears twice. Both are silent.
 */
function assertPillarIntegrity(): void {
  for (const lang of ["en", "es"] as Locale[]) {
    const seen = new Set<string>();
    for (const pillar of pillars) {
      if (seen.has(pillar.slug[lang])) {
        throw new Error(
          `Duplicate ${lang} pillar slug "${pillar.slug[lang]}" in src/data/pillars.ts.`,
        );
      }
      seen.add(pillar.slug[lang]);
    }
  }

  const empty = pillars.filter((pillar) => pillar.serviceIds.length === 0);
  if (empty.length > 0) {
    throw new Error(
      `Pillar(s) with no services: ${empty.map((p) => p.id).join(", ")}. An empty pillar renders a card with no list and a page with an empty grid.`,
    );
  }

  const assigned = pillars.flatMap((pillar) => pillar.serviceIds);
  const duplicated = assigned.filter(
    (id, index) => assigned.indexOf(id) !== index,
  );
  if (duplicated.length > 0) {
    throw new Error(
      `Service(s) assigned to more than one pillar: ${[...new Set(duplicated)].join(", ")}.`,
    );
  }

  for (const id of assigned) {
    if (!getServiceById(id)) {
      throw new Error(
        `Pillar references unknown service id "${id}". Check src/data/pillars.ts.`,
      );
    }
  }

  const orphans = services
    .map((service) => service.id)
    .filter((id) => !assigned.includes(id));
  if (orphans.length > 0) {
    throw new Error(
      `Service(s) not assigned to any pillar: ${orphans.join(", ")}. Add them in src/data/pillars.ts.`,
    );
  }
}

assertPillarIntegrity();

/** Lookup by the URL segment of a given language. */
export function getPillarBySlug(
  slug: string,
  lang: Locale,
): Pillar | undefined {
  return pillars.find((pillar) => pillar.slug[lang] === slug);
}

/** Every pillar URL segment for a given language (for `getStaticPaths`). */
export function getPillarSlugs(lang: Locale): string[] {
  return pillars.map((pillar) => pillar.slug[lang]);
}

/** The services a pillar hosts, resolved and in the declared order. */
export function getPillarServices(pillar: Pillar): Service[] {
  return pillar.serviceIds
    .map((id) => getServiceById(id))
    .filter((service): service is Service => Boolean(service));
}

/** The pillar a service belongs to, for breadcrumbs and cross links. */
export function getPillarForService(serviceId: string): Pillar | undefined {
  return pillars.find((pillar) => pillar.serviceIds.includes(serviceId));
}
