"use client";

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
}: HeroTextProps) {
  return (
    <div className={className}>
      <Component>{children}</Component>
    </div>
  );
}

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
}: HeroWordsProps) {
  return (
    <div className={className}>
      <Component>{children}</Component>
    </div>
  );
}

interface HeroLineProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function HeroLine({
  children,
  className = "",
}: HeroLineProps) {
  return <div className={className}>{children}</div>;
}

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
}: HeroBlurProps) {
  return (
    <div className={className}>
      <Component>{children}</Component>
    </div>
  );
}
