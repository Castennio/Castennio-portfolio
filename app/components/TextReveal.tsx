"use client";

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
}: SplitTextRevealProps) {
  return (
    <div className={className}>
      <Component>{children}</Component>
    </div>
  );
}

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
}: WordRevealProps) {
  return (
    <div className={className}>
      <Component>{children}</Component>
    </div>
  );
}

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
}: LineRevealProps) {
  return (
    <div className={className}>
      <Component>{children}</Component>
    </div>
  );
}

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
}: BlurRevealProps) {
  return (
    <div className={className}>
      <Component>{children}</Component>
    </div>
  );
}

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
  gradientFrom = "#3b82f6",
  gradientTo = "#8b5cf6",
}: GradientRevealProps) {
  return (
    <div className={className}>
      <Component
        className="bg-clip-text text-transparent"
        style={{
          backgroundImage: `linear-gradient(90deg, ${gradientFrom}, ${gradientTo})`,
        }}
      >
        {children}
      </Component>
    </div>
  );
}

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
}: ScrambleTextProps) {
  return (
    <div className={className}>
      <Component>{children}</Component>
    </div>
  );
}

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
  to,
  className = "",
  suffix = "",
  prefix = "",
}: CounterProps) {
  return (
    <span className={className}>
      {prefix}{to}{suffix}
    </span>
  );
}

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
}: TypewriterProps) {
  return (
    <div className={className}>
      <Component>{children}</Component>
    </div>
  );
}
