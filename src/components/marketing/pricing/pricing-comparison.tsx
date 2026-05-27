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
      <Icon
        className={cn(
          "size-5 shrink-0",
          value ? "text-brand-turquoise" : "text-brand-midnight/20",
          className
        )}
        aria-hidden
      />
    );
  }
  return (
    <span className={cn("text-sm text-brand-midnight/80", className)}>{value}</span>
  );
}

export function PricingComparison() {
  return (
    <MarketingSection background="transparent" spacing="compact">
      <MarketingContainer width="default">
        <SectionHeader title="Feature" accent="comparison" />

        <div className="hidden overflow-hidden rounded-2xl border border-brand-midnight/10 bg-white md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-midnight/10 bg-brand-cream">
                <th className="p-4 text-left font-medium text-brand-midnight">Feature</th>
                <th className={`${typography.tableHeading} p-4 text-center`}>Free</th>
                <th className={`${typography.tableHeading} bg-brand-turquoise/5 p-4 text-center`}>
                  Pro
                </th>
                <th className={`${typography.tableHeading} p-4 text-center`}>
                  Agencies & Teams
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, i) => (
                <tr
                  key={row.name}
                  className={i % 2 === 0 ? "bg-white" : "bg-brand-cream/30"}
                >
                  <td className="p-4 text-sm font-medium text-brand-midnight">{row.name}</td>
                  <td className="p-4 text-center">
                    <CellValue value={row.free} className="mx-auto" />
                  </td>
                  <td className="bg-brand-turquoise/5 p-4 text-center">
                    <CellValue value={row.premium} className="mx-auto" />
                  </td>
                  <td className="p-4 text-center">
                    <CellValue value={row.agency} className="mx-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="md:hidden">
          <Accordion className="space-y-3">
            {comparisonFeatures.map((row, i) => (
              <FaqAccordionComparisonItem key={row.name} value={`row-${i}`} title={row.name}>
                {(
                  [
                    { key: "free" as const, label: "Free" },
                    { key: "premium" as const, label: "Pro" },
                    { key: "agency" as const, label: "Agencies & Teams" },
                  ] as const
                ).map(({ key: tier, label }) => (
                  <div
                    key={tier}
                    className="flex min-h-5 items-center justify-between gap-4"
                  >
                    <span className="text-sm text-brand-midnight/60">{label}</span>
                    <div className="flex w-28 shrink-0 items-center justify-end">
                      <CellValue value={row[tier]} />
                    </div>
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
