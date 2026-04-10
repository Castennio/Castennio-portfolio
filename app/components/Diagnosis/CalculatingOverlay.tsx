"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

interface CalculatingOverlayProps {
  onComplete: () => void;
}

const messages = [
  "Analizando tus respuestas...",
  "Calculando horas perdidas...",
  "Identificando oportunidades...",
  "Generando diagnóstico...",
];

export default function CalculatingOverlay({ onComplete }: CalculatingOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(overlayRef.current, {
          opacity: 0,
          duration: 0.3,
          onComplete,
        });
      },
    });

    // Animate progress bar and cycle through messages
    tl.to(progressRef.current, {
      width: "25%",
      duration: 0.6,
      ease: "power2.out",
      onComplete: () => setMessageIndex(1),
    })
      .to(progressRef.current, {
        width: "50%",
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => setMessageIndex(2),
      })
      .to(progressRef.current, {
        width: "75%",
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => setMessageIndex(3),
      })
      .to(progressRef.current, {
        width: "100%",
        duration: 0.6,
        ease: "power2.out",
      });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#050505]/95 backdrop-blur-sm"
    >
      <div className="text-center px-6">
        {/* Animated icon */}
        <div className="relative w-20 h-20 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500 animate-spin" />
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-8 h-8 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>

        {/* Message */}
        <p className="text-white/80 text-lg font-medium mb-6 h-7 transition-opacity duration-200">
          {messages[messageIndex]}
        </p>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              ref={progressRef}
              className="h-full bg-gradient-to-r from-blue-500 to-violet-500 rounded-full"
              style={{ width: 0 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
