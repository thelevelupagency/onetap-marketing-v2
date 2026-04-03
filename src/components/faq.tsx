"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need an app to use OneTap?",
    answer: "No app required. OneTap cards open instantly in any smartphone's browser when tapped or scanned via QR code."
  },
  {
    question: "Can I update my details after printing the NFC card?",
    answer: "Yes! Your physical NFC card links to your digital profile, which you can update in real-time from anywhere."
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

export function FAQ() {
  return (
    <section className="py-24 bg-white" id="faq">
      <div className="container mx-auto px-4 md:px-8 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-midnight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-brand-midnight/70">
            Everything you need to know about OneTap.
          </p>
        </div>

        <Accordion className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="border border-brand-midnight/10 rounded-2xl px-6 bg-white data-[state=open]:border-brand-turquoise/50 data-[state=open]:bg-brand-turquoise/5 transition-colors duration-200"
            >
              <AccordionTrigger className="font-serif text-xl text-brand-midnight hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-brand-midnight/70 font-sans text-base pb-5">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
