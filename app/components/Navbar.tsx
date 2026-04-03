"use client";

import { useState, useEffect } from "react";

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
          ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo - minimal */}
          <a href="#" className="flex items-center gap-3 group">
            <img src="/images/Castennio.png" alt="Castennio" className="w-8 h-8" />
            <span className="text-[15px] font-medium text-white/80 group-hover:text-white transition-colors duration-300">
              Castennio
            </span>
          </a>

          {/* Navigation - minimal */}
          <div className="hidden md:flex items-center gap-10">
            <a
              href="#proyectos"
              className="text-[13px] text-white/40 hover:text-white/80 transition-colors duration-300 tracking-wide"
            >
              Proyectos
            </a>
            <a
              href="#proceso"
              className="text-[13px] text-white/40 hover:text-white/80 transition-colors duration-300 tracking-wide"
            >
              Proceso
            </a>
            <a
              href="#planes"
              className="text-[13px] text-white/40 hover:text-white/80 transition-colors duration-300 tracking-wide"
            >
              Planes
            </a>
          </div>

          {/* CTA - refined */}
          <a
            href="https://wa.me/51999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[13px] font-medium text-white/80 hover:text-white border border-white/[0.08] hover:border-white/20 rounded-full transition-all duration-300 hover:bg-white/[0.02]"
          >
            Hablemos
          </a>
        </div>
      </div>
    </nav>
  );
}
