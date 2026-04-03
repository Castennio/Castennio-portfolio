"use client";

import { useState } from "react";
import FadeIn, { StaggerFadeIn } from "./FadeIn";

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
    id: "presencia",
    name: "Presencia",
    tagline: "Existir online",
    description: "Para quienes necesitan una presencia digital profesional",
    features: [
      "Página web con secciones esenciales",
      "Diseño responsive optimizado",
      "Integración de WhatsApp",
      "SEO básico configurado",
      "Hosting rápido incluido",
    ],
    cta: "Comenzar",
    addon: {
      name: "Setup Básico",
      services: ["Configuración de dominio", "Setup de hosting"],
    },
  },
  {
    id: "clientes",
    name: "Conversión",
    tagline: "Generar clientes",
    description: "Diseñado para convertir visitantes en clientes",
    features: [
      "Página optimizada para conversión",
      "Copywriting estratégico",
      "Formularios con integración",
      "SEO avanzado",
      "Pasarela de pagos integrada",
      "Analytics configurado",
    ],
    cta: "Elegir plan",
    featured: true,
    addon: {
      name: "Setup Completo",
      services: [
        "Dominio personalizado",
        "Hosting premium",
        "Emails corporativos",
        "Pasarela de pagos",
        "Puesta en marcha",
      ],
    },
  },
  {
    id: "sistema",
    name: "Sistema",
    tagline: "Escalar negocio",
    description: "Para digitalizar y automatizar operaciones",
    features: [
      "Panel de administración",
      "Gestión de usuarios y roles",
      "Autenticación segura",
      "Dashboard con métricas",
      "Base de datos escalable",
      "Automatizaciones",
      "API documentada",
    ],
    cta: "Escalar",
    addon: {
      name: "Setup Premium",
      services: [
        "Todo de Setup Completo",
        "Base de datos cloud",
        "Integraciones API",
        "Automatizaciones",
        "Capacitación",
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
          <p className="text-[13px] text-white/30 tracking-wide">{plan.tagline}</p>
        </div>

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-1 h-1 rounded-full bg-white/30 mt-2.5 flex-shrink-0" />
              <span className="text-[15px] text-white/50 leading-relaxed">{feature}</span>
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
                <p className="text-[11px] text-white/25">Costo adicional</p>
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
                  <li key={index} className="flex items-center gap-2 text-[13px] text-white/40">
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
          href={`https://wa.me/51999999999?text=${encodeURIComponent(
            `Hola, me interesa el plan ${plan.name}${addonEnabled ? ` con ${plan.addon.name}` : ""}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
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
        <FadeIn className="text-center mb-20">
          <p className="text-[13px] text-white/30 tracking-widest uppercase mb-4">
            Inversión
          </p>
          <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em] text-white/90 mb-6">
            Planes <span className="text-gradient">flexibles</span>
          </h2>
          <p className="text-white/40 text-[15px] max-w-md mx-auto">
            Elige el plan que mejor se adapte a tu etapa de negocio
          </p>
        </FadeIn>

        {/* Plans */}
        <StaggerFadeIn className="grid md:grid-cols-3 gap-6" stagger={0.15}>
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </StaggerFadeIn>

        {/* Disclaimer */}
        <p className="text-center text-white/20 text-[13px] mt-16">
          No incluye costos de servicios externos (dominio, hosting, pasarelas)
        </p>
      </div>
    </section>
  );
}
