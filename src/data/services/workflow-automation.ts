import type { Service } from "./types";

export const workflowAutomation: Service = {
  slug: "workflow-automation",
  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,

  card: {
    title: { en: "Workflow Automation", es: "Automatización de Procesos" },
    description: {
      en: "Stop wasting time on repetitive tasks. I design automated workflows that connect your tools, eliminate manual work, and free up your time to focus on what really matters.",
      es: "Deja de perder tiempo en tareas repetitivas. Diseño automatizaciones que conectan tus herramientas, eliminan trabajo manual y te permiten centrarte en lo que realmente importa.",
    },
  },

  hero: {
    headline: {
      en: "Get hours back by automating the busywork",
      es: "Recupera horas automatizando el trabajo repetitivo",
    },
    subheadline: {
      en: "We connect the tools you already use so data flows automatically between them, reducing errors, saving time, and keeping your operations running smoothly.",
      es: "Conectamos las herramientas que ya usas para que la información fluya automáticamente entre ellas, reduciendo errores, ahorrando tiempo y manteniendo tu operación funcionando sin fricción.",
    },
  },

  problemSolution: {
    intro: {
      en: "Manual steps between tools slow down your operations and introduce costly errors.",
      es: "Los pasos manuales entre herramientas ralentizan tu operación y generan errores costosos.",
    },
    problems: [
      {
        en: "Your team manually moves data between multiple tools",
        es: "Tu equipo mueve datos manualmente entre múltiples herramientas",
      },
      {
        en: "Leads, orders, or updates get lost or delayed",
        es: "Leads, pedidos o actualizaciones se pierden o se retrasan",
      },
      {
        en: "Processes depend on manual follow-ups and reminders",
        es: "Los procesos dependen de seguimientos y recordatorios manuales",
      },
      {
        en: "Your tools don't integrate cleanly with each other",
        es: "Tus herramientas no se integran de forma eficiente entre sí",
      },
    ],
    solutions: [
      {
        en: "Automated workflows that move data instantly between tools",
        es: "Flujos automatizados que mueven datos entre herramientas al instante",
      },
      {
        en: "Reliable triggers that capture every event consistently",
        es: "Disparadores confiables que capturan cada evento de forma consistente",
      },
      {
        en: "Automated notifications and follow-ups built into the system",
        es: "Notificaciones y seguimientos automáticos integrados en el sistema",
      },
      {
        en: "Custom integrations that connect your existing tools seamlessly",
        es: "Integraciones a medida, que conectan tus herramientas de forma fluida",
      },
    ],
  },

  includes: [
    {
      en: "Mapping of your current manual process end-to-end",
      es: "Mapeo de tu proceso manual actual de principio a fin",
    },
    {
      en: "Automated workflow built with the right tools for your needs",
      es: "Flujo automatizado construido con las herramientas adecuadas para tus necesidades",
    },
    {
      en: "Integration between your existing apps (CRM, forms, spreadsheets, email, etc.)",
      es: "Integración entre tus aplicaciones existentes (CRM, formularios, hojas de cálculo, email, etc.)",
    },
    {
      en: "Error handling and alerts so issues don't go unnoticed",
      es: "Manejo de errores y alertas para que los problemas no pasen desapercibidos",
    },
    {
      en: "Testing with real data before going live",
      es: "Pruebas con datos reales antes de activarlo",
    },
    {
      en: "Documentation so your team can understand and manage the workflow",
      es: "Documentación para que tu equipo pueda entender y gestionar el flujo",
    },
  ],

  includesNote: {
    en: "The exact scope is defined based on your needs. This is a typical baseline.",
    es: "El alcance exacto se define según tu proyecto. Esto es una referencia.",
  },

  process: [
    {
      title: { en: "Process mapping", es: "Mapeo de procesos" },
      description: {
        en: "We walk through your current workflow step by step to identify what can be automated.",
        es: "Revisamos tu proceso actual paso a paso para identificar qué se puede automatizar.",
      },
    },
    {
      title: { en: "Workflow design", es: "Diseño del flujo" },
      description: {
        en: "We define the automation logic; triggers, conditions, and actions.",
        es: "Definimos la lógica de automatización; disparadores, condiciones y acciones.",
      },
    },
    {
      title: { en: "Build & integrations", es: "Construcción e integraciones" },
      description: {
        en: "We build the workflow and connect your tools through APIs and services.",
        es: "Construimos el flujo y conectamos tus herramientas mediante APIs y servicios.",
      },
    },
    {
      title: { en: "Testing with real data", es: "Pruebas con datos reales" },
      description: {
        en: "We run real scenarios to ensure edge cases are handled correctly.",
        es: "Ejecutamos escenarios reales para asegurar que los casos límite se manejen correctamente.",
      },
    },
    {
      title: { en: "Go live & handoff", es: "Activación y entrega" },
      description: {
        en: "The automation goes live with monitoring in place and a handoff on how it works.",
        es: "La automatización se activa con monitoreo y una guía de cómo funciona.",
      },
    },
  ],

  processNote: {
    en: "The scope depends on your current tools and processes. Not everything should be automated.",
    es: "El alcance depende de tus herramientas y procesos. No todo necesita automatizarse por completo.",
  },

  techStack: [
    "n8n",
    "Node.js",
    "JavaScript",
    "Supabase",
    "PostgreSQL",
    "Docker",
  ],

  faq: [
    {
      question: {
        en: "What tools can you automate/connect?",
        es: "¿Qué herramientas puedes automatizar/conectar?",
      },
      answer: {
        en: "Most tools with an API or webhook support; CRMs, e-commerce platforms, spreadsheets, email, WhatsApp, and more, via n8n or a custom integration.",
        es: "La mayoría de herramientas con API o webhooks; CRMs, plataformas de e-commerce, hojas de cálculo, email, WhatsApp y más, a través de n8n o una integración a medida.",
      },
    },
    {
      question: { en: "How long does it take?", es: "¿Cuánto tiempo toma?" },
      answer: {
        en: "Simple automations can be ready in a few days; more complex multi-step workflows take longer depending on the number of tools involved.",
        es: "Automatizaciones simples pueden estar listas en pocos días; flujos más complejos con varios pasos toman más tiempo según el número de herramientas involucradas.",
      },
    },
    {
      question: { en: "What does it cost?", es: "¿Cuánto cuesta?" },
      answer: {
        en: "Pricing depends on the complexity of the workflow and number of integrations. Tell me about your process below for a tailored quote.",
        es: "El precio depende de la complejidad del flujo y el número de integraciones. Cuéntame sobre tu proceso para una cotización a medida.",
      },
    },
    {
      question: {
        en: "What happens if a step fails?",
        es: "¿Qué pasa si algo falla?",
      },
      answer: {
        en: "Every automation includes error handling and alerts, so you know immediately if something needs manual attention instead of silently failing.",
        es: "Cada automatización incluye manejo de errores y alertas, para que sepas de inmediato si algo necesita atención manual en vez de fallar en silencio.",
      },
    },
    {
      question: {
        en: "Do you offer ongoing support or maintenance?",
        es: "¿Ofreces soporte o mantenimiento continuo?",
      },
      answer: {
        en: "Yes, automations often need monitoring and occasional updates as your tools or processes evolve. I offer optional monthly support plans to ensure everything keeps running smoothly.",
        es: "Sí, las automatizaciones suelen necesitar monitoreo y ajustes a medida que tus herramientas o procesos evolucionan. Ofrezco planes mensuales opcionales para asegurar que todo siga funcionando correctamente.",
      },
    },
  ],

  budgetOptions: [
    {
      value: "under-300",
      label: { en: "Less than $300", es: "Menos de $300" },
    },
    {
      value: "300-1000",
      label: { en: "$300 – $1,000", es: "$300 – $1.000" },
    },
    {
      value: "1000-2500",
      label: { en: "$1,000 – $2,500", es: "$1.000 – $2.500" },
    },
    {
      value: "2500-plus",
      label: { en: "More than $2,500", es: "Más de $2.500" },
    },
  ],

  timelineOptions: [
    {
      value: "under-2-week",
      label: { en: "Less than 2 weeks", es: "Menos de 2 semanas" },
    },
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
  ],

  messagePlaceholder: {
    en: "Which tools you need to connect, the manual process you want to automate, and how often it happens... plus any other relevant details.",
    es: "Qué herramientas necesitas conectar, el proceso manual que quieres automatizar y con qué frecuencia ocurre... y cualquier otro detalle relevante.",
  },

  seo: {
    title: {
      en: "Workflow Automation Development | CHRod - Web Developer",
      es: "Automatización de Procesos | CHRod - Desarrollador Web",
    },
    description: {
      en: "Automated workflows that connect your apps and eliminate repetitive manual work, built with n8n and custom integrations. Get a custom quote.",
      es: "Flujos automatizados que conectan tus aplicaciones y eliminan trabajo manual repetitivo, construidos con n8n e integraciones a medida. Solicita una cotización.",
    },
  },
};
