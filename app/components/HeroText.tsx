"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

// ============================================
// HERO TEXT - Animates on mount (no ScrollTrigger)
// For above-the-fold content
// ============================================

interface HeroTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  duration?: number;
  type?: "chars" | "words" | "lines";
  animation?: "slide" | "blur" | "fade";
}

export default function HeroText({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  stagger = 0.03,
  duration = 0.8,
  type = "chars",
  animation = "slide",
}: HeroTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const element = containerRef.current.querySelector("[data-hero-text]");
    if (!element) return;

    // Split the text
    splitRef.current = new SplitType(element as HTMLElement, {
      types: type,
      tagName: "span",
    });

    const elements = splitRef.current[type];
    if (!elements) return;

    // Set initial state based on animation type
    const initialState = {
      slide: { y: 60, opacity: 0 },
      blur: { filter: "blur(10px)", opacity: 0, y: 20 },
      fade: { opacity: 0 },
    }[animation];

    const finalState = {
      slide: { y: 0, opacity: 1 },
      blur: { filter: "blur(0px)", opacity: 1, y: 0 },
      fade: { opacity: 1 },
    }[animation];

    gsap.set(elements, initialState);

    gsap.to(elements, {
      ...finalState,
      duration,
      ease: "power3.out",
      stagger,
      delay,
    });

    return () => {
      splitRef.current?.revert();
    };
  }, [children, delay, stagger, duration, type, animation]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <Component data-hero-text>{children}</Component>
    </div>
  );
}

// ============================================
// HERO WORDS - Word by word with mask effect
// ============================================

interface HeroWordsProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
}

export function HeroWords({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  stagger = 0.08,
}: HeroWordsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const element = containerRef.current.querySelector("[data-hero-words]");
    if (!element) return;

    splitRef.current = new SplitType(element as HTMLElement, {
      types: "words",
      tagName: "span",
    });

    const words = splitRef.current.words;
    if (!words) return;

    // Wrap each word for clip effect
    words.forEach((word) => {
      const wrapper = document.createElement("span");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "inline-block";
      wrapper.style.verticalAlign = "top";
      word.parentNode?.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });

    gsap.set(words, { y: "110%" });

    gsap.to(words, {
      y: "0%",
      duration: 0.9,
      ease: "power3.out",
      stagger,
      delay,
    });

    return () => {
      splitRef.current?.revert();
    };
  }, [children, delay, stagger]);

  return (
    <div ref={containerRef} className={className}>
      <Component data-hero-words>{children}</Component>
    </div>
  );
}

// ============================================
// HERO LINE - Single line reveal with mask
// ============================================

interface HeroLineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function HeroLine({
  children,
  className = "",
  delay = 0,
}: HeroLineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!lineRef.current || hasAnimated.current) return;
    hasAnimated.current = true;
    setIsReady(true);

    gsap.fromTo(
      lineRef.current,
      { y: "100%" },
      {
        y: "0%",
        duration: 0.9,
        ease: "power3.out",
        delay,
      }
    );
  }, [delay]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div
        ref={lineRef}
        style={{ transform: isReady ? undefined : "translateY(0)" }}
      >
        {children}
      </div>
    </div>
  );
}

// ============================================
// HERO BLUR - Blur reveal effect
// ============================================

interface HeroBlurProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
}

export function HeroBlur({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  stagger = 0.02,
}: HeroBlurProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const hasAnimated = useRef(false);
  const [isReady, setIsReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for simpler animation
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;
    hasAnimated.current = true;
    setIsReady(true);

    const element = containerRef.current.querySelector("[data-hero-blur]");
    if (!element) return;

    // On mobile: simple fade without blur (blur is GPU-heavy)
    if (isMobile) {
      gsap.fromTo(
        element,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          delay,
        }
      );
      return;
    }

    // Desktop: full blur animation per character
    splitRef.current = new SplitType(element as HTMLElement, {
      types: "chars",
      tagName: "span",
    });

    const chars = splitRef.current.chars;
    if (!chars) return;

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        filter: "blur(12px)",
        y: 10,
      },
      {
        opacity: 1,
        filter: "blur(0px)",
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger,
        delay,
      }
    );

    return () => {
      splitRef.current?.revert();
    };
  }, [children, delay, stagger, isMobile]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ opacity: isReady ? undefined : 1 }}
    >
      <Component data-hero-blur>{children}</Component>
    </div>
  );
}
