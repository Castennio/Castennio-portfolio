import Image from "next/image";
import { Button } from "@/components/ui/button";
import { heroContent, siteConfig } from "@/lib/content/landing";

export function Hero() {
  return (
    <section className="pt-32 pb-16 md:pt-44 md:pb-24 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-6">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[56px] leading-tight tracking-tight text-balance">
          {heroContent.title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
          {heroContent.subtitle}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Button asChild size="lg" className="rounded-full px-8">
            <a href={siteConfig.whatsappUrl} target="_blank" rel="noopener noreferrer">
              {heroContent.cta}
            </a>
          </Button>
          <Button variant="outline" size="lg" className="rounded-full px-8" asChild>
            <a href="#funcionalidades">{heroContent.secondaryCta}</a>
          </Button>
        </div>
      </div>

      <div className="mx-auto max-w-4xl mt-12 md:mt-16">
        <div className="rounded-xl border border-border bg-card shadow-sm overflow-hidden">
          <Image
            src={heroContent.dashboardImage}
            alt={heroContent.dashboardImageAlt}
            width={1560}
            height={780}
            className="w-full h-auto hidden sm:block"
            priority
          />
          <Image
            src={heroContent.dashboardMobileImage}
            alt={heroContent.dashboardImageAlt}
            width={390}
            height={844}
            className="w-full h-auto sm:hidden"
            priority
          />
        </div>
      </div>
    </section>
  );
}
