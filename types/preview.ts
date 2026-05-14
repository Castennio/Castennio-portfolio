// ============================================
// PREVIEW CONFIGURATOR TYPES
// ============================================

export type IndustryId =
  | 'restaurante'
  | 'clinica'
  | 'abogado'
  | 'tienda-ropa'
  | 'inmobiliaria'
  | 'venta-autos'
  | 'gimnasio'
  | 'veterinaria'
  | 'generico';

export type StyleId = 'minimalista' | 'corporativo' | 'creativo' | 'moderno';

export interface IndustryStat {
  value: string;
  label: string;
}

export interface IndustryTestimonial {
  text: string;
  author: string;
  role: string;
}

export interface IndustryConfig {
  id: IndustryId;
  name: string;
  icon: string;
  heroTitle: string;
  heroSubtitle: string; // {companyName} como placeholder
  services: string[];
  ctaText: string;
  // Variaciones por industria
  stats: IndustryStat[];
  features: string[];
  testimonial: IndustryTestimonial;
  extraSectionTitle: string;
  extraSectionItems: string[];
}

export interface StyleConfig {
  id: StyleId;
  name: string;
  description: string;
  borderRadius: 'none' | 'sm' | 'md' | 'lg' | 'full';
  buttonStyle: 'solid' | 'outline' | 'gradient';
}

export interface ColorPalette {
  primary: string;
  primaryDark: string;
  primaryLight: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundAlt: string;
  text: string;
  textMuted: string;
}

export interface PreviewConfig {
  industry: IndustryId | null;
  style: StyleId | null;
  companyName: string;
  primaryColor: string;
  palette: ColorPalette | null;
}
