"use client";

import { useState } from "react";
import FadeIn, { StaggerFadeIn } from "./FadeIn";
import { WordReveal, GradientReveal, BlurReveal } from "./TextReveal";

interface Plan {
  id: string;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  cta: string;
  featured?: boolean;
  addon: {
    name: string;
    services: string[];
  };
}

const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Empieza a atraer clientes",
    description: "Para negocios que quieren dejar de ser invisibles y empezar a recibir contactos",
    features: [
      "Clientes te encuentran en Google",
      "Te contactan directo por WhatsApp",
      "Se ve perfecto en celular",
      "Listo en pocos días",
      "Cero conocimiento técnico necesario",
    ],
    cta: "Consultar este plan",
    addon: {
      name: "Puesta en marcha",
      services: ["Te ayudamos a elegir tu nombre web", "Lo dejamos todo funcionando"],
    },
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "Convierte visitantes en clientes",
    description: "Para negocios listos para vender más y dejar de perder oportunidades",
    features: [
      "Diseño que genera confianza y ventas",
      "Los interesados te escriben solos",
      "Recibe pagos sin complicaciones",
      "Sabes cuántas personas te visitan",
      "Textos escritos para vender",
    ],
    cta: "Consultar este plan",
    featured: true,
    addon: {
      name: "Lanzamiento completo",
      services: [
        "Tu propio nombre web",
        "Correos profesionales",
        "Pagos configurados",
        "Te enseñamos a usarlo",
      ],
    },
  },
  {
    id: "scale",
    name: "Scale",
    tagline: "Automatiza y libera tu tiempo",
    description: "Para negocios que quieren crecer sin trabajar más horas",
    features: [
      "Tu negocio en un solo panel",
      "Cotizaciones se envían solas",
      "Reportes claros de tus ventas",
      "Tu equipo puede acceder",
      "Preparado para crecer contigo",
    ],
    cta: "Consultar este plan",
    addon: {
      name: "Transformación completa",
      services: [
        "Organizamos tu información",
        "Conectamos tus herramientas",
        "Capacitamos a tu equipo",
        "Atención prioritaria",
      ],
    },
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  const [addonEnabled, setAddonEnabled] = useState(false);

  return (
    <div
      className={`relative rounded-2xl transition-all duration-500 ${
        plan.featured
          ? "bg-white/[0.03] border border-white/[0.08]"
          : "bg-white/[0.01] border border-white/[0.04] hover:border-white/[0.08]"
      }`}
    >
      {/* Featured indicator */}
      {plan.featured && (
        <div className="absolute -top-px left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      )}

      <div className="p-8 md:p-10">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h3 className="text-2xl font-medium text-white/90">{plan.name}</h3>
            {plan.featured && (
              <span className="px-2.5 py-1 text-[10px] font-medium tracking-widest uppercase text-blue-400 bg-blue-500/10 rounded-full">
                Popular
              </span>
            )}
          </div>
          <p className="text-[13px] text-white/50 tracking-wide">{plan.tagline}</p>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-white/30 mt-2.5 flex-shrink-0" />
              <span className="text-[15px] text-white/60 leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Addon toggle */}
        <div
          className={`rounded-xl border transition-all duration-300 mb-8 ${
            addonEnabled
              ? "border-blue-500/20 bg-blue-500/[0.03]"
              : "border-white/[0.04] bg-white/[0.01]"
          }`}
        >
          <button
            onClick={() => setAddonEnabled(!addonEnabled)}
            className="w-full flex items-center justify-between p-4 cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                  addonEnabled ? "bg-blue-500/20 text-blue-400" : "bg-white/[0.04] text-white/30"
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div className="text-left">
                <p className={`text-sm ${addonEnabled ? "text-white/80" : "text-white/50"}`}>
                  {plan.addon.name}
                </p>
                <p className="text-[11px] text-white/40">Costo adicional</p>
              </div>
            </div>

            <div
              className={`w-10 h-5 rounded-full transition-colors duration-300 relative ${
                addonEnabled ? "bg-blue-500/30" : "bg-white/[0.06]"
              }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full transition-all duration-300 ${
                  addonEnabled ? "left-5 bg-blue-400" : "left-0.5 bg-white/30"
                }`}
              />
            </div>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              addonEnabled ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 pb-4 pt-1 border-t border-white/[0.04]">
              <ul className="space-y-2">
                {plan.addon.services.map((service, index) => (
                  <li key={index} className="flex items-center gap-2 text-[13px] text-white/55">
                    <div className="w-1 h-1 rounded-full bg-blue-500/50" />
                    {service}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <a
          href={`https://wa.me/51998162677?text=${encodeURIComponent(
            `Hola, me interesa el plan ${plan.name}${addonEnabled ? ` con ${plan.addon.name}` : ""}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="Elegir"
          className={`block w-full py-4 text-center font-medium text-[15px] rounded-xl transition-all duration-500 ${
            plan.featured
              ? "bg-white text-black hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
              : "border border-white/[0.08] text-white/60 hover:text-white hover:border-white/20 hover:bg-white/[0.02]"
          }`}
        >
          {plan.cta}
        </a>
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section id="planes" className="py-32 px-6 bg-[#050505] relative">
      {/* Subtle border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn>
            <p className="text-[13px] text-white/50 tracking-widest uppercase mb-4">
              Planes para cada etapa
            </p>
          </FadeIn>
          <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em] mb-6">
            <WordReveal as="span" className="text-white/90" delay={0.1}>
              ¿Cuál es tu
            </WordReveal>{" "}
            <GradientReveal
              as="span"
              className="inline-block"
              delay={0.3}
              gradientFrom="#3b82f6"
              gradientTo="#8b5cf6"
            >
              mayor desafío?
            </GradientReveal>
          </h2>
          <BlurReveal
            as="p"
            className="text-white/55 text-[15px] max-w-md mx-auto"
            delay={0.4}
            stagger={0.01}
          >
            No tienes que decidir ahora. Escríbenos y juntos elegimos qué necesita tu negocio
          </BlurReveal>
        </div>

        {/* Plans */}
        <StaggerFadeIn className="grid md:grid-cols-3 gap-6" stagger={0.15}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </StaggerFadeIn>

        {/* Disclaimer */}
        <p className="text-center text-white/40 text-[13px] mt-16">
          ¿No estás seguro? Escríbenos y te decimos cuál te conviene. Sin compromiso ni presión.
        </p>
      </div>
    </section>
  );
}
