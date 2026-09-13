"use client";

import { useEffect, useState } from "react";
import FadeIn from "./FadeIn";

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
    <section
      className={`relative min-h-[100svh] md:min-h-screen flex items-center overflow-hidden py-20 md:py-0 transition-colors duration-500 ${
        isDark ? "bg-transparent" : "bg-[#ffffff]"
      }`}
    >
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-cyan-500/[0.03] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-500/[0.02] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 text-center">
        <FadeIn delay={0.2}>
          <h1 className="text-[clamp(2.5rem,7vw,5rem)] font-medium tracking-[-0.03em] leading-[1.1] mb-6">
            <span className={isDark ? "text-white/90" : "text-black/90"}>
              Tu negocio merece{" "}
              <span
                className="relative inline-block"
                style={{
                  color: "#67e8f9",
                  textShadow: "0 0 40px rgba(34, 211, 238, 0.4)",
                }}
              >
                una web
              </span>
            </span>
            <br />
            <span className="text-gradient">que trabaje por ti</span>
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p
            className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${
              isDark ? "text-white/50" : "text-black/50"
            }`}
          >
            Diseñamos y desarrollamos tu página web.{" "}
            <span className={isDark ? "text-white/70" : "text-black/70"}>
              Tú solo apruebas.
            </span>
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="#diagnostico"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold rounded-full transition-all duration-300 hover:scale-105"
              style={{
                background: "linear-gradient(135deg, #F59E0B 0%, #D97706 100%)",
                color: "#0a0e1a",
                boxShadow: "0 4px 24px rgba(245, 158, 11, 0.3)",
              }}
            >
              <span>Diagnóstico gratuito</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>

            <a
              href="#portafolio"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium rounded-full border border-white/[0.1] text-white/70 hover:text-white hover:border-white/[0.2] transition-all duration-300"
            >
              <span>Ver proyectos</span>
              <svg
                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
