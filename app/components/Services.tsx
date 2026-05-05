"use client";

import { useState } from "react";
import FadeIn from "./FadeIn";

const services = [
  {
    id: "redesign",
    title: "Rediseño",
    subtitle: "Tu web actual no convierte",
    description: "Renovamos el diseño, mejoramos la velocidad y optimizamos para convertir visitas en clientes.",
    includes: ["Análisis actual", "Nuevo diseño", "Migración de contenido", "SEO preservado"],
  },
  {
    id: "migration",
    title: "Migración",
    subtitle: "WordPress, Wix o similar",
    description: "Pasamos tu sitio a tecnología moderna. Más rápido, más seguro, más fácil de mantener.",
    includes: ["Migración completa", "Hosting moderno", "10x más rápido", "Sin downtime"],
  },
  {
    id: "integrations",
    title: "Integraciones",
    subtitle: "Automatiza tu negocio",
    description: "Conectamos tu web con pagos, agenda, CRM, WhatsApp y las herramientas que necesites.",
    includes: ["Pagos online", "Google Calendar", "WhatsApp Business", "Automatizaciones"],
  },
];

function ServiceItem({ service, isOpen, onToggle }: {
  service: typeof services[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-6 flex items-center justify-between gap-4 text-left group"
      >
        <div className="flex items-center gap-6">
          <h3 className="text-lg sm:text-xl font-light text-white/80 group-hover:text-white transition-colors">
            {service.title}
          </h3>
          <span className="hidden sm:block text-sm text-white/30 font-light">
            {service.subtitle}
          </span>
        </div>

        <div className={`w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-white/10 rotate-45" : "group-hover:border-white/20"
        }`}>
          <svg className="w-4 h-4 text-white/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        </div>
      </button>

      {/* Expandable content */}
      <div className={`overflow-hidden transition-all duration-500 ease-out ${
        isOpen ? "max-h-64 opacity-100 pb-6" : "max-h-0 opacity-0"
      }`}>
        <div className="pl-0 sm:pl-6">
          <p className="text-white/50 text-sm leading-relaxed mb-4 max-w-xl">
            {service.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {service.includes.map((item, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-xs text-white/40 bg-white/[0.03] rounded-full border border-white/[0.06]"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Services() {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="servicios" className="py-20 lg:py-24 px-4 sm:px-6 bg-[#0a0a0f] relative">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <FadeIn>
          <div className="mb-12">
            <h2 className="text-2xl sm:text-3xl font-medium text-white tracking-tight mb-2">
              ¿Ya tienes web?
            </h2>
            <p className="text-lg text-white/70 font-light italic">
              La mejoramos
            </p>
          </div>
        </FadeIn>

        {/* Accordion */}
        <FadeIn delay={0.1}>
          <div className="border-t border-white/[0.06]">
            {services.map((service) => (
              <ServiceItem
                key={service.id}
                service={service}
                isOpen={openId === service.id}
                onToggle={() => handleToggle(service.id)}
              />
            ))}
          </div>
        </FadeIn>

        {/* CTA - Focused on diagnostic */}
        <FadeIn delay={0.2}>
          <div className="mt-12 p-6 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <p className="text-white/70 text-sm">
                  ¿No sabes qué necesita tu web?
                </p>
                <p className="text-white/40 text-xs mt-1">
                  El diagnóstico te dice exactamente qué mejorar.
                </p>
              </div>
              <a
                href="#diagnostico"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium text-white/80 bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.1] hover:border-white/[0.15] rounded-lg transition-all duration-300 whitespace-nowrap"
              >
                Hacer diagnóstico
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
