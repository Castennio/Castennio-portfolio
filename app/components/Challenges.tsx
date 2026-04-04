"use client";

import FadeIn from "./FadeIn";
import { WordReveal, GradientReveal, BlurReveal } from "./TextReveal";

const challenges = [
  {
    id: 1,
    title: "Evaluación Docente",
    category: "Sistema Web",
    description:
      "Plataforma completa para evaluar desempeño docente con dashboards analíticos y reportes automatizados.",
    duration: "72h",
    year: "2024",
  },
  {
    id: 2,
    title: "E-commerce Premium",
    category: "Tienda Online",
    description:
      "Experiencia de compra fluida con pasarela de pagos integrada, carrito persistente y checkout optimizado.",
    duration: "48h",
    year: "2024",
  },
  {
    id: 3,
    title: "Sistema de Reservas",
    category: "Aplicación Web",
    description:
      "Gestión inteligente de citas con calendario interactivo, recordatorios automáticos y panel administrativo.",
    duration: "36h",
    year: "2024",
  },
];

export default function Challenges() {
  return (
    <section id="proyectos" className="py-32 px-6 bg-[#050505] relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-6xl mx-auto">
        {/* Header - editorial style */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
          <div>
            <FadeIn>
              <p className="text-[13px] text-white/30 tracking-widest uppercase mb-4">
                Proyectos Destacados
              </p>
            </FadeIn>
            <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em]">
              <WordReveal as="span" className="text-white/90 block" delay={0.1}>
                Construido en
              </WordReveal>
              <GradientReveal
                as="span"
                className="block"
                delay={0.3}
                gradientFrom="#3b82f6"
                gradientTo="#8b5cf6"
              >
                tiempo récord
              </GradientReveal>
            </h2>
          </div>
          <BlurReveal
            as="p"
            className="text-white/40 text-[15px] max-w-sm leading-relaxed"
            delay={0.4}
            stagger={0.01}
          >
            Proyectos reales de nuestros desafíos internos. Demostramos velocidad sin sacrificar calidad.
          </BlurReveal>
        </div>

        {/* Projects - elegant cards */}
        <div className="space-y-4">
          {challenges.map((project, index) => (
            <FadeIn
              key={project.id}
              delay={index * 0.15}
              className="group relative"
            >
              <div
                data-cursor="Ver"
                className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 p-8 md:p-10 rounded-2xl border border-white/[0.04] bg-white/[0.01] hover:bg-white/[0.02] hover:border-white/[0.08] transition-all duration-500 cursor-pointer"
              >
                {/* Number */}
                <div className="text-5xl md:text-6xl font-light text-white/[0.06] tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-[11px] text-white/30 tracking-widest uppercase">
                      {project.category}
                    </span>
                    <span className="w-1 h-1 bg-white/20 rounded-full" />
                    <span className="text-[11px] text-white/30 tracking-widest">
                      {project.year}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium text-white/90 mb-3 group-hover:text-white transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-white/40 text-[15px] leading-relaxed max-w-xl">
                    {project.description}
                  </p>
                </div>

                {/* Duration badge */}
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-3xl md:text-4xl font-light text-white/80">
                      {project.duration}
                    </p>
                    <p className="text-[11px] text-white/30 tracking-widest uppercase mt-1">
                      Desarrollo
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="w-12 h-12 rounded-full border border-white/[0.08] flex items-center justify-center group-hover:border-white/20 group-hover:bg-white/[0.02] transition-all duration-300">
                    <svg
                      className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors duration-300"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
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
