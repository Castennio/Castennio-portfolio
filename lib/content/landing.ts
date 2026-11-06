export const siteConfig = {
  name: "Castennio",
  tagline: "Plataformas web administrables para tu negocio",
  url: "https://castennio.com",
  whatsappUrl: "https://wa.me/51998162677",
  whatsappText: "Hola, me interesa una plataforma web administrable",
  contactEmail: "f4r3ver@gmail.com",
} as const;

export const navLinks = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Proceso", href: "#proceso" },
  { label: "Proyectos", href: "#proyectos" },
  { label: "FAQ", href: "#faq" },
] as const;

export const heroContent = {
  title: "Tu negocio merece más que un Excel y un grupo de WhatsApp",
  subtitle:
    "Desarrollamos plataformas web donde gestionas tus productos, categorías e imágenes, y compartes un catálogo profesional con tus clientes.",
  cta: "Hablemos por WhatsApp",
  secondaryCta: "Ver cómo funciona",
  dashboardImage: "/images/projects/kb-admin-1.png",
  dashboardMobileImage: "/images/projects/kb-admin-mobile-1.png",
  dashboardImageAlt: "Panel administrable de KingBrake — gestión de productos",
} as const;

export type FeatureTab = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const featureTabs: FeatureTab[] = [
  {
    title: "Gestiona tus productos",
    description:
      "Agrega, edita y organiza tus productos con fotos, descripciones y precios desde un panel sencillo. Sin necesidad de saber programar.",
    image: "/images/projects/kb-admin-1.png",
    imageAlt: "Panel de gestión de productos — KingBrake",
  },
  {
    title: "Organiza categorías y contenido",
    description:
      "Crea categorías, gestiona artículos de blog y mantén tu información ordenada. Todo desde un solo lugar, actualizado al instante.",
    image: "/images/projects/v-admin-1.png",
    imageAlt: "Gestión de blog y categorías — VerifiCARLO",
  },
  {
    title: "Comparte tu catálogo",
    description:
      "Genera un catálogo digital profesional que puedes compartir por WhatsApp o redes sociales. Tus clientes ven siempre la información actualizada.",
    image: "/images/projects/kb-cliente-3.png",
    imageAlt: "Catálogo digital público — KingBrake",
  },
];

export type Benefit = {
  title: string;
  description: string;
};

export const benefits: Benefit[] = [
  {
    title: "Actualizas sin depender de nadie",
    description:
      "Cambia precios, agrega productos o actualiza fotos cuando quieras. No necesitas llamar a un desarrollador cada vez.",
  },
  {
    title: "Todo en un solo lugar",
    description:
      "Olvídate de archivos sueltos, fotos en el celular y listas en Excel. Tu información vive en un solo sitio, siempre accesible.",
  },
  {
    title: "Catálogo profesional para tus clientes",
    description:
      "Comparte un enlace limpio y profesional en vez de fotos sueltas por WhatsApp. Tu negocio se ve como merece.",
  },
  {
    title: "Funciona en cualquier dispositivo",
    description:
      "Tu plataforma y catálogo se ven bien en celular, tablet y computadora. Tus clientes acceden desde donde sea.",
  },
];

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Conversamos sobre tu negocio",
    description:
      "Entendemos qué vendes, cómo trabajas hoy y qué necesitas gestionar. Sin lenguaje técnico, en una llamada o reunión corta.",
  },
  {
    number: "02",
    title: "Diseñamos tu plataforma",
    description:
      "Creamos la estructura y el diseño adaptados a tu tipo de negocio. Te mostramos cómo se verá antes de construirla.",
  },
  {
    number: "03",
    title: "Desarrollamos y entregamos",
    description:
      "Construimos tu plataforma, la probamos contigo y te enseñamos a usarla. Queda lista para que la administres tú mismo.",
  },
  {
    number: "04",
    title: "Te acompañamos después",
    description:
      "No te dejamos solo. Si tienes dudas o necesitas ajustes, estamos disponibles. Tu plataforma crece contigo.",
  },
];

export type Project = {
  client: string;
  url: string;
  type: string;
  description: string;
  image: string;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    client: "KingBrake",
    url: "https://kingbrake.com",
    type: "Catálogo digital + panel administrable",
    description:
      "Plataforma completa para gestionar su catálogo de pastillas de freno, categorías, distribuidores y contenido multimedia. Incluye panel de administración y catálogo público.",
    image: "/images/projects/kb-cliente-1.png",
    imageAlt: "KingBrake — Sitio web y catálogo de sistemas de frenado",
  },
  {
    client: "VerifiCARLO",
    url: "https://verificarlo.com",
    type: "Plataforma web + blog administrable",
    description:
      "Plataforma de verificación vehicular con consulta de placas, blog con artículos por categoría, newsletter y panel de administración completo.",
    image: "/images/projects/v-cliente-1.png",
    imageAlt: "VerifiCARLO — Plataforma de verificación vehicular",
  },
  {
    client: "Iglesia Cristiana Internacional Lima",
    url: "https://limaicc.org",
    type: "Sitio web institucional",
    description:
      "Sitio web para comunidad de iglesias en Lima con gestión de sedes, eventos, ministerios, estudios bíblicos y sistema de reservas con login.",
    image: "/images/projects/licc-cliente-1.png",
    imageAlt: "ICI Lima — Sitio web institucional de comunidad de iglesias",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  company: string;
};

export const testimonials: Testimonial[] = [];

export type FAQItem = {
  question: string;
  answer: string;
};

export const faqItems: FAQItem[] = [
  {
    question: "¿Cuánto tiempo toma tener mi plataforma lista?",
    answer:
      "Depende de la complejidad, pero la mayoría de plataformas las entregamos en 2 a 4 semanas. Te damos una fecha estimada desde la primera conversación.",
  },
  {
    question: "¿Puedo actualizar los productos yo mismo?",
    answer:
      "Sí, esa es la idea. Te entregamos un panel administrable donde tú mismo agregas, editas o eliminas productos, categorías e imágenes. Sin necesidad de saber programar.",
  },
  {
    question: "¿Qué pasa si necesito cambios después de la entrega?",
    answer:
      "Te acompañamos después del lanzamiento. Si necesitas ajustes menores o tienes dudas, estamos disponibles. Para funcionalidades nuevas, conversamos y te damos un presupuesto.",
  },
  {
    question: "¿Mis clientes necesitan instalar algo para ver el catálogo?",
    answer:
      "No. El catálogo es una página web que se abre desde cualquier navegador. Solo compartes el enlace por WhatsApp, redes sociales o donde prefieras.",
  },
  {
    question: "¿Incluye hosting y dominio?",
    answer:
      "Sí, nos encargamos de que tu plataforma esté en línea. El hosting está incluido en el servicio y te ayudamos con la configuración del dominio.",
  },
  {
    question: "¿Puedo ver un ejemplo antes de decidirme?",
    answer:
      "Sí, puedes ver proyectos como KingBrake, VerifiCARLO o ICI Lima en la sección de proyectos. Escríbenos y te compartimos más detalles.",
  },
];

export const ctaContent = {
  title: "¿Listo para profesionalizar tu negocio?",
  description:
    "Cuéntanos qué necesitas y te proponemos una solución a tu medida. Sin compromiso, sin lenguaje técnico.",
  cta: "Hablemos por WhatsApp",
  secondaryCta: "Escríbenos un correo",
  trust: "Sin compromiso · Respuesta en 24 h · Presupuesto sin costo",
} as const;

export const footerContent = {
  description: "Desarrollo de plataformas web administrables para pequeñas y medianas empresas en Perú.",
  links: {
    servicios: [
      { label: "Catálogos digitales", href: "#funcionalidades" },
      { label: "Plataformas administrables", href: "#funcionalidades" },
      { label: "Sitios web a medida", href: "#funcionalidades" },
    ],
    empresa: [
      { label: "Proceso de trabajo", href: "#proceso" },
      { label: "Proyectos", href: "#proyectos" },
      { label: "Preguntas frecuentes", href: "#faq" },
    ],
  },
  social: {
    instagram: "#",
    linkedin: "#",
    whatsapp: "https://wa.me/51998162677",
  },
  copyright: `© ${new Date().getFullYear()} Castennio. Todos los derechos reservados.`,
} as const;
