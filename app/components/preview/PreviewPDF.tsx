'use client';

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer';
import type { PreviewConfig, IndustryConfig, StyleConfig, ColorPalette } from '@/types/preview';
import { INDUSTRIES, STYLES } from '@/config/preview';

// ============================================
// COLORS
// ============================================

const colors = {
  dark: '#1a1a1a',
  gray: '#6b7280',
  lightGray: '#9ca3af',
  border: '#e5e7eb',
  bgLight: '#f9fafb',
  white: '#ffffff',
};

// ============================================
// PDF STYLES
// ============================================

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    paddingHorizontal: 50,
    paddingVertical: 50,
    fontFamily: 'Helvetica',
  },
  // Header
  header: {
    marginBottom: 40,
    textAlign: 'center',
  },
  mainTitle: {
    fontSize: 28,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: colors.gray,
  },
  // Company Section
  companySection: {
    marginBottom: 35,
    padding: 25,
    backgroundColor: colors.bgLight,
    borderRadius: 12,
  },
  sectionLabel: {
    fontSize: 10,
    color: colors.lightGray,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  companyName: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  // Config Grid
  configGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 35,
  },
  configCard: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.bgLight,
    borderRadius: 12,
  },
  configTitle: {
    fontSize: 10,
    color: colors.lightGray,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 8,
  },
  configValue: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 4,
  },
  configDesc: {
    fontSize: 10,
    color: colors.gray,
  },
  // Color Palette Section
  paletteSection: {
    marginBottom: 35,
  },
  paletteTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  paletteTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  primaryColorBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  primaryColorText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  paletteGrid: {
    flexDirection: 'row',
    gap: 10,
  },
  paletteColor: {
    flex: 1,
    alignItems: 'center',
  },
  colorSwatch: {
    width: '100%',
    height: 50,
    borderRadius: 8,
    marginBottom: 8,
  },
  colorLabel: {
    fontSize: 9,
    color: colors.gray,
    marginBottom: 2,
  },
  colorHex: {
    fontSize: 8,
    color: colors.lightGray,
    fontFamily: 'Helvetica',
  },
  // Preview Mockup
  mockupSection: {
    marginBottom: 35,
  },
  mockupTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 15,
  },
  mockupContainer: {
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
  },
  mockupHero: {
    padding: 30,
    alignItems: 'center',
  },
  mockupHeroTitle: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    marginBottom: 8,
    textAlign: 'center',
  },
  mockupHeroSubtitle: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 15,
    textAlign: 'center',
  },
  mockupButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: colors.white,
    borderRadius: 20,
  },
  mockupButtonText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
  },
  mockupServices: {
    flexDirection: 'row',
    backgroundColor: colors.bgLight,
    padding: 15,
    gap: 10,
  },
  mockupService: {
    flex: 1,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 6,
    alignItems: 'center',
  },
  mockupServiceText: {
    fontSize: 8,
    color: colors.gray,
    textAlign: 'center',
  },
  // Footer
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 50,
    right: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  footerText: {
    fontSize: 9,
    color: colors.lightGray,
  },
  footerBrand: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
});

// ============================================
// PDF DOCUMENT COMPONENT
// ============================================

interface PreviewPDFDocumentProps {
  config: PreviewConfig;
  industry: IndustryConfig;
  style: StyleConfig;
}

function replaceCompanyName(text: string, companyName: string): string {
  return text.replace(/{companyName}/g, companyName || 'Tu Empresa');
}

function PreviewPDFDocument({ config, industry, style }: PreviewPDFDocumentProps) {
  const palette = config.palette!;
  const displayName = config.companyName || 'Tu Empresa';

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.mainTitle}>Propuesta de Diseño Web</Text>
          <Text style={styles.subtitle}>Vista previa personalizada para tu negocio</Text>
        </View>

        {/* Company Name */}
        <View style={styles.companySection}>
          <Text style={styles.sectionLabel}>Nombre de empresa</Text>
          <Text style={styles.companyName}>{displayName}</Text>
        </View>

        {/* Config Grid */}
        <View style={styles.configGrid}>
          <View style={styles.configCard}>
            <Text style={styles.configTitle}>Industria</Text>
            <Text style={styles.configValue}>{industry.name}</Text>
            <Text style={styles.configDesc}>Contenido adaptado a tu sector</Text>
          </View>
          <View style={styles.configCard}>
            <Text style={styles.configTitle}>Estilo</Text>
            <Text style={styles.configValue}>{style.name}</Text>
            <Text style={styles.configDesc}>{style.description}</Text>
          </View>
        </View>

        {/* Color Palette */}
        <View style={styles.paletteSection}>
          <View style={styles.paletteTitleRow}>
            <Text style={styles.paletteTitle}>Paleta de colores</Text>
            <View style={[styles.primaryColorBadge, { backgroundColor: palette.primary }]}>
              <Text style={styles.primaryColorText}>{palette.primary.toUpperCase()}</Text>
            </View>
          </View>
          <View style={styles.paletteGrid}>
            {[
              { label: 'Principal', color: palette.primary },
              { label: 'Oscuro', color: palette.primaryDark },
              { label: 'Claro', color: palette.primaryLight },
              { label: 'Secundario', color: palette.secondary },
              { label: 'Acento', color: palette.accent },
            ].map((item, idx) => (
              <View key={idx} style={styles.paletteColor}>
                <View style={[styles.colorSwatch, { backgroundColor: item.color }]} />
                <Text style={styles.colorLabel}>{item.label}</Text>
                <Text style={styles.colorHex}>{item.color.toUpperCase()}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Preview Mockup */}
        <View style={styles.mockupSection}>
          <Text style={styles.mockupTitle}>Vista previa del Hero</Text>
          <View style={styles.mockupContainer}>
            <View style={[styles.mockupHero, { backgroundColor: palette.primary }]}>
              <Text style={styles.mockupHeroTitle}>{industry.heroTitle}</Text>
              <Text style={styles.mockupHeroSubtitle}>
                {replaceCompanyName(industry.heroSubtitle, displayName)}
              </Text>
              <View style={styles.mockupButton}>
                <Text style={[styles.mockupButtonText, { color: palette.primary }]}>
                  {industry.ctaText}
                </Text>
              </View>
            </View>
            <View style={styles.mockupServices}>
              {industry.services.slice(0, 4).map((service, idx) => (
                <View key={idx} style={styles.mockupService}>
                  <Text style={styles.mockupServiceText}>{service}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Generado el {new Date().toLocaleDateString('es-PE', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </Text>
          <Text style={styles.footerBrand}>CASTENNIO</Text>
        </View>
      </Page>
    </Document>
  );
}

// ============================================
// DOWNLOAD FUNCTION
// ============================================

export async function downloadPreviewPDF(config: PreviewConfig): Promise<void> {
  if (!config.industry || !config.style || !config.palette) {
    throw new Error('Configuration incomplete');
  }

  const industry = INDUSTRIES[config.industry];
  const style = STYLES[config.style];

  const blob = await pdf(
    <PreviewPDFDocument config={config} industry={industry} style={style} />
  ).toBlob();

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;

  const safeName = (config.companyName || 'mi-negocio')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 30);

  link.download = `propuesta-${safeName}-castennio.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default PreviewPDFDocument;
