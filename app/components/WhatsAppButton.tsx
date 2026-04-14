"use client";

import { useEffect, useState, useRef } from "react";

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

export default function WhatsAppButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isDark = theme === "dark";

  // Show button after scroll or delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);

    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Show tooltip after button appears
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
        // Auto-hide tooltip after 5 seconds
        setTimeout(() => setShowTooltip(false), 5000);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setHasNotification(false);
  };

  const handleClick = () => {
    setHasNotification(false);
    setShowTooltip(false);
  };

  const whatsappUrl = "https://wa.me/51998162677?text=Hola,%20quiero%20saber%20cómo%20pueden%20ayudar%20a%20mi%20negocio";

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      }`}
    >
      {/* Tooltip */}
      <div
        ref={tooltipRef}
        className={`absolute bottom-full right-0 mb-3 transition-all duration-500 ${
          showTooltip || isHovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div
          className="relative px-4 py-2.5 rounded-2xl rounded-br-sm max-w-[200px]"
          style={{
            backgroundColor: isDark ? "#ffffff" : "#0a0a0f",
            boxShadow: isDark
              ? "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
              : "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
          }}
        >
          <p
            className="text-sm font-medium whitespace-nowrap"
            style={{ color: isDark ? "#111827" : "#ffffff" }}
          >
            Hola, te ayudo?
          </p>
          <p
            className="text-xs mt-0.5"
            style={{ color: isDark ? "#6b7280" : "rgba(255,255,255,0.6)" }}
          >
            Respuesta en minutos
          </p>
          {/* Arrow */}
          <div
            className="absolute -bottom-2 right-4 w-4 h-4 rotate-45"
            style={{ backgroundColor: isDark ? "#ffffff" : "#0a0a0f" }}
          />
        </div>
      </div>

      {/* Button wrapper for effects */}
      <div className="relative">
        {/* Pulse rings */}
        <div
          className={`absolute inset-0 rounded-full bg-[#25D366] transition-opacity duration-300 ${
            hasNotification ? "animate-ping opacity-20" : "opacity-0"
          }`}
        />
        <div
          className={`absolute inset-0 rounded-full bg-[#25D366] transition-opacity duration-300 ${
            hasNotification ? "animate-pulse opacity-30" : "opacity-0"
          }`}
          style={{ animationDelay: "0.5s" }}
        />

        {/* Glow effect on hover */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-500"
          style={{
            background: isHovered
              ? isDark
                ? "rgba(37, 211, 102, 0.3)"
                : "rgba(37, 211, 102, 0.15)"
              : "transparent",
            filter: isHovered ? (isDark ? "blur(16px)" : "blur(12px)") : "none",
            transform: isHovered ? "scale(1.5)" : "scale(1)",
          }}
        />

        {/* Main button */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          data-cursor="Chat"
          className={`relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] transition-all duration-300 ${
            isHovered ? "scale-110" : "scale-100"
          }`}
          style={{
            boxShadow: isDark
              ? isHovered
                ? "0 20px 40px -10px rgba(37, 211, 102, 0.4)"
                : "0 10px 30px -5px rgba(37, 211, 102, 0.25)"
              : isHovered
                ? "0 20px 40px -10px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(37, 211, 102, 0.3)"
                : "0 10px 30px -5px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(37, 211, 102, 0.2)",
          }}
        >
          {/* WhatsApp Icon */}
          <svg
            className="w-7 h-7 md:w-8 md:h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>

          {/* Notification badge */}
          {hasNotification && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                1
              </span>
            </span>
          )}
        </a>
      </div>

      {/* Subtle border glow */}
      <div
        className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-500 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background: "conic-gradient(from 0deg, #25D366, #128C7E, #075E54, #25D366)",
          padding: "2px",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
        }}
      />
    </div>
  );
}
