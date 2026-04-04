"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [cursorText, setCursorText] = useState("");

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Mouse position
    const mouse = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };
    const dotPos = { x: 0, y: 0 };

    // Update mouse position
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    // Animate cursor with GSAP
    const animateCursor = () => {
      // Smooth follow for outer cursor
      cursorPos.x += (mouse.x - cursorPos.x) * 0.15;
      cursorPos.y += (mouse.y - cursorPos.y) * 0.15;

      // Faster follow for dot
      dotPos.x += (mouse.x - dotPos.x) * 0.35;
      dotPos.y += (mouse.y - dotPos.y) * 0.35;

      gsap.set(cursor, {
        x: cursorPos.x,
        y: cursorPos.y,
      });

      gsap.set(cursorDot, {
        x: dotPos.x,
        y: dotPos.y,
      });

      requestAnimationFrame(animateCursor);
    };

    // Interactive elements detection
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check for interactive elements
      const interactive = target.closest("a, button, [data-cursor], input, textarea, select");

      if (interactive) {
        setIsHovering(true);

        // Check for custom cursor text
        const cursorData = interactive.getAttribute("data-cursor");
        if (cursorData) {
          setCursorText(cursorData);
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [data-cursor], input, textarea, select");

      if (interactive) {
        setIsHovering(false);
        setCursorText("");
      }
    };

    // Hide cursor when leaving window
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    // Add listeners
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Start animation
    animateCursor();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  // Animate hover state
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    if (isHovering) {
      gsap.to(cursor, {
        scale: 2.5,
        duration: 0.4,
        ease: "power3.out",
      });
    } else {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  }, [isHovering]);

  return (
    <>
      {/* Main cursor ring */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${
          isHidden ? "opacity-0" : "opacity-100"
        }`}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className={`relative flex items-center justify-center transition-all duration-300 ${
            isHovering ? "w-20 h-20" : "w-10 h-10"
          }`}
        >
          {/* Ring */}
          <div
            className={`absolute inset-0 rounded-full border transition-all duration-300 ${
              isHovering
                ? "border-white/80 bg-white/5"
                : "border-white/50"
            }`}
          />

          {/* Text label */}
          {cursorText && (
            <span className="text-[10px] font-medium text-white uppercase tracking-wider">
              {cursorText}
            </span>
          )}
        </div>
      </div>

      {/* Center dot */}
      <div
        ref={cursorDotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${
          isHidden || isHovering ? "opacity-0" : "opacity-100"
        }`}
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-1.5 h-1.5 bg-white rounded-full" />
      </div>

      {/* Hide default cursor */}
      <style jsx global>{`
        @media (pointer: fine) {
          * {
            cursor: none !important;
          }
        }
      `}</style>
    </>
  );
}
