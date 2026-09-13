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
import type { ContractData } from './ContractPDF';

Font.registerHyphenationCallback((word) => [word]);

// ==========================================
// PALETTE — dark + neon
// ==========================================
const c = {
  bg: '#0a0e1a',
  bgCard: '#111827',
  bgCardLight: '#1a2035',
  bgCardAccent: '#0d1f2d',
  border: '#1e293b',
  borderAccent: '#164e63',
  white: '#f0f4ff',
  whiteMuted: '#94a3b8',
  whiteDim: '#64748b',
  teal: '#22d3ee',
  tealDark: '#0891b2',
  tealBg: '#083344',
  purple: '#a78bfa',
  purpleDark: '#7c3aed',
  purpleBg: '#1e1145',
  pink: '#f472b6',
  pinkBg: '#4a1942',
  green: '#34d399',
  greenBg: '#064e3b',
  amber: '#fbbf24',
  amberBg: '#451a03',
  red: '#fb7185',
  redBg: '#4c0519',
};

// ==========================================
// DECORATIVE HELPERS
// ==========================================
function Orb({ size, color, top, left, opacity }: { size: number; color: string; top: number; left: number; opacity: number }) {
  return (
    <View style={{
      position: 'absolute',
      top,
      left,
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: color,
      opacity,
    }} />
  );
}

function GlowLine({ width, color, marginBottom }: { width: number; color: string; marginBottom?: number }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: marginBottom ?? 0 }}>
      <View style={{ width, height: 3, backgroundColor: color, borderRadius: 2 }} />
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color, marginLeft: 4 }} />
    </View>
  );
}

function SectionBadge({ num, color }: { num: string; color: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
      <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: color, justifyContent: 'center', alignItems: 'center', marginRight: 10, opacity: 0.2 }}>
        <Text style={{ fontSize: 1, color: 'transparent' }}>.</Text>
      </View>
      <View style={{ position: 'absolute', width: 28, height: 28, borderRadius: 14, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color }}>{num}</Text>
      </View>
    </View>
  );
}

function Card({ children, accent }: { children: React.ReactNode; accent?: string }) {
  return (
    <View style={{
      backgroundColor: c.bgCard,
      borderRadius: 10,
      padding: 20,
      borderWidth: 1,
      borderColor: accent ? accent : c.border,
      borderLeftWidth: accent ? 3 : 1,
      borderLeftColor: accent || c.border,
      marginBottom: 12,
    }}>
      {children}
    </View>
  );
}

function DarkPage({ children, num }: { children: React.ReactNode; num?: number }) {
  return (
    <Page size="A4" style={{
      backgroundColor: c.bg,
      paddingTop: 50,
      paddingBottom: 55,
      paddingHorizontal: 50,
      fontFamily: 'Helvetica',
      fontSize: 10,
      color: c.whiteMuted,
    }}>
      {/* Decorative orbs */}
      <Orb size={120} color={c.tealBg} top={-30} left={380} opacity={0.5} />
      <Orb size={80} color={c.purpleBg} top={600} left={-20} opacity={0.4} />
      <Orb size={60} color={c.tealBg} top={400} left={420} opacity={0.3} />
      {children}
      {num && (
        <View style={{ position: 'absolute', bottom: 22, left: 50, right: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 7, color: c.whiteDim }}>
            <Text style={{ fontFamily: 'Helvetica-Bold', color: c.teal }}>CASTENNIO</Text>  |  Guía de inicio
          </Text>
          <Text style={{ fontSize: 7, color: c.whiteDim }}>{num}</Text>
        </View>
      )}
    </Page>
  );
}

// ==========================================
// ICON MAPPING
// ==========================================
const ICON_MAP: Record<string, { symbol: string; bg: string; color: string }> = {
  'landing': { symbol: 'W', bg: c.tealBg, color: c.teal },
  'producto': { symbol: 'P', bg: c.pinkBg, color: c.pink },
  'whatsapp': { symbol: 'WA', bg: c.greenBg, color: c.green },
  'blog': { symbol: 'B', bg: c.amberBg, color: c.amber },
  'campaña': { symbol: 'C', bg: c.purpleBg, color: c.purple },
  'reel': { symbol: 'R', bg: c.pinkBg, color: c.pink },
  'cms': { symbol: 'CMS', bg: c.tealBg, color: c.teal },
  'faq': { symbol: '?', bg: c.purpleBg, color: c.purple },
  'reseña': { symbol: 'R', bg: c.amberBg, color: c.amber },
  'contacto': { symbol: '@', bg: c.greenBg, color: c.green },
  'footer': { symbol: 'F', bg: c.bgCardLight, color: c.whiteMuted },
  'galería': { symbol: 'G', bg: c.pinkBg, color: c.pink },
  'mapa': { symbol: 'M', bg: c.tealBg, color: c.teal },
  'distribuidor': { symbol: 'D', bg: c.amberBg, color: c.amber },
  'servicio': { symbol: 'S', bg: c.purpleBg, color: c.purple },
  'reserva': { symbol: 'RS', bg: c.greenBg, color: c.green },
  'red social': { symbol: 'RS', bg: c.tealBg, color: c.teal },
  'nosotros': { symbol: 'N', bg: c.purpleBg, color: c.purple },
  'catálogo': { symbol: 'CT', bg: c.pinkBg, color: c.pink },
};

function getIcon(func: string) {
  const lower = func.toLowerCase();
  for (const [key, val] of Object.entries(ICON_MAP)) {
    if (lower.includes(key)) return val;
  }
  return { symbol: func.charAt(0).toUpperCase(), bg: c.bgCardLight, color: c.teal };
}

// ==========================================
// DATE HELPERS
// ==========================================
function formatDateShort(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-PE', { day: 'numeric', month: 'short' });
}

function formatDateLong(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('es-PE', { year: 'numeric', month: 'long', day: 'numeric' });
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function lerpDate(start: string, end: string, t: number): string {
  const s = new Date(start + 'T00:00:00').getTime();
  const e = new Date(end + 'T00:00:00').getTime();
  const d = new Date(s + (e - s) * t);
  return d.toISOString().slice(0, 10);
}

// ==========================================
// PAGE 1 — PORTADA
// ==========================================
function CoverPage({ data, logoUrl }: { data: ContractData; logoUrl: string }) {
  return (
    <Page size="A4" style={{
      backgroundColor: c.bg,
      paddingHorizontal: 50,
      fontFamily: 'Helvetica',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Decorative background */}
      <Orb size={200} color={c.tealBg} top={80} left={300} opacity={0.6} />
      <Orb size={160} color={c.purpleBg} top={500} left={-40} opacity={0.5} />
      <Orb size={100} color={c.tealBg} top={200} left={-20} opacity={0.3} />
      <Orb size={140} color={c.purpleBg} top={100} left={150} opacity={0.2} />

      {/* Small dots */}
      <Orb size={4} color={c.teal} top={120} left={100} opacity={0.6} />
      <Orb size={3} color={c.purple} top={200} left={350} opacity={0.5} />
      <Orb size={5} color={c.teal} top={450} left={80} opacity={0.4} />
      <Orb size={3} color={c.purple} top={550} left={400} opacity={0.5} />
      <Orb size={4} color={c.teal} top={350} left={450} opacity={0.3} />

      <Image src={logoUrl} style={{ width: 60, height: 55, marginBottom: 20 }} />

      <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: c.teal, letterSpacing: 4, textTransform: 'uppercase', marginBottom: 60 }}>
        CASTENNIO
      </Text>

      {/* Main title area */}
      <Text style={{ fontSize: 12, color: c.teal, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12 }}>
        Bienvenido a bordo
      </Text>
      <Text style={{ fontSize: 28, fontFamily: 'Helvetica-Bold', color: c.white, textAlign: 'center', marginBottom: 10 }}>
        {data.clienteEmpresa}
      </Text>

      <GlowLine width={50} color={c.teal} marginBottom={30} />

      <Text style={{ fontSize: 10, color: c.whiteMuted, textAlign: 'center', lineHeight: 1.7, maxWidth: 340, marginBottom: 50 }}>
        {data.descripcion.charAt(0).toUpperCase() + data.descripcion.slice(1)}
      </Text>

      {/* Badge */}
      <View style={{ backgroundColor: c.bgCard, borderRadius: 30, paddingVertical: 10, paddingHorizontal: 28, borderWidth: 1, borderColor: c.tealBg }}>
        <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: c.teal, letterSpacing: 1 }}>
          GUÍA DE INICIO DEL PROYECTO
        </Text>
      </View>

      {/* Date at bottom */}
      <Text style={{ position: 'absolute', bottom: 40, fontSize: 9, color: c.whiteDim }}>
        {formatDateLong(data.fechaInicio)}
      </Text>
    </Page>
  );
}

// ==========================================
// PAGE 2 — BIENVENIDA
// ==========================================
function WelcomePage({ data }: { data: ContractData }) {
  return (
    <DarkPage num={2}>
      <SectionBadge num="01" color={c.teal} />

      <Text style={{ fontSize: 22, fontFamily: 'Helvetica-Bold', color: c.white, marginBottom: 8 }}>
        Un mensaje del equipo
      </Text>
      <GlowLine width={40} color={c.teal} marginBottom={24} />

      <Text style={{ fontSize: 10, color: c.whiteMuted, lineHeight: 1.8, marginBottom: 24 }}>
        Hoy empieza una nueva etapa para tu negocio. Vamos a construir una presencia digital que conecte tu marca, acompañe a tus clientes y convierta cada conversación en una oportunidad.
      </Text>

      <Card accent={c.tealDark}>
        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: c.teal, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 10 }}>
          Lo que vamos a construir
        </Text>
        <Text style={{ fontSize: 11, color: c.white, lineHeight: 1.7 }}>
          {data.descripcion.charAt(0).toUpperCase() + data.descripcion.slice(1)}.
        </Text>
      </Card>

      <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: c.whiteDim, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14, marginTop: 10 }}>
        Qué puedes esperar
      </Text>

      {[
        { title: 'Comunicación clara', desc: 'Te mantendremos informado del avance en cada etapa del proyecto.', color: c.teal },
        { title: 'Transparencia total', desc: 'Sabrás en todo momento qué se está haciendo y cuándo estará listo.', color: c.purple },
        { title: 'Resultado profesional', desc: 'Un producto final que refleje la calidad y visión de tu negocio.', color: c.green },
      ].map((item, i) => (
        <View key={i} style={{ flexDirection: 'row', marginBottom: 14, alignItems: 'flex-start' }}>
          <View style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: c.bgCard, borderWidth: 1, borderColor: c.border, justifyContent: 'center', alignItems: 'center', marginRight: 14 }}>
            <Text style={{ fontSize: 12, fontFamily: 'Helvetica-Bold', color: item.color }}>{i + 1}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: c.white, marginBottom: 3 }}>{item.title}</Text>
            <Text style={{ fontSize: 9, color: c.whiteMuted, lineHeight: 1.5 }}>{item.desc}</Text>
          </View>
        </View>
      ))}
    </DarkPage>
  );
}

// ==========================================
// PAGE 3 — ROADMAP
// ==========================================
function RoadmapPage({ data }: { data: ContractData }) {
  const phases = [
    { label: 'Inicio', date: data.fechaInicio, color: c.teal, desc: 'Arrancamos el proyecto' },
    { label: 'Información', date: lerpDate(data.fechaInicio, data.fechaEntrega, 0.1), color: c.purple, desc: 'Recopilamos contenido y materiales' },
    { label: 'Diseño', date: lerpDate(data.fechaInicio, data.fechaEntrega, 0.25), color: c.pink, desc: 'Estructura visual y experiencia' },
    { label: 'Desarrollo', date: lerpDate(data.fechaInicio, data.fechaEntrega, 0.5), color: c.teal, desc: 'Construcción del sitio' },
    { label: 'Revisión', date: lerpDate(data.fechaInicio, data.fechaEntrega, 0.8), color: c.amber, desc: 'Pruebas y ajustes finales' },
    { label: 'Lanzamiento', date: data.fechaEntrega, color: c.green, desc: 'Publicación oficial' },
    { label: 'Garantía', date: addDays(data.fechaEntrega, 7), color: c.purple, desc: '7 días de soporte post-entrega' },
  ];

  return (
    <DarkPage num={3}>
      <SectionBadge num="02" color={c.purple} />

      <Text style={{ fontSize: 22, fontFamily: 'Helvetica-Bold', color: c.white, marginBottom: 8 }}>
        Tu ruta hacia el lanzamiento
      </Text>
      <GlowLine width={40} color={c.purple} marginBottom={30} />

      {phases.map((phase, i) => {
        const isFirst = i === 0;
        const isLast = i === phases.length - 1;
        return (
          <View key={i} style={{ flexDirection: 'row' }}>
            {/* Timeline */}
            <View style={{ width: 50, alignItems: 'center' }}>
              {!isFirst && <View style={{ width: 2, height: 16, backgroundColor: c.border }} />}
              <View style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                backgroundColor: i === 0 ? phase.color : c.bgCard,
                borderWidth: 2,
                borderColor: phase.color,
              }} />
              {!isLast && <View style={{ width: 2, height: 16, backgroundColor: c.border }} />}
            </View>
            {/* Content */}
            <View style={{ flex: 1, paddingLeft: 10, justifyContent: 'center', height: isFirst || isLast ? 36 : 48 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: phase.color }}>{phase.label}</Text>
                <View style={{ backgroundColor: c.bgCard, borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2, borderWidth: 1, borderColor: c.border }}>
                  <Text style={{ fontSize: 8, color: c.whiteDim }}>{formatDateShort(phase.date)}</Text>
                </View>
              </View>
              <Text style={{ fontSize: 9, color: c.whiteMuted, marginTop: 2 }}>{phase.desc}</Text>
            </View>
          </View>
        );
      })}

      <View style={{ backgroundColor: c.bgCard, borderRadius: 8, padding: 14, marginTop: 24, borderWidth: 1, borderColor: c.border }}>
        <Text style={{ fontSize: 8, color: c.whiteDim, lineHeight: 1.6 }}>
          Las fechas son estimadas y pueden variar según la entrega de información y materiales. Cualquier retraso en la entrega de contenidos puede modificar el cronograma.
        </Text>
      </View>
    </DarkPage>
  );
}

// ==========================================
// PAGE 4 — ¿CÓMO TRABAJAREMOS?
// ==========================================
function ProcessPage() {
  const steps = [
    { num: '01', title: 'Recopilación de información', client: 'Nos envías textos, imágenes, logos y contenido.', dev: 'Organizamos y preparamos todo para el diseño.', color: c.teal },
    { num: '02', title: 'Diseño y estructura', client: 'Revisas la propuesta visual y compartes feedback.', dev: 'Diseñamos la estructura y experiencia del sitio.', color: c.purple },
    { num: '03', title: 'Desarrollo', client: 'Mantienes comunicación activa para resolver dudas.', dev: 'Construimos el sitio con las funcionalidades acordadas.', color: c.pink },
    { num: '04', title: 'Revisión y ajustes', client: 'Pruebas el sitio y nos envías tus observaciones.', dev: 'Realizamos los ajustes y correcciones necesarias.', color: c.amber },
    { num: '05', title: 'Lanzamiento', client: 'Confirmas que todo está listo para salir en vivo.', dev: 'Publicamos el sitio y te entregamos los accesos.', color: c.green },
  ];

  return (
    <DarkPage num={4}>
      <SectionBadge num="03" color={c.pink} />

      <Text style={{ fontSize: 22, fontFamily: 'Helvetica-Bold', color: c.white, marginBottom: 8 }}>
        Cómo trabajaremos
      </Text>
      <GlowLine width={40} color={c.pink} marginBottom={24} />

      {steps.map((step) => (
        <View key={step.num} style={{ marginBottom: 16 }} wrap={false}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
            <View style={{ width: 30, height: 30, borderRadius: 8, backgroundColor: c.bgCard, borderWidth: 1, borderColor: step.color, justifyContent: 'center', alignItems: 'center', marginRight: 12 }}>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: step.color }}>{step.num}</Text>
            </View>
            <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: c.white }}>{step.title}</Text>
          </View>
          <View style={{ flexDirection: 'row', gap: 8, paddingLeft: 42 }}>
            <View style={{ flex: 1, backgroundColor: c.bgCard, borderRadius: 8, padding: 12, borderWidth: 1, borderColor: c.border }}>
              <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: c.whiteDim, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Tú</Text>
              <Text style={{ fontSize: 9, color: c.whiteMuted, lineHeight: 1.5 }}>{step.client}</Text>
            </View>
            <View style={{ flex: 1, backgroundColor: c.bgCardAccent, borderRadius: 8, padding: 12, borderWidth: 1, borderColor: c.borderAccent }}>
              <Text style={{ fontSize: 7, fontFamily: 'Helvetica-Bold', color: c.teal, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 }}>Castennio</Text>
              <Text style={{ fontSize: 9, color: c.whiteMuted, lineHeight: 1.5 }}>{step.dev}</Text>
            </View>
          </View>
        </View>
      ))}
    </DarkPage>
  );
}

// ==========================================
// PAGE 5 — ¿QUÉ INCLUYE?
// ==========================================
function ScopePage({ data }: { data: ContractData }) {
  return (
    <DarkPage num={5}>
      <SectionBadge num="04" color={c.teal} />

      <Text style={{ fontSize: 22, fontFamily: 'Helvetica-Bold', color: c.white, marginBottom: 8 }}>
        Qué incluye tu proyecto
      </Text>
      <GlowLine width={40} color={c.teal} marginBottom={24} />

      {/* Feature grid */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 24 }}>
        {data.funcionalidades.map((func, i) => {
          const icon = getIcon(func);
          return (
            <View key={i} style={{
              width: '31%',
              backgroundColor: c.bgCard,
              borderRadius: 10,
              padding: 14,
              borderWidth: 1,
              borderColor: c.border,
              marginBottom: 2,
            }}>
              <View style={{
                width: 30,
                height: 30,
                borderRadius: 8,
                backgroundColor: icon.bg,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 10,
              }}>
                <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: icon.color }}>{icon.symbol}</Text>
              </View>
              <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: c.white, lineHeight: 1.4 }}>{func}</Text>
            </View>
          );
        })}
      </View>

      {/* Out of scope */}
      <View style={{ backgroundColor: c.bgCard, borderRadius: 10, padding: 16, borderWidth: 1, borderColor: c.redBg, borderLeftWidth: 3, borderLeftColor: c.red }}>
        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: c.red, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 10 }}>
          Fuera del alcance
        </Text>
        {[
          'Nuevas funcionalidades no contempladas en el contrato',
          'Integraciones con sistemas externos no acordados',
          'Cambios sustanciales posteriores a la entrega',
          'Creación de contenido (textos, imágenes, videos)',
        ].map((item, i) => (
          <Text key={i} style={{ fontSize: 9, color: c.whiteDim, lineHeight: 1.7, paddingLeft: 8 }}>
            -  {item}
          </Text>
        ))}
        <Text style={{ fontSize: 8, color: c.whiteDim, marginTop: 8, fontStyle: 'italic' }}>
          Estos trabajos pueden cotizarse por separado.
        </Text>
      </View>
    </DarkPage>
  );
}

// ==========================================
// PAGE 6 — PORTAL
// ==========================================
function PortalPage({ portalUrl }: { portalUrl?: string }) {
  const hasUrl = !!portalUrl;
  return (
    <Page size="A4" style={{
      backgroundColor: c.bg,
      fontFamily: 'Helvetica',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 60,
    }}>
      <Orb size={180} color={c.tealBg} top={100} left={300} opacity={0.5} />
      <Orb size={120} color={c.purpleBg} top={400} left={-20} opacity={0.4} />
      <Orb size={5} color={c.teal} top={200} left={120} opacity={0.6} />
      <Orb size={4} color={c.purple} top={500} left={380} opacity={0.5} />

      <SectionBadge num="05" color={c.green} />

      <Text style={{ fontSize: 10, color: c.whiteDim, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12, textAlign: 'center' }}>
        Tu espacio
      </Text>
      <Text style={{ fontSize: 26, fontFamily: 'Helvetica-Bold', color: c.white, textAlign: 'center', marginBottom: 12 }}>
        Portal del proyecto
      </Text>
      <GlowLine width={40} color={c.green} marginBottom={20} />
      <Text style={{ fontSize: 10, color: c.whiteMuted, textAlign: 'center', lineHeight: 1.7, maxWidth: 340, marginBottom: 40 }}>
        Un espacio donde podrás seguir el avance de tu proyecto, revisar entregables y comunicarte con el equipo.
      </Text>

      {/* CTA */}
      <View style={{
        backgroundColor: c.bgCard,
        borderRadius: 14,
        paddingVertical: 28,
        paddingHorizontal: 40,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: hasUrl ? c.tealDark : c.border,
        width: '100%',
        maxWidth: 380,
        marginBottom: 40,
      }}>
        {!hasUrl && (
          <View style={{ backgroundColor: c.bgCardLight, borderRadius: 12, paddingVertical: 4, paddingHorizontal: 12, marginBottom: 14 }}>
            <Text style={{ fontSize: 8, color: c.whiteDim, textTransform: 'uppercase', letterSpacing: 1 }}>Próximamente</Text>
          </View>
        )}
        <Text style={{ fontSize: 14, fontFamily: 'Helvetica-Bold', color: c.teal, marginBottom: 10, letterSpacing: 1 }}>
          ACCEDER AL PORTAL
        </Text>
        <View style={{ width: 40, height: 2, backgroundColor: c.teal, borderRadius: 1, marginBottom: 12 }} />
        <Text style={{ fontSize: 9, color: hasUrl ? c.teal : c.whiteDim, textAlign: 'center', lineHeight: 1.6 }}>
          {hasUrl ? portalUrl : 'Te compartiremos el enlace de acceso al iniciar el proyecto.'}
        </Text>
      </View>

      {/* Features row */}
      <View style={{ flexDirection: 'row', gap: 14, width: '100%' }}>
        {[
          { title: 'Avances', desc: 'Progreso en tiempo real', color: c.teal },
          { title: 'Archivos', desc: 'Entregables del proyecto', color: c.purple },
          { title: 'Comunicación', desc: 'Coordina con el equipo', color: c.green },
        ].map((item, i) => (
          <View key={i} style={{ flex: 1, alignItems: 'center', backgroundColor: c.bgCard, borderRadius: 10, padding: 14, borderWidth: 1, borderColor: c.border }}>
            <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: c.bgCardLight, marginBottom: 8, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: c.border }}>
              <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: item.color }}>{i + 1}</Text>
            </View>
            <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: c.white, marginBottom: 3, textAlign: 'center' }}>{item.title}</Text>
            <Text style={{ fontSize: 8, color: c.whiteDim, textAlign: 'center' }}>{item.desc}</Text>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={{ position: 'absolute', bottom: 22, left: 50, right: 50, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: 7, color: c.whiteDim }}>
          <Text style={{ fontFamily: 'Helvetica-Bold', color: c.teal }}>CASTENNIO</Text>  |  Guía de inicio
        </Text>
        <Text style={{ fontSize: 7, color: c.whiteDim }}>6</Text>
      </View>
    </Page>
  );
}

// ==========================================
// PAGE 7 — PRÓXIMOS PASOS
// ==========================================
function NextStepsPage({ data }: { data: ContractData }) {
  const steps = [
    { title: 'Envíanos la información de la empresa', desc: 'Logo en alta resolución, textos, descripción de servicios y cualquier material que quieras incluir.', color: c.teal },
    { title: 'Comparte imágenes y contenido', desc: 'Fotografías de productos, equipo, instalaciones o cualquier visual relevante para el sitio.', color: c.purple },
    ...(data.serviciosAccesos ? [{
      title: 'Confirma los accesos necesarios',
      desc: `Necesitaremos acceso a: ${data.serviciosAccesos}. Te guiaremos en la configuración.`,
      color: c.pink,
    }] : []),
    { title: 'Agenda la reunión de avance', desc: 'Coordinaremos una reunión de 30-45 minutos para mostrarte el progreso del proyecto.', color: c.green },
  ];

  return (
    <DarkPage num={7}>
      <SectionBadge num="06" color={c.amber} />

      <Text style={{ fontSize: 22, fontFamily: 'Helvetica-Bold', color: c.white, marginBottom: 8 }}>
        Próximos pasos
      </Text>
      <Text style={{ fontSize: 10, color: c.whiteMuted, marginBottom: 6 }}>
        Ahora necesitamos de ti
      </Text>
      <GlowLine width={40} color={c.amber} marginBottom={28} />

      {steps.map((step, i) => (
        <View key={i} style={{ flexDirection: 'row', marginBottom: 18, alignItems: 'flex-start' }} wrap={false}>
          <View style={{
            width: 22,
            height: 22,
            borderRadius: 6,
            borderWidth: 2,
            borderColor: step.color,
            marginRight: 14,
            marginTop: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{ fontSize: 1, color: 'transparent' }}>.</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 11, fontFamily: 'Helvetica-Bold', color: c.white, marginBottom: 4 }}>{step.title}</Text>
            <Text style={{ fontSize: 9, color: c.whiteMuted, lineHeight: 1.6 }}>{step.desc}</Text>
          </View>
        </View>
      ))}

      <View style={{ backgroundColor: c.bgCardAccent, borderRadius: 10, padding: 18, marginTop: 16, borderWidth: 1, borderColor: c.borderAccent }}>
        <Text style={{ fontSize: 9, fontFamily: 'Helvetica-Bold', color: c.teal, marginBottom: 6 }}>
          Tip
        </Text>
        <Text style={{ fontSize: 9, color: c.whiteMuted, lineHeight: 1.6 }}>
          Mientras más rápido recibamos la información, antes podremos avanzar. No te preocupes si no tienes todo listo, podemos comenzar con lo que tengas disponible.
        </Text>
      </View>
    </DarkPage>
  );
}

// ==========================================
// PAGE 8 — CIERRE
// ==========================================
function ClosingPage({ logoUrl }: { logoUrl: string }) {
  return (
    <Page size="A4" style={{
      backgroundColor: c.bg,
      fontFamily: 'Helvetica',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 60,
    }}>
      <Orb size={200} color={c.tealBg} top={150} left={280} opacity={0.4} />
      <Orb size={160} color={c.purpleBg} top={400} left={-30} opacity={0.3} />
      <Orb size={5} color={c.teal} top={250} left={100} opacity={0.6} />
      <Orb size={4} color={c.purple} top={450} left={400} opacity={0.5} />
      <Orb size={3} color={c.green} top={350} left={200} opacity={0.4} />

      <Image src={logoUrl} style={{ width: 50, height: 46, marginBottom: 20 }} />

      <Text style={{ fontSize: 26, fontFamily: 'Helvetica-Bold', color: c.white, textAlign: 'center', marginBottom: 8 }}>
        Estamos listos para comenzar.
      </Text>
      <Text style={{ fontSize: 12, color: c.whiteMuted, textAlign: 'center', marginBottom: 50 }}>
        Gracias por confiar en Castennio.
      </Text>

      <GlowLine width={50} color={c.teal} marginBottom={50} />

      <Text style={{ fontSize: 9, color: c.whiteDim, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 16 }}>
        Contacto
      </Text>
      <Text style={{ fontSize: 10, color: c.whiteMuted, marginBottom: 5 }}>
        castennio@gmail.com
      </Text>
      <Text style={{ fontSize: 10, color: c.whiteMuted, marginBottom: 20 }}>
        castennio.com
      </Text>

      {/* WhatsApp badge */}
      <View style={{
        backgroundColor: c.greenBg,
        borderRadius: 24,
        paddingVertical: 10,
        paddingHorizontal: 24,
        borderWidth: 1,
        borderColor: '#166534',
      }}>
        <Text style={{ fontSize: 10, fontFamily: 'Helvetica-Bold', color: c.green, textAlign: 'center' }}>
          WhatsApp: +51 998 162 677
        </Text>
      </View>
    </Page>
  );
}

// ==========================================
// FULL DOCUMENT
// ==========================================
function WelcomePackDocument({ data, logoUrl }: { data: ContractData; logoUrl: string }) {
  return (
    <Document>
      <CoverPage data={data} logoUrl={logoUrl} />
      <WelcomePage data={data} />
      <RoadmapPage data={data} />
      <ProcessPage />
      <ScopePage data={data} />
      <PortalPage portalUrl={data.portalUrl} />
      <NextStepsPage data={data} />
      <ClosingPage logoUrl={logoUrl} />
    </Document>
  );
}

export async function downloadWelcomePackPDF(data: ContractData): Promise<void> {
  const logoUrl = `${window.location.origin}/images/logo-castennio-fondo-transparente-icono-negro.png`;
  const blob = await pdf(<WelcomePackDocument data={data} logoUrl={logoUrl} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const slug = data.clienteEmpresa.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  link.download = `welcome-pack-${slug}-${Date.now()}.pdf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export default WelcomePackDocument;
