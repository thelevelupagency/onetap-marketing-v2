"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index}
                className={cn(
                  "border rounded-2xl overflow-hidden transition-colors duration-200",
                  isOpen ? "border-brand-turquoise/50 bg-brand-turquoise/5" : "border-brand-midnight/10 bg-white"
                )}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-serif text-xl text-brand-midnight hover:bg-brand-midnight/5 transition-colors"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  {faq.question}
                  <span className="text-brand-turquoise shrink-0 ml-4">
                    {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                  </span>
                </button>
                
                <div 
                  className={cn(
                    "px-6 overflow-hidden transition-all duration-300 ease-in-out",
                    isOpen ? "max-h-40 pb-5 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <p className="text-brand-midnight/70 font-sans">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
