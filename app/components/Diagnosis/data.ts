export interface QuestionOption {
  id: string;
  label: string;
  description: string;
  icon: string;
  hoursImpact: number;
  automationPotential: number;
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
  totalHoursLost: number;
  automationPotential: number;
  hoursRecoverable: number;
  category: "critico" | "moderado" | "optimizado";
  recommendations: string[];
}

export const questions: Question[] = [
  {
    id: "business-type",
    question: "¿Cuál describe mejor tu negocio?",
    subtitle: "Esto nos ayuda a personalizar tu diagnóstico",
    options: [
      {
        id: "services",
        label: "Servicios profesionales",
        description: "Consultoría, legal, contable, marketing",
        icon: "briefcase",
        hoursImpact: 0,
        automationPotential: 0,
      },
      {
        id: "retail",
        label: "Comercio / Retail",
        description: "Tienda física u online",
        icon: "store",
        hoursImpact: 0,
        automationPotential: 0,
      },
      {
        id: "health",
        label: "Salud / Bienestar",
        description: "Clínica, gimnasio, spa, nutrición",
        icon: "heart",
        hoursImpact: 0,
        automationPotential: 0,
      },
      {
        id: "construction",
        label: "Construcción / Oficios",
        description: "Contratista, mantenimiento, reparaciones",
        icon: "hammer",
        hoursImpact: 0,
        automationPotential: 0,
      },
      {
        id: "education",
        label: "Educación / Capacitación",
        description: "Cursos, tutoría, coaching",
        icon: "book",
        hoursImpact: 0,
        automationPotential: 0,
      },
      {
        id: "other",
        label: "Otro tipo de negocio",
        description: "Mi negocio es diferente",
        icon: "sparkles",
        hoursImpact: 0,
        automationPotential: 0,
      },
    ],
  },
  {
    id: "time-consuming-tasks",
    question: "¿Qué tareas te quitan más tiempo?",
    subtitle: "Selecciona todas las que apliquen",
    multiSelect: true,
    options: [
      {
        id: "quotes",
        label: "Hacer cotizaciones",
        description: "Calcular precios, enviar propuestas",
        icon: "calculator",
        hoursImpact: 5,
        automationPotential: 85,
      },
      {
        id: "scheduling",
        label: "Agendar citas",
        description: "Coordinar horarios con clientes",
        icon: "calendar",
        hoursImpact: 4,
        automationPotential: 90,
      },
      {
        id: "follow-ups",
        label: "Dar seguimiento",
        description: "Recordatorios, confirmaciones",
        icon: "bell",
        hoursImpact: 6,
        automationPotential: 80,
      },
      {
        id: "invoicing",
        label: "Facturación y cobranza",
        description: "Emitir facturas, perseguir pagos",
        icon: "receipt",
        hoursImpact: 4,
        automationPotential: 75,
      },
      {
        id: "social-media",
        label: "Publicar en redes",
        description: "Crear contenido, responder mensajes",
        icon: "megaphone",
        hoursImpact: 8,
        automationPotential: 60,
      },
      {
        id: "reports",
        label: "Hacer reportes",
        description: "Ventas, inventario, métricas",
        icon: "chart",
        hoursImpact: 3,
        automationPotential: 90,
      },
    ],
  },
  {
    id: "client-management",
    question: "¿Cómo gestionas a tus clientes hoy?",
    subtitle: "Sé honesto, no juzgamos",
    options: [
      {
        id: "memory",
        label: "De memoria o notas",
        description: "Libreta, post-its, memoria",
        icon: "brain",
        hoursImpact: 8,
        automationPotential: 95,
      },
      {
        id: "excel",
        label: "Excel o Google Sheets",
        description: "Hojas de cálculo básicas",
        icon: "table",
        hoursImpact: 5,
        automationPotential: 80,
      },
      {
        id: "whatsapp",
        label: "Solo WhatsApp",
        description: "Todo por chat, sin sistema",
        icon: "chat",
        hoursImpact: 10,
        automationPotential: 85,
      },
      {
        id: "basic-crm",
        label: "CRM básico",
        description: "HubSpot Free, Zoho, similar",
        icon: "database",
        hoursImpact: 2,
        automationPotential: 40,
      },
      {
        id: "full-system",
        label: "Sistema completo",
        description: "ERP o CRM avanzado",
        icon: "server",
        hoursImpact: 1,
        automationPotential: 20,
      },
    ],
  },
  {
    id: "repetitive-hours",
    question: "¿Cuántas horas a la semana pierdes en tareas repetitivas?",
    subtitle: "Incluye todo lo que podría hacerse automáticamente",
    options: [
      {
        id: "5-less",
        label: "Menos de 5 horas",
        description: "Tengo buen control",
        icon: "clock-1",
        hoursImpact: 3,
        automationPotential: 50,
      },
      {
        id: "5-10",
        label: "5 a 10 horas",
        description: "Me quitan algo de tiempo",
        icon: "clock-2",
        hoursImpact: 7,
        automationPotential: 70,
      },
      {
        id: "10-20",
        label: "10 a 20 horas",
        description: "Me consumen bastante",
        icon: "clock-3",
        hoursImpact: 15,
        automationPotential: 80,
      },
      {
        id: "20-plus",
        label: "Más de 20 horas",
        description: "Es un problema serio",
        icon: "clock-4",
        hoursImpact: 25,
        automationPotential: 90,
      },
    ],
  },
];

export function calculateDiagnosis(answers: DiagnosisAnswer[]): DiagnosisResult {
  let totalHours = 0;
  let totalAutomationWeight = 0;
  let automationCount = 0;

  answers.forEach((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    if (!question) return;

    answer.selectedOptions.forEach((optionId) => {
      const option = question.options.find((o) => o.id === optionId);
      if (option) {
        totalHours += option.hoursImpact;
        totalAutomationWeight += option.automationPotential;
        automationCount++;
      }
    });
  });

  const automationPotential =
    automationCount > 0 ? Math.round(totalAutomationWeight / automationCount) : 0;
  const hoursRecoverable = Math.round(totalHours * (automationPotential / 100));

  let category: "critico" | "moderado" | "optimizado";
  if (hoursRecoverable >= 12) category = "critico";
  else if (hoursRecoverable >= 6) category = "moderado";
  else category = "optimizado";

  const recommendations = generateRecommendations(answers, category);

  return {
    totalHoursLost: totalHours,
    automationPotential,
    hoursRecoverable,
    category,
    recommendations,
  };
}

function generateRecommendations(
  answers: DiagnosisAnswer[],
  category: "critico" | "moderado" | "optimizado"
): string[] {
  const recs: string[] = [];

  const tasksAnswer = answers.find((a) => a.questionId === "time-consuming-tasks");
  if (tasksAnswer) {
    if (tasksAnswer.selectedOptions.includes("quotes")) {
      recs.push("Sistema de cotizaciones automáticas");
    }
    if (tasksAnswer.selectedOptions.includes("scheduling")) {
      recs.push("Agenda online con confirmaciones automáticas");
    }
    if (tasksAnswer.selectedOptions.includes("follow-ups")) {
      recs.push("Secuencias de seguimiento automatizadas");
    }
    if (tasksAnswer.selectedOptions.includes("invoicing")) {
      recs.push("Facturación y cobranza automática");
    }
  }

  const clientAnswer = answers.find((a) => a.questionId === "client-management");
  if (clientAnswer) {
    if (
      clientAnswer.selectedOptions.includes("memory") ||
      clientAnswer.selectedOptions.includes("whatsapp")
    ) {
      recs.push("CRM simple para centralizar clientes");
    }
  }

  if (category === "critico") {
    recs.push("Dashboard de métricas en tiempo real");
  }

  return recs.slice(0, 4);
}
