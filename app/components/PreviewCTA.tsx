'use client';

import FadeIn from './FadeIn';
import { WordReveal, GradientReveal, BlurReveal } from './TextReveal';

export default function PreviewCTA() {
  return (
    <section className="py-24 lg:py-32 px-4 sm:px-6 bg-[#0a0a0f] relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.06)_0%,_transparent_60%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Header */}
        <FadeIn>
          <p className="text-[11px] text-white/30 tracking-[0.3em] uppercase mb-5 font-light">
            Visualiza tu idea
          </p>
        </FadeIn>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-[-0.02em] mb-6">
          <WordReveal as="span" className="text-white/90" delay={0.1}>
            Diseña tu web
          </WordReveal>{" "}
          <GradientReveal
            as="span"
            className="inline-block font-normal"
            delay={0.3}
            gradientFrom="#3b82f6"
            gradientTo="#8b5cf6"
          >
            en minutos
          </GradientReveal>
        </h2>

        <BlurReveal
          as="p"
          className="text-white/40 text-base max-w-lg mx-auto leading-relaxed font-light mb-10"
          delay={0.4}
          stagger={0.01}
        >
          Elige tu industria, estilo y colores. Mira cómo quedaría tu página web
          antes de dar el primer paso.
        </BlurReveal>

        {/* CTA Button */}
        <FadeIn delay={0.5}>
          <a
            href="/preview"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-violet-500 text-white font-medium text-base rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.3)]"
          >
            <span>Crear mi diseño</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </FadeIn>

        {/* Features */}
        <FadeIn delay={0.6}>
          <div className="mt-10 flex items-center justify-center gap-6 text-white/25 text-[11px] tracking-wide">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              2 minutos
            </span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              100% gratis
            </span>
            <span className="w-1 h-1 rounded-full bg-white/10" />
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Descarga PDF
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
