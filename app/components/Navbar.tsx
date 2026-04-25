"use client";

import { useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-[var(--background)]/85 backdrop-blur-xl border-b border-[var(--card-border)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - minimal */}
          <a href="#" className="flex items-center gap-3 group">
            <img src="/images/logo-castennio-fondo-transparente-icono-negro.png" alt="Castennio" className="w-8 h-8" />
            <span className="text-[15px] font-medium text-[var(--text-secondary)] group-hover:text-[var(--foreground)] transition-colors duration-300">
              Castennio
            </span>
          </a>

          {/* Navigation - minimal */}
          <div className="hidden md:flex items-center gap-10">
            <a
              href="#servicios"
              className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors duration-300 tracking-wide"
            >
              Servicios
            </a>
            <a
              href="#proceso"
              className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors duration-300 tracking-wide"
            >
              Proceso
            </a>
            <a
              href="#proyectos"
              className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors duration-300 tracking-wide"
            >
              Proyectos
            </a>
            <a
              href="#faq"
              className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors duration-300 tracking-wide"
            >
              FAQ
            </a>
            <a
              href="#contacto"
              className="text-[13px] text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors duration-300 tracking-wide"
            >
              Contacto
            </a>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <a
              href="https://wa.me/51998162677"
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="Chat"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-[var(--text-secondary)] hover:text-[var(--foreground)] border border-[var(--card-border)] hover:border-[var(--card-border-hover)] rounded-full transition-all duration-300 hover:bg-[var(--card-border)]"
            >
              Hablemos
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
