"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { MagneticWrapper } from "@/components/ui/magnetic-button";

const faqs = [
  {
    question: "Do I need an app to use OneTap?",
    answer: "No app required. OneTap cards open instantly in any smartphone's browser when tapped or scanned via QR code."
  },
  {
    question: "Does it work on Android and iOS?",
    answer: "Absolutely. OneTap is universally compatible with all modern smartphones."
  },
  {
    question: "How does the 'Brand Lock' feature work for agencies?",
    answer: "Brand Lock allows the admin to set strict color codes, logos, and fonts that apply to all team member cards, preventing them from making off-brand changes."
  }
];

export function HomeFaqTeaser() {
  return (
    <section className="py-24 md:py-32 bg-brand-cream border-t border-brand-midnight/5">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <div className="flex flex-col md:flex-row gap-16 items-start">
          <div className="flex-1">
            <h2 className="font-serif text-4xl md:text-5xl text-brand-midnight mb-6">
              Clear the friction.
            </h2>
            <p className="text-lg text-brand-midnight/70 mb-10">
              Everything you need to know about switching your business to OneTap.
            </p>
            <MagneticWrapper>
              <Link href="/faq" className="inline-flex items-center gap-2 text-brand-turquoise font-medium hover:opacity-80 transition-opacity text-lg">
                View all FAQs <ArrowRight size={20} />
              </Link>
            </MagneticWrapper>
          </div>
          
          <div className="flex-[1.5] w-full">
            <Accordion className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`} 
                  className="border border-brand-midnight/10 rounded-2xl px-6 bg-white data-[state=open]:border-brand-turquoise/50 data-[state=open]:bg-brand-turquoise/5 transition-colors duration-200 shadow-sm"
                >
                  <AccordionTrigger className="font-serif text-xl text-brand-midnight hover:no-underline py-5 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-brand-midnight/70 font-sans text-base pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}
