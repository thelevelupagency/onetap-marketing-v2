"use client";

import { useMemo, useState } from "react";
import { TrendingUp, ShieldCheck, Smartphone } from "lucide-react";
import { allFaqs } from "@/content/faqs";
import { matchesQuery } from "@/lib/search";
import { type as typography } from "@/lib/typography";
import { ContentSearch } from "@/components/marketing/content-search";
import { FaqAccordion, MarketingContainer } from "@/components/marketing/primitives";

const statCards = [
  { icon: TrendingUp, stat: "80% more leads", label: "Average increase for freelancers" },
  { icon: ShieldCheck, stat: "GDPR compliant", label: "Enterprise-grade security" },
  { icon: Smartphone, stat: "No app needed", label: "Works in any browser" },
] as const;

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
        className="relative mx-auto mb-8 w-full max-w-md"
      />

      <div className="mb-8 grid gap-8 lg:grid-cols-3">
        {statCards.map((item) => (
          <div
            key={item.stat}
            className="rounded-4xl border border-brand-midnight/5 bg-white p-marketing-card-padding text-center"
          >
            <item.icon className="mx-auto mb-4 h-10 w-10 text-brand-turquoise" />
            <p className={`${typography.subsectionTitle} mb-2`}>{item.stat}</p>
            <p className={typography.caption}>{item.label}</p>
          </div>
        ))}
      </div>

      <MarketingContainer width="narrow" className="px-0">
        {filtered.length === 0 ? (
          <p className="py-8 text-center text-brand-midnight/50">No FAQs match your search.</p>
        ) : (
          <FaqAccordion items={filtered} getValue={(faq) => faq.q} />
        )}
      </MarketingContainer>
    </>
  );
}
