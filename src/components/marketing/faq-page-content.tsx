"use client";

import { useMemo, useState } from "react";
import {
  faqCategoryLabels,
  faqCategoryOrder,
  faqPageEntries,
  groupFaqsByCategory,
  type FaqCategory,
} from "@/content/faqs";
import { faqEntryMatchesQuery } from "@/lib/search";
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";
import { ContentSearch } from "@/components/marketing/content-search";
import {
  CategoryFilterPills,
  FaqAccordion,
  SectionHeader,
  TextLink,
  type CategoryFilterPill,
} from "@/components/marketing/primitives";

export function FaqPageContent() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<FaqCategory | null>(null);

  const filtered = useMemo(
    () =>
      faqPageEntries.filter((entry) => {
        if (activeCategory != null && entry.category !== activeCategory) {
          return false;
        }
        return faqEntryMatchesQuery(entry, query, faqCategoryLabels[entry.category]);
      }),
    [query, activeCategory]
  );

  const sections = useMemo(() => groupFaqsByCategory(filtered), [filtered]);

  const filterPills: CategoryFilterPill[] = useMemo(
    () => [
      {
        id: "all",
        label: "All",
        isActive: activeCategory == null,
        onSelect: () => setActiveCategory(null),
      },
      ...faqCategoryOrder.map((category) => ({
        id: category,
        label: faqCategoryLabels[category],
        isActive: activeCategory === category,
        onSelect: () => setActiveCategory(category),
      })),
    ],
    [activeCategory]
  );

  const hasFilters = query.trim().length > 0 || activeCategory != null;
  const emptyMessage = hasFilters
    ? "No FAQs match your search or category."
    : "No FAQs available.";

  return (
    <>
      <ContentSearch
        value={query}
        onChange={setQuery}
        placeholder="Search FAQs..."
        className="relative mx-auto mb-marketing-stack-gap w-full max-w-md"
      />

      <CategoryFilterPills
        items={filterPills}
        ariaLabel="FAQ categories"
        className="mb-marketing-header-gap-md"
      />

      {sections.length === 0 ? (
        <p className="py-12 text-center text-brand-midnight/50">{emptyMessage}</p>
      ) : (
        <div className="mx-auto w-full max-w-3xl space-y-8 pb-marketing-header-gap-md">
          {sections.map((section) => (
            <section key={section.category} id={section.category}>
              <SectionHeader
                title={section.label}
                align="left"
                spacingBelow="none"
                titleClassName={cn(typography.subsectionTitle, "mb-3")}
              />
              <FaqAccordion
                items={section.items}
                getValue={(_faq, index) => `${section.category}-${index}`}
              />
              {section.category === "plans-billing" ? (
                <nav
                  aria-label="Pricing help"
                  className="mt-marketing-stack-gap-sm flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2"
                >
                  <TextLink href="/pricing" showArrow={false}>
                    Compare plans
                  </TextLink>
                  <span
                    className="hidden text-brand-midnight/30 sm:inline"
                    aria-hidden
                  >
                    ·
                  </span>
                  <TextLink href="/pricing#billing-faq" showArrow={false}>
                    Billing FAQ on pricing
                  </TextLink>
                </nav>
              ) : null}
            </section>
          ))}
        </div>
      )}
    </>
  );
}
