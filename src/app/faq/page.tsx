import { Metadata } from "next";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { allFaqs } from "@/content/faqs";
import { TrendingUp, ShieldCheck, Smartphone } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ | OneTap-Card",
  description: "Answers to common questions about OneTap digital business cards.",
};

export default function FaqPage() {
  return (
    <div className="flex flex-col w-full pt-32 pb-24 bg-brand-cream min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl mb-20">
        <div className="text-center mb-16">
          <h1 className="font-display text-5xl md:text-7xl text-brand-midnight mb-6">
            Got <span className="italic text-brand-turquoise">questions?</span>
          </h1>
          <p className="text-xl text-brand-midnight/70 max-w-2xl mx-auto">
            Everything you need to know about OneTap digital business cards.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {[
            { icon: TrendingUp, stat: "80% more leads", label: "Average increase for freelancers" },
            { icon: ShieldCheck, stat: "GDPR compliant", label: "Enterprise-grade security" },
            { icon: Smartphone, stat: "No app needed", label: "Works in any browser" },
          ].map((item) => (
            <div key={item.stat} className="bg-white p-8 rounded-[2rem] border border-brand-midnight/5 text-center">
              <item.icon className="text-brand-turquoise w-10 h-10 mx-auto mb-4" />
              <p className="font-display font-bold text-2xl text-brand-midnight mb-2 tracking-tight leading-none">{item.stat}</p>
              <p className="text-brand-midnight/60 text-sm">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl">
        <Accordion className="space-y-3">
          {allFaqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="bg-white rounded-2xl border border-brand-midnight/5 px-6 shadow-sm">
              <AccordionTrigger className="text-left font-medium text-brand-midnight hover:no-underline py-5 text-lg">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="text-brand-midnight/70 pb-5 leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
