import { testimonials } from "@/lib/content/landing";

export function Testimonial() {
  // Sección oculta hasta tener testimonios reales
  if (testimonials.length === 0) return null;

  const t = testimonials[0];

  return (
    <section className="py-16 md:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <blockquote className="font-serif text-2xl md:text-3xl leading-snug tracking-tight mb-6">
          &ldquo;{t.quote}&rdquo;
        </blockquote>
        <div>
          <div className="font-medium">{t.name}</div>
          <div className="text-sm text-muted-foreground">{t.company}</div>
        </div>
      </div>
    </section>
  );
}
