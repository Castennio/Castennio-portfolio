"use client";

import MagneticButton from "./MagneticButton";
import FadeIn from "./FadeIn";
import { BlurReveal } from "./TextReveal";
import { HeroLine } from "./HeroText";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#050505]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.06)_0%,_transparent_60%)]" />
      </div>

      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Heading */}
        <HeroLine delay={0.1} className="mb-6">
          <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.02em] text-white/90">
            ¿Comenzamos?
          </h2>
        </HeroLine>

        {/* Subtitle */}
        <BlurReveal
          as="p"
          className="text-white/40 text-lg mb-12 leading-relaxed"
          delay={0.3}
          stagger={0.02}
        >
          Conversemos sobre tu proyecto. Sin compromiso.
        </BlurReveal>

        {/* CTA Button */}
        <FadeIn delay={0.4} y={20}>
          <MagneticButton
            as="a"
            href="https://wa.me/51999999999?text=Hola,%20me%20interesa%20saber%20más%20sobre%20sus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            strength={0.5}
            data-cursor="Ir"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-medium text-lg rounded-full transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,255,255,0.15)]"
          >
            Iniciar conversación
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
        </FadeIn>

        {/* Response time */}
        <FadeIn delay={0.6} y={15}>
          <p className="mt-8 text-white/25 text-[13px]">
            Respuesta en menos de 24 horas
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
