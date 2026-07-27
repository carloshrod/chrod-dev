import type { Service } from "./types";

export const ecommerceDevelopment: Service = {
  slug: "ecommerce-development",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>`,

  card: {
    title: { en: "E-commerce Development", es: "Desarrollo E-commerce" },
    description: {
      en: "Online stores built to sell. I create fast, intuitive shopping experiences that make it easy for users to buy and help you increase conversions and revenue.",
      es: "Tiendas online diseñadas para vender. Creo experiencias de compra rápidas e intuitivas que facilitan la compra y te ayudan a aumentar conversiones e ingresos.",
    },
  },

  hero: {
    headline: {
      en: "An online store built to drive sales, not just look good",
      es: "Una tienda online diseñada para generar ventas, no solo verse bien",
    },
    subheadline: {
      en: "A fast, mobile-first store with a frictionless checkout and the right platform for your products, operations, and growth.",
      es: "Una tienda rápida, enfocada en móvil, con un checkout sin fricción y la plataforma adecuada para tus productos, operación y crecimiento.",
    },
  },

  problemSolution: {
    intro: {
      en: "A slow store, a confusing checkout, or the wrong platform quietly reduces your sales every day.",
      es: "Una tienda lenta, un checkout confuso o una mala elección de plataforma reduce tus ventas todos los días.",
    },
    problems: [
      {
        en: "Cart abandonment due to friction in the checkout process",
        es: "Carritos abandonados por fricción en el proceso de compra",
      },
      {
        en: "A generic or untrustworthy store that hurts conversion",
        es: "Una tienda genérica o poco confiable que afecta la conversión",
      },
      {
        en: "Disconnected systems for payments, shipping, and inventory",
        es: "Sistemas desconectados para pagos, envíos e inventario",
      },
      {
        en: "Using a platform that limits your growth or flexibility",
        es: "Usar una plataforma que limita tu crecimiento o flexibilidad",
      },
    ],
    solutions: [
      {
        en: "A streamlined checkout designed to reduce drop-offs",
        es: "Un checkout optimizado para reducir abandonos",
      },
      {
        en: "A tailored storefront that builds trust and supports conversion",
        es: "Una tienda diseñada a medida que genera confianza y mejora la conversión",
      },
      {
        en: "Integrated systems for payments, shipping, and inventory",
        es: "Sistemas integrados para pagos, envíos e inventario",
      },
      {
        en: "The right platform choice based on your products and growth stage",
        es: "La elección de plataforma adecuada según tus productos y etapa de crecimiento",
      },
    ],
  },

  includes: [
    {
      en: "Custom storefront aligned with your brand (Shopify or fully custom)",
      es: "Tienda a medida alineada con tu marca (Shopify o desarrollo completamente personalizado)",
    },
    {
      en: "Product catalog setup (categories, variants, search, and filters when needed)",
      es: "Configuración del catálogo (categorías, variantes, buscador y filtros cuando sean necesarios)",
    },
    {
      en: "Payment integration with local and international methods",
      es: "Integración de pagos con métodos locales e internacionales",
    },
    {
      en: "Shipping rules and rates configured for your business",
      es: "Configuración de envíos y tarifas adaptadas a tu negocio",
    },
    {
      en: "Streamlined checkout to reduce cart abandonment",
      es: "Checkout optimizado para reducir el abandono de carrito",
    },
    {
      en: "Order and inventory management setup",
      es: "Configuración de gestión de pedidos e inventario",
    },
    {
      en: "Fast-loading, mobile-optimized experience",
      es: "Experiencia rápida y optimizada para móvil",
    },
    {
      en: "Basic analytics and tracking setup (sales, conversions)",
      es: "Configuración básica de analítica y seguimiento (ventas y conversiones)",
    },
  ],

  includesNote: {
    en: "The exact scope is defined based on your needs — this is a typical baseline.",
    es: "El alcance exacto se define según tu proyecto — esto es una referencia.",
  },

  process: [
    {
      title: { en: "Discovery", es: "Descubrimiento" },
      description: {
        en: "We review your catalog, business model, and growth goals to define whether a custom build or Shopify is the best fit.",
        es: "Revisamos tu catálogo, modelo de negocio y objetivos para definir si conviene una tienda a medida o Shopify.",
      },
    },
    {
      title: { en: "Architecture & strategy", es: "Arquitectura y estrategia" },
      description: {
        en: "I plan the store structure, data model, and overall architecture for performance and scalability.",
        es: "Planifico la estructura, el modelo de datos y la arquitectura para asegurar rendimiento y escalabilidad.",
      },
    },
    {
      title: { en: "Visual direction", es: "Dirección visual" },
      description: {
        en: "We define the visual system and guidelines to ensure a consistent, conversion-focused experience aligned with your brand.",
        es: "Definimos el sistema visual y lineamientos para lograr una experiencia consistente, alineada a tu marca y enfocada en conversión.",
      },
    },
    {
      title: {
        en: "Development & integrations",
        es: "Desarrollo e integraciones",
      },
      description: {
        en: "Custom development (Next.js + backend or CMS) or Shopify setup, including payments, shipping, and third-party tools.",
        es: "Desarrollo a medida (Next.js + backend o CMS) o configuración en Shopify, con pagos, gestión de pedidos e integraciones.",
      },
    },
    {
      title: {
        en: "Testing & optimization",
        es: "Pruebas y optimización",
      },
      description: {
        en: "End-to-end testing of the purchase flow across devices, optimizing performance and UX.",
        es: "Pruebas completas del flujo de compra en distintos dispositivos, optimizando rendimiento y experiencia.",
      },
    },
    {
      title: { en: "Launch", es: "Lanzamiento" },
      description: {
        en: "Store goes live with guidance on managing products, orders, and future growth.",
        es: "Publicación de la tienda con guía para gestionar productos, pedidos y escalar el negocio.",
      },
    },
  ],

  processNote: {
    en: "Already have a design? We can build on top of it. If not, we’ll define it during the process.",
    es: "¿Ya tienes un diseño? Trabajamos sobre este. Si no, lo definimos durante el proceso.",
  },

  techStack: [
    "Next.js",
    "React",
    "Node.js",
    "PostgreSQL",
    "Supabase",
    "Shopify",
    "Tailwind CSS",
  ],

  faq: [
    {
      question: {
        en: "Shopify or a custom store — which do I need?",
        es: "¿Shopify o tienda a medida — cuál necesito?",
      },
      answer: {
        en: "Shopify is great for most catalogs and gets you selling faster with less maintenance. A custom build makes sense when you need very specific logic Shopify can't handle. I'll recommend the right fit after understanding your catalog and goals.",
        es: "Shopify es ideal para la mayoría de catálogos y te permite vender más rápido con menos mantenimiento. Una tienda a medida tiene sentido cuando necesitas lógica muy específica que Shopify no puede manejar. Te recomiendo la opción correcta después de conocer tu catálogo y objetivos.",
      },
    },
    {
      question: {
        en: "How long does it take to launch?",
        es: "¿Cuánto tiempo toma lanzar la tienda?",
      },
      answer: {
        en: "A Shopify store typically takes 2-4 weeks; a fully custom build takes longer depending on complexity.",
        es: "Una tienda en Shopify toma normalmente 2-4 semanas; una tienda a medida toma más tiempo según la complejidad.",
      },
    },
    {
      question: { en: "What does it cost?", es: "¿Cuánto cuesta?" },
      answer: {
        en: "Pricing depends on catalog size, platform, and integrations needed. Fill out the form and I'll follow up with a tailored quote.",
        es: "El precio depende del tamaño del catálogo, la plataforma y las integraciones necesarias. Completa el formulario y te contacto con una cotización a medida.",
      },
    },
    {
      question: {
        en: "Can you migrate my existing store?",
        es: "¿Puedes migrar mi tienda actual?",
      },
      answer: {
        en: "Yes, I can migrate products, customers, and order history from most existing platforms.",
        es: "Sí, puedo migrar productos, clientes e historial de pedidos desde la mayoría de plataformas existentes.",
      },
    },
    {
      question: {
        en: "Do you offer support after launch?",
        es: "¿Ofreces soporte después del lanzamiento?",
      },
      answer: {
        en: "Yes, I offer maintenance plans to keep your store running smoothly and help with future changes.",
        es: "Sí, ofrezco planes de mantenimiento para que tu tienda funcione sin problemas y te ayudo con cambios futuros.",
      },
    },
  ],

  budgetOptions: [
    {
      value: "under-800",
      label: { en: "Less than $800", es: "Menos de $800" },
    },
    {
      value: "800-1500",
      label: { en: "$800 – $1,500", es: "$800 – $1.500" },
    },
    {
      value: "1500-3000",
      label: { en: "$1,500 – $3,000", es: "$1.500 – $3.000" },
    },
    {
      value: "3000-plus",
      label: { en: "More than $3,000", es: "Más de $3.000" },
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
    {
      value: "2-3-months",
      label: { en: "2–3 months", es: "2–3 meses" },
    },
  ],

  messagePlaceholder: {
    en: "Roughly how many products your store will have, what payment methods you need, whether you sell physical products, digital products, or both... plus any other relevant details.",
    es: "Cuántos productos tendrá tu tienda aproximadamente, qué métodos de pago necesitas aceptar, si vendes productos físicos, digitales o ambos... y cualquier otro detalle relevante.",
  },

  seo: {
    title: {
      en: "E-commerce Store Development | CHRod - Web Developer",
      es: "Desarrollo de Tiendas Online | CHRod - Desarrollador Web",
    },
    description: {
      en: "Shopify and custom e-commerce stores built to convert — optimized checkout, payments, and shipping. Get a custom quote for your online store.",
      es: "Tiendas online en Shopify o a medida, construidas para vender — checkout, pagos y envíos optimizados. Solicita una cotización para tu tienda.",
    },
  },
};
