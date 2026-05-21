import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { homeFaqs } from "@/content/faqs";

export function FaqSection() {
  return (
    <section className="py-24 bg-brand-cream">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-brand-midnight mb-4">
            Frequently asked <span className="italic text-brand-turquoise">questions</span>
          </h2>
        </div>

        <Accordion className="space-y-3">
          {homeFaqs.map((faq, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="bg-white rounded-2xl border border-brand-midnight/5 px-6 shadow-sm"
            >
              <AccordionTrigger className="text-left font-medium text-brand-midnight hover:no-underline py-5">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-brand-midnight/70 pb-5 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-10">
          <Link
            href="/faq"
            className="inline-flex items-center gap-2 text-brand-turquoise-dark font-medium hover:underline"
          >
            View all FAQs <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
