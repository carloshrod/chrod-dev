import type { Service } from "./types";

export const webApplications: Service = {
  slug: "web-applications",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,

  card: {
    title: { en: "Web Applications", es: "Aplicaciones Web" },
    description: {
      en: "Turn your idea into a real product. I build custom web applications that streamline processes, solve specific business problems, and grow with your needs.",
      es: "Convierte tu idea en un producto real. Desarrollo aplicaciones web a medida que optimizan procesos, resuelven problemas concretos y crecen junto a tu negocio.",
    },
  },

  hero: {
    headline: {
      en: "A custom web app built around how your business actually runs",
      es: "Una aplicación web construida alrededor de cómo realmente funciona tu negocio",
    },
    subheadline: {
      en: "For internal tools, dashboards, or client platforms that off-the-shelf software can't support. Designed to handle your workflows, data, and growth.",
      es: "Para herramientas internas, dashboards o plataformas que el software genérico no puede soportar. Diseñada para manejar tus flujos, datos y crecimiento.",
    },
  },

  problemSolution: {
    intro: {
      en: "Spreadsheets, disconnected tools, and generic software work at first, but they break as your operations grow.",
      es: "Las hojas de cálculo, herramientas desconectadas y software genérico funcionan al inicio, pero se rompen cuando tu operación crece.",
    },
    problems: [
      {
        en: "Your team relies on spreadsheets and multiple disconnected tools",
        es: "Tu equipo depende de hojas de cálculo y múltiples herramientas desconectadas",
      },
      {
        en: "Off-the-shelf software forces you into workflows that don't fit",
        es: "El software genérico te obliga a usar flujos que no se adaptan a tu negocio",
      },
      {
        en: "Manual processes slow down operations and increase errors",
        es: "Procesos manuales ralentizan la operación y generan errores",
      },
      {
        en: "No single source of truth for your data",
        es: "No existe una fuente única de verdad para tus datos",
      },
    ],
    solutions: [
      {
        en: "A system built around your workflows, not generic assumptions",
        es: "Un sistema construido alrededor de tus flujos, no de supuestos genéricos",
      },
      {
        en: "Centralized data, users, and permissions in one place",
        es: "Datos, usuarios y permisos centralizados en un solo lugar",
      },
      {
        en: "Automation of repetitive tasks to improve speed and reliability",
        es: "Automatización de tareas repetitivas para mejorar velocidad y confiabilidad",
      },
      {
        en: "A scalable architecture that supports your growth over time",
        es: "Una arquitectura escalable que soporta tu crecimiento con el tiempo",
      },
    ],
  },

  includes: [
    {
      en: "Requirements analysis and technical planning",
      es: "Análisis de requerimientos y planificación técnica",
    },
    {
      en: "User authentication and role-based access",
      es: "Autenticación de usuarios y permisos por roles",
    },
    {
      en: "Custom interfaces and data visualization",
      es: "Interfaces personalizadas y visualización de datos",
    },
    {
      en: "Database structure designed around your application's needs",
      es: "Estructura de base de datos diseñada alrededor de las necesidades de tu aplicación",
    },
    {
      en: "Backend services and APIs to support your product",
      es: "Servicios backend y APIs para soportar tu producto",
    },
    {
      en: "Responsive experience across desktop, tablet, and mobile",
      es: "Experiencia responsiva en escritorio, tablet y móvil",
    },
    {
      en: "Testing, deployment setup, and technical documentation",
      es: "Pruebas, configuración de despliegue y documentación técnica",
    },
  ],

  includesNote: {
    en: "The exact scope is defined based on your needs. This is a typical baseline.",
    es: "El alcance exacto se define según tu proyecto. Esto es una referencia.",
  },

  process: [
    {
      title: { en: "Discovery & scoping", es: "Descubrimiento y alcance" },
      description: {
        en: "We map your workflow, users, and the core problem the product needs to solve.",
        es: "Mapeamos tu flujo de trabajo, usuarios y el problema central que el producto debe resolver.",
      },
    },
    {
      title: {
        en: "Architecture & data model",
        es: "Arquitectura y modelo de datos",
      },
      description: {
        en: "I define the system architecture, data model, and key product flows.",
        es: "Defino la arquitectura del sistema, el modelo de datos y los flujos principales del producto.",
      },
    },
    {
      title: {
        en: "Product & visual direction",
        es: "Dirección de producto y visual",
      },
      description: {
        en: "We shape the user experience and interface system to ensure clarity, usability, and scalability.",
        es: "Definimos la experiencia de usuario y el sistema de interfaz para asegurar claridad, usabilidad y escalabilidad.",
      },
    },
    {
      title: { en: "Iterative development", es: "Desarrollo iterativo" },
      description: {
        en: "Built in stages with regular check-ins, allowing for early feedback and continuous refinement.",
        es: "Se construye por etapas con revisiones constantes, permitiendo feedback temprano y mejoras continuas.",
      },
    },
    {
      title: { en: "Testing & QA", es: "Pruebas y QA" },
      description: {
        en: "Core flows are tested to ensure reliability before reaching real users.",
        es: "Se prueban los flujos clave para asegurar estabilidad antes de llegar a usuarios reales.",
      },
    },
    {
      title: { en: "Launch & handoff", es: "Lanzamiento y entrega" },
      description: {
        en: "Deployment and handoff, including guidance on how to manage the product.",
        es: "Despliegue y entrega, incluyendo guía para gestionar el producto.",
      },
    },
  ],

  processNote: {
    en: "Whether you have a clear idea or not, we define the scope with you as part of the process.",
    es: "Tengas una idea clara o no, definimos el alcance contigo como parte del proceso.",
  },

  techStack: [
    "Next.js",
    "React",
    "TypeScript",
    "Node.js",
    "Express.js",
    "PostgreSQL",
    "Supabase",
    "Docker",
    "Tailwind CSS",
  ],

  faq: [
    {
      question: {
        en: "How long does a web app take to build?",
        es: "¿Cuánto tiempo toma construir una app web?",
      },
      answer: {
        en: "It varies widely by scope, a focused internal tool might take 4-6 weeks; a full customer-facing platform can take longer. We'll define a realistic timeline together after discovery.",
        es: "Varía mucho según el alcance, una herramienta interna puede tomar 4-6 semanas; una plataforma completa para clientes puede tomar más. Definimos un cronograma realista juntos tras la fase de descubrimiento.",
      },
    },
    {
      question: { en: "What does it cost?", es: "¿Cuánto cuesta?" },
      answer: {
        en: "Web apps are priced by scope and complexity, there's no fixed price. Share your project details below and I'll follow up with next steps to scope it properly.",
        es: "El precio de las aplicaciones web depende del alcance y la complejidad, no hay un precio fijo. Cuéntame los detalles de tu proyecto y te contacto para definir el alcance correctamente.",
      },
    },
    {
      question: {
        en: "Do you work with an existing team or codebase?",
        es: "¿Trabajas con un equipo o código ya existente?",
      },
      answer: {
        en: "Yes, I can join an existing project, work alongside your team, or build something entirely from scratch.",
        es: "Sí, puedo unirme a un proyecto existente, trabajar junto a tu equipo o construir algo completamente desde cero.",
      },
    },
    {
      question: {
        en: "What about ongoing maintenance?",
        es: "¿Qué hay del mantenimiento continuo?",
      },
      answer: {
        en: "I offer post-launch support plans for bug fixes, new features, and scaling as your usage grows.",
        es: "Ofrezco planes de soporte después del lanzamiento para corrección de errores, nuevas funcionalidades y escalar a medida que crece tu uso.",
      },
    },
    {
      question: {
        en: "Can the app integrate with tools we already use?",
        es: "¿La app puede integrarse con herramientas que ya usamos?",
      },
      answer: {
        en: "In most cases yes, via APIs, webhooks, or direct database integrations, depending on the tool.",
        es: "En la mayoría de los casos sí, a través de APIs, webhooks o integraciones directas con la base de datos, según la herramienta.",
      },
    },
  ],

  budgetOptions: [
    {
      value: "under-1200",
      label: { en: "Less than $1,200", es: "Menos de $1.200" },
    },
    {
      value: "1200-3000",
      label: { en: "$1,200 – $3,000", es: "$1.200 – $3.000" },
    },
    {
      value: "3000-5000",
      label: { en: "$3,000 – $5,000", es: "$3.000 – $5.000" },
    },
    {
      value: "5000-plus",
      label: { en: "More than $5,000", es: "Más de $5.000" },
    },
  ],

  timelineOptions: [
    {
      value: "1-2-months",
      label: { en: "1–2 months", es: "1–2 meses" },
    },
    {
      value: "2-3-months",
      label: { en: "2–3 months", es: "2–3 meses" },
    },
    {
      value: "3-plus-months",
      label: { en: "3+ months", es: "Más de 3 meses" },
    },
  ],

  messagePlaceholder: {
    en: "What kind of app you need (internal tool, customer-facing platform, SaaS...), roughly how many users it will have, whether you're replacing an existing system or process... plus any other relevant details.",
    es: "Qué tipo de app necesitas (herramienta interna, plataforma para clientes, SaaS...), aproximadamente cuántos usuarios tendrá, si vas a reemplazar un sistema o proceso existente... y cualquier otro detalle relevante.",
  },

  seo: {
    title: {
      en: "Custom Web Application Development | CHRod - Web Developer",
      es: "Desarrollo de Aplicaciones Web a Medida | CHRod - Desarrollador Web",
    },
    description: {
      en: "Scalable, custom web applications built around your workflow. Dashboards, internal tools, and customer-facing platforms. Get a custom quote.",
      es: "Aplicaciones web escalables y a medida, construidas alrededor de tu flujo de trabajo. Dashboards, herramientas internas y plataformas para clientes. Solicita una cotización.",
    },
  },
};
