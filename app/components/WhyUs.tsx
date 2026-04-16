"use client";

import FadeIn, { StaggerFadeIn } from "./FadeIn";
import { WordReveal, GradientReveal } from "./TextReveal";

const differentiators = [
  {
    title: "Rápido",
    description: "Semanas, no meses. Tu negocio no puede esperar y nosotros lo entendemos.",
  },
  {
    title: "Precio justo",
    description: "Sin la inflación de agencia. Sabes cuánto pagas desde el inicio, sin sorpresas.",
  },
  {
    title: "Sin tecnicismos",
    description: "Nosotros manejamos lo técnico. Tú solo nos dices qué te gusta y apruebas.",
  },
  {
    title: "Comunicación directa",
    description: "Hablamos por WhatsApp. Respuestas rápidas de personas reales, no chatbots.",
  },
  {
    title: "Sprints semanales",
    description: "Ves progreso real cada semana. Nada de esperar meses para ver resultados.",
  },
  {
    title: "Soporte post-entrega",
    description: "No desaparecemos después de entregar. Te ayudamos con dudas y ajustes.",
  },
];

export default function WhyUs() {
  return (
    <section className="py-32 px-6 bg-[#0a0a0f] relative section-elevated">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <FadeIn>
              <p className="text-[13px] text-white/50 tracking-widest uppercase mb-4">
                Por qué elegirnos
              </p>
            </FadeIn>
            <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em]">
              <WordReveal as="span" className="text-white/90" delay={0.1}>
                Desarrollo web
              </WordReveal>{" "}
              <GradientReveal
                as="span"
                className="inline-block"
                delay={0.3}
                gradientFrom="#22c55e"
                gradientTo="#3b82f6"
              >
                sin complicaciones
              </GradientReveal>
            </h2>
          </div>
          <FadeIn delay={0.4}>
            <p className="text-white/55 text-[15px] max-w-sm leading-relaxed">
              No somos una agencia tradicional. Somos un equipo pequeño que entrega rápido y habla claro.
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
                  <p className="text-[15px] text-white/55 leading-relaxed">
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
