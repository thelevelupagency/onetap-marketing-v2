"use client";

import { useMemo, useState } from "react";
import { TrendingUp, ShieldCheck, Smartphone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { allFaqs } from "@/content/faqs";
import { ContentSearch } from "@/components/marketing/content-search";

const statCards = [
  { icon: TrendingUp, stat: "80% more leads", label: "Average increase for freelancers" },
  { icon: ShieldCheck, stat: "GDPR compliant", label: "Enterprise-grade security" },
  { icon: Smartphone, stat: "No app needed", label: "Works in any browser" },
] as const;

function matchesQuery(q: string, a: string, query: string) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return q.toLowerCase().includes(needle) || a.toLowerCase().includes(needle);
}

export function FaqPageContent() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(
    () => allFaqs.filter((faq) => matchesQuery(faq.q, faq.a, query)),
    [query]
  );

  return (
    <>
      <ContentSearch
        value={query}
        onChange={setQuery}
        placeholder="Search FAQs..."
        className="relative max-w-md mx-auto w-full mb-8"
      />

      <div className="grid lg:grid-cols-3 gap-8 mb-8">
        {statCards.map((item) => (
          <div key={item.stat} className="bg-white p-8 rounded-4xl border border-brand-midnight/5 text-center">
            <item.icon className="text-brand-turquoise w-10 h-10 mx-auto mb-4" />
            <p className="font-display font-bold text-2xl text-brand-midnight mb-2 tracking-tight leading-none">{item.stat}</p>
            <p className="text-brand-midnight/60 text-sm">{item.label}</p>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-center text-brand-midnight/50 py-8">No FAQs match your search.</p>
        ) : (
          <Accordion className="space-y-3">
            {filtered.map((faq) => (
              <AccordionItem
                key={faq.q}
                value={faq.q}
                className="bg-white rounded-2xl border border-brand-midnight/5 px-6 shadow-sm"
              >
                <AccordionTrigger className="text-left font-medium text-brand-midnight hover:no-underline py-5 text-lg">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-brand-midnight/70 pb-5 leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </>
  );
}
