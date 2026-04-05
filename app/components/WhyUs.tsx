"use client";

import FadeIn, { StaggerFadeIn } from "./FadeIn";
import { WordReveal, GradientReveal } from "./TextReveal";

const differentiators = [
  {
    title: "Más clientes, menos esfuerzo",
    description: "Creamos un sistema que atrae clientes mientras tú te dedicas a lo que sabes hacer.",
  },
  {
    title: "Recuperas tu tiempo",
    description: "Lo que hacías en horas ahora pasa solo. Cotizaciones, citas, seguimientos automáticos.",
  },
  {
    title: "Decisiones con información",
    description: "Sabes exactamente cuántos clientes tienes, cuánto vendes y qué funciona.",
  },
  {
    title: "Tú no tocas nada técnico",
    description: "Nosotros hacemos todo. Tú solo nos dices qué necesitas y apruebas los cambios.",
  },
  {
    title: "Funcionando en días",
    description: "No esperamos meses. Tu sistema listo rápido porque tu negocio lo necesita ahora.",
  },
  {
    title: "Atención real por WhatsApp",
    description: "Hablamos contigo directamente. Respuestas rápidas de personas, no de robots.",
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
                Tu negocio transformado
              </p>
            </FadeIn>
            <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em]">
              <WordReveal as="span" className="text-white/90" delay={0.1}>
                Esto es lo que
              </WordReveal>{" "}
              <GradientReveal
                as="span"
                className="inline-block"
                delay={0.3}
                gradientFrom="#22c55e"
                gradientTo="#3b82f6"
              >
                vas a lograr
              </GradientReveal>
            </h2>
          </div>
          <FadeIn delay={0.4}>
            <p className="text-white/40 text-[15px] max-w-sm leading-relaxed">
              Sin saber nada de tecnología, vas a tener un negocio que crece solo y te da la libertad que buscas.
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
