"use client";

import { Check, X } from "lucide-react";
import { comparisonFeatures } from "@/content/pricing";
import { cn } from "@/lib/utils";
import { type as typography } from "@/lib/typography";
import { Accordion } from "@/components/ui/accordion";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  FaqAccordionComparisonItem,
} from "@/components/marketing/primitives";

type ComparisonPlanKey = "free" | "premium" | "agency";

type ComparisonPlanColumn = {
  key: ComparisonPlanKey;
  label: string;
  highlight?: boolean;
};

const planColumns: ComparisonPlanColumn[] = [
  { key: "free", label: "Free" },
  { key: "premium", label: "Pro", highlight: true },
  { key: "agency", label: "Agencies & Teams" },
];

function CellValue({
  value,
  className,
}: {
  value: string | boolean;
  className?: string;
}) {
  if (typeof value === "boolean") {
    const Icon = value ? Check : X;
    return (
      <span
        className={cn("inline-flex items-center justify-center", className)}
        aria-label={value ? "Included" : "Not included"}
      >
        <Icon
          className={cn(
            "size-5 shrink-0",
            value ? "text-brand-turquoise" : "text-brand-midnight/25"
          )}
          aria-hidden
        />
      </span>
    );
  }
  return (
    <span className={cn(typography.bodySm, "font-medium text-brand-midnight", className)}>
      {value}
    </span>
  );
}

export function PricingComparison() {
  return (
    <MarketingSection background="white" spacing="compact">
      <MarketingContainer width="default">
        <SectionHeader title="Feature" accent="comparison" />

        <div className="hidden overflow-hidden rounded-3xl border border-brand-midnight/10 bg-brand-cream shadow-sm md:block">
          <table className="w-full table-fixed border-collapse">
            <colgroup>
              <col className="w-[38%]" />
              <col className="w-[20.66%]" />
              <col className="w-[20.66%]" />
              <col className="w-[20.66%]" />
            </colgroup>
            <thead>
              <tr className="border-b-2 border-brand-midnight/10 bg-brand-cream">
                <th
                  scope="col"
                  className={cn(
                    typography.label,
                    "px-6 py-5 text-left text-brand-midnight/70"
                  )}
                >
                  Feature
                </th>
                {planColumns.map((col) => (
                  <th
                    key={col.key}
                    scope="col"
                    className={cn(
                      typography.tableHeading,
                      "px-4 py-5 text-center",
                      col.highlight &&
                        "border-x border-brand-turquoise/25 bg-brand-turquoise/10"
                    )}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, i) => (
                <tr
                  key={row.name}
                  className={cn(
                    "border-b border-brand-midnight/[0.06] last:border-b-0",
                    i % 2 === 0 ? "bg-white" : "bg-brand-cream/50",
                    "transition-colors hover:bg-brand-turquoise/[0.04]"
                  )}
                >
                  <th
                    scope="row"
                    className={cn(
                      typography.bodySm,
                      "px-6 py-4 text-left font-medium text-brand-midnight"
                    )}
                  >
                    {row.name}
                  </th>
                  {planColumns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "px-4 py-4 text-center align-middle",
                        col.highlight &&
                          "border-x border-brand-turquoise/15 bg-brand-turquoise/[0.06]"
                      )}
                    >
                      <CellValue value={row[col.key]} className="mx-auto" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden">
          <Accordion className="space-y-marketing-stack-gap-sm">
            {comparisonFeatures.map((row, i) => (
              <FaqAccordionComparisonItem key={row.name} value={`row-${i}`} title={row.name}>
                {planColumns.map(({ key: tier, label, highlight }) => (
                  <div
                    key={tier}
                    className={cn(
                      "flex min-h-10 items-center justify-between gap-4 rounded-xl border border-brand-midnight/[0.06] bg-white px-3 py-2.5",
                      highlight && "border-brand-turquoise/20 bg-brand-turquoise/10"
                    )}
                  >
                    <span className={cn(typography.label, "text-brand-midnight/70")}>
                      {label}
                    </span>
                    <CellValue value={row[tier]} />
                  </div>
                ))}
              </FaqAccordionComparisonItem>
            ))}
          </Accordion>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
