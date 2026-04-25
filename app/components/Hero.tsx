"use client";

import { useEffect, useState } from "react";
import FadeIn from "./FadeIn";
import { HeroBlur, HeroLine } from "./HeroText";
import SparkleParticles from "./SparkleParticles";

// Hook to detect theme
function useTheme() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return theme;
}

export default function Hero() {
  const theme = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`relative min-h-[100svh] md:min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-0 transition-colors duration-500 ${isDark ? "bg-[#0a0a0f]" : "bg-[#ffffff]"}`}>
      {/* Premium sparkle particles */}
      <div className="absolute inset-0 w-full h-full z-[5]">
        <SparkleParticles count={80} />
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
            Tu página web
          </HeroLine>
          <HeroLine delay={0.45} className={isDark ? "text-white/90" : "text-black/90"}>
            profesional <span className="text-gradient">en semanas</span>
          </HeroLine>
        </h1>

        {/* Subtitle */}
        <HeroBlur
          as="p"
          className={`text-sm md:text-xl max-w-[280px] md:max-w-xl mx-auto mb-8 md:mb-14 leading-relaxed font-light transition-colors duration-300 ${isDark ? "text-white/55" : "text-black/60"}`}
          delay={0.7}
          stagger={0.015}
        >
          Desarrollo web para MYPES. Nos encargamos del diseño, desarrollo e integraciones. Tú solo apruebas.
        </HeroBlur>

        {/* CTA buttons - interactive, need pointer events */}
        <FadeIn delay={0.8} y={20}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pointer-events-auto">
            <a
              href="#diagnostico"
              className="group relative z-50 inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium rounded-full transition-transform duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                color: "#ffffff",
                boxShadow: "0 4px 20px rgba(59, 130, 246, 0.35)",
              }}
            >
              <span style={{ color: "#ffffff" }}>Diagnóstico gratuito</span>
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
              href="#proceso"
              className="group relative z-50 inline-flex items-center gap-2 md:gap-3 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium rounded-full transition-transform duration-300 hover:scale-105"
              style={{
                backgroundColor: "#0a0a0f",
                color: "#ffffff",
                boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
              }}
            >
              <span style={{ color: "#ffffff" }}>Ver cómo trabajamos</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#ffffff">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </FadeIn>

        {/* Trust indicators */}
        <FadeIn delay={1} y={20}>
          <div className={`mt-8 md:mt-24 flex flex-row items-center justify-center gap-4 md:gap-12 text-[10px] md:text-[13px] tracking-wide transition-colors duration-300 ${isDark ? "text-white/40" : "text-black/40"}`}>
            <span>Respuesta en 24h</span>
            <span className={`w-1 h-1 rounded-full ${isDark ? "bg-white/20" : "bg-black/20"}`} />
            <span>Precio fijo</span>
            <span className={`hidden md:block w-1 h-1 rounded-full ${isDark ? "bg-white/20" : "bg-black/20"}`} />
            <span className="hidden md:block">Sin tecnicismos</span>
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
