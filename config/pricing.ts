// ============================================
// PRICING CONFIGURATION - CASTENNIO
// Single source of truth for all pricing data
// ============================================

import type {
  PlanConfig,
  ClientTypeConfig,
  UrgencyConfig,
  AddonConfig,
  PlanId,
  ClientType,
  UrgencyLevel,
  AddonId,
} from '@/types/pricing';

// ============================================
// PLANS CONFIGURATION
// ============================================

export const PLANS: Record<PlanId, PlanConfig> = {
  'web-express': {
    id: 'web-express',
    name: 'Web Express',
    basePrice: 49,
    description: 'Landing page simple y efectiva para empezar a captar clientes',
    deliveryTimes: {
      estandar: '72 horas',
      prioritario: '48 horas',
      urgente: '24 horas',
    },
  },
  'web-profesional': {
    id: 'web-profesional',
    name: 'Web Profesional',
    basePrice: 199,
    badge: 'Más recomendado',
    description: 'Sitio web completo con diseño premium y funcionalidades avanzadas',
    deliveryTimes: {
      estandar: '5 días',
      prioritario: '3 días',
      urgente: '2 días',
    },
  },
  'web-empresarial': {
    id: 'web-empresarial',
    name: 'Web Empresarial',
    basePrice: 399,
    badge: 'Escalable',
    description: 'Solución robusta para negocios en crecimiento con múltiples páginas',
    deliveryTimes: {
      estandar: '3 semanas',
      prioritario: '2 semanas',
      urgente: '1 semana',
    },
  },
  'web-corporativa-elite': {
    id: 'web-corporativa-elite',
    name: 'Web Corporativa Elite',
    basePrice: 900,
    isFromPrice: true,
    badge: 'Solución integral',
    description: 'Plataforma empresarial completa con integraciones y funcionalidades a medida',
    deliveryTimes: {
      estandar: '8 semanas',
      prioritario: '6 semanas',
      urgente: '4 semanas',
    },
    requiresValidation: true,
  },
};

// ============================================
// CLIENT TYPES CONFIGURATION
// ============================================

export const CLIENT_TYPES: Record<ClientType, ClientTypeConfig> = {
  'emprendimiento': {
    id: 'emprendimiento',
    name: 'Emprendimiento personal',
    description: 'Persona natural iniciando su negocio',
    multiplier: 0,
  },
  'mype': {
    id: 'mype',
    name: 'MYPE / Negocio pequeño',
    description: 'Micro o pequeña empresa establecida',
    multiplier: 0.15,
  },
  'empresa-consolidada': {
    id: 'empresa-consolidada',
    name: 'Empresa consolidada',
    description: 'Empresa con operaciones establecidas',
    multiplier: 0.35,
  },
};

// ============================================
// URGENCY LEVELS CONFIGURATION
// ============================================

export const URGENCY_LEVELS: Record<UrgencyLevel, UrgencyConfig> = {
  'estandar': {
    id: 'estandar',
    name: 'Estándar',
    description: 'Tiempo de entrega normal',
    multiplier: 0,
  },
  'prioritario': {
    id: 'prioritario',
    name: 'Prioritario',
    description: 'Entrega acelerada con prioridad',
    multiplier: 0.20,
  },
  'urgente': {
    id: 'urgente',
    name: 'Urgente',
    description: 'Máxima prioridad, entrega express',
    multiplier: 0.40,
  },
};

// ============================================
// HELPER ARRAYS FOR ITERATION
// ============================================

export const PLAN_LIST = Object.values(PLANS);
export const CLIENT_TYPE_LIST = Object.values(CLIENT_TYPES);
export const URGENCY_LEVEL_LIST = Object.values(URGENCY_LEVELS);

// ============================================
// CURRENCY & LOCALE CONFIG
// ============================================

export const CURRENCY_CONFIG = {
  locale: 'es-PE',
  currency: 'PEN',
  symbol: 'S/',
} as const;

// ============================================
// UI CONFIG
// ============================================

export const ADMIN_THEME = {
  primary: '#7C3AED',
  primaryHover: '#6D28D9',
  primaryLight: 'rgba(124, 58, 237, 0.1)',
  primaryGlow: 'rgba(124, 58, 237, 0.3)',
} as const;

// ============================================
// ADDONS / SERVICIOS ADICIONALES
// ============================================

export const ADDONS: Record<AddonId, AddonConfig> = {
  'chatbot': {
    id: 'chatbot',
    name: 'Chatbot',
    description: 'Asistente virtual para atención automática',
    minPrice: 30,
    maxPrice: 100,
    icon: 'bot',
  },
  'seo': {
    id: 'seo',
    name: 'SEO avanzado',
    description: 'Posicionamiento en buscadores',
    minPrice: 50,
    maxPrice: 120,
    icon: 'search',
  },
  'database': {
    id: 'database',
    name: 'Base de datos (PostgreSQL)',
    description: 'Almacenamiento y gestión de datos',
    minPrice: 80,
    maxPrice: 150,
    icon: 'database',
  },
  'calendar': {
    id: 'calendar',
    name: 'Google Calendar / Reservas',
    description: 'Sistema de citas y reservaciones',
    minPrice: 40,
    maxPrice: 100,
    icon: 'calendar',
  },
  'multilanguage': {
    id: 'multilanguage',
    name: 'Cambiar 1 idioma',
    description: 'Agregar soporte para un idioma adicional',
    minPrice: 80,
    maxPrice: 180,
    icon: 'globe',
  },
  'email-form': {
    id: 'email-form',
    name: 'Formulario con envío de correo',
    description: 'Formulario de contacto con notificaciones',
    minPrice: 10,
    maxPrice: 40,
    icon: 'mail',
  },
  'analytics': {
    id: 'analytics',
    name: 'Analytics',
    description: 'Métricas y reportes de visitas',
    minPrice: 20,
    maxPrice: 60,
    icon: 'chart',
  },
  'google-sheets': {
    id: 'google-sheets',
    name: 'Google Sheets',
    description: 'Integración con hojas de cálculo',
    minPrice: 35,
    maxPrice: 100,
    icon: 'table',
  },
  'dark-mode': {
    id: 'dark-mode',
    name: 'Dark mode',
    description: 'Modo oscuro para la interfaz',
    minPrice: 25,
    maxPrice: 50,
    icon: 'moon',
  },
  'blog': {
    id: 'blog',
    name: 'Blog',
    description: 'Sección de artículos y noticias',
    minPrice: 5,
    maxPrice: 20,
    icon: 'edit',
  },
  'blog-cms': {
    id: 'blog-cms',
    name: 'Blog CMS',
    description: 'Blog con panel de administración',
    minPrice: 40,
    maxPrice: 100,
    note: 'Requiere adicional de roles y permisos',
    icon: 'layout',
  },
};

export const ADDON_LIST = Object.values(ADDONS);
