"use client";

import FadeIn, { StaggerFadeIn } from "./FadeIn";
import { WordReveal, GradientReveal } from "./TextReveal";

const differentiators = [
  {
    title: "Código propio",
    description: "Sin plantillas. Cada proyecto es único, construido desde cero.",
  },
  {
    title: "Entrega ágil",
    description: "Avances semanales visibles. Comunicación constante.",
  },
  {
    title: "Soporte real",
    description: "Acompañamiento post-lanzamiento incluido.",
  },
  {
    title: "Precio claro",
    description: "Propuesta detallada sin costos ocultos.",
  },
  {
    title: "Equipo local",
    description: "Basados en Perú. Mismo horario, mismo idioma.",
  },
  {
    title: "Acceso directo",
    description: "Comunicación por WhatsApp. Sin intermediarios.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-32 px-6 bg-[#050505] relative">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <FadeIn>
              <p className="text-[13px] text-white/30 tracking-widest uppercase mb-4">
                Diferenciadores
              </p>
            </FadeIn>
            <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em]">
              <WordReveal as="span" className="text-white/90" delay={0.1}>
                Por qué
              </WordReveal>{" "}
              <GradientReveal
                as="span"
                className="inline-block"
                delay={0.3}
                gradientFrom="#3b82f6"
                gradientTo="#8b5cf6"
              >
                elegirnos
              </GradientReveal>
            </h2>
          </div>
          <FadeIn delay={0.4}>
            <p className="text-white/40 text-[15px] max-w-sm leading-relaxed">
              No somos la única opción. Pero sí la que mejor entiende tu negocio.
            </p>
          </FadeIn>
        </div>

        {/* Grid - minimal */}
        <StaggerFadeIn
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12"
          stagger={0.1}
        >
          {differentiators.map((item, index) => (
            <div key={index} className="group">
              <div className="flex items-start gap-4">
                <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-white/80 mb-2 group-hover:text-white transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-[15px] text-white/40 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </StaggerFadeIn>
      </div>
    </section>
  );
}
