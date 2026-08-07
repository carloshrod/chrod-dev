import type { Service } from "./types";

export const landingPages: Service = {
  id: "landing-pages",
  slug: { en: "landing-pages", es: "landing-pages" },
  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,

  card: {
    title: { en: "Landing Pages", es: "Landing Pages" },
    description: {
      en: "Designed to convert from the first click. I build fast, focused landing pages that clearly communicate your value and turn visitors into real leads or customers.",
      es: "Diseñadas para convertir desde el primer clic. Creo landing pages rápidas y enfocadas que comunican tu valor con claridad y convierten visitas en leads o clientes reales.",
    },
  },

  hero: {
    headline: {
      en: "A landing page built to convert your traffic into leads",
      es: "Una landing page diseñada para convertir tu tráfico en leads",
    },
    subheadline: {
      en: "For campaigns, launches, or single offers, focused on one goal: turning clicks into real opportunities.",
      es: "Para campañas, lanzamientos u ofertas específicas, enfocada en un solo objetivo: convertir clics en oportunidades reales.",
    },
  },

  problemSolution: {
    intro: {
      en: "Driving traffic to a generic or slow page quietly kills your conversion rate, and wastes your ad budget.",
      es: "Enviar tráfico a una página genérica o lenta reduce tu conversión, y desperdicia tu presupuesto en anuncios.",
    },
    problems: [
      {
        en: "Visitors leave before understanding the offer",
        es: "Los visitantes se van antes de entender la oferta",
      },
      {
        en: "Slow load times hurt campaign performance and ROI",
        es: "Los tiempos de carga lentos afectan el rendimiento y el retorno de tus campañas",
      },
      {
        en: "No clear conversion path, so potential leads drop off",
        es: "No hay un camino claro de conversión, por lo que los leads potenciales se pierden",
      },
      {
        en: "Generic templates that don't differentiate your offer",
        es: "Plantillas genéricas que no diferencian tu oferta",
      },
    ],
    solutions: [
      {
        en: "A focused page built around a single offer and conversion goal",
        es: "Una página enfocada en una sola oferta y un objetivo de conversión",
      },
      {
        en: "Performance-first build optimized for fast loading across devices",
        es: "Construida con enfoque en rendimiento para cargar rápido en cualquier dispositivo",
      },
      {
        en: "Clear structure and calls to action that guide users",
        es: "Estructura clara y llamados a la acción que guían al usuario",
      },
      {
        en: "A tailored interface that aligns with your brand and campaign",
        es: "Una interfaz alineada con tu marca y tu campaña, no una plantilla genérica",
      },
    ],
  },

  includes: [
    {
      en: "Custom design aligned with your brand and offer",
      es: "Diseño a medida alineado con tu marca y tu oferta",
    },
    {
      en: "Conversion-focused structure (headline, benefits, proof, CTA)",
      es: "Estructura enfocada en conversión (titular, beneficios, prueba social, CTA)",
    },
    {
      en: "Optimized for speed and performance",
      es: "Optimizada para velocidad y rendimiento",
    },
    {
      en: "Mobile-first, fully responsive layout",
      es: "Diseño mobile-first, totalmente responsivo",
    },
    {
      en: "Lead capture via contact form (email) + WhatsApp option",
      es: "Captación de leads mediante formulario (email) + opción de contacto por WhatsApp",
    },
    {
      en: "Basic on-page SEO and social sharing previews",
      es: "SEO on-page básico y previsualizaciones para compartir en redes sociales",
    },
    {
      en: "Analytics and tracking setup (Google Analytics, Meta Pixel) if needed",
      es: "Configuración de analítica y tracking (Google Analytics, Meta Pixel) si aplica",
    },
    {
      en: "Ready for fast deployment on your hosting",
      es: "Lista para desplegar en tu hosting de forma rápida",
    },
  ],

  process: [
    {
      title: { en: "Discovery", es: "Descubrimiento" },
      description: {
        en: "We clarify your offer, audience, and the key action you want visitors to take.",
        es: "Definimos tu oferta, tu público y la acción clave que quieres que realicen los visitantes.",
      },
    },
    {
      title: { en: "Structure & copy", es: "Estructura y copy" },
      description: {
        en: "I map the page structure and write conversion-focused copy for your approval.",
        es: "Organizo la estructura de la página y redacto un copy enfocado en conversión para tu validación.",
      },
    },
    {
      title: { en: "Visual direction", es: "Dirección visual" },
      description: {
        en: "I shape the look and feel of your page and build a first version directly in the browser.",
        es: "Doy forma al estilo visual y creo una primera versión directamente en el navegador.",
      },
    },
    {
      title: { en: "Build", es: "Desarrollo" },
      description: {
        en: "I develop the page with clean code, optimized for speed and all devices.",
        es: "Desarrollo la página con código limpio, optimizada para velocidad y todos los dispositivos.",
      },
    },
    {
      title: { en: "Launch", es: "Lanzamiento" },
      description: {
        en: "Final refinements, testing, and publishing your page live.",
        es: "Realizo ajustes finales, pruebas y la publicación de la página.",
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
      question: { en: "How long does it take?", es: "¿Cuánto tiempo toma?" },
      answer: {
        en: "Most landing pages are ready in 5-8 business days, depending on how quickly content and feedback come back.",
        es: "La mayoría de landing pages están listas en 5-8 días hábiles, dependiendo de la rapidez con la que llegue el contenido y la retroalimentación.",
      },
    },
    {
      question: { en: "What does it cost?", es: "¿Cuánto cuesta?" },
      answer: {
        en: "Pricing depends on scope (sections, copy, integrations). Fill out the form below and I'll send a tailored quote, no generic price lists.",
        es: "El precio depende del alcance (secciones, copy, integraciones). Completa el formulario y te envío una cotización a medida, sin listas de precios genéricas.",
      },
    },
    {
      question: {
        en: "Do you write the copy too?",
        es: "¿Tú también escribes el copy?",
      },
      answer: {
        en: "Yes, I can draft conversion-focused copy based on your input, or work with copy you already have.",
        es: "Sí, puedo redactar un copy enfocado en conversión a partir de tu información, o trabajar con el copy que ya tengas.",
      },
    },
    {
      question: { en: "Is hosting included?", es: "¿Incluye el hosting?" },
      answer: {
        en: "I deploy the page ready for fast hosting providers (like Netlify or Vercel). Hosting itself is typically free on these plans for a single landing page.",
        es: "Dejo la página lista para desplegarse en proveedores rápidos (como Netlify o Vercel). El hosting suele ser gratuito en estos planes para una sola landing page.",
      },
    },
    {
      question: {
        en: "Can you also run my ad campaigns?",
        es: "¿También puedes manejar mis campañas de anuncios?",
      },
      answer: {
        en: "My focus is building the page itself; I can advise on tracking setup (pixels, conversions) so your ad platform reports accurately.",
        es: "Mi enfoque es construir la página; sí puedo asesorarte en la configuración de seguimiento (píxeles, conversiones) para que tu plataforma de anuncios reporte correctamente.",
      },
    },
  ],

  budgetOptions: [
    {
      value: "under-300",
      label: { en: "Less than $300", es: "Menos de $300" },
    },
    {
      value: "300-800",
      label: { en: "$300 – $800", es: "$300 – $800" },
    },
    {
      value: "800-1500",
      label: { en: "$800 – $1,500", es: "$800 – $1.500" },
    },
    {
      value: "1500-plus",
      label: { en: "More than $1,500", es: "Más de $1.500" },
    },
  ],

  timelineOptions: [
    {
      value: "1-2-weeks",
      label: { en: "1–2 weeks", es: "1–2 semanas" },
    },
    {
      value: "2-4-weeks",
      label: { en: "2–4 weeks", es: "2–4 semanas" },
    },
  ],

  messagePlaceholder: {
    en: "The main goal of the page (capture leads, sell a product, event signup...), any reference pages you like and any other relevant details.",
    es: "El objetivo principal de la página (captar leads, vender un producto, registro a un evento...), alguna página de referencia que te guste y cualquier otro detalle relevante.",
  },

  seo: {
    title: {
      en: "Landing Page Development | CHRod - Web Developer",
      es: "Desarrollo de Landing Pages | CHRod - Desarrollador Web",
    },
    description: {
      en: "High-converting landing pages built fast, mobile-first, and tailored to your offer. Get a custom quote for your next campaign.",
      es: "Landing pages de alta conversión, rápidas, mobile-first y a la medida de tu oferta. Solicita una cotización para tu próxima campaña.",
    },
  },
};
