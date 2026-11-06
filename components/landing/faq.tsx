"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/lib/content/landing";

export function FAQ() {
  return (
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6">
      <div className="mx-auto max-w-5xl flex flex-col lg:flex-row gap-10 lg:gap-16">
        <div className="lg:w-2/5 shrink-0">
          <h2 className="font-serif text-3xl md:text-4xl tracking-tight mb-3">
            Preguntas frecuentes
          </h2>
          <p className="text-muted-foreground text-base">
            Lo que nuestros clientes suelen preguntarnos antes de empezar.
          </p>
        </div>

        <Accordion type="multiple" className="flex-1">
          {faqItems.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-base font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
