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

// Hook to detect theme - optimized
function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(prev => {
        const newTheme = isDark ? "dark" : "light";
        return prev === newTheme ? prev : newTheme;
      });
    };

    checkTheme();

    const observer = new MutationObserver(() => {
      requestAnimationFrame(checkTheme);
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

function FluidBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const theme = useTheme();

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
    textureDownsample: 2,
    densityDissipation: 0.98,
    velocityDissipation: 0.99,
    pressureDissipation: 0.8,
    pressureIterations: 20,
    curl: 30,
    splatRadius: 0.005,
  };

  // Colors based on theme
  const darkColors = [
    [0.03, 0.06, 0.15],
    [0.05, 0.03, 0.12],
    [0.02, 0.05, 0.1],
    [0.06, 0.04, 0.14],
    [0.025, 0.04, 0.09],
  ];

  // Light mode: dark/black smoke on white background
  const lightColors = [
    [0.2, 0.2, 0.22],
    [0.15, 0.15, 0.18],
    [0.25, 0.25, 0.28],
    [0.1, 0.1, 0.12],
    [0.18, 0.18, 0.2],
  ];

  const fluidColors = theme === "dark" ? darkColors : lightColors;
  const edgeColor = theme === "dark" ? "#0a0a0f" : "#fafafa";

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Fluid simulation - only render when visible */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isScrolling ? 0.5 : (theme === "dark" ? 1 : 0.5),
        }}
      >
        {isVisible && (
          <FluidSimulation config={fluidConfig} color={fluidColors} />
        )}
      </div>

      {/* Edge fade overlay - only in dark mode */}
      {theme === "dark" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(to bottom, transparent 0%, transparent 70%, ${edgeColor} 100%),
              linear-gradient(to top, transparent 0%, transparent 92%, ${edgeColor} 100%),
              linear-gradient(to right, transparent 0%, transparent 92%, ${edgeColor} 100%),
              linear-gradient(to left, transparent 0%, transparent 92%, ${edgeColor} 100%)
            `,
          }}
        />
      )}
    </div>
  );
}

export default function Hero() {
  const theme = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`relative min-h-[100svh] md:min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-0 transition-colors duration-500 ${isDark ? "bg-[#0a0a0f]" : "bg-[#fafafa]"}`}>
      {/* Fluid layer - always show, colors change based on theme */}
      <div className="absolute inset-0 z-0">
        <FluidBackground />
      </div>

      {/* Minimal grid */}
      <div
        className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 ${isDark ? "opacity-[0.012]" : "opacity-[0.03]"}`}
        style={{
          backgroundImage: isDark
            ? `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`
            : `linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)`,
          backgroundSize: "100px 100px",
        }}
      />

      {/* Content - on top, non-interactive elements are pointer-events-none */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center pointer-events-none">

        {/* Main heading */}
        <h1 className="text-[clamp(2rem,8vw,5.5rem)] font-medium tracking-[-0.03em] leading-[1.1] mb-4 md:mb-8">
          <HeroLine delay={0.3} className={isDark ? "text-white/90" : "text-black/90"}>
            Más ventas,
          </HeroLine>
          <HeroLine delay={0.45} className={isDark ? "text-white/90" : "text-black/90"}>
            menos <span className="text-gradient">dolores de cabeza</span>
          </HeroLine>
        </h1>

        {/* Subtitle */}
        <HeroBlur
          as="p"
          className={`text-sm md:text-xl max-w-[280px] md:max-w-xl mx-auto mb-8 md:mb-14 leading-relaxed font-light transition-colors duration-300 ${isDark ? "text-white/55" : "text-black/60"}`}
          delay={0.7}
          stagger={0.015}
        >
          Creamos sistemas que atraen clientes y automatizan tu negocio. Tú solo ves los resultados.
        </HeroBlur>

        {/* CTA buttons - interactive, need pointer events */}
        <FadeIn delay={0.8} y={20}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pointer-events-auto">
            <a
              href="https://wa.me/51998162677?text=Hola,%20quiero%20saber%20cómo%20pueden%20ayudar%20a%20mi%20negocio"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative z-50 inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium rounded-full transition-transform duration-300 hover:scale-105"
              style={{
                backgroundColor: "#0a0a0f",
                color: "#ffffff",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
              }}
            >
              <span style={{ color: "#ffffff" }}>Quiero más clientes</span>
              <svg
                className="w-4 h-4 transition-transform duration-500 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#ffffff"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>

            <a
              href="#planes"
              className="group relative z-50 inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium rounded-full transition-transform duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                color: "#ffffff",
                boxShadow: "0 4px 20px rgba(59, 130, 246, 0.35)",
              }}
            >
              <span style={{ color: "#ffffff" }}>Ver planes</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#ffffff">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </FadeIn>

        {/* Trust indicators */}
        <FadeIn delay={1} y={20}>
          <div className={`mt-8 md:mt-24 flex flex-row items-center justify-center gap-4 md:gap-12 text-[10px] md:text-[13px] tracking-wide transition-colors duration-300 ${isDark ? "text-white/40" : "text-black/40"}`}>
            <span>Consulta gratis</span>
            <span className={`w-1 h-1 rounded-full ${isDark ? "bg-white/20" : "bg-black/20"}`} />
            <span>Respuesta en 24h</span>
            <span className={`hidden md:block w-1 h-1 rounded-full ${isDark ? "bg-white/20" : "bg-black/20"}`} />
            <span className="hidden md:block">Sin compromiso</span>
          </div>
        </FadeIn>
      </div>

      {/* Scroll indicator - hidden on mobile */}
      <div className="hidden md:block absolute bottom-12 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <div className={`w-px h-16 bg-gradient-to-b from-transparent to-transparent ${isDark ? "via-white/20" : "via-black/20"}`} />
      </div>
    </section>
  );
}
