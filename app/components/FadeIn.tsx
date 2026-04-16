"use client";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  once?: boolean;
}

export default function FadeIn({
  children,
  className = "",
}: FadeInProps) {
  return <div className={className}>{children}</div>;
}

interface StaggerFadeInProps {
  children: React.ReactNode;
  className?: string;
  childClassName?: string;
  stagger?: number;
  delay?: number;
}

export function StaggerFadeIn({
  children,
  className = "",
  childClassName = "",
}: StaggerFadeInProps) {
  return (
    <div className={className}>
      {Array.isArray(children)
        ? children.map((child, index) => (
            <div key={index} className={childClassName}>
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
