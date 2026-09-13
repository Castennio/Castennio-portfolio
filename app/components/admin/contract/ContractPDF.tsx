'use client';

import {
  Document,
  Page,
  Text,
  View,
  Image,
  Font,
  StyleSheet,
  pdf,
} from '@react-pdf/renderer';

Font.registerHyphenationCallback((word) => [word]);

const colors = {
  primary: '#7C3AED',
  dark: '#0f0f0f',
  darkGray: '#374151',
  gray: '#6b7280',
  white: '#ffffff',
  offWhite: '#f9fafb',
  border: '#e5e7eb',
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.white,
    paddingTop: 45,
    paddingBottom: 70,
    paddingHorizontal: 50,
    fontFamily: 'Helvetica',
    fontSize: 10,
    color: colors.darkGray,
    lineHeight: 1.6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: colors.primary,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 48,
    height: 44,
    marginRight: 12,
  },
  logoText: {
    fontSize: 20,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    letterSpacing: 1,
  },
  tagline: {
    fontSize: 7,
    color: colors.gray,
    marginTop: 2,
    letterSpacing: 0.5,
  },
  docBadge: {
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  docBadgeText: {
    fontSize: 8,
    fontFamily: 'Helvetica-Bold',
    color: colors.white,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 13,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    textAlign: 'center',
    marginBottom: 15,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  intro: {
    fontSize: 10,
    color: colors.darkGray,
    marginBottom: 20,
    lineHeight: 1.7,
    textAlign: 'justify',
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 8,
    marginTop: 16,
  },
  paragraph: {
    fontSize: 10,
    color: colors.darkGray,
    marginBottom: 8,
    lineHeight: 1.7,
    textAlign: 'justify',
  },
  bulletItem: {
    fontSize: 10,
    color: colors.darkGray,
    marginBottom: 4,
    paddingLeft: 16,
    lineHeight: 1.6,
  },
  priceBox: {
    backgroundColor: colors.offWhite,
    borderRadius: 6,
    padding: 14,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  priceLabel: {
    fontSize: 10,
    color: colors.darkGray,
  },
  priceValue: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 6,
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
  },
  totalValue: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
  signatureArea: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 50,
    gap: 40,
  },
  signatureBlock: {
    flex: 1,
    alignItems: 'center',
  },
  signatureLine: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGray,
    marginBottom: 8,
    height: 40,
  },
  signatureLabel: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: colors.dark,
    marginBottom: 2,
  },
  signatureDetail: {
    fontSize: 9,
    color: colors.gray,
  },
  bold: {
    fontFamily: 'Helvetica-Bold',
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 50,
    right: 50,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 7,
    color: colors.gray,
  },
  footerBrand: {
    fontFamily: 'Helvetica-Bold',
    color: colors.primary,
  },
});

export interface ContractData {
  clienteEmpresa: string;
  clienteRuc: string;
  clienteRepresentante: string;
  desarrolladorNombre: string;
  desarrolladorRuc: string;
  descripcion: string;
  funcionalidades: string[];
  fechaInicio: string;
  fechaEntrega: string;
  precioSinIgv: number;
  formaPago: string;
  serviciosAccesos: string;
  portalUrl?: string;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '[FECHA]';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatDateFirma(dateStr: string): string {
  if (!dateStr) return '[FECHA]';
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDate();
  const month = d.toLocaleDateString('es-PE', { month: 'long' });
  const year = d.getFullYear();
  return `${day} días del mes de ${month} de ${year}`;
}

function formatCurrency(amount: number): string {
  return `S/ ${amount.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function numberToWords(n: number): string {
  const units = ['', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
  const teens = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
  const tens = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
  const hundreds = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];

  if (n === 0) return 'cero';
  if (n === 100) return 'cien';

  const integer = Math.floor(n);
  const decimal = Math.round((n - integer) * 100);

  let result = '';

  if (integer >= 1000) {
    const thousands = Math.floor(integer / 1000);
    const remainder = integer % 1000;
    if (thousands === 1) {
      result += 'mil';
    } else {
      result += units[thousands] + ' mil';
    }
    if (remainder > 0) result += ' ';
    if (remainder > 0) {
      if (remainder >= 100) {
        result += remainder === 100 ? 'cien' : hundreds[Math.floor(remainder / 100)];
        const r2 = remainder % 100;
        if (r2 > 0) result += ' ';
        if (r2 >= 20) {
          result += tens[Math.floor(r2 / 10)];
          if (r2 % 10 > 0) result += ' y ' + units[r2 % 10];
        } else if (r2 >= 10) {
          result += teens[r2 - 10];
        } else if (r2 > 0) {
          result += units[r2];
        }
      } else if (remainder >= 20) {
        result += tens[Math.floor(remainder / 10)];
        if (remainder % 10 > 0) result += ' y ' + units[remainder % 10];
      } else if (remainder >= 10) {
        result += teens[remainder - 10];
      } else {
        result += units[remainder];
      }
    }
  } else if (integer >= 100) {
    result += integer === 100 ? 'cien' : hundreds[Math.floor(integer / 100)];
    const r = integer % 100;
    if (r > 0) result += ' ';
    if (r >= 20) {
      result += tens[Math.floor(r / 10)];
      if (r % 10 > 0) result += ' y ' + units[r % 10];
    } else if (r >= 10) {
      result += teens[r - 10];
    } else if (r > 0) {
      result += units[r];
    }
  } else if (integer >= 20) {
    result += tens[Math.floor(integer / 10)];
    if (integer % 10 > 0) result += ' y ' + units[integer % 10];
  } else if (integer >= 10) {
    result += teens[integer - 10];
  } else {
    result += units[integer];
  }

  const decStr = decimal.toString().padStart(2, '0');
  result = result.charAt(0).toUpperCase() + result.slice(1);
  result += ` y ${decStr}/100 soles`;

  return result;
}

function ContractDocument({ data, logoUrl }: { data: ContractData; logoUrl: string }) {
  const igv = Math.round(data.precioSinIgv * 0.18 * 100) / 100;
  const total = Math.round((data.precioSinIgv + igv) * 100) / 100;
  const precioEnLetras = numberToWords(data.precioSinIgv);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image style={styles.logoIcon} src={logoUrl} />
            <View>
              <Text style={styles.logoText}>CASTENNIO</Text>
              <Text style={styles.tagline}>Creamos web, impulsamos negocios</Text>
            </View>
          </View>
          <View style={styles.docBadge}>
            <Text style={styles.docBadgeText}>Contrato</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title}>
          Contrato de Prestación de Servicios de Desarrollo Web
        </Text>

        {/* Intro */}
        <Text style={styles.intro}>
          Conste por el presente documento el contrato celebrado entre{' '}
          <Text style={styles.bold}>{data.clienteEmpresa}</Text>, con RUC N.°{' '}
          {data.clienteRuc}, representada por {data.clienteRepresentante}, en adelante{' '}
          <Text style={styles.bold}>EL CLIENTE</Text>, y{' '}
          <Text style={styles.bold}>{data.desarrolladorNombre}</Text>, con RUC N.°{' '}
          {data.desarrolladorRuc}, en adelante{' '}
          <Text style={styles.bold}>EL DESARROLLADOR</Text>, bajo los siguientes términos:
        </Text>

        {/* 1. OBJETO */}
        <Text style={styles.sectionTitle}>1. OBJETO</Text>
        <Text style={styles.paragraph}>
          EL CLIENTE contrata a EL DESARROLLADOR para realizar {data.descripcion}.
        </Text>

        {/* 2. ALCANCE */}
        <Text style={styles.sectionTitle}>2. ALCANCE DEL PROYECTO</Text>
        <Text style={styles.paragraph}>
          El desarrollo comprende las siguientes secciones y funcionalidades:
        </Text>
        {data.funcionalidades.map((f, i) => (
          <Text key={i} style={styles.bulletItem}>• {f}</Text>
        ))}
        <Text style={[styles.paragraph, { marginTop: 8 }]}>
          Cualquier funcionalidad, módulo, integración o requerimiento adicional que no se encuentre contemplado en este alcance deberá ser cotizado y aprobado por separado con EL DESARROLLADOR antes de su implementación.
        </Text>

        {/* 3. PLAZO */}
        <Text style={styles.sectionTitle}>3. PLAZO</Text>
        <Text style={styles.paragraph}>
          El proyecto inició el {formatDate(data.fechaInicio)} y tendrá como fecha de entrega el {formatDate(data.fechaEntrega)}.
        </Text>
        <Text style={styles.paragraph}>
          Durante el desarrollo se establecerá una reunión de aproximadamente 30 a 45 minutos con EL CLIENTE para mostrar el avance del proyecto, revisar observaciones y coordinar los siguientes pasos.
        </Text>
        <Text style={styles.paragraph}>
          Los retrasos ocasionados por la entrega tardía de información, materiales, accesos o credenciales necesarias por parte de EL CLIENTE podrán generar una modificación en la fecha de entrega.
        </Text>

        {/* 4. PRECIO */}
        <View wrap={false}>
          <Text style={styles.sectionTitle}>4. PRECIO Y FORMA DE PAGO</Text>
          <Text style={styles.paragraph}>
            El precio acordado por el desarrollo es de {formatCurrency(data.precioSinIgv)} ({precioEnLetras}), más IGV.
          </Text>
          <View style={styles.priceBox}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Servicio:</Text>
              <Text style={styles.priceValue}>{formatCurrency(data.precioSinIgv)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>IGV (18%):</Text>
              <Text style={styles.priceValue}>{formatCurrency(igv)}</Text>
            </View>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total:</Text>
              <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
            </View>
          </View>
          <Text style={styles.paragraph}>
            {data.formaPago}
          </Text>
        </View>

        {/* 5. INFORMACIÓN Y ACCESOS */}
        <Text style={styles.sectionTitle}>5. INFORMACIÓN Y ACCESOS</Text>
        <Text style={styles.paragraph}>
          EL CLIENTE se compromete a proporcionar oportunamente la información, imágenes, textos y demás contenidos necesarios para el desarrollo.
        </Text>
        {data.serviciosAccesos && (
          <>
            <Text style={styles.paragraph}>
              Asimismo, EL CLIENTE proporcionará los accesos o credenciales necesarios para la configuración de los servicios utilizados por el proyecto, tales como {data.serviciosAccesos} u otros servicios previamente acordados.
            </Text>
            <Text style={styles.paragraph}>
              EL DESARROLLADOR brindará apoyo al responsable designado por EL CLIENTE para realizar la configuración de dichos servicios.
            </Text>
          </>
        )}
        <Text style={styles.paragraph}>
          La entrega de credenciales deberá realizarse por medios seguros y será responsabilidad de EL CLIENTE mantenerlas bajo su control.
        </Text>

        {/* 6. ENTREGA Y GARANTÍA */}
        <View wrap={false}>
        <Text style={styles.sectionTitle}>6. ENTREGA Y GARANTÍA DE FUNCIONAMIENTO</Text>
        <Text style={styles.paragraph}>
          La entrega del proyecto se realizará el {formatDate(data.fechaEntrega)}.
        </Text>
        <Text style={styles.paragraph}>
          Después de la entrega, EL DESARROLLADOR brindará un período de 7 días calendario de funcionamiento, durante el cual podrá realizar correcciones de errores o ajustes menores relacionados con las funcionalidades contempladas en este contrato.
        </Text>
        <Text style={styles.paragraph}>
          Este período no incluye el desarrollo de nuevas funcionalidades, módulos, integraciones o cambios sustanciales solicitados por EL CLIENTE. Estos trabajos deberán ser cotizados y aprobados por separado.
        </Text>
        </View>

        {/* 7. RESPONSABILIDADES */}
        <Text style={styles.sectionTitle}>7. RESPONSABILIDADES</Text>
        <Text style={styles.paragraph}>
          EL DESARROLLADOR se compromete a desarrollar el proyecto de acuerdo con el alcance establecido y realizar las correcciones correspondientes durante el período de mantenimiento.
        </Text>
        <Text style={styles.paragraph}>
          EL CLIENTE se compromete a proporcionar la información necesaria, revisar los avances, asistir a las reuniones coordinadas y realizar el pago acordado en la fecha establecida.
        </Text>

        {/* 8. CONFORMIDAD */}
        <Text style={styles.sectionTitle}>8. CONFORMIDAD</Text>
        <Text style={styles.paragraph}>
          Ambas partes manifiestan estar de acuerdo con las condiciones establecidas en el presente contrato.
        </Text>
        <Text style={styles.paragraph}>
          En Lima, a los {formatDateFirma(data.fechaEntrega || data.fechaInicio)}.
        </Text>

        {/* Firmas */}
        <View wrap={false} style={styles.signatureArea}>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>EL CLIENTE</Text>
            <Text style={styles.signatureDetail}>{data.clienteEmpresa}</Text>
            <Text style={styles.signatureDetail}>RUC: {data.clienteRuc}</Text>
            <Text style={styles.signatureDetail}>{data.clienteRepresentante}</Text>
          </View>
          <View style={styles.signatureBlock}>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureLabel}>EL DESARROLLADOR</Text>
            <Text style={styles.signatureDetail}>{data.desarrolladorNombre.toUpperCase()}</Text>
            <Text style={styles.signatureDetail}>RUC: {data.desarrolladorRuc}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Contrato de prestación de servicios de desarrollo web
          </Text>
          <Text style={styles.footerText}>
            <Text style={styles.footerBrand}>CASTENNIO</Text> | castennio.com
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export async function downloadContractPDF(data: ContractData): Promise<void> {
  const logoUrl = `${window.location.origin}/images/logo-castennio-fondo-transparente-icono-negro.png`;
  const blob = await pdf(<ContractDocument data={data} logoUrl={logoUrl} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const slug = data.clienteEmpresa.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  link.download = `contrato-${slug}-${Date.now()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default ContractDocument;
