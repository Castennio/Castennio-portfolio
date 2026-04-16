export interface QuestionOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  // Scoring for recommendation
  projectType: "landing" | "website" | "redesign" | "migration" | "none";
  complexity: number; // 1-3
  urgency: number; // 1-3
}

export interface Question {
  id: string;
  question: string;
  subtitle: string;
  options: QuestionOption[];
  multiSelect?: boolean;
}

export interface DiagnosisAnswer {
  questionId: string;
  selectedOptions: string[];
}

export interface DiagnosisResult {
  projectType: "landing" | "website" | "redesign" | "migration";
  projectLabel: string;
  projectDescription: string;
  suggestedFeatures: string[];
  timeEstimate: string;
  urgencyLevel: "alta" | "media" | "baja";
  urgencyMessage: string;
}

export const questions: Question[] = [
  {
    id: "current-website",
    question: "¿Tienes página web actualmente?",
    subtitle: "Sé honesto, no juzgamos",
    options: [
      {
        id: "no-website",
        label: "No tengo página web",
        description: "Nunca he tenido o la dejé morir",
        icon: "x-circle",
        projectType: "landing",
        complexity: 1,
        urgency: 3,
      },
      {
        id: "outdated",
        label: "Sí, pero está desactualizada",
        description: "Tiene años sin tocarla",
        icon: "clock",
        projectType: "redesign",
        complexity: 2,
        urgency: 2,
      },
      {
        id: "not-working",
        label: "Sí, pero no genera resultados",
        description: "Nadie me contacta por ahí",
        icon: "trending-down",
        projectType: "redesign",
        complexity: 2,
        urgency: 3,
      },
      {
        id: "different-tech",
        label: "Sí, pero quiero cambiar de tecnología",
        description: "WordPress, Wix, u otra plataforma",
        icon: "refresh",
        projectType: "migration",
        complexity: 3,
        urgency: 1,
      },
      {
        id: "working-fine",
        label: "Sí, y funciona bien",
        description: "Solo quiero mejorarla",
        icon: "check-circle",
        projectType: "website",
        complexity: 2,
        urgency: 1,
      },
    ],
  },
  {
    id: "main-goal",
    question: "¿Cuál es tu principal objetivo?",
    subtitle: "Elige el más importante para ti",
    options: [
      {
        id: "be-found",
        label: "Que me encuentren en Google",
        description: "Aparecer cuando buscan mi servicio",
        icon: "search",
        projectType: "website",
        complexity: 2,
        urgency: 2,
      },
      {
        id: "more-contacts",
        label: "Generar más contactos",
        description: "Que me escriban interesados",
        icon: "users",
        projectType: "landing",
        complexity: 1,
        urgency: 3,
      },
      {
        id: "sell-online",
        label: "Vender productos online",
        description: "E-commerce o catálogo con pagos",
        icon: "shopping-cart",
        projectType: "website",
        complexity: 3,
        urgency: 2,
      },
      {
        id: "show-services",
        label: "Mostrar mis servicios profesionalmente",
        description: "Portafolio o presentación de empresa",
        icon: "briefcase",
        projectType: "website",
        complexity: 2,
        urgency: 1,
      },
      {
        id: "schedule-appointments",
        label: "Que agenden citas conmigo",
        description: "Agenda online integrada",
        icon: "calendar",
        projectType: "website",
        complexity: 2,
        urgency: 2,
      },
    ],
  },
  {
    id: "features-needed",
    question: "¿Qué funcionalidades necesitas?",
    subtitle: "Selecciona todas las que apliquen",
    multiSelect: true,
    options: [
      {
        id: "contact-form",
        label: "Formulario de contacto",
        description: "Para que te escriban desde la web",
        icon: "mail",
        projectType: "none",
        complexity: 1,
        urgency: 0,
      },
      {
        id: "whatsapp-button",
        label: "Botón de WhatsApp",
        description: "Contacto directo por chat",
        icon: "chat",
        projectType: "none",
        complexity: 1,
        urgency: 0,
      },
      {
        id: "online-scheduling",
        label: "Agenda de citas online",
        description: "Google Calendar o similar",
        icon: "calendar",
        projectType: "none",
        complexity: 2,
        urgency: 0,
      },
      {
        id: "product-catalog",
        label: "Catálogo de productos/servicios",
        description: "Mostrar lo que ofreces",
        icon: "grid",
        projectType: "none",
        complexity: 2,
        urgency: 0,
      },
      {
        id: "payment-gateway",
        label: "Pasarela de pagos",
        description: "Cobrar online",
        icon: "credit-card",
        projectType: "none",
        complexity: 3,
        urgency: 0,
      },
      {
        id: "blog",
        label: "Blog o noticias",
        description: "Publicar contenido",
        icon: "file-text",
        projectType: "none",
        complexity: 2,
        urgency: 0,
      },
    ],
  },
  {
    id: "timeline",
    question: "¿Qué tan pronto lo necesitas?",
    subtitle: "Esto nos ayuda a priorizar",
    options: [
      {
        id: "asap",
        label: "Lo antes posible",
        description: "Ya debería tenerlo",
        icon: "zap",
        projectType: "none",
        complexity: 0,
        urgency: 3,
      },
      {
        id: "1-2-months",
        label: "En 1-2 meses",
        description: "Tengo algo de tiempo",
        icon: "clock",
        projectType: "none",
        complexity: 0,
        urgency: 2,
      },
      {
        id: "no-rush",
        label: "Sin prisa",
        description: "Estoy explorando opciones",
        icon: "coffee",
        projectType: "none",
        complexity: 0,
        urgency: 1,
      },
    ],
  },
];

const projectLabels = {
  landing: "Landing Page",
  website: "Sitio Web Completo",
  redesign: "Rediseño de Sitio",
  migration: "Migración Tecnológica",
};

const projectDescriptions = {
  landing: "Una página efectiva enfocada en convertir visitantes en contactos. Ideal para empezar rápido.",
  website: "Un sitio web completo con múltiples páginas y funcionalidades. Para negocios que necesitan más presencia.",
  redesign: "Renovamos tu sitio actual con diseño moderno y mejor rendimiento. Mantenemos lo que funciona, mejoramos lo demás.",
  migration: "Pasamos tu sitio a tecnología moderna (NextJS). Más rápido, más seguro, más fácil de mantener.",
};

const timeEstimates = {
  landing: "1-2 semanas",
  website: "3-4 semanas",
  redesign: "2-3 semanas",
  migration: "3-5 semanas",
};

export function calculateDiagnosis(answers: DiagnosisAnswer[]): DiagnosisResult {
  // Determine project type based on first two questions
  let projectType: "landing" | "website" | "redesign" | "migration" = "landing";
  let totalComplexity = 0;
  let totalUrgency = 0;
  let urgencyCount = 0;

  // Get current website status
  const websiteAnswer = answers.find((a) => a.questionId === "current-website");
  if (websiteAnswer && websiteAnswer.selectedOptions.length > 0) {
    const option = questions[0].options.find((o) => o.id === websiteAnswer.selectedOptions[0]);
    if (option && option.projectType !== "none") {
      projectType = option.projectType;
    }
    if (option) {
      totalUrgency += option.urgency;
      urgencyCount++;
    }
  }

  // Get main goal - might override project type
  const goalAnswer = answers.find((a) => a.questionId === "main-goal");
  if (goalAnswer && goalAnswer.selectedOptions.length > 0) {
    const option = questions[1].options.find((o) => o.id === goalAnswer.selectedOptions[0]);
    if (option) {
      totalComplexity += option.complexity;
      totalUrgency += option.urgency;
      urgencyCount++;

      // If they want to sell online, upgrade to website
      if (option.id === "sell-online" && projectType === "landing") {
        projectType = "website";
      }
    }
  }

  // Collect suggested features
  const suggestedFeatures: string[] = [];
  const featuresAnswer = answers.find((a) => a.questionId === "features-needed");
  if (featuresAnswer) {
    featuresAnswer.selectedOptions.forEach((optionId) => {
      const option = questions[2].options.find((o) => o.id === optionId);
      if (option) {
        suggestedFeatures.push(option.label);
        totalComplexity += option.complexity;
      }
    });
  }

  // Get timeline urgency
  const timelineAnswer = answers.find((a) => a.questionId === "timeline");
  if (timelineAnswer && timelineAnswer.selectedOptions.length > 0) {
    const option = questions[3].options.find((o) => o.id === timelineAnswer.selectedOptions[0]);
    if (option) {
      totalUrgency += option.urgency;
      urgencyCount++;
    }
  }

  // If high complexity features selected and project is landing, upgrade to website
  if (totalComplexity > 5 && projectType === "landing") {
    projectType = "website";
  }

  // Calculate urgency level
  const avgUrgency = urgencyCount > 0 ? totalUrgency / urgencyCount : 2;
  let urgencyLevel: "alta" | "media" | "baja";
  let urgencyMessage: string;

  if (avgUrgency >= 2.5) {
    urgencyLevel = "alta";
    urgencyMessage = "Deberías empezar pronto. Cada día sin presencia web son oportunidades perdidas.";
  } else if (avgUrgency >= 1.5) {
    urgencyLevel = "media";
    urgencyMessage = "Tienes tiempo para planificar bien, pero no lo dejes para después.";
  } else {
    urgencyLevel = "baja";
    urgencyMessage = "Puedes tomarte tu tiempo para decidir. Estamos aquí cuando estés listo.";
  }

  return {
    projectType,
    projectLabel: projectLabels[projectType],
    projectDescription: projectDescriptions[projectType],
    suggestedFeatures: suggestedFeatures.slice(0, 5),
    timeEstimate: timeEstimates[projectType],
    urgencyLevel,
    urgencyMessage,
  };
}
