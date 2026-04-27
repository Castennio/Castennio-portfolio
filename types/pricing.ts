// ============================================
// PRICING TYPES - CASTENNIO CALCULATOR
// ============================================

export type PlanId = 'web-express' | 'web-profesional' | 'web-empresarial' | 'web-corporativa-elite';

export type ClientType = 'emprendimiento' | 'mype' | 'empresa-consolidada';

export type UrgencyLevel = 'estandar' | 'prioritario' | 'urgente';

export type AddonId =
  | 'chatbot'
  | 'seo'
  | 'database'
  | 'calendar'
  | 'multilanguage'
  | 'email-form'
  | 'analytics'
  | 'google-sheets'
  | 'dark-mode'
  | 'blog'
  | 'blog-cms'
  | 'reels'
  | 'reels-cms'
  | 'roles-permissions'
  | 'whatsapp-float';

export interface DeliveryTime {
  estandar: string;
  prioritario: string;
  urgente: string;
}

export interface PlanConfig {
  id: PlanId;
  name: string;
  basePrice: number;
  isFromPrice?: boolean; // For "Desde S/X" pricing
  badge?: string;
  description: string;
  deliveryTimes: DeliveryTime;
  requiresValidation?: boolean; // For urgent corporate projects
}

export interface ClientTypeConfig {
  id: ClientType;
  name: string;
  description: string;
  multiplier: number; // 0 = 0%, 0.15 = +15%, 0.35 = +35%
}

export interface UrgencyConfig {
  id: UrgencyLevel;
  name: string;
  description: string;
  multiplier: number; // 0 = 0%, 0.20 = +20%, 0.40 = +40%
}

export interface AddonConfig {
  id: AddonId;
  name: string;
  description: string;
  minPrice: number;
  maxPrice: number;
  note?: string; // Notas adicionales (ej: requiere otro addon)
  icon: string;
  bundleWith?: AddonId; // ID del addon con el que hace bundle/descuento
}

// Configuración de bundles/descuentos
export interface BundleConfig {
  id: string;
  addons: [AddonId, AddonId]; // Los dos addons que forman el bundle
  bundlePrice: number; // Precio especial del bundle
  bundleName: string; // Nombre del bundle para mostrar
}

export interface AppliedBundle {
  bundle: BundleConfig;
  savings: number; // Cuánto se ahorró
}

export interface QuoteCalculation {
  plan: PlanConfig;
  clientType: ClientTypeConfig;
  urgency: UrgencyConfig;
  addons: AddonConfig[];
  basePrice: number;
  clientTypeAdjustment: number;
  urgencyAdjustment: number;
  addonsTotal: number;
  addonsDiscount: number; // Descuento por bundles o plan
  appliedBundles: AppliedBundle[]; // Bundles aplicados
  includedAddons: AddonId[]; // Addons incluidos en el plan
  subtotal: number; // base + adjustments (before addons)
  finalPrice: number;
  deliveryTime: string;
  requiresValidation: boolean;
  notes: string[];
}

export interface QuoteFormState {
  selectedPlan: PlanId | null;
  selectedClientType: ClientType | null;
  selectedUrgency: UrgencyLevel | null;
  selectedAddons: AddonId[];
}

// Auth types for admin
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AdminUser | null;
}
