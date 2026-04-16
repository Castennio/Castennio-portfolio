"use client";

import FadeIn, { StaggerFadeIn } from "./FadeIn";
import { WordReveal, GradientReveal } from "./TextReveal";

const steps = [
  {
    number: "01",
    title: "Diagnóstico gratis",
    description: "Nos cuentas tu situación. Te decimos qué necesitas sin compromiso.",
  },
  {
    number: "02",
    title: "Propuesta clara",
    description: "Precio fijo, tiempos definidos. Sin sorpresas ni costos ocultos.",
  },
  {
    number: "03",
    title: "Desarrollo en sprints",
    description: "Ves avances cada semana. Apruebas antes de continuar.",
  },
  {
    number: "04",
    title: "Entrega",
    description: "Tu sitio funcionando. Te enseñamos a usarlo y te acompañamos después.",
  },
];

export default function Process() {
  return (
    <section id="proceso" className="py-32 px-6 bg-[#0a0a0f] relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.06)_0%,_transparent_50%)]" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <FadeIn>
            <p className="text-[13px] text-white/50 tracking-widest uppercase mb-4">
              Cómo trabajamos
            </p>
          </FadeIn>
          <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em]">
            <WordReveal as="span" className="text-white/90" delay={0.1}>
              Simple y
            </WordReveal>{" "}
            <GradientReveal
              as="span"
              className="inline-block"
              delay={0.3}
              gradientFrom="#3b82f6"
              gradientTo="#8b5cf6"
            >
              sin sorpresas
            </GradientReveal>
          </h2>
        </div>

        {/* Steps - horizontal timeline */}
        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.12] to-transparent" />

          <StaggerFadeIn className="grid md:grid-cols-4 gap-12 md:gap-8" stagger={0.15}>
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Number with dot */}
                <div className="flex items-center gap-4 mb-8">
                  <div className="relative">
                    <span className="text-4xl font-light text-white/10 tabular-nums">
                      {step.number}
                    </span>
                    {/* Active dot on line */}
                    <div className="hidden md:block absolute -bottom-[1.35rem] left-1/2 -translate-x-1/2">
                      <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-blue-500/50 transition-colors duration-500" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="text-xl font-medium text-white/90 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[15px] text-white/55 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </StaggerFadeIn>
        </div>
      </div>
    </section>
  );
}
