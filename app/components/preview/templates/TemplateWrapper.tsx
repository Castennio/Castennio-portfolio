'use client';

import type { ColorPalette, IndustryConfig, StyleConfig } from '@/types/preview';

export interface TemplateProps {
  palette: ColorPalette;
  industry: IndustryConfig;
  style: StyleConfig;
  companyName: string;
}

interface TemplateWrapperProps extends TemplateProps {
  children: React.ReactNode;
}

/**
 * Wrapper that injects CSS custom properties for the templates
 */
export default function TemplateWrapper({
  palette,
  children,
}: TemplateWrapperProps) {
  return (
    <div
      className="w-full min-h-full"
      style={{
        '--preview-primary': palette.primary,
        '--preview-primary-dark': palette.primaryDark,
        '--preview-primary-light': palette.primaryLight,
        '--preview-secondary': palette.secondary,
        '--preview-accent': palette.accent,
        '--preview-background': palette.background,
        '--preview-background-alt': palette.backgroundAlt,
        '--preview-text': palette.text,
        '--preview-text-muted': palette.textMuted,
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

/**
 * Helper to replace {companyName} placeholder in text
 */
export function replaceCompanyName(text: string, companyName: string): string {
  return text.replace(/{companyName}/g, companyName || 'Tu Empresa');
}
