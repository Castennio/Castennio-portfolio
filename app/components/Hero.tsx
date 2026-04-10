"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useRef, useCallback } from "react";
import MagneticButton from "./MagneticButton";
import FadeIn from "./FadeIn";
import { HeroWords, HeroBlur, HeroLine } from "./HeroText";

// Dynamically import the fluid simulation to avoid SSR issues
const FluidSimulation = dynamic(() => import("fluid-simulation-react"), {
  ssr: false,
});

function FluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect scroll to reduce visual lag
  const handleScroll = useCallback(() => {
    setIsScrolling(true);

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  }, []);

  useEffect(() => {
    // Intersection Observer - pause when not visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  // Optimized configuration - reduced iterations for better performance
  const fluidConfig = {
    textureDownsample: 2, // Increased from 1 for better performance
    densityDissipation: 0.98,
    velocityDissipation: 0.99,
    pressureDissipation: 0.8,
    pressureIterations: 20, // Reduced from 25
    curl: 30,
    splatRadius: 0.005,
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
    <div ref={containerRef} className="absolute inset-0">
      {/* Fluid simulation - only render when visible */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isScrolling ? 0.6 : 1,
        }}
      >
        {isVisible && (
          <FluidSimulation config={fluidConfig} color={fluidColors} />
        )}
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
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-[100svh] md:min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-0">
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

        {/* Main heading */}
        <h1 className="text-[clamp(2rem,8vw,5.5rem)] font-medium tracking-[-0.03em] leading-[1.1] mb-4 md:mb-8">
          <HeroLine delay={0.3} className="text-white/90">
            Más ventas,
          </HeroLine>
          <HeroLine delay={0.45} className="text-white/90">
            menos <span className="text-gradient">dolores de cabeza</span>
          </HeroLine>
        </h1>

        {/* Subtitle */}
        <HeroBlur
          as="p"
          className="text-sm md:text-xl text-white/55 max-w-[280px] md:max-w-xl mx-auto mb-8 md:mb-14 leading-relaxed font-light"
          delay={0.7}
          stagger={0.015}
        >
          Creamos sistemas que atraen clientes y automatizan tu negocio. Tú solo ves los resultados.
        </HeroBlur>

        {/* CTA buttons - interactive, need pointer events */}
        <FadeIn delay={0.8} y={20}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pointer-events-auto">
            <MagneticButton
              as="a"
              href="https://wa.me/51998162677?text=Hola,%20quiero%20saber%20cómo%20pueden%20ayudar%20a%20mi%20negocio"
              target="_blank"
              rel="noopener noreferrer"
              strength={0.4}
              data-cursor="Escríbenos"
              className="group relative z-30 inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 bg-white text-black text-sm md:text-base font-medium rounded-full transition-all duration-500 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            >
              <span>Quiero más clientes</span>
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
              href="#planes"
              strength={0.3}
              data-cursor="Ver"
              className="relative z-30 inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-2 md:py-4 text-white/60 hover:text-white text-sm md:text-base font-medium transition-all duration-500"
            >
              <span>Ver planes</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </MagneticButton>
          </div>
        </FadeIn>

        {/* Trust indicators */}
        <FadeIn delay={1} y={20}>
          <div className="mt-8 md:mt-24 flex flex-row items-center justify-center gap-4 md:gap-12 text-white/40 text-[10px] md:text-[13px] tracking-wide">
            <span>Consulta gratis</span>
            <span className="w-1 h-1 bg-white/20 rounded-full" />
            <span>Respuesta en 24h</span>
            <span className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
            <span className="hidden md:block">Sin compromiso</span>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
      </div>
    </section>
  );
}
