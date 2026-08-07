export type Locale = "en" | "es";

export const ui: Record<Locale, Record<string, string>> = {
  en: {
    // Navbar
    "nav.about": "About",
    "nav.services": "Services",
    "nav.projects": "Projects",
    "nav.contact": "Let's talk",
    "nav.lang.label": "ES",

    // Hero
    "hero.subtitle": "Web Development & Automation",
    "hero.cta.services": "View Services",
    "hero.cta.projects": "View Work",
    "hero.scroll": "Explore",

    // About
    "about.label": "About Me",
    "about.heading":
      "I build digital products that connect technology and business",
    "about.p1":
      "I'm a full stack developer and I work on well-thought-out solutions from a practical perspective: understanding the problem clearly, defining a clean solution, and building something that actually works.",
    "about.p2":
      "I get involved across the entire process, not just the implementation, to make sure what gets built makes sense both technically and for the business.",
    "about.stat1.label": "Years experience",
    "about.stat2.label": "Projects shipped",
    "about.stat3.label": "Happy clients",
    "about.cta.learnMore": "Learn more",
    "about.resume": "View Resume",
    "about.resume.url": "/resume-en.pdf",

    // About page (/about)
    "about.page.seo.title": "About | CHRod - Web Developer",
    "about.page.seo.description":
      "Full stack developer with a business-first approach: understanding the problem, defining a clear solution, and building something that actually works.",
    "about.page.hero.heading":
      "I build digital products with a business-first approach",
    "about.page.hero.subheading":
      "I don't just write code. I design solutions that are clear, functional, and built to grow.",
    "about.page.hero.cta.contact": "Let's work together",
    "about.page.intro.heading": "Who I am",
    "about.page.intro.p1":
      "I'm a full stack developer with a practical approach to how applications are built and evolve. I've worked on projects of varying complexity, which has helped me develop the judgment to make technical decisions that actually add value.",
    "about.page.intro.p2":
      "I get involved across the entire process, not just the implementation: from how a solution is defined to how each part is structured and connected so it works in a coherent, sustainable way.",
    "about.page.intro.p3":
      "I aim to create solutions that are clear, well thought out, and aligned with real goals, where technology has a purpose instead of becoming an unnecessary layer of complexity.",
    "about.page.process.heading": "How I work",
    "about.page.process.step1.title": "Understand the problem",
    "about.page.process.step1.description":
      "Before writing any code, I understand the context and the goal.",
    "about.page.process.step2.title": "Define a clear solution",
    "about.page.process.step2.description":
      "Simple, scalable, and aligned with the business.",
    "about.page.process.step3.title": "Build and validate",
    "about.page.process.step3.description":
      "I iterate quickly and prioritize what matters.",
    "about.page.process.step4.title": "Optimize",
    "about.page.process.step4.description":
      "I refine it to keep it maintainable and ready to grow.",
    "about.page.focus.heading": "What I focus on",
    "about.page.focus.item1": "Simplicity",
    "about.page.focus.item2": "User experience",
    "about.page.focus.item3": "Performance",
    "about.page.focus.item4": "Maintainable code",
    "about.page.focus.item5": "Real business impact",
    "about.page.experience.body":
      "I've worked on projects ranging from landing pages to applications with business logic, integrations, and automation.",
    "about.page.cta.heading": "What are you working on?",
    "about.page.cta.subheading":
      "Tell me your idea and let's see how to bring it to life.",
    "about.page.cta.button": "Tell me about your project",

    // Services
    "services.label": "Services",
    "services.heading": "What I can build for you",
    "services.subtitle":
      "Whether you're launching something new or improving what already exists, I focus on delivering clean, performant solutions that are tailored to your goals, not generic templates.",
    "services.cta.text":
      "Not sure what you need? I can help you find the right approach.",
    "services.cta.button": "Find the right service",
    "services.card.cta": "View details",

    // Breadcrumbs
    "breadcrumb.home": "Home",

    // 404 page
    "notFound.seo.title": "Page not found | CHRod - Web Developer",
    "notFound.seo.description":
      "The page you are looking for doesn't exist or has been moved.",
    "notFound.label": "Error 404",
    "notFound.heading": "This page doesn't exist",
    "notFound.subtitle":
      "The link may be broken, or the page may have been moved or renamed. Here's where you can go instead.",
    "notFound.cta.home": "Back to home",
    "notFound.cta.services": "View services",
    "notFound.cta.projects": "View projects",
    "notFound.help": "Looking for something specific?",
    "notFound.help.cta": "Let's talk",

    // Service page (individual service landing pages)
    "service.page.backToServices": "View all services",
    "service.page.hero.cta": "Request a quote",
    "service.page.hero.microcopy": "Response within 24h • No commitment",
    "service.page.problem.heading": "Where things start to break",
    "service.page.problem.label": "The problem",
    "service.page.solution.label": "How I solve it",
    "service.page.includes.heading": "What you can expect",
    "service.page.includes.cta.question": "Is this what you're looking for?",
    "service.page.includes.cta.label": "See how it fits my project",
    "service.page.process.heading": "How we build your product",
    "service.page.process.cta.question":
      "Like this approach? We can apply it to your project",
    "service.page.process.cta.label": "Evaluate my project",
    "service.page.techstack.heading": "Technologies",
    "service.page.techstack.intro":
      "Technologies chosen to make your product fast, stable, and ready to scale.",
    "service.page.related.heading": "Related projects",
    "service.page.related.viewProject": "View project",
    "service.page.faq.heading": "Frequently asked questions",
    "service.page.exploreMore.heading": "Want to explore more services?",
    "service.page.cta.heading": "Ready to get started?",
    "service.page.cta.subheading":
      "Tell me about your project and I'll get back to you with next steps.",
    "service.page.sticky.cta": "Quote",
    "service.page.form.heading": "Tell me about your project",
    "service.page.form.intro":
      "Fill out the form and I'll get back to you with next steps.",
    "service.page.form.phone.label": "Phone / WhatsApp number",
    "service.page.form.phone.placeholder": "+57 300 000 0000",
    "service.page.form.budget.label": "Estimated budget (USD)",
    "service.page.form.budget.placeholder": "Select a range",
    "service.page.form.budget.unsure": "Not sure yet",
    "service.page.form.timeline.label": "Desired timeline",
    "service.page.form.timeline.placeholder": "Select a timeline",
    "service.page.form.timeline.asap": "As soon as possible",
    "service.page.form.timeline.flexible": "Flexible / not sure yet",
    "service.page.form.message.label": "Tell me about your project",
    "service.page.form.submit.email": "Send by email",
    "service.page.form.submit.whatsapp": "Send via WhatsApp",

    // Services overview page (/services)
    "servicesOverview.seo.title": "Services | CHRod - Web Developer",
    "servicesOverview.seo.description":
      "Explore all services: professional websites, landing pages, e-commerce, web applications, automation, and APIs. Find the right fit for your project.",
    "servicesOverview.hero.heading": "A service for every kind of project",
    "servicesOverview.hero.subheading": "Choose the service that fits yours.",
    "servicesOverview.selector.heading": "What do you need?",
    "servicesOverview.grid.heading": "Available services",
    "servicesOverview.grid.cta": "View service",
    "servicesOverview.comparison.heading": "Not sure what you actually need?",
    "servicesOverview.comparison.subheading":
      "It’s normal not to be sure at the start.",
    "servicesOverview.comparison.subheading2":
      "If you’re in any of these situations:",
    "servicesOverview.cta.heading":
      "I can help you find the right approach for your project.",

    // Skills
    "skills.heading": "Technologies I use",
    "skills.category.frontend": "Frontend",
    "skills.category.backend": "Backend & Data",
    "skills.category.ui": "UI & Experience",
    "skills.category.cms": "CMS & Content",
    "skills.category.tools": "Tools",

    // Projects
    "projects.label": "Work",
    "projects.heading": "Selected Projects",
    "projects.subtitle":
      "A selection of projects I’ve worked on, from websites and dashboards to more complete applications.",
    "projects.showMore": "Show more",
    "projects.showLess": "Show less",
    "projects.viewAll": "View all projects",
    "projects.cta.text": "Like what you see? Let's talk about your project.",
    "projects.cta.button": "Start my project",

    // Projects overview page (/projects)
    "projectsOverview.seo.title": "Projects | CHRod - Web Developer",
    "projectsOverview.seo.description":
      "Explore all projects I've built. Web apps, e-commerce platforms, dashboards, landing pages, and more.",
    "projectsOverview.hero.heading": "Projects I’ve worked on",
    "projectsOverview.hero.subheading":
      "From websites and ecommerce platforms to automations and backend development.",
    "projectsOverview.grid.cta": "View project",

    // Project detail page (/projects/[slug])
    "project.page.meta.role": "Role",
    "project.page.meta.company": "Client / Company",
    "project.page.meta.year": "Year",
    "project.page.link.demo": "View live demo",
    "project.page.link.website": "Official website",
    "project.page.link.github": "View code",
    "project.page.gallery.zoom": "Click to zoom screenshot",
    "project.page.gallery.zoom.label": "Screenshot zoomed view",
    "project.page.gallery.zoom.close": "Close zoomed view",
    "project.page.gallery.video": "Demo video",
    "project.page.about.heading": "About the project",
    "project.page.contributions.heading": "Key Contributions",
    "project.page.techstack.heading": "Technologies used",
    "project.page.testimonial.heading": "Client feedback",
    "project.page.finalCta.heading": "Have a similar project in mind?",
    "project.page.finalCta.subheading": "Let's talk and see how I can help.",
    "project.page.finalCta.button": "Start my project",
    "project.page.relatedServices.heading": "Related services",
    "project.page.exploreMore.heading": "Want to see more work?",
    "project.page.sticky.cta": "Let's talk",

    // Reviews
    "reviews.label": "Testimonials",
    "reviews.heading": "What clients say",
    "reviews.subtitle":
      "Feedback from people I've had the pleasure of working with.",

    // Contact
    "contact.label": "Contact",
    "contact.heading": "Let's work together",
    "contact.body":
      "Have a project in mind or just want to connect? I'd love to hear from you. Open the form or reach out directly on WhatsApp, whatever works best for you.",
    "contact.button": "Get in touch",

    // Footer
    "footer.tagline":
      "I build platforms, automations, and integrated digital solutions focused on business.",
    "footer.explore": "Explore",
    "footer.contact": "Contact",
    "footer.location": "Barranquilla, Colombia · Remote LATAM / global",
    "footer.rights": "All rights reserved.",
    "footer.privacy": "Privacy Policy",
    "footer.terms": "Terms & Conditions",

    // Form privacy notice (shared by Contact Drawer and Service Quote Form)
    "form.privacy.notice.prefix":
      "By submitting this form, you agree to your data being used to respond to your request. You can review the ",
    "form.privacy.notice.link": "privacy policy",
    "form.privacy.notice.suffix": " for more information.",

    // Contact Drawer
    "drawer.title": "Let’s talk about your project",
    "drawer.close.label": "Close contact form",
    "drawer.form.intro": "I’ll get back to you within 24 hours.",
    "drawer.name.label": "Name",
    "drawer.name.placeholder": "Your name",
    "drawer.email.label": "Email",
    "drawer.email.placeholder": "your@email.com",
    "drawer.message.label": "Message",
    "drawer.message.placeholder": "Tell me about your project or idea…",
    "drawer.error": "Something went wrong. Please try again.",
    "drawer.error.name.required": "Name is required.",
    "drawer.error.email.required": "Email is required.",
    "drawer.error.email.invalid": "Please enter a valid email address.",
    "drawer.error.message.required": "Message is required.",
    "drawer.error.message.short": "Message must be at least 10 characters.",
    "drawer.submit": "Send Request",
    "drawer.sending": "Sending…",
    "drawer.success.title": "Message sent!",
    "drawer.success.body":
      "Thanks for reaching out. I'll get back to you soon.",
    "drawer.success.close": "Close",

    // WhatsApp
    "whatsapp.label": "Contact me on WhatsApp",

    // Review page
    "review.badge": "Review",
    "review.heading": "Leave a review",
    "review.subtitle":
      "Share your experience working with me. Your feedback means a lot 🫶🏻",
    "review.form.name": "Full Name",
    "review.form.name.placeholder": "Your name",
    "review.form.role": "Role / Position",
    "review.form.role.placeholder": "e.g. CEO, Project Manager, CTO",
    "review.form.company": "Company",
    "review.form.company.placeholder": "Your company (optional)",
    "review.form.text": "Your Review",
    "review.form.text.placeholder":
      "Tell others about your experience working with me\u2026",
    "review.form.text.hint": "Minimum 50 characters",
    "review.form.rating": "Rating",
    "review.form.rating.hint": "How would you rate the overall experience?",
    "review.form.linkedin": "LinkedIn Profile",
    "review.form.linkedin.placeholder":
      "https://linkedin.com/in/yourprofile (optional)",
    "review.form.submit": "Submit Review",
    "review.form.submitting": "Submitting\u2026",
    "review.success.heading": "Thank you!",
    "review.success.body":
      "Your review has been received and will be reviewed shortly. I really appreciate your feedback.",
    "review.error": "Something went wrong. Please try again.",
    "review.error.required": "This field is required.",
    "review.error.text.short": "Please write at least 50 characters.",
    "review.error.linkedin.invalid":
      "Please enter a valid URL (starting with https://).",
    "review.error.rating.required": "Please select a rating.",
    "review.privacy.notice.prefix":
      "By submitting this review, you agree that your name, role, company and comments may be published on this website. You can review the ",
    "review.privacy.notice.privacy": "privacy policy",
    "review.privacy.notice.middle": " and the ",
    "review.privacy.notice.terms": "terms & conditions",
    "review.privacy.notice.suffix": " for more information.",
    "review.invalid.heading": "Invalid link",
    "review.invalid.body":
      "This link is invalid or has expired. Please ask for a new one.",

    // Legal pages
    "legal.back": "Back to home",
  },

  es: {
    // Navbar
    "nav.about": "Sobre mí",
    "nav.services": "Servicios",
    "nav.projects": "Proyectos",
    "nav.contact": "Hablemos",
    "nav.lang.label": "EN",

    // Hero
    "hero.subtitle": "Desarrollo Web & Automatización",
    "hero.cta.services": "Ver servicios",
    "hero.cta.projects": "Ver proyectos",
    "hero.scroll": "Explorar",

    // About
    "about.label": "Sobre mí",
    "about.heading":
      "Desarrollo productos digitales que conectan tecnología y negocio",
    "about.p1":
      "Soy desarrollador full stack y trabajo en soluciones bien pensadas desde una perspectiva práctica: entender bien el problema, definir una solución clara y construir algo que realmente funcione.",
    "about.p2":
      "Me involucro en todo el proceso, no solo en la implementación, para asegurar que lo que se desarrolla tenga sentido a nivel técnico y también a nivel de negocio.",
    "about.stat1.label": "Años de experiencia",
    "about.stat2.label": "Proyectos entregados",
    "about.stat3.label": "Clientes satisfechos",
    "about.cta.learnMore": "Conocer más",
    "about.resume": "Ver CV",
    "about.resume.url": "/resume-es.pdf",

    // Página de sobre mí (/about)
    "about.page.seo.title": "Sobre mí | CHRod - Desarrollador Web",
    "about.page.seo.description":
      "Desarrollador full stack con enfoque en negocio: entender el problema, definir una solución clara y construir algo que realmente funcione.",
    "about.page.hero.heading":
      "Desarrollo productos digitales con enfoque en negocio",
    "about.page.hero.subheading":
      "No solo escribo código. Diseño soluciones claras, funcionales y pensadas para crecer.",
    "about.page.hero.cta.contact": "Trabajemos juntos",
    "about.page.intro.heading": "Quién soy",
    "about.page.intro.p1":
      "Soy desarrollador full stack con un enfoque práctico en cómo se construyen y evolucionan las aplicaciones. He trabajado en proyectos de distinta complejidad, lo que me ha permitido desarrollar criterio para tomar decisiones técnicas que realmente aporten valor.",
    "about.page.intro.p2":
      "Me involucro en todo el proceso, no solo en la implementación: desde cómo se define una solución hasta cómo se estructura y se conecta cada parte para que funcione de forma coherente y sostenible.",
    "about.page.intro.p3":
      "Busco crear soluciones claras, bien pensadas y alineadas a objetivos reales, donde la tecnología tenga un propósito y no se convierta en una capa innecesaria de complejidad.",
    "about.page.process.heading": "Cómo trabajo",
    "about.page.process.step1.title": "Entender el problema",
    "about.page.process.step1.description":
      "Antes de escribir código, entiendo el contexto y el objetivo.",
    "about.page.process.step2.title": "Definir una solución clara",
    "about.page.process.step2.description":
      "Simple, escalable y alineada al negocio.",
    "about.page.process.step3.title": "Construir y validar",
    "about.page.process.step3.description":
      "Itero rápido y priorizo lo importante.",
    "about.page.process.step4.title": "Optimizar",
    "about.page.process.step4.description":
      "Refino para que sea mantenible y lista para crecer.",
    "about.page.focus.heading": "En qué me enfoco",
    "about.page.focus.item1": "Simplicidad",
    "about.page.focus.item2": "Experiencia de usuario",
    "about.page.focus.item3": "Rendimiento",
    "about.page.focus.item4": "Código mantenible",
    "about.page.focus.item5": "Impacto real en negocio",
    "about.page.experience.body":
      "He trabajado en proyectos desde landing pages hasta aplicaciones con lógica de negocio, integraciones y automatización.",
    "about.page.cta.heading": "¿En qué estás trabajando?",
    "about.page.cta.subheading":
      "Cuéntame tu idea y vemos cómo llevarla a la práctica.",
    "about.page.cta.button": "Cuéntame tu proyecto",

    // Servicios
    "services.label": "Servicios",
    "services.heading": "Cómo puedo ayudarte",
    "services.subtitle":
      "Ya sea que estés lanzando un nuevo proyecto o mejorando uno existente, me enfoco en crear soluciones limpias y de alto rendimiento, adaptadas a tus objetivos, sin plantillas genéricas.",
    "services.cta.text":
      "¿No tienes claro lo que necesitas? Te ayudo a encontrar el mejor enfoque para tu caso.",
    "services.cta.button": "Encontrar el servicio adecuado",
    "services.card.cta": "Ver detalles",

    // Breadcrumbs
    "breadcrumb.home": "Inicio",

    // Página 404
    "notFound.seo.title": "Página no encontrada | CHRod - Desarrollador Web",
    "notFound.seo.description":
      "La página que buscas no existe o fue movida.",
    "notFound.label": "Error 404",
    "notFound.heading": "Esta página no existe",
    "notFound.subtitle":
      "Puede que el enlace esté roto, o que la página haya sido movida o renombrada. Desde aquí puedes seguir explorando.",
    "notFound.cta.home": "Volver al inicio",
    "notFound.cta.services": "Ver servicios",
    "notFound.cta.projects": "Ver proyectos",
    "notFound.help": "¿Buscas algo en concreto?",
    "notFound.help.cta": "Hablemos",

    // Service page (páginas individuales de servicio)
    "service.page.backToServices": "Todos los servicios",
    "service.page.hero.cta": "Solicitar presupuesto",
    "service.page.hero.microcopy": "Respuesta en menos de 24h • Sin compromiso",
    "service.page.problem.heading": "Donde empiezan los problemas",
    "service.page.problem.label": "El problema",
    "service.page.solution.label": "Cómo lo resuelvo",
    "service.page.includes.heading": "Qué puedes esperar",
    "service.page.includes.cta.question": "¿Esto es lo que estás buscando?",
    "service.page.includes.cta.label": "Ver cómo encaja mi proyecto",
    "service.page.process.heading": "Cómo construimos tu producto",
    "service.page.process.cta.question":
      "Si te gusta este enfoque, podemos aplicarlo a tu caso",
    "service.page.process.cta.label": "Evaluar mi proyecto",
    "service.page.techstack.heading": "Tecnologías",
    "service.page.techstack.intro":
      "Tecnologías pensadas para que tu producto sea rápido, estable y pueda crecer sin limitaciones.",
    "service.page.related.heading": "Proyectos relacionados",
    "service.page.related.viewProject": "Ver proyecto",
    "service.page.faq.heading": "Preguntas frecuentes",
    "service.page.exploreMore.heading":
      "También puedes explorar otros enfoques",
    "service.page.cta.heading": "¿Listo para comenzar?",
    "service.page.cta.subheading":
      "Cuéntame sobre tu proyecto y te contactaré con los siguientes pasos.",
    "service.page.sticky.cta": "Presupuesto",
    "service.page.form.heading": "Cuéntame sobre tu proyecto",
    "service.page.form.intro":
      "Completa el formulario y te contactaré con los siguientes pasos.",
    "service.page.form.phone.label": "Teléfono / WhatsApp",
    "service.page.form.phone.placeholder": "+57 300 000 0000",
    "service.page.form.budget.label": "Presupuesto estimado (USD)",
    "service.page.form.budget.placeholder": "Selecciona un rango",
    "service.page.form.budget.unsure": "No estoy seguro",
    "service.page.form.timeline.label": "Plazo deseado",
    "service.page.form.timeline.placeholder": "Selecciona un plazo",
    "service.page.form.timeline.asap": "Lo antes posible",
    "service.page.form.timeline.flexible": "Flexible / no estoy seguro",
    "service.page.form.message.label": "Cuéntame sobre tu proyecto",
    "service.page.form.submit.email": "Enviar por email",
    "service.page.form.submit.whatsapp": "Enviar por WhatsApp",

    // Página de servicios (/services)
    "servicesOverview.seo.title": "Servicios | CHRod - Desarrollador Web",
    "servicesOverview.seo.description":
      "Explora todos los servicios: sitios web profesionales, landing pages, e-commerce, aplicaciones web, automatización y APIs. Encuentra el que se ajusta a tu proyecto.",
    "servicesOverview.hero.heading": "Un servicio para cada tipo de proyecto",
    "servicesOverview.hero.subheading":
      "Elige el servicio que mejor se ajuste al tuyo.",
    "servicesOverview.selector.heading": "¿Qué necesitas?",
    "servicesOverview.grid.heading": "Servicios disponibles",
    "servicesOverview.grid.cta": "Ver servicio",
    "servicesOverview.comparison.heading":
      "¿No estás seguro de qué necesitas exactamente?",
    "servicesOverview.comparison.subheading":
      "Es normal no tenerlo claro al inicio.",
    "servicesOverview.comparison.subheading2":
      "Estas son algunas situaciones comunes:",
    "servicesOverview.cta.heading":
      "Puedo ayudarte a definir el mejor enfoque para tu proyecto.",

    // Skills
    "skills.heading": "Tecnologías que utilizo",
    "skills.category.frontend": "Frontend",
    "skills.category.backend": "Backend & Datos",
    "skills.category.ui": "UI & Experiencia",
    "skills.category.cms": "CMS & Contenido",
    "skills.category.tools": "Herramientas",

    // Projects
    "projects.label": "Proyectos",
    "projects.heading": "Proyectos destacados",
    "projects.subtitle":
      "Una selección de proyectos en los que he trabajado, desde webs y dashboards hasta aplicaciones más completas.",
    "projects.showMore": "Ver más",
    "projects.showLess": "Ver menos",
    "projects.viewAll": "Todos los proyectos",
    "projects.cta.text": "¿Te gusta lo que ves? Hablemos de tu proyecto.",
    "projects.cta.button": "Iniciar mi proyecto",

    // Página de proyectos (/projects)
    "projectsOverview.seo.title": "Proyectos | CHRod - Desarrollador Web",
    "projectsOverview.seo.description":
      "Explora todos los proyectos que he desarrollado. Aplicaciones web, plataformas e-commerce, dashboards, landing pages y más.",
    "projectsOverview.hero.heading": "Proyectos en los que he trabajado",
    "projectsOverview.hero.subheading":
      "Desde sitios web y tiendas online, hasta automatizaciones y desarrollo backend.",
    "projectsOverview.grid.cta": "Ver proyecto",

    // Página de detalle de proyecto (/projects/[slug])
    "project.page.meta.role": "Rol",
    "project.page.meta.company": "Cliente / Empresa",
    "project.page.meta.year": "Año",
    "project.page.link.demo": "Ver demo en vivo",
    "project.page.link.website": "Sitio web oficial",
    "project.page.link.github": "Ver código",
    "project.page.gallery.zoom": "Clic para ampliar captura",
    "project.page.gallery.zoom.label": "Vista ampliada de la captura",
    "project.page.gallery.zoom.close": "Cerrar vista ampliada",
    "project.page.gallery.video": "Video demo",
    "project.page.about.heading": "Sobre el proyecto",
    "project.page.contributions.heading": "Contribuciones clave",
    "project.page.techstack.heading": "Tecnologías usadas",
    "project.page.testimonial.heading": "Opinión del cliente",
    "project.page.finalCta.heading": "¿Tienes un proyecto similar en mente?",
    "project.page.finalCta.subheading":
      "Hablemos y veamos cómo puedo ayudarte.",
    "project.page.finalCta.button": "Iniciar mi proyecto",
    "project.page.relatedServices.heading": "Servicios relacionados",
    "project.page.exploreMore.heading":
      "También puedes explorar otros enfoques.",
    "project.page.sticky.cta": "Hablemos",

    // Reviews
    "reviews.label": "Testimonios",
    "reviews.heading": "Lo que dicen los clientes",
    "reviews.subtitle":
      "Opiniones de personas con quienes he tenido el placer de trabajar.",

    // Contact
    "contact.label": "Contacto",
    "contact.heading": "Trabajemos juntos",
    "contact.body":
      "¿Tienes un proyecto en mente o simplemente quieres conectar? Me encantaría escucharte. Abre el formulario o si prefieres, podemos hablar por WhatsApp.",
    "contact.button": "Hablemos",

    // Footer
    "footer.tagline":
      "Construyo plataformas, automatizaciones y soluciones digitales integradas, enfocadas en negocio.",
    "footer.explore": "Explorar",
    "footer.contact": "Contacto",
    "footer.location": "Barranquilla, Colombia · Remoto LATAM / global",
    "footer.rights": "Todos los derechos reservados.",
    "footer.privacy": "Política de privacidad",
    "footer.terms": "Términos y condiciones",

    // Form privacy notice (shared by Contact Drawer and Service Quote Form)
    "form.privacy.notice.prefix":
      "Al enviar este formulario, aceptas que tus datos sean utilizados para responder a tu solicitud. Puedes consultar la ",
    "form.privacy.notice.link": "política de privacidad",
    "form.privacy.notice.suffix": " para más información.",

    // Contact Drawer
    "drawer.title": "Hablemos de tu proyecto",
    "drawer.close.label": "Cerrar formulario de contacto",
    "drawer.form.intro": "Te responderé en menos de 24 horas.",
    "drawer.name.label": "Nombre",
    "drawer.name.placeholder": "Tu nombre",
    "drawer.email.label": "Correo electrónico",
    "drawer.email.placeholder": "tu@email.com",
    "drawer.message.label": "Mensaje",
    "drawer.message.placeholder": "Cuéntame sobre tu proyecto o idea…",
    "drawer.error": "Algo salió mal. Por favor, intenta de nuevo.",
    "drawer.error.name.required": "El nombre es obligatorio.",
    "drawer.error.email.required": "El correo electrónico es obligatorio.",
    "drawer.error.email.invalid":
      "Por favor ingresá un correo electrónico válido.",
    "drawer.error.message.required": "El mensaje es obligatorio.",
    "drawer.error.message.short":
      "El mensaje debe tener al menos 10 caracteres.",
    "drawer.submit": "Enviar Solicitud",
    "drawer.sending": "Enviando…",
    "drawer.success.title": "¡Mensaje enviado!",
    "drawer.success.body":
      "Gracias por escribirme. Te responderé lo más pronto posible.",
    "drawer.success.close": "Cerrar",

    // WhatsApp
    "whatsapp.label": "Contáctame por WhatsApp",

    // Review page
    "review.badge": "Rese\u00f1a",
    "review.heading": "Deja tu rese\u00f1a",
    "review.subtitle":
      "Comparte tu experiencia trabajando conmigo.\n Tu opini\u00f3n es muy valiosa 🫶🏻",
    "review.form.name": "Nombre completo",
    "review.form.name.placeholder": "Tu nombre",
    "review.form.role": "Cargo / Posici\u00f3n",
    "review.form.role.placeholder":
      "ej. CEO, Gerente de Proyecto, Director de TI",
    "review.form.company": "Empresa",
    "review.form.company.placeholder": "Tu empresa (opcional)",
    "review.form.text": "Tu rese\u00f1a",
    "review.form.text.placeholder":
      "Cu\u00e9ntale a otros sobre tu experiencia trabajando conmigo\u2026",
    "review.form.text.hint": "M\u00ednimo 50 caracteres",
    "review.form.rating": "Calificaci\u00f3n",
    "review.form.rating.hint": "\u00bfC\u00f3mo calificar\u00edas la experiencia general?",
    "review.form.linkedin": "Perfil de LinkedIn",
    "review.form.linkedin.placeholder":
      "https://linkedin.com/in/tuperfil (opcional)",
    "review.form.submit": "Enviar Rese\u00f1a",
    "review.form.submitting": "Enviando\u2026",
    "review.success.heading": "\u00a1Gracias!",
    "review.success.body":
      "Tu rese\u00f1a ha sido recibida y ser\u00e1 revisada pronto. Agradezco mucho tu tiempo y opini\u00f3n.",
    "review.error": "Algo sali\u00f3 mal. Por favor, int\u00e9ntalo de nuevo.",
    "review.error.required": "Este campo es requerido.",
    "review.error.text.short": "Por favor escribe al menos 50 caracteres.",
    "review.error.linkedin.invalid":
      "Por favor ingresa una URL v\u00e1lida (que comience con https://).",
    "review.error.rating.required": "Por favor selecciona una calificaci\u00f3n.",
    "review.privacy.notice.prefix":
      "Al enviar esta rese\u00f1a, aceptas que tu nombre, cargo, empresa y comentarios puedan publicarse en este sitio web. Puedes consultar la ",
    "review.privacy.notice.privacy": "pol\u00edtica de privacidad",
    "review.privacy.notice.middle": " y los ",
    "review.privacy.notice.terms": "t\u00e9rminos y condiciones",
    "review.privacy.notice.suffix": " para m\u00e1s informaci\u00f3n.",
    "review.invalid.heading": "Enlace inv\u00e1lido",
    "review.invalid.body":
      "Este enlace es inv\u00e1lido o ha expirado. Por favor solicita uno nuevo.",

    // Legal pages
    "legal.back": "Volver al inicio",
  },
};
