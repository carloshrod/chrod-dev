import type { Service } from "./types";

/**
 * The wedge offer. Leads the home page and the services overview.
 *
 * Two things here are deliberate and should not be "fixed" later without a
 * reason: the number connection is listed as free (it is half an hour of work
 * and pricing it invites comparison with self-serve BSPs, where the Tech
 * Provider credential counts for nothing), and the founder pricing is absent
 * on purpose (it reads as inexperience to a stranger reading cold; it belongs
 * in the sales call, after competence has been shown).
 */
export const whatsappAutomation: Service = {
  id: "whatsapp-automation",
  slug: { en: "whatsapp-automation", es: "automatizacion-whatsapp" },
  icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/><path d="M8.5 9.5c0 3.3 2.7 6 6 6"/></svg>`,

  card: {
    title: {
      en: "WhatsApp Automation",
      es: "Automatización de WhatsApp",
    },
    description: {
      en: "I connect your number to Meta's official API and build the chatbot or AI agent that answers, quotes and books on its own. As an approved Meta Tech Provider I run the onboarding myself, with no middleman.",
      es: "Conecto tu número a la API oficial de Meta y monto un chatbot o agente de IA que responde, cotiza y agenda solo. Soy Proveedor de Tecnología aprobado por Meta, así que el onboarding lo hago yo, sin intermediarios.",
    },
  },

  hero: {
    headline: {
      en: "Your WhatsApp working without you",
      es: "Tu WhatsApp trabajando sin ti",
    },
    subheadline: {
      en: "Answers around the clock, replies instantly, quotes and books. And you still see every conversation from the same WhatsApp you use today.",
      es: "Atiende las 24 horas, responde al instante, cotiza y agenda. Y tú sigues viendo todas las conversaciones desde el mismo WhatsApp que usas hoy.",
    },
  },

  problemSolution: {
    intro: {
      en: "The problem is rarely a lack of customers. It is that they write at all hours, ask the same things over and over, and by the time you reply three hours later they have bought somewhere else.",
      es: "El problema casi nunca es que te falten clientes. Es que escriben a toda hora, preguntan siempre lo mismo, y cuando respondes tres horas después ya compraron en otro lado.",
    },
    problems: [
      {
        en: "You reply late and lose sales you had already won",
        es: "Respondes tarde y pierdes ventas que ya tenías ganadas",
      },
      {
        en: "You answer the same question twenty times a day",
        es: "Contestas la misma pregunta veinte veces al día",
      },
      {
        en: "Conversations live on one phone and nobody else sees them",
        es: "Las conversaciones viven en un teléfono y nadie más las ve",
      },
      {
        en: "You have no idea how many write or how many buy",
        es: "No sabes cuántos escriben ni cuántos compran",
      },
      {
        en: "Your WhatsApp does not talk to your CRM or your inventory",
        es: "Tu WhatsApp no habla con tu CRM ni con tu inventario",
      },
    ],
    solutions: [
      {
        en: "Replies in seconds, any hour, every day",
        es: "Respuesta en segundos, a cualquier hora, todos los días",
      },
      {
        en: "The flows handle the repetitive part and escalate only what needs a human",
        es: "Los flujos resuelven lo repetitivo y te pasan solo lo que necesita a una persona",
      },
      {
        en: "Several agents on one number, with shared history",
        es: "Varios agentes sobre el mismo número, con historial compartido",
      },
      {
        en: "Volume, response time and conversion data",
        es: "Datos de volumen, respuesta y conversión",
      },
      {
        en: "Integration with the tools you already use",
        es: "Integración con las herramientas que ya usas",
      },
    ],
  },

  modes: {
    heading: {
      en: "Two ways to connect, and the choice matters",
      es: "Dos formas de conectar, y conviene elegir bien",
    },
    optionA: { en: "Coexistence", es: "Coexistencia" },
    optionB: { en: "Dedicated number", es: "Número dedicado" },
    rows: [
      {
        label: {
          en: "Your WhatsApp Business app",
          es: "Tu app de WhatsApp Business",
        },
        a: { en: "Keeps working as always", es: "La sigues usando igual" },
        b: {
          en: "Stops working on that number",
          es: "Deja de funcionar en ese número",
        },
        highlightA: true,
      },
      {
        label: { en: "Chat history", es: "Historial de chats" },
        a: { en: "Preserved", es: "Se conserva" },
        b: { en: "Starts fresh", es: "Empieza de cero" },
      },
      {
        label: { en: "Who it is for", es: "Para quién es" },
        a: {
          en: "Businesses already using WhatsApp that do not want anything to change",
          es: "Negocios que ya atienden por WhatsApp y no quieren cambiar nada",
        },
        b: {
          en: "New numbers, or separating automated support from a personal phone",
          es: "Números nuevos, o quien quiere separar la atención automática del teléfono personal",
        },
      },
      {
        label: { en: "Going back", es: "Volver atrás" },
        a: { en: "No hassle", es: "Sin complicación" },
        b: {
          en: "Needs deregistering the number with Meta, so decide before, not after",
          es: "Requiere desregistrar el número con Meta, así que conviene decidirlo antes",
        },
      },
    ],
    note: {
      en: "Most of my clients go with coexistence, because they do not want to lose the WhatsApp they already use. If you are not sure, we settle it on the call and I tell you which one fits. This decision is made with you before I generate your connection link, not after.",
      es: "La mayoría de mis clientes van con coexistencia, porque no quieren perder el WhatsApp que ya usan. Si no estás seguro, lo vemos en la llamada y te digo cuál te conviene. Esta decisión la tomo contigo antes de generar tu enlace de conexión, no después.",
    },
  },

  includes: [
    {
      en: "Onboarding your number to Meta's official API, verification included",
      es: "Onboarding de tu número a la API oficial de Meta, verificación incluida",
    },
    {
      en: "Coexistence or dedicated number, whichever fits",
      es: "Coexistencia o número dedicado, según lo que te convenga",
    },
    {
      en: "A chatbot for your most common questions, or an AI agent when the conversation needs to understand rather than follow a menu",
      es: "Un chatbot para tus preguntas más frecuentes, o un agente de IA cuando la conversación necesita entender en vez de seguir un menú",
    },
    {
      en: "Handover to a human when the flow is not enough",
      es: "Derivación a una persona cuando el flujo no alcanza",
    },
    {
      en: "Business hours and after hours messages",
      es: "Horarios de atención y mensajes fuera de horario",
    },
    {
      en: "Connection to your CRM, spreadsheet or order system",
      es: "Conexión con tu CRM, hoja de cálculo o sistema de pedidos",
    },
    {
      en: "Message templates approved by Meta, in the right category so they cost you less",
      es: "Plantillas de mensaje aprobadas por Meta, en la categoría correcta para que te cueste menos",
    },
    {
      en: "Account setup so several agents can work one number",
      es: "Configuración de la cuenta para que varios agentes trabajen el mismo número",
    },
    { en: "Training for your team", es: "Capacitación para tu equipo" },
    {
      en: "A calculation of what Meta will charge you before we start, no surprises",
      es: "Cálculo de lo que te va a costar en Meta antes de empezar, sin sorpresas",
    },
  ],

  includesNote: {
    en: "Connecting the number is included in any automation project, never billed as a separate line. If the connection is all you need, because someone else already handles your automation or you have it built, I do that as a one off piece of work: write to me and we agree on it.",
    es: "La conexión del número va incluida en cualquier proyecto de automatización, no la cobro como ítem aparte. Si solo necesitas la conexión, porque ya tienes quien te lleve la automatización o ya la tienes hecha, la hago como servicio puntual: escríbeme y lo acordamos.",
  },

  process: [
    {
      title: { en: "15 minute call", es: "Llamada de 15 minutos" },
      description: {
        en: "You tell me how you handle messages today and where the time goes. We leave knowing whether coexistence or a dedicated number fits.",
        es: "Me cuentas cómo atiendes hoy y qué te está costando tiempo. Salimos con claridad de si coexistencia o número dedicado.",
      },
    },
    {
      title: { en: "Connection", es: "Conexión" },
      description: {
        en: "I send you a private link, you open it and connect your number in minutes. I handle the rest from my side as a Tech Provider.",
        es: "Te mando un enlace privado, lo abres y conectas tu número en unos minutos. Yo hago el resto desde mi lado como Proveedor de Tecnología.",
      },
    },
    {
      title: { en: "Flow map", es: "Mapa de flujos" },
      description: {
        en: "I define what gets automated, what goes to a human and what data is stored. You review it before I build anything.",
        es: "Defino qué preguntas se automatizan, qué se deriva a una persona y qué datos se guardan. Lo revisas antes de que construya nada.",
      },
    },
    {
      title: { en: "Build and test", es: "Construcción y pruebas" },
      description: {
        en: "I build the flows and we test them with real conversations before opening it to your customers.",
        es: "Monto los flujos y los probamos con conversaciones reales antes de abrirlo a tus clientes.",
      },
    },
    {
      title: { en: "Live and tuning", es: "En vivo y ajustes" },
      description: {
        en: "We launch, I watch the first week and tune it with what we learn.",
        es: "Lo soltamos, miro cómo se comporta la primera semana y lo ajusto con lo que aprendemos.",
      },
    },
  ],

  processNote: {
    en: "Connecting the number is done the same day. The flows take between 1 and 3 weeks depending on how many cases we cover. I take on 2 new projects a month, so the start date depends on what is already in the queue.",
    es: "La conexión del número queda el mismo día. Los flujos toman entre 1 y 3 semanas según cuántos casos cubramos. Tomo 2 proyectos nuevos al mes, así que la fecha de arranque depende de lo que ya esté en cola.",
  },

  techStack: [
    "WhatsApp API",
    "n8n",
    "Node.js",
    "TypeScript",
    "Supabase",
    "PostgreSQL",
  ],

  faq: [
    {
      question: {
        en: "Do I lose the WhatsApp I use now? Do I need a new number?",
        es: "¿Pierdo el WhatsApp que uso ahora? ¿Necesito otro número?",
      },
      answer: {
        en: "You keep your number either way, we connect the one your customers already use. With coexistence you also keep the app: it works exactly as before, with your history, and the automation runs on the same number. With a dedicated number that number can no longer be used in any WhatsApp app, which is why we decide it together before connecting anything.",
        es: "Tu número lo conservas en los dos casos, se conecta el que ya usan tus clientes. Con coexistencia conservas también la app: funciona igual que antes, con tu historial, y la automatización trabaja sobre el mismo número. Con número dedicado, ese número deja de poder usarse en las apps de WhatsApp, y por eso lo decidimos juntos antes de conectar nada.",
      },
    },
    {
      question: {
        en: "What will Meta charge me?",
        es: "¿Cuánto me cuesta a mí en Meta?",
      },
      answer: {
        en: "Meta charges per message, at a rate set by the country of whoever receives it. In Colombia, utility and service messages are USD 0.0008 and marketing messages USD 0.0125. You get 1,000 free service messages per number per month, and incoming messages are always free. A business with 1,000 conversations a month usually spends around 3 dollars. Note that since 1 October 2026 Meta charges for replies inside the 24 hour window once you pass those first 1,000, which used to be free without limit. For most businesses that is a few dollars, and I run the calculation with your numbers before we start.",
        es: "Meta cobra por mensaje, a una tarifa que depende del país de quien recibe. En Colombia, los mensajes de utilidad y de servicio están en 0,0008 USD y los de marketing en 0,0125 USD. Tienes 1.000 mensajes de servicio gratis al mes por número, y los mensajes que te entran siempre son gratis. Un negocio con 1.000 conversaciones al mes suele gastar unos 3 dólares. Ten en cuenta que desde el 1 de octubre de 2026 Meta cobra las respuestas dentro de la ventana de 24 horas pasados esos primeros 1.000, que antes eran gratis sin límite. En la mayoría de negocios son unos pocos dólares, y te hago el cálculo con tus números antes de empezar.",
      },
    },
    {
      question: {
        en: "Do I need a chatbot or an AI agent?",
        es: "¿Necesito un chatbot o un agente de IA?",
      },
      answer: {
        en: "A chatbot follows a path you define: good for prices, hours, order status, anything with a predictable answer. It is cheaper, faster to build and never improvises. An AI agent understands what was written and replies in context, which you want when customers ask the same thing twenty different ways or you sell something that needs explaining. I build both, with n8n or directly against an API, and I tell you which one your case needs instead of selling you the expensive one by default.",
        es: "Un chatbot sigue un camino que tú defines: sirve para precios, horarios, estado de un pedido, todo lo que tenga respuesta predecible. Es más económico, más rápido de montar y nunca improvisa. Un agente de IA entiende lo que le escribieron y responde en contexto, que es lo que quieres cuando tus clientes preguntan lo mismo de veinte formas distintas o vendes algo que hay que explicar. Monto los dos, con n8n o directamente contra una API, y te digo cuál necesita tu caso en vez de venderte el caro por defecto.",
      },
    },
    {
      question: {
        en: "What does the service cost?",
        es: "¿Cuánto cuesta el servicio?",
      },
      answer: {
        en: "The connection is included with any automation project. Automation starts from USD 1,200, and a full conversational agent runs between USD 2,500 and 5,000 depending on scope. Monthly support, which is where it really pays off, runs between USD 300 and 700. Tell me about your case in the form and I will give you a concrete number.",
        es: "La conexión va incluida en cualquier proyecto de automatización. La automatización arranca desde 350 USD, y un agente conversacional completo va entre 800 y 1.500 USD según el alcance. El soporte mensual, que es donde de verdad rinde, va entre 100 y 250 USD. Cuéntame tu caso en el formulario y te doy un número concreto.",
      },
    },
    {
      question: {
        en: "Why work with you instead of one of the platforms that advertise this?",
        es: "¿Por qué contigo y no con una plataforma de las que se anuncian?",
      },
      answer: {
        en: "Because I am an approved Meta Tech Provider. I connect your number directly, without locking you into a middleman's subscription, and I build your flows around how you actually operate instead of fitting you to a template. You talk to the person who builds it, not to a first line support desk. I am based in Colombia and overlap with US business hours all day, so you are not waiting overnight for an answer.",
        es: "Porque soy Proveedor de Tecnología aprobado por Meta. Conecto tu número directamente, sin que quedes atado a la suscripción de un intermediario, y construyo tus flujos a medida de tu operación en vez de adaptarte a una plantilla. Y hablas conmigo, que soy quien lo construye, no con un soporte de primer nivel.",
      },
    },
  ],

  budgetOptions: [
    {
      value: "undecided",
      label: { en: "Not sure yet", es: "Aún no lo tengo definido" },
    },
    {
      value: "entry",
      label: { en: "$1,200 – $2,500", es: "$350 – $800" },
    },
    {
      value: "mid",
      label: { en: "$2,500 – $5,000", es: "$800 – $1.500" },
    },
    {
      value: "high",
      label: { en: "$5,000 – $12,000", es: "$1.500 – $4.000" },
    },
    {
      value: "enterprise",
      label: { en: "More than $12,000", es: "Más de $4.000" },
    },
  ],

  timelineOptions: [
    {
      value: "asap",
      label: { en: "As soon as possible", es: "Lo antes posible" },
    },
    { value: "1-2-weeks", label: { en: "1–2 weeks", es: "1 a 2 semanas" } },
    { value: "2-4-weeks", label: { en: "2–4 weeks", es: "2 a 4 semanas" } },
    { value: "flexible", label: { en: "Flexible", es: "Flexible" } },
  ],

  messagePlaceholder: {
    en: "How do you handle WhatsApp today? How many messages a day do you get, and what do people ask most?",
    es: "¿Cómo atiendes WhatsApp hoy? ¿Cuántos mensajes al día te llegan y qué es lo que más preguntan?",
  },

  seo: {
    title: {
      en: "WhatsApp Business API Automation",
      es: "Automatización de WhatsApp Business API",
    },
    description: {
      en: "I connect your WhatsApp to Meta's official API and automate support and sales. Approved Meta Tech Provider. Coexistence or dedicated number. From $1,200.",
      es: "Conecto tu WhatsApp a la API oficial de Meta y automatizo la atención y las ventas. Proveedor de Tecnología aprobado por Meta. Coexistencia o número dedicado. Desde 350 USD.",
    },
  },
};
