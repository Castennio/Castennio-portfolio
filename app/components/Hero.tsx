"use client";

import dynamic from "next/dynamic";
import MagneticButton from "./MagneticButton";
import FadeIn from "./FadeIn";

// Dynamically import the fluid simulation to avoid SSR issues
const FluidSimulation = dynamic(() => import("fluid-simulation-react"), {
  ssr: false,
});

function FluidBackground() {
  // Configuration for the fluid effect
  const fluidConfig = {
    textureDownsample: 1,
    densityDissipation: 0.97,
    velocityDissipation: 0.98,
    pressureDissipation: 0.8,
    pressureIterations: 25,
    curl: 30,
    splatRadius: 0.004,
  };

  // Colors: very subtle blues and purples
  const fluidColors = [
    [0.03, 0.06, 0.15],   // Subtle deep blue
    [0.05, 0.03, 0.12],   // Subtle purple
    [0.02, 0.05, 0.1],    // Subtle dark blue
    [0.06, 0.04, 0.14],   // Subtle violet
    [0.025, 0.04, 0.09],  // Subtle navy
  ];

  return (
    <>
      {/* Fluid simulation as base layer */}
      <div className="absolute inset-0">
        <FluidSimulation config={fluidConfig} color={fluidColors} />
      </div>

      {/* Edge fade overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, transparent 0%, transparent 70%, #050505 100%),
            linear-gradient(to top, transparent 0%, transparent 92%, #050505 100%),
            linear-gradient(to right, transparent 0%, transparent 92%, #050505 100%),
            linear-gradient(to left, transparent 0%, transparent 92%, #050505 100%)
          `,
        }}
      />
    </>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Fluid layer - base, receives mouse events */}
      <div className="absolute inset-0 z-0">
        <FluidBackground />
      </div>

      {/* Minimal grid */}
      <div
        className="absolute inset-0 z-10 opacity-[0.012] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Content - on top, non-interactive elements are pointer-events-none */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center pointer-events-none">
        {/* Subtle badge */}
        <FadeIn delay={0.2} y={20}>
          <div className="inline-flex items-center gap-3 px-5 py-2.5 mb-12 rounded-full border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
            <span className="text-[13px] text-white/50 tracking-wide uppercase">
              Desarrollo Premium
            </span>
          </div>
        </FadeIn>

        {/* Main heading */}
        <FadeIn delay={0.4} y={40}>
          <h1 className="text-[clamp(2.5rem,8vw,5.5rem)] font-medium tracking-[-0.03em] leading-[1.1] mb-8">
            <span className="text-white/90">Creamos experiencias</span>
            <br />
            <span className="text-white/90">digitales que </span>
            <span className="text-gradient">convierten</span>
          </h1>
        </FadeIn>

        {/* Subtitle */}
        <FadeIn delay={0.6} y={30}>
          <p className="text-lg md:text-xl text-white/40 max-w-xl mx-auto mb-14 leading-relaxed font-light">
            Páginas web y sistemas diseñados para impulsar tu negocio al siguiente nivel
          </p>
        </FadeIn>

        {/* CTA buttons - interactive, need pointer events */}
        <FadeIn delay={0.8} y={20}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pointer-events-auto">
            <MagneticButton
              as="a"
              href="#planes"
              strength={0.4}
              className="group relative z-30 inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-medium rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <span>Ver planes</span>
              <svg
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </MagneticButton>

            <MagneticButton
              as="a"
              href="https://wa.me/51999999999"
              target="_blank"
              rel="noopener noreferrer"
              strength={0.3}
              className="relative z-30 inline-flex items-center gap-3 px-8 py-4 text-white/60 hover:text-white font-medium transition-all duration-500"
            >
              <span>Contactar</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </MagneticButton>
          </div>
        </FadeIn>

        {/* Trust indicators */}
        <FadeIn delay={1} y={20}>
          <div className="mt-24 flex items-center justify-center gap-12 text-white/25 text-[13px] tracking-wide">
            <span>Entrega rápida</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Código propio</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Soporte incluido</span>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
}
