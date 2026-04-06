"use client";

import FadeIn, { StaggerFadeIn } from "./FadeIn";
import { WordReveal, GradientReveal } from "./TextReveal";

const team = [
  { name: "Dani", role: "Desarrollo", image: "/images/pixel-art/dani.png" },
  { name: "Brack", role: "Diseño", image: "/images/pixel-art/brack.png" },
  { name: "Alonso", role: "Backend", image: "/images/pixel-art/alonso.png" },
  { name: "Gabriel", role: "Desarrollo", image: "/images/pixel-art/gabriel.png" },
  { name: "Josue", role: "Desarrollo", image: "/images/pixel-art/josue.jpeg" },
];

export default function Team() {
  return (
    <section className="py-32 px-6 bg-[#050505] relative">
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
              gradientFrom="#3b82f6"
              gradientTo="#8b5cf6"
            >
              construyen
            </GradientReveal>
          </h2>
        </div>

        {/* Team grid - 3 top, 2 bottom */}
        <div className="flex flex-col items-center gap-12 md:gap-16">
          {/* First row - 3 members */}
          <StaggerFadeIn className="flex flex-wrap justify-center gap-12 md:gap-16" stagger={0.12}>
            {team.slice(0, 3).map((member, index) => (
              <div key={index} className="group flex flex-col items-center">
                {/* Pixel Art Avatar */}
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a0a]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ imageRendering: member.image.endsWith('.jpeg') ? 'auto' : 'pixelated' }}
                    />
                  </div>
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" />
                </div>

                {/* Info */}
                <div className="mt-5 text-center">
                  <p className="text-[17px] text-white/80 font-medium group-hover:text-white transition-colors duration-300">
                    {member.name}
                  </p>
                  <p className="text-[13px] text-white/30 mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </StaggerFadeIn>

          {/* Second row - 2 members */}
          <StaggerFadeIn className="flex flex-wrap justify-center gap-12 md:gap-16" stagger={0.12}>
            {team.slice(3).map((member, index) => (
              <div key={index} className="group flex flex-col items-center">
                {/* Pixel Art Avatar */}
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  <div className="w-full h-full rounded-2xl overflow-hidden border border-white/[0.06] bg-[#0a0a0a]">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ imageRendering: member.image.endsWith('.jpeg') ? 'auto' : 'pixelated' }}
                    />
                  </div>
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-blue-500/10 to-transparent pointer-events-none" />
                </div>

                {/* Info */}
                <div className="mt-5 text-center">
                  <p className="text-[17px] text-white/80 font-medium group-hover:text-white transition-colors duration-300">
                    {member.name}
                  </p>
                  <p className="text-[13px] text-white/30 mt-1">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </StaggerFadeIn>
        </div>

        {/* Note */}
        <FadeIn delay={0.5}>
          <p className="text-center text-white/20 text-[13px] mt-20">
            Un equipo pequeño, enfocado y comprometido
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
