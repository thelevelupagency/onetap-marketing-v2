"use client";

import { useMemo, useState } from "react";
import { getChrome, getFaqs } from "@/content/get-content";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";
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

type FaqCategory = "getting-started" | "your-card" | "business" | "plans-billing";

export function FaqPageContent({ locale }: { locale: Locale }) {
  const chrome = getChrome(locale);
  const faqsModule = getFaqs(locale);
  const { faqCategoryLabels, faqCategoryOrder, faqPageEntries, groupFaqsByCategory } = faqsModule;
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
    [query, activeCategory, faqPageEntries, faqCategoryLabels],
  );

  const sections = useMemo(
    () => groupFaqsByCategory(filtered),
    [filtered, groupFaqsByCategory],
  );

  const filterPills: CategoryFilterPill[] = useMemo(
    () => [
      {
        id: "all",
        label: chrome.faqPage.allCategories,
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
    [activeCategory, chrome.faqPage.allCategories, faqCategoryLabels, faqCategoryOrder],
  );

  const hasFilters = query.trim().length > 0 || activeCategory != null;
  const emptyMessage = hasFilters
    ? chrome.faqPage.emptyFiltered
    : chrome.faqPage.empty;

  return (
    <>
      <ContentSearch
        value={query}
        onChange={setQuery}
        placeholder={chrome.faqPage.searchPlaceholder}
        className="relative mx-auto mb-marketing-stack-gap w-full max-w-md"
      />

      <CategoryFilterPills
        items={filterPills}
        ariaLabel={chrome.aria.faqCategories}
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
                  aria-label={chrome.aria.pricingHelp}
                  className="mt-marketing-stack-gap-sm flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3 sm:gap-y-2"
                >
                  <TextLink href={localizePath("/pricing", locale)} showArrow={false}>
                    {chrome.faqPage.comparePlans}
                  </TextLink>
                  <span
                    className="hidden text-brand-midnight/30 sm:inline"
                    aria-hidden
                  >
                    ·
                  </span>
                  <TextLink href={localizePath("/pricing#billing-faq", locale)} showArrow={false}>
                    {chrome.faqPage.billingFaqOnPricing}
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
