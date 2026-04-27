export interface QuestionOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  // Scoring for recommendation
  projectType: "new-website" | "redesign" | "migration" | "none";
  complexity: number; // 1-5 (affects plan recommendation)
  urgency: number; // 1-3
  // For addons that have dependencies or discounts
  requires?: string[]; // IDs of required features
  discountWith?: string[]; // IDs of features that give discount when combined
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

export interface PlanRecommendation {
  id: "express" | "profesional" | "empresarial" | "elite";
  name: string;
  tagline: string;
  description: string;
  includes: string[];
  priceRange: string;
  deliveryTime: string;
}

export interface ServiceRecommendation {
  id: "redesign" | "migration" | "integration";
  name: string;
  description: string;
  deliveryTime: string;
}

export interface DiagnosisResult {
  hasWebsite: boolean;
  // For new websites
  recommendedPlan?: PlanRecommendation;
  // For existing websites
  recommendedService?: ServiceRecommendation;
  suggestedFeatures: string[];
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
        projectType: "new-website",
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
        projectType: "new-website",
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
        projectType: "new-website",
        complexity: 2,
        urgency: 2,
      },
      {
        id: "more-contacts",
        label: "Generar más contactos",
        description: "Que me escriban interesados",
        icon: "users",
        projectType: "new-website",
        complexity: 1,
        urgency: 3,
      },
      {
        id: "sell-online",
        label: "Vender productos online",
        description: "E-commerce o catálogo con pagos",
        icon: "shopping-cart",
        projectType: "new-website",
        complexity: 4,
        urgency: 2,
      },
      {
        id: "show-services",
        label: "Mostrar mis servicios profesionalmente",
        description: "Portafolio o presentación de empresa",
        icon: "briefcase",
        projectType: "new-website",
        complexity: 2,
        urgency: 1,
      },
      {
        id: "schedule-appointments",
        label: "Que agenden citas conmigo",
        description: "Agenda online integrada",
        icon: "calendar",
        projectType: "new-website",
        complexity: 3,
        urgency: 2,
      },
      {
        id: "manage-business",
        label: "Gestionar mi negocio digitalmente",
        description: "Panel admin, usuarios, automatizaciones",
        icon: "settings",
        projectType: "new-website",
        complexity: 5,
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
        complexity: 0,
        urgency: 0,
      },
      {
        id: "online-scheduling",
        label: "Agenda de citas online",
        description: "Google Calendar o similar",
        icon: "calendar",
        projectType: "none",
        complexity: 3,
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
        description: "Cobrar online (Culqi)",
        icon: "credit-card",
        projectType: "none",
        complexity: 5,
        urgency: 0,
      },
      {
        id: "blog-view",
        label: "Sección de Blog (solo ver)",
        description: "Mostrar articulos y noticias",
        icon: "file-text",
        projectType: "none",
        complexity: 2,
        urgency: 0,
        discountWith: ["blog-cms"],
      },
      {
        id: "blog-cms",
        label: "Blog con panel de gestión",
        description: "Crear, editar y eliminar articulos",
        icon: "edit-3",
        projectType: "none",
        complexity: 4,
        urgency: 0,
        requires: ["roles-permissions"],
        discountWith: ["blog-view"],
      },
      {
        id: "reels-view",
        label: "Sección de Reels (solo ver)",
        description: "Mostrar videos cortos",
        icon: "video",
        projectType: "none",
        complexity: 2,
        urgency: 0,
        discountWith: ["reels-cms"],
      },
      {
        id: "reels-cms",
        label: "Reels con panel de gestión",
        description: "Subir y administrar videos",
        icon: "film",
        projectType: "none",
        complexity: 4,
        urgency: 0,
        requires: ["roles-permissions"],
        discountWith: ["reels-view"],
      },
      {
        id: "roles-permissions",
        label: "Roles y permisos",
        description: "Control de acceso por usuario",
        icon: "shield",
        projectType: "none",
        complexity: 4,
        urgency: 0,
      },
      {
        id: "admin-panel",
        label: "Panel administrativo",
        description: "Gestionar contenido desde un dashboard",
        icon: "layout",
        projectType: "none",
        complexity: 5,
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

// Plans for NEW websites
const plans: Record<string, PlanRecommendation> = {
  express: {
    id: "express",
    name: "Web Express",
    tagline: "Tu negocio online en tiempo record",
    description: "Landing page simple y efectiva para empezar a captar clientes. Ideal para validar tu idea de negocio rapidamente.",
    includes: [
      "1 pagina tipo landing",
      "Diseño responsive (celular + PC)",
      "Boton de WhatsApp",
      "Informacion de contacto",
      "Redes sociales",
    ],
    priceRange: "S/. 49 - S/. 149",
    deliveryTime: "3-5 dias",
  },
  profesional: {
    id: "profesional",
    name: "Web Profesional",
    tagline: "Diseñada para generar confianza y ventas",
    description: "Sitio web completo con diseño premium. Para negocios que quieren destacar y generar mas contactos.",
    includes: [
      "Todo lo del plan Express",
      "Google Maps (ubicacion)",
      "Formulario de contacto con envio por correo",
      "SEO local basico",
      "Seccion de testimonios",
      "Sobre nosotros",
      "Llamadas a la accion estrategicas",
    ],
    priceRange: "S/. 199 - S/. 299",
    deliveryTime: "1-2 semanas",
  },
  empresarial: {
    id: "empresarial",
    name: "Web Empresarial",
    tagline: "Tu negocio se ve serio y competitivo",
    description: "Solucion completa para negocios en crecimiento. Multiples paginas, blog, reservas y mas funcionalidades.",
    includes: [
      "Todo lo del plan Profesional",
      "Pagina individual por servicio",
      "Blog o seccion de noticias",
      "Sistema de reservas",
      "Seccion de FAQ",
      "SEO mas potente",
      "Google Analytics",
      "Google Sheets para datos",
    ],
    priceRange: "S/. 399 - S/. 899",
    deliveryTime: "2-4 semanas",
  },
  elite: {
    id: "elite",
    name: "Web Corporativa Elite",
    tagline: "Tu negocio opera digitalmente",
    description: "Plataforma empresarial completa con panel administrativo, base de datos, pagos online y automatizaciones.",
    includes: [
      "Todo lo del plan Empresarial",
      "Base de datos",
      "Panel administrativo completo",
      "Login y gestion de usuarios",
      "Roles y permisos",
      "Integracion de pagos (Culqi)",
      "Dashboard con metricas",
      "Automatizaciones",
    ],
    priceRange: "Desde S/. 900",
    deliveryTime: "4-8 semanas",
  },
};

// Services for EXISTING websites
const services: Record<string, ServiceRecommendation> = {
  redesign: {
    id: "redesign",
    name: "Rediseño de Sitio",
    description: "Renovamos tu sitio actual con diseno moderno y mejor rendimiento. Mantenemos lo que funciona, mejoramos lo demas.",
    deliveryTime: "2-3 semanas",
  },
  migration: {
    id: "migration",
    name: "Migracion Tecnologica",
    description: "Pasamos tu sitio de WordPress, Wix u otra plataforma a tecnologia moderna (NextJS). Mas rapido, mas seguro.",
    deliveryTime: "3-5 semanas",
  },
  integration: {
    id: "integration",
    name: "Integraciones",
    description: "Conectamos tu sitio con pagos, agenda, formularios y las herramientas que tu negocio necesita.",
    deliveryTime: "1-2 semanas",
  },
};

// Helper to check for feature dependencies and discounts
interface FeatureAnalysis {
  selectedFeatures: string[];
  missingDependencies: { feature: string; requires: string }[];
  discountPairs: { feature1: string; feature2: string }[];
}

function analyzeFeatures(selectedOptionIds: string[]): FeatureAnalysis {
  const featuresQuestion = questions.find((q) => q.id === "features-needed");
  if (!featuresQuestion) {
    return { selectedFeatures: [], missingDependencies: [], discountPairs: [] };
  }

  const selectedFeatures: string[] = [];
  const missingDependencies: { feature: string; requires: string }[] = [];
  const discountPairs: { feature1: string; feature2: string }[] = [];
  const processedDiscounts = new Set<string>();

  selectedOptionIds.forEach((optionId) => {
    const option = featuresQuestion.options.find((o) => o.id === optionId);
    if (!option) return;

    selectedFeatures.push(option.label);

    // Check dependencies
    if (option.requires) {
      option.requires.forEach((requiredId) => {
        if (!selectedOptionIds.includes(requiredId)) {
          const requiredOption = featuresQuestion.options.find((o) => o.id === requiredId);
          if (requiredOption) {
            missingDependencies.push({
              feature: option.label,
              requires: requiredOption.label,
            });
          }
        }
      });
    }

    // Check for discount pairs
    if (option.discountWith) {
      option.discountWith.forEach((discountWithId) => {
        if (selectedOptionIds.includes(discountWithId)) {
          const pairKey = [optionId, discountWithId].sort().join("-");
          if (!processedDiscounts.has(pairKey)) {
            processedDiscounts.add(pairKey);
            const discountOption = featuresQuestion.options.find((o) => o.id === discountWithId);
            if (discountOption) {
              discountPairs.push({
                feature1: option.label,
                feature2: discountOption.label,
              });
            }
          }
        }
      });
    }
  });

  return { selectedFeatures, missingDependencies, discountPairs };
}

export function calculateDiagnosis(answers: DiagnosisAnswer[]): DiagnosisResult {
  let hasWebsite = false;
  let serviceType: "redesign" | "migration" | "integration" | null = null;
  let totalComplexity = 0;
  let totalUrgency = 0;
  let urgencyCount = 0;

  // Get current website status
  const websiteAnswer = answers.find((a) => a.questionId === "current-website");
  if (websiteAnswer && websiteAnswer.selectedOptions.length > 0) {
    const selectedId = websiteAnswer.selectedOptions[0];
    const option = questions[0].options.find((o) => o.id === selectedId);

    if (selectedId === "no-website") {
      hasWebsite = false;
    } else if (selectedId === "outdated" || selectedId === "not-working") {
      hasWebsite = true;
      serviceType = "redesign";
    } else if (selectedId === "different-tech") {
      hasWebsite = true;
      serviceType = "migration";
    } else if (selectedId === "working-fine") {
      hasWebsite = true;
      serviceType = "integration";
    }

    if (option) {
      totalComplexity += option.complexity;
      totalUrgency += option.urgency;
      urgencyCount++;
    }
  }

  // Get main goal - affects complexity
  const goalAnswer = answers.find((a) => a.questionId === "main-goal");
  if (goalAnswer && goalAnswer.selectedOptions.length > 0) {
    const option = questions[1].options.find((o) => o.id === goalAnswer.selectedOptions[0]);
    if (option) {
      totalComplexity += option.complexity;
      totalUrgency += option.urgency;
      urgencyCount++;
    }
  }

  // Collect and analyze features
  const featuresAnswer = answers.find((a) => a.questionId === "features-needed");
  const selectedFeatureIds = featuresAnswer?.selectedOptions || [];
  const featureAnalysis = analyzeFeatures(selectedFeatureIds);

  // Add complexity from features
  const featuresQuestion = questions.find((q) => q.id === "features-needed");
  if (featuresQuestion && featuresAnswer) {
    featuresAnswer.selectedOptions.forEach((optionId) => {
      const option = featuresQuestion.options.find((o) => o.id === optionId);
      if (option) {
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

  // Calculate urgency level
  const avgUrgency = urgencyCount > 0 ? totalUrgency / urgencyCount : 2;
  let urgencyLevel: "alta" | "media" | "baja";
  let urgencyMessage: string;

  if (avgUrgency >= 2.5) {
    urgencyLevel = "alta";
    urgencyMessage = "Deberias empezar pronto. Cada dia sin presencia web son oportunidades perdidas.";
  } else if (avgUrgency >= 1.5) {
    urgencyLevel = "media";
    urgencyMessage = "Tienes tiempo para planificar bien, pero no lo dejes para despues.";
  } else {
    urgencyLevel = "baja";
    urgencyMessage = "Puedes tomarte tu tiempo para decidir. Estamos aqui cuando estes listo.";
  }

  // Determine recommendation based on whether they have a website or not
  if (!hasWebsite) {
    // Recommend a PLAN based on complexity thresholds
    // Express: 1-3 | Profesional: 4-6 | Empresarial: 7-10 | Elite: 11+
    let planId: "express" | "profesional" | "empresarial" | "elite";

    if (totalComplexity <= 3) {
      planId = "express";
    } else if (totalComplexity <= 6) {
      planId = "profesional";
    } else if (totalComplexity <= 10) {
      planId = "empresarial";
    } else {
      planId = "elite";
    }

    // Force upgrades based on specific features
    const hasPaymentGateway = selectedFeatureIds.includes("payment-gateway");
    const hasAdminPanel = selectedFeatureIds.includes("admin-panel");
    const hasRolesPermissions = selectedFeatureIds.includes("roles-permissions");
    const hasBlogCms = selectedFeatureIds.includes("blog-cms");
    const hasReelsCms = selectedFeatureIds.includes("reels-cms");
    const hasScheduling = selectedFeatureIds.includes("online-scheduling");
    const hasBlogView = selectedFeatureIds.includes("blog-view");

    // Elite: payment gateway, admin panel, roles, or any CMS
    if (hasPaymentGateway || hasAdminPanel || hasRolesPermissions || hasBlogCms || hasReelsCms) {
      planId = "elite";
    }
    // Empresarial: scheduling or blog view (included in plan 3)
    else if ((hasScheduling || hasBlogView) && (planId === "express" || planId === "profesional")) {
      planId = "empresarial";
    }

    // Build suggested features with dependency warnings
    const suggestedFeatures = [...featureAnalysis.selectedFeatures];

    // Add dependency warnings
    featureAnalysis.missingDependencies.forEach((dep) => {
      if (!suggestedFeatures.includes(`⚠️ ${dep.requires} (requerido)`)) {
        suggestedFeatures.push(`⚠️ ${dep.requires} (requerido)`);
      }
    });

    // Add discount notes
    featureAnalysis.discountPairs.forEach((pair) => {
      suggestedFeatures.push(`💰 Descuento: ${pair.feature1} + ${pair.feature2}`);
    });

    return {
      hasWebsite: false,
      recommendedPlan: plans[planId],
      suggestedFeatures: suggestedFeatures.slice(0, 8),
      urgencyLevel,
      urgencyMessage,
    };
  } else {
    // Recommend a SERVICE for existing websites (redesign, migration, integration)
    // But also recommend a plan tier for the work
    let planId: "express" | "profesional" | "empresarial" | "elite" = "profesional";

    if (totalComplexity <= 3) {
      planId = "express";
    } else if (totalComplexity <= 6) {
      planId = "profesional";
    } else if (totalComplexity <= 10) {
      planId = "empresarial";
    } else {
      planId = "elite";
    }

    return {
      hasWebsite: true,
      recommendedService: services[serviceType || "redesign"],
      recommendedPlan: plans[planId],
      suggestedFeatures: featureAnalysis.selectedFeatures.slice(0, 5),
      urgencyLevel,
      urgencyMessage,
    };
  }
}
