"use client";

import { Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLocale } from "@/components/providers/locale-provider";
import { isRtlLocale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";
import { type as typography } from "@/lib/typography";

export interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: readonly FaqItem[];
  getValue?: (item: FaqItem, index: number) => string;
  compact?: boolean;
  className?: string;
}

function faqItemShellClass(compact: boolean) {
  return cn(
    "group/faq-item relative overflow-hidden rounded-2xl border border-brand-midnight/10 bg-white transition-all duration-300 hover:border-brand-turquoise/40 hover:bg-white hover:shadow-xl hover:shadow-brand-navy/10 data-[open]:border-2 data-[open]:border-brand-turquoise data-[open]:bg-white data-[open]:shadow-xl data-[open]:shadow-brand-turquoise/15 data-[state=open]:border-2 data-[state=open]:border-brand-turquoise data-[state=open]:bg-white data-[state=open]:shadow-xl data-[state=open]:shadow-brand-turquoise/15 data-[open]:hover:shadow-2xl data-[open]:hover:shadow-brand-navy/15 data-[state=open]:hover:shadow-2xl data-[state=open]:hover:shadow-brand-navy/15",
    compact ? "px-4" : "px-6"
  );
}

function FaqToggleIcon({ compact }: { compact: boolean }) {
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full border border-brand-turquoise bg-brand-turquoise text-white shadow-2xs transition-all duration-300 group-hover/accordion-trigger:border-brand-turquoise-dark group-hover/accordion-trigger:bg-brand-turquoise-dark group-hover/accordion-trigger:text-white group-data-[open]/faq-item:border-brand-turquoise group-data-[open]/faq-item:bg-brand-turquoise group-data-[open]/faq-item:text-white group-data-[state=open]/faq-item:border-brand-turquoise group-data-[state=open]/faq-item:bg-brand-turquoise group-data-[state=open]/faq-item:text-white",
        compact ? "h-7 w-7" : "h-8 w-8"
      )}
    >
      <Plus
        className={cn(
          "text-white transition-transform duration-300 group-data-[open]/faq-item:rotate-135 group-data-[state=open]/faq-item:rotate-135 group-aria-expanded/accordion-trigger:rotate-135",
          compact ? "h-3.5 w-3.5" : "h-4 w-4"
        )}
      />
    </span>
  );
}

export function FaqAccordion({
  items,
  getValue = (_item, index) => `item-${index}`,
  compact = false,
  className,
}: FaqAccordionProps) {
  const locale = useLocale();
  const isRtl = isRtlLocale(locale);

  return (
    <Accordion
      dir={isRtl ? "rtl" : "ltr"}
      className={cn("space-y-4", className)}
    >
      {items.map((faq, index) => (
        <AccordionItem
          key={getValue(faq, index)}
          value={getValue(faq, index)}
          className={faqItemShellClass(compact)}
        >
          <span className="pointer-events-none absolute bottom-0 start-0 top-0 w-1.5 bg-brand-turquoise opacity-0 transition-opacity duration-300 group-data-[open]/faq-item:opacity-100 group-data-[state=open]/faq-item:opacity-100" />

          <AccordionTrigger
            hideChevron
            className={cn(
              "flex w-full items-center justify-between gap-4 text-start hover:no-underline focus-visible:outline-none",
              compact ? "py-4" : "py-5"
            )}
          >
            <span
              className={cn(
                typography.accordionQuestion,
                "min-w-0 flex-1 text-start transition-colors duration-200 group-hover/accordion-trigger:text-brand-navy group-data-[open]/faq-item:font-semibold group-data-[open]/faq-item:text-brand-navy group-data-[state=open]/faq-item:font-semibold group-data-[state=open]/faq-item:text-brand-navy"
              )}
            >
              {faq.q}
            </span>
            <FaqToggleIcon compact={compact} />
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              typography.bodySm,
              "text-start text-brand-midnight/85 leading-relaxed",
              compact ? "pb-4 pt-1" : "pb-6 pt-1"
            )}
          >
            {faq.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

/** Mobile pricing comparison rows — custom trigger/content, shared item shell */
export function FaqAccordionComparisonItem({
  value,
  title,
  children,
  className,
}: {
  value: string;
  title: string;
  children: React.ReactNode;
  /** Defaults to cream card — use on white section backgrounds */
  className?: string;
}) {
  const locale = useLocale();
  const isRtl = isRtlLocale(locale);

  return (
    <AccordionItem
      value={value}
      dir={isRtl ? "rtl" : "ltr"}
      className={cn(faqItemShellClass(true), className)}
    >
      <span className="pointer-events-none absolute bottom-0 start-0 top-0 w-1.5 bg-brand-turquoise opacity-0 transition-opacity duration-300 group-data-[open]/faq-item:opacity-100 group-data-[state=open]/faq-item:opacity-100" />

      <AccordionTrigger
        hideChevron
        className="flex w-full items-center justify-between gap-3 py-4 text-start hover:no-underline focus-visible:outline-none"
      >
        <span
          className={cn(
            typography.accordionQuestion,
            "min-w-0 flex-1 text-start font-medium text-brand-midnight transition-colors duration-200 group-hover/accordion-trigger:text-brand-navy group-data-[open]/faq-item:font-semibold group-data-[open]/faq-item:text-brand-navy group-data-[state=open]/faq-item:font-semibold group-data-[state=open]/faq-item:text-brand-navy"
          )}
        >
          {title}
        </span>
        <FaqToggleIcon compact />
      </AccordionTrigger>
      <AccordionContent className="space-y-2 pb-4 pt-1 text-start">{children}</AccordionContent>
    </AccordionItem>
  );
}
