import type { ColorPalette } from '@/types/preview';

// ============================================
// COLOR PALETTE GENERATION UTILITIES
// ============================================

interface HSL {
  h: number; // 0-360
  s: number; // 0-100
  l: number; // 0-100
}

/**
 * Convert hex color to HSL
 */
export function hexToHSL(hex: string): HSL {
  // Remove # if present
  hex = hex.replace(/^#/, '');

  // Parse hex values
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  let h = 0;
  let s = 0;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

/**
 * Convert HSL to hex color
 */
export function hslToHex(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }

  const toHex = (n: number) => {
    const hex = Math.round((n + m) * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/**
 * Generate a harmonious color palette from a primary color
 */
export function generatePalette(primaryHex: string): ColorPalette {
  const { h, s, l } = hexToHSL(primaryHex);

  return {
    // Primary variations
    primary: primaryHex,
    primaryDark: hslToHex(h, s, Math.max(l - 15, 10)),
    primaryLight: hslToHex(h, Math.max(s - 20, 0), Math.min(l + 35, 95)),

    // Analogous secondary (30 degrees shift)
    secondary: hslToHex((h + 30) % 360, Math.max(s - 10, 20), l),

    // Complementary accent (180 degrees shift, adjusted)
    accent: hslToHex((h + 180) % 360, Math.min(s, 70), 50),

    // Neutral backgrounds (always light for this feature)
    background: '#ffffff',
    backgroundAlt: '#f8f9fc',

    // Text colors with subtle hue influence
    text: hslToHex(h, 10, 15),
    textMuted: hslToHex(h, 5, 45),
  };
}

/**
 * Preset colors for quick selection
 */
export const COLOR_PRESETS = [
  { hex: '#3B82F6', name: 'Azul' },
  { hex: '#7C3AED', name: 'Púrpura' },
  { hex: '#EC4899', name: 'Rosa' },
  { hex: '#EF4444', name: 'Rojo' },
  { hex: '#F59E0B', name: 'Naranja' },
  { hex: '#10B981', name: 'Verde' },
  { hex: '#06B6D4', name: 'Cian' },
  { hex: '#6366F1', name: 'Índigo' },
] as const;

/**
 * Calculate relative luminance for contrast checking
 */
function getLuminance(hex: string): number {
  hex = hex.replace(/^#/, '');
  const r = parseInt(hex.slice(0, 2), 16) / 255;
  const g = parseInt(hex.slice(2, 4), 16) / 255;
  const b = parseInt(hex.slice(4, 6), 16) / 255;

  const toLinear = (c: number) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/**
 * Calculate contrast ratio between two colors
 */
export function getContrastRatio(color1: string, color2: string): number {
  const l1 = getLuminance(color1);
  const l2 = getLuminance(color2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if text color needs to be light or dark for readability
 */
export function getReadableTextColor(backgroundColor: string): string {
  const luminance = getLuminance(backgroundColor);
  return luminance > 0.5 ? '#1a1a1a' : '#ffffff';
}
