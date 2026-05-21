import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { pricingFaqs } from "@/content/pricing";

export function PricingFaq() {
  return (
    <section className="py-16 bg-brand-cream">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <h2 className="font-display text-3xl text-brand-midnight text-center mb-10">
          Billing <span className="italic text-brand-turquoise">FAQ</span>
        </h2>
        <Accordion className="space-y-3">
          {pricingFaqs.map((faq, i) => (
            <AccordionItem key={i} value={`pricing-faq-${i}`} className="bg-white rounded-2xl border border-brand-midnight/5 px-6">
              <AccordionTrigger className="text-left font-medium text-brand-midnight hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-brand-midnight/70 pb-5 leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
