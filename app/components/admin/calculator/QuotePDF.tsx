'use client';

import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer';
import type { QuoteCalculation } from '@/types/pricing';

// ============================================
// COLORS
// ============================================

const colors = {
  primary: '#7C3AED',
  primaryLight: '#A78BFA',
  primaryDark: '#5B21B6',
  dark: '#0f0f0f',
  darkGray: '#374151',
  gray: '#6b7280',
  lightGray: '#9ca3af',
  white: '#ffffff',
  offWhite: '#f9fafb',
  green: '#10b981',
  amber: '#f59e0b',
  border: '#e5e7eb',
};

// ============================================
// STYLES
// ============================================

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    paddingTop: 50,
    paddingBottom: 80,
    paddingHorizontal: 50,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colors.darkGray,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 35,
    paddingBottom: 25,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 54,
    height: 50,
    marginRight: 14,
  },
  logoText: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 8,
    color: colors.gray,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  headerRight: {
    alignItems: 'flex-end',
  },
  docBadge: {
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginBottom: 8,
  },
  docBadgeText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  docInfo: {
    fontSize: 9,
    color: colors.gray,
    textAlign: 'right',
  },
  docNumber: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginTop: 4,
  },

  // Client info
  clientBox: {
    backgroundColor: colors.offWhite,
    borderRadius: 8,
    padding: 16,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: colors.border,
  },
  clientLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  clientName: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },

  // Section
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    width: 20,
    height: 20,
    backgroundColor: colors.offWhite,
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Plan card
  planCard: {
    backgroundColor: colors.offWhite,
    borderRadius: 8,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  planBadge: {
    fontSize: 7,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    backgroundColor: '#ede9fe',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  planName: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 6,
  },
  planDescription: {
    fontSize: 10,
    color: colors.gray,
    lineHeight: 1.5,
  },

  // Info grid
  infoGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 20,
  },
  infoCard: {
    flex: 1,
    backgroundColor: colors.offWhite,
    borderRadius: 6,
    padding: 14,
  },
  infoLabel: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },

  // Delivery highlight
  deliveryCard: {
    backgroundColor: '#ede9fe',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },
  deliveryIcon: {
    width: 28,
    height: 28,
    backgroundColor: colors.primary,
    borderRadius: 14,
    marginRight: 12,
  },
  deliveryContent: {
    alignItems: 'center',
  },
  deliveryLabel: {
    fontSize: 9,
    color: colors.primaryDark,
  },
  deliveryValue: {
    fontSize: 16,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
    marginTop: 2,
  },

  // Price table
  priceTable: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    overflow: 'hidden',
  },
  priceTableHeader: {
    backgroundColor: colors.offWhite,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  priceTableHeaderText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: colors.gray,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  priceRowLast: {
    borderBottomWidth: 0,
  },
  priceLabel: {
    fontSize: 10,
    color: colors.dark,
  },
  priceLabelSub: {
    fontSize: 10,
    color: colors.gray,
    paddingLeft: 16,
  },
  priceValue: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  priceValueAdd: {
    fontSize: 10,
    color: colors.amber,
  },

  // Addons section
  addonsHeader: {
    backgroundColor: '#f0fdf4',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  addonsHeaderText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: '#166534',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  // Total
  totalRow: {
    backgroundColor: colors.dark,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
  },
  totalLabel: {
    fontSize: 12,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
  },
  totalValue: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: colors.primaryLight,
  },

  // Notes
  notesBox: {
    backgroundColor: '#fffbeb',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 3,
    borderLeftColor: colors.amber,
  },
  notesTitle: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#92400e',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 10,
  },
  noteItem: {
    fontSize: 9,
    color: '#78350f',
    lineHeight: 1.6,
    marginBottom: 4,
  },

  // Footer
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerLeft: {
    fontSize: 8,
    color: colors.lightGray,
  },
  footerRight: {
    fontSize: 8,
    color: colors.gray,
    textAlign: 'right',
  },
  footerBrand: {
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
});

// ============================================
// HELPERS
// ============================================

function formatCurrency(amount: number): string {
  const hasDecimals = amount % 1 !== 0;
  return hasDecimals ? `S/ ${amount.toFixed(2)}` : `S/ ${amount}`;
}

function formatPercentage(multiplier: number): string {
  if (multiplier === 0) return '0%';
  return `+${Math.round(multiplier * 100)}%`;
}

// ============================================
// PDF DOCUMENT
// ============================================

interface QuotePDFProps {
  quote: QuoteCalculation;
  logoUrl: string;
  clientName?: string;
}

function QuotePDFDocument({ quote, logoUrl, clientName }: QuotePDFProps) {
  const today = new Date().toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const quoteNumber = `COT-${Date.now().toString(36).toUpperCase().slice(-6)}`;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <View style={styles.logoContainer}>
              <Image
                style={styles.logoIcon}
                src={logoUrl}
              />
              <View>
                <Text style={styles.logoText}>CASTENNIO</Text>
                <Text style={styles.tagline}>Creamos web, impulsamos negocios</Text>
              </View>
            </View>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.docBadge}>
              <Text style={styles.docBadgeText}>Cotización</Text>
            </View>
            <Text style={styles.docInfo}>{today}</Text>
            <Text style={styles.docNumber}>{quoteNumber}</Text>
          </View>
        </View>

        {/* Client Info - only if provided */}
        {clientName && (
          <View style={styles.clientBox}>
            <Text style={styles.clientLabel}>Cotización para</Text>
            <Text style={styles.clientName}>{clientName}</Text>
          </View>
        )}

        {/* Plan Info */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Plan Seleccionado</Text>
          </View>
          <View style={styles.planCard}>
            {quote.plan.badge && (
              <Text style={styles.planBadge}>{quote.plan.badge}</Text>
            )}
            <Text style={styles.planName}>{quote.plan.name}</Text>
            <Text style={styles.planDescription}>{quote.plan.description}</Text>
          </View>
        </View>

        {/* Client & Urgency Info */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Tipo de cliente</Text>
            <Text style={styles.infoValue}>{quote.clientType.name}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Nivel de urgencia</Text>
            <Text style={styles.infoValue}>{quote.urgency.name}</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.infoLabel}>Tiempo estimado</Text>
            <Text style={styles.infoValue}>{quote.deliveryTime}</Text>
          </View>
        </View>

        {/* Price Breakdown */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Desglose de Inversion</Text>
          </View>

          <View style={styles.priceTable}>
            <View style={styles.priceTableHeader}>
              <Text style={styles.priceTableHeaderText}>Concepto</Text>
              <Text style={styles.priceTableHeaderText}>Monto</Text>
            </View>

            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Precio base - {quote.plan.name}</Text>
              <Text style={styles.priceValue}>{formatCurrency(quote.basePrice)}</Text>
            </View>

            {quote.clientTypeAdjustment > 0 && (
              <View style={styles.priceRow}>
                <Text style={styles.priceLabelSub}>
                  + {quote.clientType.name} ({formatPercentage(quote.clientType.multiplier)})
                </Text>
                <Text style={styles.priceValueAdd}>+{formatCurrency(quote.clientTypeAdjustment)}</Text>
              </View>
            )}

            {quote.urgencyAdjustment > 0 && (
              <View style={quote.addons.length === 0 ? [styles.priceRow, styles.priceRowLast] : styles.priceRow}>
                <Text style={styles.priceLabelSub}>
                  + {quote.urgency.name} ({formatPercentage(quote.urgency.multiplier)})
                </Text>
                <Text style={styles.priceValueAdd}>+{formatCurrency(quote.urgencyAdjustment)}</Text>
              </View>
            )}

            {/* Addons */}
            {quote.addons.length > 0 && (
              <>
                <View style={styles.addonsHeader}>
                  <Text style={styles.addonsHeaderText}>Servicios Adicionales</Text>
                  <Text style={styles.addonsHeaderText}>{quote.addons.length} items</Text>
                </View>
                {quote.addons.map((addon, index) => (
                  <View
                    key={addon.id}
                    style={index === quote.addons.length - 1 ? [styles.priceRow, styles.priceRowLast] : styles.priceRow}
                  >
                    <Text style={styles.priceLabelSub}>
                      + {addon.name}
                    </Text>
                    <Text style={styles.priceValueAdd}>+{formatCurrency(addon.minPrice)}</Text>
                  </View>
                ))}
              </>
            )}
          </View>

          {/* Total */}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>INVERSION TOTAL</Text>
            <Text style={styles.totalValue}>{formatCurrency(quote.finalPrice)}</Text>
          </View>
        </View>

        {/* Notes */}
        {quote.notes.length > 0 && (
          <View style={styles.notesBox}>
            <Text style={styles.notesTitle}>Notas Importantes</Text>
            {quote.notes.map((note, index) => (
              <Text key={index} style={styles.noteItem}>• {note}</Text>
            ))}
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerLeft}>
            Esta cotización es valida por 15 dias desde la fecha de emision.
          </Text>
          <View>
            <Text style={styles.footerRight}>
              <Text style={styles.footerBrand}>CASTENNIO</Text> | castennio.com
            </Text>
            <Text style={styles.footerRight}>castennio@gmail.com</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
}

// ============================================
// DOWNLOAD FUNCTION
// ============================================

export async function downloadQuotePDF(quote: QuoteCalculation, clientName?: string): Promise<void> {
  const logoUrl = `${window.location.origin}/images/logo-castennio-fondo-transparente-icono-negro.png`;
  const blob = await pdf(<QuotePDFDocument quote={quote} logoUrl={logoUrl} clientName={clientName} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `cotizacion-castennio-${quote.plan.id}-${Date.now()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default QuotePDFDocument;
