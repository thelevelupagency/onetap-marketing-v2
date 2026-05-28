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
    <Accordion className={cn("space-y-marketing-stack-gap-sm", className)}>
      {items.map((faq, index) => (
        <AccordionItem
          key={getValue(faq, index)}
          value={getValue(faq, index)}
          className={cn(
            "rounded-2xl border border-brand-midnight/5 bg-white",
            compact ? "px-4" : "px-6 shadow-sm"
          )}
        >
          <AccordionTrigger
            className={cn(
              typography.accordionQuestion,
              "text-left hover:no-underline",
              compact ? "py-4 font-medium text-brand-midnight" : "py-5"
            )}
          >
            {faq.q}
          </AccordionTrigger>
          <AccordionContent className={cn(typography.bodySm, compact ? "pb-4" : "pb-5")}>
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
        "rounded-2xl border border-brand-midnight/10 bg-brand-cream px-4 shadow-sm",
        className
      )}
    >
      <AccordionTrigger
        className={cn(
          typography.accordionQuestion,
          "py-4 text-left font-medium text-brand-midnight hover:no-underline"
        )}
      >
        {title}
      </AccordionTrigger>
      <AccordionContent className="space-y-2 pb-4">{children}</AccordionContent>
    </AccordionItem>
  );
}
