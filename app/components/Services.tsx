"use client";

import FadeIn, { StaggerFadeIn } from "./FadeIn";
import { WordReveal, GradientReveal, BlurReveal } from "./TextReveal";

const services = [
  {
    id: "web-new",
    title: "Páginas web desde cero",
    description:
      "Landing pages o sitios completos. Diseño moderno que se ve bien en cualquier dispositivo.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
    ),
  },
  {
    id: "redesign",
    title: "Rediseño de sitios existentes",
    description:
      "Si ya tienes web pero se ve anticuada o no convierte, la renovamos con un diseño profesional.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
  },
  {
    id: "migration",
    title: "Migraciones",
    description:
      "Pasamos tu sitio a tecnología moderna (NextJS) para que sea rápido, seguro y fácil de mantener.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    id: "integrations",
    title: "Integraciones",
    description:
      "Conectamos tu sitio con pagos, agenda (Google Calendar), formularios y lo que tu negocio necesite.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="servicios" className="py-32 px-6 bg-[#0a0a0f] relative">
      {/* Subtle border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn>
            <p className="text-[13px] text-white/50 tracking-widest uppercase mb-4">
              Nuestros servicios
            </p>
          </FadeIn>
          <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em] mb-6">
            <WordReveal as="span" className="text-white/90" delay={0.1}>
              Soluciones
            </WordReveal>{" "}
            <GradientReveal
              as="span"
              className="inline-block"
              delay={0.3}
              gradientFrom="#3b82f6"
              gradientTo="#8b5cf6"
            >
              a tu medida
            </GradientReveal>
          </h2>
          <BlurReveal
            as="p"
            className="text-white/55 text-[15px] max-w-md mx-auto"
            delay={0.4}
            stagger={0.01}
          >
            Cada negocio es diferente. Por eso no vendemos paquetes cerrados, sino lo que realmente necesitas.
          </BlurReveal>
        </div>

        {/* Services grid */}
        <StaggerFadeIn className="grid md:grid-cols-2 gap-6" stagger={0.12}>
          {services.map((service) => (
            <div
              key={service.id}
              className="group relative p-8 rounded-2xl border border-white/[0.06] bg-[#0f1015] hover:bg-[#14151a] hover:border-white/[0.12] transition-all duration-500"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-violet-500/10 border border-white/[0.06] flex items-center justify-center text-white/50 group-hover:text-blue-400/70 transition-colors duration-300 mb-6">
                {service.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-medium text-white/90 mb-3 group-hover:text-white transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-[15px] text-white/55 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </StaggerFadeIn>

        {/* CTA */}
        <FadeIn delay={0.5}>
          <div className="text-center mt-16">
            <p className="text-white/40 text-[15px] mb-6">
              ¿No sabes qué necesitas? El diagnóstico gratuito te lo dice.
            </p>
            <a
              href="#diagnostico"
              className="inline-flex items-center gap-2 text-blue-400/80 hover:text-blue-400 transition-colors duration-300 text-[15px] font-medium"
            >
              Hacer diagnóstico
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
