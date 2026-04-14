"use client";

import MagneticButton from "./MagneticButton";
import FadeIn from "./FadeIn";
import { BlurReveal } from "./TextReveal";
import { HeroLine } from "./HeroText";

export default function FinalCTA() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0f]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(99,102,241,0.08)_0%,_transparent_60%)]" />
      </div>

      {/* Subtle top border */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-2xl mx-auto text-center">
        {/* Heading */}
        <HeroLine delay={0.1} className="mb-6">
          <h2 className="text-4xl md:text-6xl font-medium tracking-[-0.02em] text-white/90">
            Da el primer paso hoy
          </h2>
        </HeroLine>

        {/* Subtitle */}
        <BlurReveal
          as="p"
          className="text-white/55 text-lg mb-12 leading-relaxed"
          delay={0.3}
          stagger={0.02}
        >
          Escríbenos y te decimos en 5 minutos cómo podemos ayudar a tu negocio. Sin costo, sin compromiso.
        </BlurReveal>

        {/* CTA Button */}
        <FadeIn delay={0.4} y={20}>
          <MagneticButton
            as="a"
            href="https://wa.me/51998162677?text=Hola,%20quiero%20saber%20cómo%20pueden%20ayudar%20a%20mi%20negocio"
            target="_blank"
            rel="noopener noreferrer"
            strength={0.5}
            data-cursor="Escríbenos"
            className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-medium text-lg rounded-full transition-all duration-500 hover:shadow-[0_0_60px_rgba(255,255,255,0.15)]"
          >
            Escríbenos por WhatsApp
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </MagneticButton>
        </FadeIn>

        {/* Response time */}
        <FadeIn delay={0.6} y={15}>
          <p className="mt-8 text-white/45 text-[13px]">
            Respuesta rápida · Sin presión · Diagnóstico gratis
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
