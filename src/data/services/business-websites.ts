import type { Service } from "./types";

export const businessWebsites: Service = {
  slug: "business-websites",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,

  card: {
    title: { en: "Professional Websites", es: "Sitios Web Profesionales" },
    description: {
      en: "Make a strong first impression. I build fast, professional websites that clearly communicate what you do, build trust, and help turn visitors into potential clients.",
      es: "Causa una primera impresión sólida. Creo sitios web rápidos y profesionales que comunican claramente lo que haces, generan confianza y convierten visitantes en potenciales clientes.",
    },
  },

  hero: {
    headline: {
      en: "A website that turns visitors into clients",
      es: "Un sitio web que convierte visitas en clientes",
    },
    subheadline: {
      en: "Designed to clearly communicate what you do, build trust from the very first moment, and help you attract more clients, not just to “have an online presence”.",
      es: "Diseñado para comunicar claramente lo que haces, generar confianza desde el primer momento y ayudarte a conseguir más clientes, no solo para “estar online”.",
    },
  },

  problemSolution: {
    intro: {
      en: "Most business websites feel outdated, slow or unclear, and that hurts trust before a potential client even reaches out.",
      es: "La mayoría de sitios de negocios se sienten desactualizados, lentos o poco claros, y eso afecta la confianza antes de que un cliente siquiera te contacte.",
    },
    problems: [
      {
        en: "An outdated site (or no site) reduces trust with potential clients",
        es: "Un sitio desactualizado (o no tener uno) reduce la confianza de posibles clientes",
      },
      {
        en: "Your business doesn't show up when people search for your services",
        es: "Tu negocio no aparece cuando buscan tus servicios",
      },
      {
        en: "Visitors don't clearly understand what you offer or how to contact you",
        es: "Los visitantes no entienden claramente qué ofreces ni cómo contactarte",
      },
      {
        en: "Poor performance or mobile experience drives visitors away",
        es: "Un mal rendimiento o experiencia móvil hace que los visitantes se vayan",
      },
    ],
    solutions: [
      {
        en: "A clear, professional website that builds trust from the first interaction",
        es: "Un sitio claro y profesional que genera confianza desde el primer contacto",
      },
      {
        en: "Structured content and SEO foundations to improve visibility",
        es: "Contenido estructurado y bases de SEO para mejorar visibilidad",
      },
      {
        en: "Clear navigation, service pages, and frictionless contact options",
        es: "Navegación clara, páginas de servicios y formas de contacto sin fricción",
      },
      {
        en: "Fast, responsive performance across all devices",
        es: "Rendimiento rápido y responsivo en todos los dispositivos",
      },
    ],
  },

  includes: [
    {
      en: "Typically 5–7 core pages (Home, About, Services, Contact, etc.)",
      es: "Normalmente entre 5 y 7 páginas principales (Inicio, Nosotros, Servicios, Contacto, etc.)",
    },
    {
      en: "Custom design aligned with your brand",
      es: "Diseño a medida alineado con tu marca",
    },
    {
      en: "Optimized for speed and performance",
      es: "Optimizada para velocidad y rendimiento",
    },
    {
      en: "Contact form (email) + WhatsApp contact option",
      es: "Formulario de contacto (email) + opción de contacto por WhatsApp",
    },
    {
      en: "On-page SEO (titles, meta descriptions, structured content)",
      es: "SEO on-page (títulos, meta descripciones y contenido estructurado)",
    },
    {
      en: "Location integration (Google Maps) if needed",
      es: "Integración con ubicación (Google Maps) si aplica",
    },
    {
      en: "Fully responsive across mobile, tablet, and desktop",
      es: "Totalmente responsivo en móvil, tablet y escritorio",
    },
    {
      en: "Basic analytics setup to track visits",
      es: "Configuración básica de analítica para medir visitas",
    },
  ],

  includesNote: {
    en: "The exact scope is defined based on your needs. This is a typical baseline.",
    es: "El alcance exacto se define según tu proyecto. Esto es una referencia.",
  },

  process: [
    {
      title: { en: "Discovery", es: "Descubrimiento" },
      description: {
        en: "We define your pages, goals, and what makes your business stand out.",
        es: "Definimos tus páginas, objetivos y qué hace diferente a tu negocio.",
      },
    },
    {
      title: { en: "Sitemap & content", es: "Mapa del sitio y contenido" },
      description: {
        en: "I structure your pages and gather or write the content for each one.",
        es: "Estructuro tus páginas y recopilo o redacto el contenido de cada una.",
      },
    },
    {
      title: { en: "Visual direction", es: "Dirección visual" },
      description: {
        en: "I define the visual style and build key pages directly in the browser for feedback.",
        es: "Defino el estilo visual y construyo las páginas clave directamente en el navegador para feedback.",
      },
    },
    {
      title: { en: "Build", es: "Desarrollo" },
      description: {
        en: "I develop each page with clean, maintainable, and SEO-friendly code.",
        es: "Desarrollo cada página con código limpio, mantenible y optimizado para SEO.",
      },
    },
    {
      title: { en: "Testing", es: "Pruebas" },
      description: {
        en: "I test the site across devices and browsers before launch.",
        es: "Pruebo el sitio en distintos dispositivos y navegadores antes de publicarlo.",
      },
    },
    {
      title: { en: "Launch", es: "Lanzamiento" },
      description: {
        en: "Your site goes live, and I guide you on how to request future updates.",
        es: "El sitio se publica y te explico cómo solicitar cambios en el futuro.",
      },
    },
  ],

  processNote: {
    en: "Already have a design? We can build on top of it. If not, we’ll define it during the process.",
    es: "¿Ya tienes un diseño? Trabajamos sobre este. Si no, lo definimos durante el proceso.",
  },

  techStack: ["Astro", "React", "Next.js", "Tailwind CSS"],

  faq: [
    {
      question: {
        en: "How long does a professional website take?",
        es: "¿Cuánto tiempo toma un sitio web profesional?",
      },
      answer: {
        en: "Typically 2-4 weeks depending on the number of pages and how quickly content is provided.",
        es: "Normalmente 2-4 semanas, dependiendo del número de páginas y la rapidez con la que se entregue el contenido.",
      },
    },
    {
      question: { en: "What does it cost?", es: "¿Cuánto cuesta?" },
      answer: {
        en: "It depends on the number of pages and features needed. Tell me about your business in the form below for a tailored quote.",
        es: "Depende del número de páginas y funcionalidades necesarias. Cuéntame sobre tu negocio en el formulario para una cotización a medida.",
      },
    },
    {
      question: {
        en: "Can I update the content myself later?",
        es: "¿Puedo actualizar el contenido yo mismo después?",
      },
      answer: {
        en: "Yes, for sites with frequently changing content, I can set up a simple CMS so you can edit text and images without touching code.",
        es: "Sí, para sitios con contenido que cambia con frecuencia, puedo configurar un CMS sencillo para que edites texto e imágenes sin tocar código.",
      },
    },
    {
      question: {
        en: "Do you offer support after launch?",
        es: "¿Ofreces soporte después del lanzamiento?",
      },
      answer: {
        en: "Yes, I offer post-launch support and maintenance plans for bug fixes, updates, and small changes.",
        es: "Sí, ofrezco planes de soporte y mantenimiento después del lanzamiento para corrección de errores, actualizaciones y cambios pequeños.",
      },
    },
    {
      question: {
        en: "Will it work well on Google search?",
        es: "¿Va a funcionar bien en las búsquedas de Google?",
      },
      answer: {
        en: "Every site is built with on-page SEO fundamentals (fast load times, proper structure, meta tags), a solid technical foundation for ranking.",
        es: "Cada sitio se construye con fundamentos de SEO on-page (carga rápida, estructura correcta, meta tags), una base técnica sólida para posicionar.",
      },
    },
  ],

  budgetOptions: [
    {
      value: "under-500",
      label: { en: "Less than $500", es: "Menos de $500" },
    },
    {
      value: "500-1200",
      label: { en: "$500 – $1,200", es: "$500 – $1.200" },
    },
    {
      value: "1200-2500",
      label: { en: "$1,200 – $2,500", es: "$1.200 – $2.500" },
    },
    {
      value: "2500-plus",
      label: { en: "More than $2,500", es: "Más de $2.500" },
    },
  ],

  timelineOptions: [
    {
      value: "2-4-weeks",
      label: { en: "2–4 weeks", es: "2–4 semanas" },
    },
    {
      value: "1-2-months",
      label: { en: "1–2 months", es: "1–2 meses" },
    },
  ],

  messagePlaceholder: {
    en: "Tell me about your business, how many pages you need (e.g. 5–7), whether you already have content and any other relevant details.",
    es: "A qué se dedica tu negocio, cuántas páginas necesitas (p. ej. 5–7), si ya tienes contenido y cualquier otro detalle relevante.",
  },

  seo: {
    title: {
      en: "Professional Website Development | CHRod - Web Developer",
      es: "Sitios Web Profesionales | CHRod - Desarrollador Web",
    },
    description: {
      en: "Professional, fast-loading websites that build trust and give your company a solid online presence. Get a custom quote.",
      es: "Sitios web profesionales y rápidos que generan confianza y presencia online sólida. Solicita una cotización.",
    },
  },
};
