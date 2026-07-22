"use client";

import { useEffect, useState } from "react";

export default function PreviewBubble() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Check if already dismissed in this session
    const dismissed = sessionStorage.getItem("previewBubbleDismissed");
    if (dismissed) {
      setIsDismissed(true);
      return;
    }

    // Show after 5 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("previewBubbleDismissed", "true");
  };

  const handleClick = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem("previewBubbleDismissed", "true");
  };

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-6 left-6 z-40 transition-all duration-500 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href="/preview"
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all duration-300 ${
          isHovered
            ? "bg-[#152020] border-teal-500/30 shadow-[0_8px_32px_rgba(20,184,166,0.15)]"
            : "bg-[#0D1414] border-white/[0.08] shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        }`}
      >
        {/* Icon */}
        <div
          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
            isHovered ? "bg-teal-500/20" : "bg-teal-500/10"
          }`}
        >
          <svg
            className={`w-5 h-5 transition-colors duration-300 ${
              isHovered ? "text-teal-400" : "text-teal-500/70"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42"
            />
          </svg>
        </div>

        {/* Text */}
        <div className="pr-6">
          <p className="text-sm font-medium text-white/90 whitespace-nowrap">
            Diseña tu web
          </p>
          <p className="text-[11px] text-white/40">
            Vista previa gratis
          </p>
        </div>

        {/* Arrow */}
        <svg
          className={`absolute right-3 w-4 h-4 transition-all duration-300 ${
            isHovered ? "text-teal-400 translate-x-0.5" : "text-white/30"
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>

        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#1E2A2A] border border-white/[0.1] flex items-center justify-center text-white/40 hover:text-white/70 hover:bg-[#2A3838] transition-all duration-200"
        >
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Subtle pulse on first appearance */}
        <div
          className={`absolute inset-0 rounded-2xl border border-teal-500/20 transition-opacity duration-1000 ${
            isVisible && !isHovered ? "animate-pulse opacity-100" : "opacity-0"
          }`}
        />
      </a>
    </div>
  );
}
