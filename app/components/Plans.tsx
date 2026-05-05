"use client";

import { useRef, useState } from "react";
import FadeIn, { StaggerFadeIn } from "./FadeIn";
import { WordReveal, GradientReveal, BlurReveal } from "./TextReveal";

const plans = [
  {
    id: "express",
    name: "Express",
    price: "49",
    idealFor: "Emprendedores que inician",
    outcome: "Presencia basica para captar tus primeros clientes.",
    badge: null,
    features: [
      "Landing page",
      "Diseño responsive",
      "WhatsApp directo",
      "Redes sociales",
      "Contacto básico",
    ],
  },
  {
    id: "profesional",
    name: "Profesional",
    price: "199",
    idealFor: "Negocios locales",
    outcome: "Genera confianza y convierte visitas en clientes",
    badge: "Recomendado",
    features: [
      "Todo de Express",
      "Google Maps integrado",
      "SEO local optimizado",
      "Testimonios reales",
      "Página Sobre Nosotros",
      "CTAs estratégicos",
    ],
  },
  {
    id: "empresarial",
    name: "Empresarial",
    price: "399",
    idealFor: "PYMES en crecimiento",
    outcome: "Escala y automatiza",
    badge: null,
    features: [
      "Todo de Profesional",
      "Página por servicio",
      "Blog integrado",
      "Reservas online",
      "SEO + Analytics",
      "FAQ section",
      "Google Sheets",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    price: "900",
    idealFor: "Empresas que digitalizan",
    outcome: "Control total de tu operación",
    badge: "Exclusive",
    features: [
      "Todo de Empresarial",
      "Panel admin custom",
      "Base de datos",
      "Usuarios y roles",
      "Pagos online",
      "Dashboard métricas",
      "Automatización",
      "Seguridad avanzada",
    ],
  },
];

const WHATSAPP_NUMBER = "51998162677";

// ============================================
// EXPRESS CARD - Minimalista, outline, rápido
// ============================================
function ExpressCard({ plan }: { plan: typeof plans[0] }) {
  const whatsappMessage = encodeURIComponent(`Hola! Me interesa el plan ${plan.name}. ¿Podrían darme más información?`);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="group relative flex flex-col h-full">
      <div className="relative flex-1 flex flex-col p-6 lg:p-7 rounded-2xl border border-white/[0.08] bg-transparent hover:border-white/[0.15] transition-all duration-500">
        {/* Minimal dot accent */}
        <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-white/20 group-hover:bg-white/40 transition-colors" />

        {/* Header - Light weight */}
        <div className="mb-8">
          <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2 font-light">Inicio rápido</p>
          <h3 className="text-xl font-light text-white/80 tracking-wide">
            {plan.name}
          </h3>
        </div>

        {/* Price - Clean */}
        <div className="mb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-white/40 font-light">Desde S/.</span>
            <span className="text-4xl font-extralight text-white/90 tracking-tight">{plan.price}</span>
          </div>
          <p className="text-xs text-white/40 mt-2 font-light">{plan.outcome}</p>
        </div>

        {/* Minimal divider */}
        <div className="w-8 h-px bg-white/15 mb-6" />

        {/* Features - Minimal list */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2.5 text-[13px] text-white/55 font-light">
              <span className="w-1 h-1 rounded-full bg-white/30" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA - Outline style */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg border border-white/[0.15] text-white/60 text-sm font-light hover:border-white/[0.3] hover:text-white/80 transition-all duration-300"
        >
          Comenzar
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ============================================
// PROFESIONAL CARD - Vivo, gradientes, el hero
// ============================================
function ProfesionalCard({ plan }: { plan: typeof plans[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const whatsappMessage = encodeURIComponent(`Hola! Me interesa el plan ${plan.name}. ¿Podrían darme más información?`);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col h-full lg:-mt-4 lg:mb-4"
    >
      {/* Animated gradient border */}
      <div
        className="absolute -inset-[2px] rounded-3xl opacity-100"
        style={{
          background: "linear-gradient(135deg, #7C3AED, #EC4899, #7C3AED, #3B82F6)",
          backgroundSize: "300% 300%",
          animation: "gradientFlow 6s ease infinite",
        }}
      />

      {/* Outer glow */}
      <div className="absolute -inset-4 bg-[#7C3AED]/20 rounded-[2rem] blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />

      <div className="relative flex-1 flex flex-col p-7 lg:p-9 rounded-3xl bg-[#0c0c12]">
        {/* Dynamic glow */}
        <div
          className="absolute inset-0 rounded-3xl opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(124, 58, 237, 0.4) 0%, transparent 60%)`,
          }}
        />

        {/* Badge */}
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full bg-gradient-to-r from-[#7C3AED] via-[#EC4899] to-[#7C3AED] text-white shadow-lg shadow-[#7C3AED]/40"
            style={{ backgroundSize: "200% 100%", animation: "gradientFlow 3s ease infinite" }}>
            <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
            {plan.badge}
          </span>
        </div>

        {/* Header */}
        <div className="mt-4 mb-6">
          <p className="text-xs uppercase tracking-[0.15em] text-[#A78BFA] mb-2 font-medium">{plan.idealFor}</p>
          <h3 className="text-2xl font-semibold text-white tracking-tight">
            {plan.name}
          </h3>
        </div>

        {/* Price - Prominent */}
        <div className="mb-4">
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm text-white/50">Desde S/.</span>
            <span className="text-5xl font-bold text-white tracking-tight">{plan.price}</span>
          </div>
        </div>

        {/* Outcome - Highlighted */}
        <div className="mb-6 pb-6 border-b border-white/[0.08]">
          <p className="text-sm text-white/70 leading-relaxed">
            {plan.outcome}
          </p>
        </div>

        {/* Features - Rich checkmarks */}
        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3 text-sm text-white/80">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#EC4899] flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* CTA - Vibrant */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl font-semibold text-sm bg-gradient-to-r from-[#7C3AED] via-[#A855F7] to-[#EC4899] text-white shadow-xl shadow-[#7C3AED]/30 hover:shadow-[#7C3AED]/50 hover:scale-[1.02] transition-all duration-300"
          style={{ backgroundSize: "200% 100%", animation: "gradientFlow 4s ease infinite" }}
        >
          Empezar ahora
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ============================================
// EMPRESARIAL CARD - Geométrico, estructurado
// ============================================
function EmpresarialCard({ plan }: { plan: typeof plans[0] }) {
  const whatsappMessage = encodeURIComponent(`Hola! Me interesa el plan ${plan.name}. ¿Podrían darme más información?`);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="group relative flex flex-col h-full">
      {/* Geometric corner accents */}
      <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-[#3B82F6]/30 rounded-tl-2xl pointer-events-none group-hover:border-[#3B82F6]/50 transition-colors" />
      <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-[#3B82F6]/30 rounded-br-2xl pointer-events-none group-hover:border-[#3B82F6]/50 transition-colors" />

      <div className="relative flex-1 flex flex-col p-6 lg:p-7 rounded-2xl bg-[#0a0a10]/80 border border-[#3B82F6]/10 hover:border-[#3B82F6]/25 transition-all duration-500">
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 rounded-2xl opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(#3B82F6 1px, transparent 1px), linear-gradient(90deg, #3B82F6 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        {/* Header - Structured */}
        <div className="mb-6 relative">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1.5 h-1.5 bg-[#3B82F6]" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#3B82F6]/70 font-medium">Escalable</p>
          </div>
          <h3 className="text-xl font-medium text-white/90 tracking-tight">
            {plan.name}
          </h3>
          <p className="text-xs text-white/40 mt-1">{plan.idealFor}</p>
        </div>

        {/* Price - Technical */}
        <div className="mb-5 p-4 rounded-lg bg-[#3B82F6]/[0.05] border border-[#3B82F6]/10">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-[#3B82F6]/60 font-mono">S/.</span>
            <span className="text-3xl font-semibold text-white/90 font-mono tracking-tight">{plan.price}</span>
            <span className="text-xs text-white/30 font-mono">+</span>
          </div>
          <p className="text-[11px] text-[#3B82F6]/50 mt-1.5 font-mono">{plan.outcome}</p>
        </div>

        {/* Features - Technical list */}
        <ul className="space-y-2 mb-8 flex-1">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2.5 text-[13px] text-white/60">
              <div className="w-4 h-4 rounded border border-[#3B82F6]/30 flex items-center justify-center">
                <svg className="w-2.5 h-2.5 text-[#3B82F6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA - Geometric */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#3B82F6]/10 border border-[#3B82F6]/20 text-[#3B82F6] text-sm font-medium hover:bg-[#3B82F6]/20 hover:border-[#3B82F6]/40 transition-all duration-300"
        >
          Solicitar propuesta
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// ============================================
// ELITE CARD - Premium, dorado, exclusivo
// ============================================
function EliteCard({ plan }: { plan: typeof plans[0] }) {
  const whatsappMessage = encodeURIComponent(`Hola! Me interesa el plan ${plan.name}. ¿Podrían darme más información?`);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  return (
    <div className="group relative flex flex-col h-full">
      {/* Subtle gold glow */}
      <div className="absolute -inset-1 bg-gradient-to-b from-[#D4AF37]/10 via-transparent to-[#D4AF37]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />

      <div className="relative flex-1 flex flex-col p-6 lg:p-7 rounded-2xl bg-[#08080a] border border-[#D4AF37]/10 hover:border-[#D4AF37]/25 transition-all duration-500 overflow-hidden">
        {/* Premium texture */}
        <div
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Exclusive badge */}
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[9px] font-medium tracking-[0.15em] uppercase rounded bg-[#D4AF37]/10 text-[#D4AF37]/80 border border-[#D4AF37]/20">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
            </svg>
            {plan.badge}
          </span>
        </div>

        {/* Header - Premium */}
        <div className="mb-6 mt-2">
          <h3 className="text-xl font-medium text-[#E5C158] tracking-wide">
            {plan.name}
          </h3>
          <p className="text-xs text-white/55 mt-1.5">{plan.idealFor}</p>
        </div>

        {/* Price - Gold accent */}
        <div className="mb-5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs text-[#D4AF37]/80">Desde S/.</span>
            <span className="text-3xl font-light text-[#E5C158] tracking-tight">{plan.price}</span>
          </div>
          <p className="text-[11px] text-white/50 mt-2 italic">{plan.outcome}</p>
        </div>

        {/* Gold divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-[#D4AF37]/40 to-transparent mb-5" />

        {/* Features - Premium marks */}
        <ul className="space-y-2.5 mb-8 flex-1">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2.5 text-[12px] text-white/70">
              <span className="text-[#E5C158]">◆</span>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA - Premium */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-gradient-to-r from-[#D4AF37]/20 to-[#B8860B]/20 border border-[#D4AF37]/30 text-[#E5C158] text-sm font-medium hover:border-[#D4AF37]/60 hover:bg-[#D4AF37]/25 transition-all duration-300"
        >
          Contactar
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </a>
      </div>
    </div>
  );
}

// Card renderer based on plan type
function PlanCard({ plan }: { plan: typeof plans[0] }) {
  switch (plan.id) {
    case "express":
      return <ExpressCard plan={plan} />;
    case "profesional":
      return <ProfesionalCard plan={plan} />;
    case "empresarial":
      return <EmpresarialCard plan={plan} />;
    case "elite":
      return <EliteCard plan={plan} />;
    default:
      return <ExpressCard plan={plan} />;
  }
}

export default function Plans() {
  return (
    <section id="planes" className="py-24 lg:py-32 px-4 sm:px-6 bg-[#0a0a0f] relative overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#7C3AED]/[0.04] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#3B82F6]/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto relative">
        {/* Header - Minimal */}
        <div className="text-center mb-20 lg:mb-24">
          <FadeIn>
            <p className="text-[11px] text-white/30 tracking-[0.3em] uppercase mb-5 font-light">
              Planes
            </p>
          </FadeIn>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.02em] mb-6">
            <WordReveal as="span" className="text-white/90" delay={0.1}>
              Elige cómo
            </WordReveal>{" "}
            <GradientReveal
              as="span"
              className="inline-block font-normal"
              delay={0.3}
              gradientFrom="#7C3AED"
              gradientTo="#EC4899"
            >
              empezar
            </GradientReveal>
          </h2>
          <BlurReveal
            as="p"
            className="text-white/40 text-base max-w-md mx-auto leading-relaxed font-light"
            delay={0.4}
            stagger={0.01}
          >
            Cada negocio es diferente. Encuentra tu punto de partida.
          </BlurReveal>
        </div>

        {/* Plans grid */}
        <StaggerFadeIn className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-4 xl:gap-5 items-stretch" stagger={0.12}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </StaggerFadeIn>

        {/* Bottom section - Minimal */}
        <FadeIn delay={0.6}>
          <div className="mt-20 lg:mt-24 text-center">
            {/* Simple trust line */}
            <div className="flex items-center justify-center gap-6 text-[11px] text-white/25 tracking-wide mb-8">
              <span>Precio fijo</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span>Sin sorpresas</span>
              <span className="w-1 h-1 rounded-full bg-white/10" />
              <span>Soporte 30 días</span>
            </div>

            {/* CTA */}
            <p className="text-white/30 text-sm mb-3 font-light">
              ¿No estás seguro?
            </p>
            <a
              href="#diagnostico"
              className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 text-sm group"
            >
              Te ayudamos a elegir
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>

      {/* CSS for gradient animation */}
      <style jsx>{`
        @keyframes gradientFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  );
}
