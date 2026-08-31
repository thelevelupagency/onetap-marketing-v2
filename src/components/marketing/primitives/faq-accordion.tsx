import { Plus } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

export function FaqAccordion({
  items,
  getValue = (_item, index) => `item-${index}`,
  compact = false,
  className,
}: FaqAccordionProps) {
  return (
    <Accordion className={cn("space-y-4", className)}>
      {items.map((faq, index) => (
        <AccordionItem
          key={getValue(faq, index)}
          value={getValue(faq, index)}
          className={cn(
            "group/faq-item relative overflow-hidden rounded-2xl border border-brand-midnight/10 bg-white transition-all duration-300 hover:border-brand-turquoise/40 hover:bg-white hover:shadow-xl hover:shadow-brand-navy/10 data-[open]:border-2 data-[open]:border-brand-turquoise data-[open]:bg-white data-[open]:shadow-xl data-[open]:shadow-brand-turquoise/15 data-[state=open]:border-2 data-[state=open]:border-brand-turquoise data-[state=open]:bg-white data-[state=open]:shadow-xl data-[state=open]:shadow-brand-turquoise/15 data-[open]:hover:shadow-2xl data-[open]:hover:shadow-brand-navy/15 data-[state=open]:hover:shadow-2xl data-[state=open]:hover:shadow-brand-navy/15",
            compact ? "px-4" : "px-6"
          )}
        >
          {/* Active Left Vertical Accent Bar */}
          <span className="pointer-events-none absolute bottom-0 left-0 top-0 w-1.5 bg-brand-turquoise opacity-0 transition-opacity duration-300 group-data-[open]/faq-item:opacity-100 group-data-[state=open]/faq-item:opacity-100" />

          <AccordionTrigger
            hideChevron
            className={cn(
              "flex w-full items-center justify-between text-start hover:no-underline focus-visible:outline-none",
              compact ? "py-4" : "py-5"
            )}
          >
            <span
              className={cn(
                typography.accordionQuestion,
                "pe-4 text-start transition-colors duration-200 group-hover/accordion-trigger:text-brand-navy group-data-[open]/faq-item:font-semibold group-data-[open]/faq-item:text-brand-navy group-data-[state=open]/faq-item:font-semibold group-data-[state=open]/faq-item:text-brand-navy"
              )}
            >
              {faq.q}
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-brand-turquoise bg-brand-turquoise text-white shadow-2xs transition-all duration-300 group-hover/accordion-trigger:border-brand-turquoise-dark group-hover/accordion-trigger:bg-brand-turquoise-dark group-hover/accordion-trigger:text-white group-data-[open]/faq-item:border-brand-turquoise group-data-[open]/faq-item:bg-brand-turquoise group-data-[open]/faq-item:text-white group-data-[state=open]/faq-item:border-brand-turquoise group-data-[state=open]/faq-item:bg-brand-turquoise group-data-[state=open]/faq-item:text-white">
              <Plus className="h-4 w-4 text-white transition-transform duration-300 group-data-[open]/faq-item:rotate-135 group-data-[state=open]/faq-item:rotate-135 group-aria-expanded/accordion-trigger:rotate-135" />
            </span>
          </AccordionTrigger>
          <AccordionContent
            className={cn(
              typography.bodySm,
              "text-brand-midnight/85 leading-relaxed",
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
  return (
    <AccordionItem
      value={value}
      className={cn(
        "group/faq-item relative overflow-hidden rounded-2xl border border-brand-midnight/10 bg-white px-4 transition-all duration-300 hover:border-brand-turquoise/40 hover:bg-white hover:shadow-xl hover:shadow-brand-navy/10 data-[open]:border-2 data-[open]:border-brand-turquoise data-[open]:bg-white data-[open]:shadow-xl data-[open]:shadow-brand-turquoise/15 data-[state=open]:border-2 data-[state=open]:border-brand-turquoise data-[state=open]:bg-white data-[state=open]:shadow-xl data-[state=open]:shadow-brand-turquoise/15 data-[open]:hover:shadow-2xl data-[open]:hover:shadow-brand-navy/15 data-[state=open]:hover:shadow-2xl data-[state=open]:hover:shadow-brand-navy/15",
        className
      )}
    >
      {/* Active Left Vertical Accent Bar */}
      <span className="pointer-events-none absolute bottom-0 left-0 top-0 w-1.5 bg-brand-turquoise opacity-0 transition-opacity duration-300 group-data-[open]/faq-item:opacity-100 group-data-[state=open]/faq-item:opacity-100" />

      <AccordionTrigger
        hideChevron
        className="flex w-full items-center justify-between py-4 text-start hover:no-underline focus-visible:outline-none"
      >
        <span
          className={cn(
            typography.accordionQuestion,
            "pe-3 text-start font-medium text-brand-midnight transition-colors duration-200 group-hover/accordion-trigger:text-brand-navy group-data-[open]/faq-item:font-semibold group-data-[open]/faq-item:text-brand-navy group-data-[state=open]/faq-item:font-semibold group-data-[state=open]/faq-item:text-brand-navy"
          )}
        >
          {title}
        </span>
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-brand-turquoise bg-brand-turquoise text-white shadow-2xs transition-all duration-300 group-hover/accordion-trigger:border-brand-turquoise-dark group-hover/accordion-trigger:bg-brand-turquoise-dark group-hover/accordion-trigger:text-white group-data-[open]/faq-item:border-brand-turquoise group-data-[open]/faq-item:bg-brand-turquoise group-data-[open]/faq-item:text-white group-data-[state=open]/faq-item:border-brand-turquoise group-data-[state=open]/faq-item:bg-brand-turquoise group-data-[state=open]/faq-item:text-white">
          <Plus className="h-3.5 w-3.5 text-white transition-transform duration-300 group-data-[open]/faq-item:rotate-135 group-data-[state=open]/faq-item:rotate-135 group-aria-expanded/accordion-trigger:rotate-135" />
        </span>
      </AccordionTrigger>
      <AccordionContent className="space-y-2 pb-4 pt-1">{children}</AccordionContent>
    </AccordionItem>
  );
}
