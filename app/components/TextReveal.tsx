"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

// ============================================
// SPLIT TEXT REVEAL - Character by character
// ============================================
interface SplitTextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  duration?: number;
  y?: number;
  ease?: string;
  scrub?: boolean;
}

export default function SplitTextReveal({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  stagger = 0.02,
  duration = 0.6,
  y = 50,
  ease = "power3.out",
  scrub = false,
}: SplitTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current.querySelector("[data-split]");
    if (!element) return;

    // Split the text into characters
    splitRef.current = new SplitType(element as HTMLElement, {
      types: "chars",
      tagName: "span",
    });

    const chars = splitRef.current.chars;
    if (!chars) return;

    gsap.set(chars, { y, opacity: 0 });

    const animation = gsap.to(chars, {
      y: 0,
      opacity: 1,
      duration,
      ease,
      stagger,
      delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        end: scrub ? "top 20%" : undefined,
        scrub: scrub ? 1 : false,
        once: !scrub,
      },
    });

    return () => {
      animation.kill();
      splitRef.current?.revert();
    };
  }, [children, delay, stagger, duration, y, ease, scrub]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <Component data-split className="inline-block">
        {children}
      </Component>
    </div>
  );
}

// ============================================
// WORD REVEAL - Word by word with clip mask
// ============================================
interface WordRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
}

export function WordReveal({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  stagger = 0.06,
}: WordRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for simpler animation
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current.querySelector("[data-split]");
    if (!element) return;

    // On mobile: simple fade without word splitting
    if (isMobile) {
      gsap.set(element, { opacity: 0, y: 20 });

      const animation = gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      return () => {
        animation.kill();
      };
    }

    // Desktop: word-by-word animation
    splitRef.current = new SplitType(element as HTMLElement, {
      types: "words",
      tagName: "span",
    });

    const words = splitRef.current.words;
    if (!words) return;

    // Wrap each word in a clip container
    words.forEach((word) => {
      const wrapper = document.createElement("span");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "inline-block";
      wrapper.style.verticalAlign = "top";
      word.parentNode?.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });

    gsap.set(words, { y: "110%" });

    const animation = gsap.to(words, {
      y: "0%",
      duration: 0.8,
      ease: "power3.out",
      stagger,
      delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      animation.kill();
      splitRef.current?.revert();
    };
  }, [children, delay, stagger, isMobile]);

  return (
    <div ref={containerRef} className={className}>
      <Component data-split>{children}</Component>
    </div>
  );
}

// ============================================
// LINE REVEAL - Line by line with mask
// ============================================
interface LineRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
}

export function LineReveal({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  stagger = 0.15,
}: LineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current.querySelector("[data-split]");
    if (!element) return;

    splitRef.current = new SplitType(element as HTMLElement, {
      types: "lines",
      tagName: "span",
    });

    const lines = splitRef.current.lines;
    if (!lines) return;

    // Wrap each line for clip effect
    lines.forEach((line) => {
      const wrapper = document.createElement("span");
      wrapper.style.overflow = "hidden";
      wrapper.style.display = "block";
      line.parentNode?.insertBefore(wrapper, line);
      wrapper.appendChild(line);
    });

    gsap.set(lines, { y: "100%" });

    const animation = gsap.to(lines, {
      y: "0%",
      duration: 0.9,
      ease: "power3.out",
      stagger,
      delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      animation.kill();
      splitRef.current?.revert();
    };
  }, [children, delay, stagger]);

  return (
    <div ref={containerRef} className={className}>
      <Component data-split>{children}</Component>
    </div>
  );
}

// ============================================
// BLUR REVEAL - Characters with blur effect
// ============================================
interface BlurRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
}

export function BlurReveal({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  stagger = 0.03,
}: BlurRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const splitRef = useRef<SplitType | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile for simpler animation
  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 768px)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;
    setIsMobile(mobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current.querySelector("[data-split]");
    if (!element) return;

    // On mobile: simple fade without blur or character splitting (much faster)
    if (isMobile) {
      gsap.set(element, { opacity: 0, y: 20 });

      const animation = gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          once: true,
        },
      });

      return () => {
        animation.kill();
      };
    }

    // Desktop: full blur animation per character
    splitRef.current = new SplitType(element as HTMLElement, {
      types: "chars",
      tagName: "span",
    });

    const chars = splitRef.current.chars;
    if (!chars) return;

    gsap.set(chars, {
      opacity: 0,
      filter: "blur(10px)",
      y: 20,
    });

    const animation = gsap.to(chars, {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger,
      delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      animation.kill();
      splitRef.current?.revert();
    };
  }, [children, delay, stagger, isMobile]);

  return (
    <div ref={containerRef} className={className}>
      <Component data-split>{children}</Component>
    </div>
  );
}

// ============================================
// GRADIENT REVEAL - Text with gradient wipe
// ============================================
interface GradientRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  duration?: number;
  gradientFrom?: string;
  gradientTo?: string;
}

export function GradientReveal({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  duration = 1.2,
  gradientFrom = "#3b82f6",
  gradientTo = "#8b5cf6",
}: GradientRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const element = containerRef.current.querySelector("[data-gradient]") as HTMLElement;
    if (!element) return;

    gsap.set(element, {
      backgroundSize: "200% 100%",
      backgroundPosition: "100% 0",
    });

    const animation = gsap.to(element, {
      backgroundPosition: "0% 0",
      duration,
      ease: "power2.inOut",
      delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      animation.kill();
    };
  }, [children, delay, duration]);

  return (
    <div ref={containerRef} className={className}>
      <Component
        data-gradient
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, ${gradientFrom} 0%, ${gradientTo} 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 100%)`,
          backgroundSize: "200% 100%",
        }}
      >
        {children}
      </Component>
    </div>
  );
}

// ============================================
// SCRAMBLE TEXT - Typewriter/decode effect
// ============================================
interface ScrambleTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  speed?: number;
  chars?: string;
}

export function ScrambleText({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  speed = 30,
  chars = "!<>-_\\/[]{}—=+*^?#________",
}: ScrambleTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  const scramble = useCallback(() => {
    if (!textRef.current || hasAnimated.current) return;
    hasAnimated.current = true;

    const originalText = children;
    const length = originalText.length;
    let iteration = 0;

    const interval = setInterval(() => {
      if (!textRef.current) return;

      textRef.current.innerText = originalText
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return originalText[index];
          }
          if (char === " ") return " ";
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join("");

      if (iteration >= length) {
        clearInterval(interval);
      }

      iteration += 1 / 3;
    }, speed);

    return () => clearInterval(interval);
  }, [children, chars, speed]);

  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        setTimeout(scramble, delay * 1000);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [delay, scramble]);

  return (
    <div ref={containerRef} className={className}>
      <Component ref={textRef as React.RefObject<HTMLDivElement>}>
        {children.split("").map((char) => (char === " " ? " " : "_")).join("")}
      </Component>
    </div>
  );
}

// ============================================
// COUNTER - Animated number counter
// ============================================
interface CounterProps {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}

export function Counter({
  from = 0,
  to,
  duration = 2,
  delay = 0,
  className = "",
  suffix = "",
  prefix = "",
}: CounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!containerRef.current || !numberRef.current) return;

    const obj = { value: from };

    const animation = gsap.to(obj, {
      value: to,
      duration,
      delay,
      ease: "power2.out",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
      onUpdate: () => {
        if (numberRef.current) {
          numberRef.current.textContent = `${prefix}${Math.round(obj.value)}${suffix}`;
        }
      },
    });

    return () => {
      animation.kill();
    };
  }, [from, to, duration, delay, prefix, suffix]);

  return (
    <span ref={containerRef} className={className}>
      <span ref={numberRef}>{prefix}{from}{suffix}</span>
    </span>
  );
}

// ============================================
// TYPEWRITER - Classic typewriter effect
// ============================================
interface TypewriterProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  speed?: number;
  cursor?: boolean;
}

export function Typewriter({
  children,
  className = "",
  as: Component = "div",
  delay = 0,
  speed = 50,
  cursor = true,
}: TypewriterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textRef.current) return;

    const text = children;
    let currentIndex = 0;
    textRef.current.textContent = "";

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        setTimeout(() => {
          const interval = setInterval(() => {
            if (!textRef.current) return;

            if (currentIndex <= text.length) {
              textRef.current.textContent = text.slice(0, currentIndex);
              currentIndex++;
            } else {
              clearInterval(interval);
            }
          }, speed);
        }, delay * 1000);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [children, delay, speed]);

  return (
    <div ref={containerRef} className={className}>
      <Component className="inline">
        <span ref={textRef as React.RefObject<HTMLSpanElement>}></span>
        {cursor && (
          <span className="animate-pulse ml-0.5 inline-block w-[2px] h-[1em] bg-current align-middle" />
        )}
      </Component>
    </div>
  );
}
