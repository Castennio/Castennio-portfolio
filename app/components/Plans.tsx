"use client";

import { useRef, useState } from "react";
import FadeIn, { StaggerFadeIn } from "./FadeIn";
import { WordReveal, GradientReveal, BlurReveal } from "./TextReveal";

const plans = [
  {
    id: "express",
    name: "Web Express",
    description: "Landing page simple y efectiva para empezar a captar clientes. Ideal para validar tu idea de negocio.",
    badge: null,
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    features: ["1 pagina", "Diseno responsive", "Entrega rapida"],
  },
  {
    id: "profesional",
    name: "Web Profesional",
    description: "Sitio web completo con diseno premium y funcionalidades avanzadas para negocios que quieren destacar.",
    badge: "Mas elegido",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    features: ["Hasta 5 paginas", "SEO optimizado", "Formularios"],
  },
  {
    id: "empresarial",
    name: "Web Empresarial",
    description: "Solucion robusta para negocios en crecimiento con multiples paginas y funcionalidades escalables.",
    badge: "Escalable",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    features: ["Hasta 10 paginas", "Integraciones", "Panel admin"],
  },
  {
    id: "elite",
    name: "Web Corporativa Elite",
    description: "Plataforma empresarial completa con integraciones avanzadas y funcionalidades totalmente a medida.",
    badge: "Premium",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    features: ["Paginas ilimitadas", "A medida", "Soporte prioritario"],
  },
];

const WHATSAPP_NUMBER = "51939603821";

function PlanCard({ plan, index }: { plan: typeof plans[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 25;
    const rotateY = (centerX - x) / 25;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    setGlowPosition({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 });
  };

  const handleMouseLeave = () => {
    setTransform("");
    setGlowPosition({ x: 50, y: 50 });
  };

  const whatsappMessage = encodeURIComponent(`Hola! Me interesa el plan ${plan.name}. Me gustaria recibir mas informacion.`);
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`;

  const isPopular = plan.badge === "Mas elegido";

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      style={{
        transform,
        transition: transform ? "none" : "transform 0.5s ease-out",
      }}
    >
      {/* Animated gradient border */}
      <div
        className={`absolute -inset-[1px] rounded-2xl transition-opacity duration-500 ${
          isPopular ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        style={{
          background: "linear-gradient(135deg, #7C3AED, #A78BFA, #7C3AED)",
          backgroundSize: "200% 200%",
          animation: "gradientFlow 3s ease infinite",
        }}
      />

      {/* Card content */}
      <div className={`relative h-full p-8 rounded-2xl bg-[#0f1015] border transition-colors duration-500 ${
        isPopular ? "border-transparent" : "border-white/[0.06] group-hover:border-transparent"
      }`}>
        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(124, 58, 237, 0.15) 0%, transparent 50%)`,
          }}
        />

        {/* Badge */}
        {plan.badge && (
          <div className="absolute -top-3 right-6">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] font-medium tracking-wider uppercase rounded-full shadow-lg ${
              isPopular
                ? "bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white shadow-[#7C3AED]/25"
                : "bg-white/10 text-white/70"
            }`}>
              {isPopular && <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
              {plan.badge}
            </span>
          </div>
        )}

        {/* Icon */}
        <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-[#7C3AED]/10 to-[#A78BFA]/10 border border-white/[0.06] flex items-center justify-center text-white/50 group-hover:text-[#A78BFA] transition-all duration-500 mb-6 group-hover:scale-110">
          <div className="transition-transform duration-500 group-hover:scale-110">
            {plan.icon}
          </div>
          <div className="absolute inset-0 rounded-xl bg-[#7C3AED]/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        {/* Content */}
        <h3 className="text-xl font-semibold text-white/90 mb-3 group-hover:text-white transition-colors duration-300">
          {plan.name}
        </h3>
        <p className="text-[15px] text-white/50 leading-relaxed mb-6 group-hover:text-white/60 transition-colors duration-300">
          {plan.description}
        </p>

        {/* Features */}
        <ul className="space-y-2 mb-8">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-[13px] text-white/40 group-hover:text-white/50 transition-colors">
              <svg className="w-4 h-4 text-[#7C3AED]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm transition-all duration-300 ${
            isPopular
              ? "bg-gradient-to-r from-[#7C3AED] to-[#A78BFA] text-white shadow-lg shadow-[#7C3AED]/25 hover:shadow-[#7C3AED]/40 hover:scale-[1.02]"
              : "bg-white/[0.04] text-white/70 border border-white/[0.08] hover:bg-[#7C3AED]/10 hover:border-[#7C3AED]/30 hover:text-white"
          }`}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Consultar ahora
        </a>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-[#7C3AED]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
    </div>
  );
}

export default function Plans() {
  return (
    <section id="planes" className="py-32 px-6 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#7C3AED]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn>
            <p className="text-[13px] text-[#A78BFA] tracking-widest uppercase mb-4">
              Planes de desarrollo
            </p>
          </FadeIn>
          <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em] mb-6">
            <WordReveal as="span" className="text-white/90" delay={0.1}>
              Elige el plan
            </WordReveal>{" "}
            <GradientReveal
              as="span"
              className="inline-block"
              delay={0.3}
              gradientFrom="#7C3AED"
              gradientTo="#A78BFA"
            >
              perfecto para ti
            </GradientReveal>
          </h2>
          <BlurReveal
            as="p"
            className="text-white/55 text-[15px] max-w-lg mx-auto"
            delay={0.4}
            stagger={0.01}
          >
            Desde landing pages simples hasta plataformas empresariales completas. Encuentra la solucion ideal para tu negocio.
          </BlurReveal>
        </div>

        {/* Plans grid */}
        <StaggerFadeIn className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.1}>
          {plans.map((plan, index) => (
            <PlanCard key={plan.id} plan={plan} index={index} />
          ))}
        </StaggerFadeIn>

        {/* Bottom CTA */}
        <FadeIn delay={0.6}>
          <div className="text-center mt-16">
            <p className="text-white/40 text-[15px] mb-4">
              No estas seguro de cual elegir?
            </p>
            <a
              href="#diagnostico"
              className="inline-flex items-center gap-2 text-[#A78BFA] hover:text-[#C4B5FD] transition-colors duration-300 text-[15px] font-medium group"
            >
              Haz el diagnostico gratuito y te recomendamos
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
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
