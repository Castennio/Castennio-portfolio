"use client";

import FadeIn from "./FadeIn";
import { WordReveal, GradientReveal, BlurReveal } from "./TextReveal";

const challenges = [
  {
    id: 1,
    title: "Tu negocio es invisible",
    category: "¿Te pasa esto?",
    description:
      "Ofreces algo bueno, pero los clientes no te encuentran. Dependes de que alguien te recomiende o de publicar sin saber si funciona.",
    icon: "users",
  },
  {
    id: 2,
    title: "Tu tiempo se va en lo urgente",
    category: "¿Te pasa esto?",
    description:
      "Cotizas a mano, respondes mensajes todo el día, agendas citas por WhatsApp. Terminas agotado y sin tiempo para hacer crecer tu negocio.",
    icon: "clock",
  },
  {
    id: 3,
    title: "No sabes qué está funcionando",
    category: "¿Te pasa esto?",
    description:
      "Tienes clientes en WhatsApp, datos en Excel, notas en papel. No puedes tomar decisiones porque no tienes información clara.",
    icon: "puzzle",
  },
];

export default function Challenges() {
  return (
    <section id="problemas" className="py-32 px-6 bg-[#050505] relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header - editorial style */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <FadeIn>
              <p className="text-[13px] text-white/30 tracking-widest uppercase mb-4">
                Sabemos lo que enfrentas
              </p>
            </FadeIn>
            <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em]">
              <WordReveal as="span" className="text-white/90 block" delay={0.1}>
                Estos obstáculos
              </WordReveal>
              <GradientReveal
                as="span"
                className="block"
                delay={0.3}
                gradientFrom="#ef4444"
                gradientTo="#f97316"
              >
                te están costando dinero
              </GradientReveal>
            </h2>
          </div>
          <BlurReveal
            as="p"
            className="text-white/40 text-[15px] max-w-sm leading-relaxed"
            delay={0.4}
            stagger={0.01}
          >
            Cada día que pasa sin resolver esto, pierdes clientes y oportunidades. Pero tiene solución.
          </BlurReveal>
        </div>

        {/* Problem cards */}
        <div className="space-y-4">
          {challenges.map((problem, index) => (
            <FadeIn
              key={problem.id}
              delay={index * 0.15}
              className="group relative"
            >
              <div
                className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 p-8 md:p-10 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-red-500/[0.02] hover:border-red-500/[0.15] transition-all duration-500"
              >
                {/* Number */}
                <div className="text-5xl md:text-6xl font-light text-red-500/[0.15] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[11px] text-red-400/50 tracking-widest uppercase">
                      {problem.category}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium text-white/90 mb-3 group-hover:text-white transition-colors duration-300">
                    {problem.title}
                  </h3>
                  <p className="text-white/40 text-[15px] leading-relaxed max-w-xl">
                    {problem.description}
                  </p>
                </div>

                {/* Icon indicator */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full border border-red-500/[0.15] bg-red-500/[0.05] flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-red-400/60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
