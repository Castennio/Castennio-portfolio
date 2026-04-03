"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  stagger?: number;
  y?: number;
}

export default function TextReveal({
  children,
  className = "",
  as: Component = "span",
  delay = 0,
  stagger = 0.03,
  y = 40,
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!containerRef.current || hasAnimated.current) return;

    const chars = containerRef.current.querySelectorAll(".char");

    gsap.set(chars, {
      y: y,
      opacity: 0,
    });

    gsap.to(chars, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power3.out",
      stagger: stagger,
      delay: delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
      onComplete: () => {
        hasAnimated.current = true;
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [delay, stagger, y]);

  // Split text into characters
  const splitText = children.split("").map((char, index) => (
    <span
      key={index}
      className="char inline-block"
      style={{ whiteSpace: char === " " ? "pre" : "normal" }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <Component className="inline-block">{splitText}</Component>
    </div>
  );
}

// Word-by-word reveal variant
interface WordRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
}

export function WordReveal({
  children,
  className = "",
  as: Component = "span",
  delay = 0,
}: WordRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const words = containerRef.current.querySelectorAll(".word");

    gsap.set(words, {
      y: 50,
      opacity: 0,
    });

    gsap.to(words, {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.08,
      delay: delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [delay]);

  const words = children.split(" ").map((word, index) => (
    <span key={index} className="word inline-block mr-[0.25em]">
      {word}
    </span>
  ));

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <Component className="inline-block">{words}</Component>
    </div>
  );
}

// Line reveal with mask effect
interface LineRevealProps {
  children: string;
  className?: string;
  delay?: number;
}

export function LineReveal({ children, className = "", delay = 0 }: LineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const line = containerRef.current.querySelector(".line");

    gsap.set(line, {
      y: "100%",
    });

    gsap.to(line, {
      y: "0%",
      duration: 0.8,
      ease: "power3.out",
      delay: delay,
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        once: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [delay]);

  return (
    <div ref={containerRef} className={`overflow-hidden ${className}`}>
      <div className="line">{children}</div>
    </div>
  );
}
