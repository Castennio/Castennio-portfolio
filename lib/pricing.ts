// ============================================
// PRICING HELPERS - CASTENNIO CALCULATOR
// Centralized calculation logic
// ============================================

import {
  PLANS,
  CLIENT_TYPES,
  URGENCY_LEVELS,
  ADDONS,
  CURRENCY_CONFIG,
} from '@/config/pricing';

import type {
  PlanId,
  ClientType,
  UrgencyLevel,
  AddonId,
  PlanConfig,
  ClientTypeConfig,
  UrgencyConfig,
  AddonConfig,
  QuoteCalculation,
} from '@/types/pricing';

// ============================================
// CONFIG GETTERS
// ============================================

export function getPlanConfig(planId: PlanId): PlanConfig {
  return PLANS[planId];
}

export function getClientTypeConfig(clientTypeId: ClientType): ClientTypeConfig {
  return CLIENT_TYPES[clientTypeId];
}

export function getUrgencyConfig(urgencyId: UrgencyLevel): UrgencyConfig {
  return URGENCY_LEVELS[urgencyId];
}

export function getAddonConfig(addonId: AddonId): AddonConfig {
  return ADDONS[addonId];
}

export function getAddonsConfigs(addonIds: AddonId[]): AddonConfig[] {
  return addonIds.map((id) => ADDONS[id]);
}

export function calculateAddonsTotal(addons: AddonConfig[]): number {
  // Usa el precio mínimo para el cálculo base
  return addons.reduce((total, addon) => total + addon.minPrice, 0);
}

export function calculateAddonsMaxTotal(addons: AddonConfig[]): number {
  return addons.reduce((total, addon) => total + addon.maxPrice, 0);
}

// ============================================
// CALCULATION FUNCTIONS
// ============================================

/**
 * Round to nearest 0.10 (Peruvian currency minimum)
 */
export function roundToDecimal(amount: number): number {
  return Math.round(amount * 10) / 10;
}

/**
 * Calculate the client type adjustment amount
 */
export function calculateClientTypeAdjustment(
  basePrice: number,
  clientType: ClientTypeConfig
): number {
  return roundToDecimal(basePrice * clientType.multiplier);
}

/**
 * Calculate the urgency adjustment amount
 */
export function calculateUrgencyAdjustment(
  basePrice: number,
  urgency: UrgencyConfig
): number {
  return roundToDecimal(basePrice * urgency.multiplier);
}

/**
 * Calculate the final price with all adjustments
 */
export function calculateFinalPrice(
  basePrice: number,
  clientTypeAdjustment: number,
  urgencyAdjustment: number
): number {
  return roundToDecimal(basePrice + clientTypeAdjustment + urgencyAdjustment);
}

/**
 * Get the delivery time for a plan and urgency level
 */
export function calculateDeliveryTime(
  plan: PlanConfig,
  urgency: UrgencyLevel
): string {
  return plan.deliveryTimes[urgency];
}

/**
 * Main calculation function - generates complete quote
 */
export function calculateQuote(
  planId: PlanId,
  clientTypeId: ClientType,
  urgencyId: UrgencyLevel,
  addonIds: AddonId[] = []
): QuoteCalculation {
  const plan = getPlanConfig(planId);
  const clientType = getClientTypeConfig(clientTypeId);
  const urgency = getUrgencyConfig(urgencyId);
  const addons = getAddonsConfigs(addonIds);

  const basePrice = plan.basePrice;
  const clientTypeAdjustment = calculateClientTypeAdjustment(basePrice, clientType);
  const urgencyAdjustment = calculateUrgencyAdjustment(basePrice, urgency);
  const subtotal = calculateFinalPrice(basePrice, clientTypeAdjustment, urgencyAdjustment);
  const addonsTotal = calculateAddonsTotal(addons);
  const finalPrice = roundToDecimal(subtotal + addonsTotal);
  const deliveryTime = calculateDeliveryTime(plan, urgencyId);

  // Check if validation is required (corporate + urgent)
  const requiresValidation = Boolean(
    plan.requiresValidation && urgencyId === 'urgente'
  );

  // Generate notes
  const notes: string[] = [];

  if (plan.isFromPrice) {
    notes.push('Precio base indicativo. El precio final puede variar según requerimientos específicos.');
  }

  if (requiresValidation) {
    notes.push('La entrega urgente está sujeta a validación técnica del equipo.');
  }

  // Check for addons with notes (dependencies)
  const addonsWithNotes = addons.filter((a) => a.note);
  addonsWithNotes.forEach((addon) => {
    notes.push(`${addon.name}: ${addon.note}`);
  });

  // Note about addon prices
  if (addons.length > 0) {
    notes.push('El precio final de los adicionales puede variar según la complejidad del proyecto.');
  }

  notes.push('Tiempo estimado según alcance, revisiones y disponibilidad de contenido.');

  return {
    plan,
    clientType,
    urgency,
    addons,
    basePrice,
    clientTypeAdjustment,
    urgencyAdjustment,
    addonsTotal,
    subtotal,
    finalPrice,
    deliveryTime,
    requiresValidation,
    notes,
  };
}

// ============================================
// FORMATTING FUNCTIONS
// ============================================

/**
 * Format price in Peruvian Soles
 */
export function formatCurrency(amount: number): string {
  const hasDecimals = amount % 1 !== 0;
  const formatted = hasDecimals
    ? amount.toFixed(2) // S/9.80
    : amount.toLocaleString(CURRENCY_CONFIG.locale); // S/49
  return `${CURRENCY_CONFIG.symbol}${formatted}`;
}

/**
 * Format percentage for display
 */
export function formatPercentage(multiplier: number): string {
  if (multiplier === 0) return '0%';
  return `+${Math.round(multiplier * 100)}%`;
}

/**
 * Format price with "Desde" prefix if applicable
 */
export function formatPriceWithPrefix(plan: PlanConfig): string {
  const formattedPrice = formatCurrency(plan.basePrice);
  return plan.isFromPrice ? `Desde ${formattedPrice}` : formattedPrice;
}

// ============================================
// VALIDATION FUNCTIONS
// ============================================

export function isValidPlanId(id: string): id is PlanId {
  return id in PLANS;
}

export function isValidClientType(id: string): id is ClientType {
  return id in CLIENT_TYPES;
}

export function isValidUrgencyLevel(id: string): id is UrgencyLevel {
  return id in URGENCY_LEVELS;
}

export function isValidAddonId(id: string): id is AddonId {
  return id in ADDONS;
}

export function isQuoteComplete(
  planId: PlanId | null,
  clientTypeId: ClientType | null,
  urgencyId: UrgencyLevel | null
): boolean {
  return planId !== null && clientTypeId !== null && urgencyId !== null;
}
