"use client";

import FadeIn from "./FadeIn";
import { WordReveal, GradientReveal } from "./TextReveal";

const team = [
  { name: "Daniel", role: "Desarrollo", image: "/images/pixel-art/dani.png" },
  { name: "Josue", role: "Desarrollo", image: "/images/pixel-art/josue.png" },
];

export default function Team() {
  return (
    <section className="py-32 px-6 bg-[#0a0a0f] relative">
      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn>
            <p className="text-[13px] text-white/30 tracking-widest uppercase mb-4">
              Equipo
            </p>
          </FadeIn>
          <h2 className="text-4xl md:text-5xl font-medium tracking-[-0.02em]">
            <WordReveal as="span" className="text-white/90" delay={0.1}>
              Quienes
            </WordReveal>{" "}
            <GradientReveal
              as="span"
              className="inline-block"
              delay={0.3}
              gradientFrom="#14B8A6"
              gradientTo="#2DD4BF"
            >
              construyen
            </GradientReveal>
          </h2>
        </div>

        {/* Team */}
        <div className="flex flex-wrap justify-center gap-12 md:gap-16">
          {team.map((member, index) => (
            <FadeIn key={index} delay={index * 0.12}>
              <div className="group flex flex-col items-center">
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-white/[0.08] bg-[#0f1015]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </div>
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-teal-500/10 to-transparent pointer-events-none" />
                </div>
                <div className="mt-5 text-center">
                  <p className="text-[17px] text-white/80 font-medium group-hover:text-white transition-colors duration-300">
                    {member.name}
                  </p>
                  <p className="text-[13px] text-white/30 mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.5}>
          <p className="text-center text-white/20 text-[13px] mt-20">
            Un equipo pequeño, enfocado y comprometido
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
