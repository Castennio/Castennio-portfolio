"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Preloader() {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const preloader = preloaderRef.current;
    const logo = logoRef.current;
    const text = textRef.current;
    const progress = progressRef.current;
    const counter = counterRef.current;

    if (!preloader || !logo || !text || !progress || !counter) return;

    // Prevent scroll during preloader
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setIsComplete(true);
      },
    });

    // Initial state
    gsap.set([logo, text], { opacity: 0, y: 30 });
    gsap.set(progress, { scaleX: 0, transformOrigin: "left" });

    // Animation sequence
    tl
      // Logo fade in
      .to(logo, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      })
      // Text fade in
      .to(
        text,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.4"
      )
      // Progress bar animation with counter
      .to(
        progress,
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: function () {
            const progress = Math.round(this.progress() * 100);
            if (counter) counter.textContent = `${progress}`;
          },
        },
        "-=0.2"
      )
      // Pause briefly
      .to({}, { duration: 0.3 })
      // Exit animation - elements move up
      .to(
        [logo, text, progress.parentElement],
        {
          y: -40,
          opacity: 0,
          duration: 0.5,
          ease: "power3.in",
          stagger: 0.05,
        }
      )
      // Preloader slides up
      .to(
        preloader,
        {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "-=0.2"
      );

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  if (isComplete) return null;

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(59,130,246,0.03)_0%,_transparent_50%)]" />

      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div ref={logoRef} className="mb-6">
          <div className="flex items-center gap-4">
            <img
              src="/images/logo-castennio-fondo-negro-icono-negro.png"
              alt="Castennio"
              className="w-12 h-12"
            />
            <span className="text-2xl font-medium text-white/90 tracking-tight">
              Castennio
            </span>
          </div>
        </div>

        {/* Tagline */}
        <div ref={textRef} className="mb-10">
          <p className="text-white/40 text-sm tracking-wide">
            Creando experiencias digitales
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-48 flex flex-col items-center gap-3">
          <div className="w-full h-px bg-white/10 overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-blue-500 to-violet-500"
            />
          </div>
          <span
            ref={counterRef}
            className="text-xs text-white/30 tabular-nums font-mono"
          >
            0
          </span>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-8 left-8 w-8 h-px bg-white/10" />
      <div className="absolute top-8 left-8 w-px h-8 bg-white/10" />
      <div className="absolute bottom-8 right-8 w-8 h-px bg-white/10" />
      <div className="absolute bottom-8 right-8 w-px h-8 bg-white/10" />
    </div>
  );
}
