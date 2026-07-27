import type { Service } from "./types";

export const apiBackendDevelopment: Service = {
  slug: "api-backend-development",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,

  card: {
    title: { en: "API & Backend Development", es: "APIs y Desarrollo Backend" },
    description: {
      en: "The foundation that powers your product. I build reliable backend systems that connect your apps, handle your data securely, and ensure everything runs smoothly behind the scenes.",
      es: "La base que impulsa tu producto. Desarrollo sistemas backend fiables que conectan tus aplicaciones, gestionan tus datos de forma segura y aseguran que todo funcione correctamente.",
    },
  },

  hero: {
    headline: {
      en: "A backend built to support your product as it grows",
      es: "Un backend preparado para soportar tu producto a medida que crece",
    },
    subheadline: {
      en: "Robust APIs, secure authentication, and a clean server-side architecture designed to keep your product stable, scalable, and ready to evolve.",
      es: "APIs robustas, autenticación segura y una arquitectura de servidor limpia diseñada para mantener tu producto estable, escalable y listo para crecer.",
    },
  },

  problemSolution: {
    intro: {
      en: "A backend thrown together works fine — until traffic grows, a new feature needs to connect to it, or something breaks in production at 2am.",
      es: "Un backend improvisado funciona bien — hasta que crece el tráfico, una nueva funcionalidad necesita conectarse, o algo falla en producción a las 2am.",
    },
    problems: [
      {
        en: "No clear or consistent API for clients or integrations",
        es: "No hay una API clara o consistente para clientes o integraciones",
      },
      {
        en: "Authentication and permissions are fragile or inconsistent",
        es: "La autenticación y los permisos son frágiles o inconsistentes",
      },
      {
        en: "Third-party services are integrated without clear structure",
        es: "Los servicios de terceros están integrados sin una estructura clara",
      },
      {
        en: "Adding new features becomes slower over time",
        es: "Agregar nuevas funcionalidades se vuelve cada vez más lento",
      },
    ],
    solutions: [
      {
        en: "A well-structured, documented API designed for real usage",
        es: "Una API bien estructurada y documentada, diseñada para uso real",
      },
      {
        en: "Secure authentication with clear, maintainable access control",
        es: "Autenticación segura con control de acceso claro y mantenible",
      },
      {
        en: "Clean, reliable integrations with external services",
        es: "Integraciones limpias y confiables con servicios externos",
      },
      {
        en: "A backend architecture that supports growth without slowing you down",
        es: "Una arquitectura de backend que soporta el crecimiento sin ralentizarte",
      },
    ],
  },

  includes: [
    {
      en: "API design and implementation for your product needs",
      es: "Diseño e implementación de APIs según las necesidades de tu producto",
    },
    {
      en: "Secure authentication and role-based access control",
      es: "Autenticación segura y control de acceso por roles",
    },
    {
      en: "Database design and query optimization",
      es: "Diseño de base de datos y optimización de consultas",
    },
    {
      en: "Third-party integrations (payments, email, storage, and more)",
      es: "Integraciones con terceros (pagos, email, almacenamiento y más)",
    },
    {
      en: "Error handling, logging, and basic monitoring setup",
      es: "Manejo de errores, registros y configuración básica de monitoreo",
    },
    {
      en: "API documentation for your team or external partners",
      es: "Documentación de la API para tu equipo o socios externos",
    },
    {
      en: "Deployment and environment configuration",
      es: "Despliegue y configuración de entornos",
    },
  ],

  includesNote: {
    en: "The exact scope is defined based on your needs — this is a typical baseline.",
    es: "El alcance exacto se define según tu proyecto — esto es una referencia.",
  },

  process: [
    {
      title: { en: "Requirements & scope", es: "Requerimientos y alcance" },
      description: {
        en: "We define together the endpoints, data structures, and integrations your product needs.",
        es: "Definimos juntos los endpoints, estructuras de datos e integraciones que tu producto necesita.",
      },
    },
    {
      title: { en: "API & data design", es: "Diseño de API y datos" },
      description: {
        en: "I define the API contract and database schema before implementation.",
        es: "Defino el contrato de la API y el esquema de base de datos antes de implementar.",
      },
    },
    {
      title: { en: "Development", es: "Desarrollo" },
      description: {
        en: "I build endpoints, authentication, and integrations with testing throughout the process.",
        es: "Construyo endpoints, autenticación e integraciones con pruebas a lo largo del proceso.",
      },
    },
    {
      title: { en: "Documentation", es: "Documentación" },
      description: {
        en: "Clear documentation so your team or partners can use the API reliably.",
        es: "Documentación clara para que tu equipo o socios puedan usar la API de forma confiable.",
      },
    },
    {
      title: { en: "Testing & security", es: "Pruebas y seguridad" },
      description: {
        en: "We validate performance, edge cases, and secure access to the system.",
        es: "Validamos rendimiento, casos límite y el acceso seguro al sistema.",
      },
    },
    {
      title: { en: "Deployment & handoff", es: "Despliegue y entrega" },
      description: {
        en: "Production deployment with monitoring setup and handoff to your team.",
        es: "Despliegue a producción con monitoreo y entrega a tu equipo.",
      },
    },
  ],

  processNote: {
    en: "The API is defined based on the product scope. Additional features are estimated separately.",
    es: "La API se define según el alcance del producto. Funcionalidades adicionales se estiman aparte.",
  },

  techStack: [
    "Node.js",
    "Express.js",
    "TypeScript",
    "PostgreSQL",
    "Supabase",
    "Docker",
  ],

  faq: [
    {
      question: {
        en: "Can you work with our existing frontend/mobile team?",
        es: "¿Puedes trabajar con nuestro equipo de frontend/móvil existente?",
      },
      answer: {
        en: "Yes — I build APIs designed to be consumed by whatever frontend or mobile team you already have, with clear documentation.",
        es: "Sí, construyo APIs pensadas para que las use el equipo de frontend o móvil que ya tienes, con documentación clara.",
      },
    },
    {
      question: { en: "How long does it take?", es: "¿Cuánto tiempo toma?" },
      answer: {
        en: "It depends on the number of endpoints, integrations, and complexity of your data model — we'll define a timeline together after scoping.",
        es: "Depende del número de endpoints, integraciones y la complejidad de tu modelo de datos — definimos un cronograma juntos después de definir el alcance.",
      },
    },
    {
      question: { en: "What does it cost?", es: "¿Cuánto cuesta?" },
      answer: {
        en: "Backend projects are scoped individually based on complexity. Share your project details and I'll follow up to define pricing.",
        es: "Los proyectos de backend se cotizan individualmente según la complejidad. Comparte los detalles de tu proyecto y te contacto para definir el precio.",
      },
    },
    {
      question: {
        en: "Do you handle hosting and DevOps too?",
        es: "¿También te encargas del hosting y DevOps?",
      },
      answer: {
        en: "Yes, I can set up deployment, environments, and basic monitoring, or work alongside your existing DevOps setup.",
        es: "Sí, puedo configurar el despliegue, entornos y monitoreo básico, o trabajar junto a tu configuración de DevOps existente.",
      },
    },
    {
      question: {
        en: "Is security part of the process?",
        es: "¿La seguridad forma parte del proceso?",
      },
      answer: {
        en: "Yes — authentication, input validation, and access control are treated as core requirements, not an afterthought.",
        es: "Sí, la autenticación, validación de entradas y control de acceso se tratan como requerimientos base, no como un extra.",
      },
    },
  ],

  budgetOptions: [
    {
      value: "under-500",
      label: { en: "Less than $500", es: "Menos de $500" },
    },
    {
      value: "500-1500",
      label: { en: "$500 – $1,500", es: "$500 – $1.500" },
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
      label: {
        en: "2–4 weeks",
        es: "2–4 semanas",
      },
    },
    {
      value: "1-2-months",
      label: {
        en: "1–2 months",
        es: "1–2 meses",
      },
    },
    {
      value: "2-4-months",
      label: {
        en: "2–4 months",
        es: "2–4 meses",
      },
    },
  ],

  messagePlaceholder: {
    en: "What will consume this API (a web app, mobile app, both...), whether you're starting fresh or extending an existing system, what specific integrations you need and any other relevant details.",
    es: "Qué va a consumir esta API (una app web, móvil, ambas...), si empiezas desde cero o extiendes un sistema existente, si necesitas alguna integración específica y cualquier otro detalle relevante.",
  },

  seo: {
    title: {
      en: "API & Backend Development | CHRod - Web Developer",
      es: "Desarrollo de APIs y Backend | CHRod - Desarrollador Web",
    },
    description: {
      en: "Robust, well-documented REST APIs and backend architecture built to scale with your product. Get a custom quote for your backend project.",
      es: "APIs REST robustas y bien documentadas, con una arquitectura backend pensada para escalar. Solicita una cotización para tu proyecto backend.",
    },
  },
};
