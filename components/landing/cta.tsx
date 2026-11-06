import { Button } from "@/components/ui/button";
import { ctaContent, siteConfig } from "@/lib/content/landing";

export function CTA() {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 bg-secondary">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl tracking-tight mb-4">
          {ctaContent.title}
        </h2>
        <p className="text-muted-foreground text-base md:text-lg mb-8 leading-relaxed">
          {ctaContent.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
              {ctaContent.cta}
            </a>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
            <a href={`mailto:${siteConfig.contactEmail}`}>{ctaContent.secondaryCta}</a>
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mt-5">{ctaContent.trust}</p>
      </div>
    </section>
  );
}
