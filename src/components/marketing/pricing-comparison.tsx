"use client";

import { Check, X } from "lucide-react";
import { comparisonFeatures } from "@/content/pricing";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

function CellValue({ value }: { value: string | boolean }) {
  if (typeof value === "boolean") {
    return value ? (
      <Check className="w-5 h-5 text-brand-turquoise mx-auto" />
    ) : (
      <X className="w-5 h-5 text-brand-midnight/20 mx-auto" />
    );
  }
  return <span className="text-sm text-brand-midnight/80">{value}</span>;
}

export function PricingComparison() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl">
        <h2 className="font-display text-3xl md:text-4xl text-brand-midnight text-center mb-12">
          Feature <span className="italic text-brand-turquoise">comparison</span>
        </h2>

        {/* Desktop table */}
        <div className="hidden md:block overflow-hidden rounded-2xl border border-brand-midnight/10 bg-white">
          <table className="w-full">
            <thead>
              <tr className="border-b border-brand-midnight/10 bg-brand-cream">
                <th className="text-left p-4 font-medium text-brand-midnight">Feature</th>
                <th className="p-4 text-center font-display font-bold text-lg text-brand-midnight tracking-tight">Free</th>
                <th className="p-4 text-center font-display font-bold text-lg text-brand-midnight bg-brand-turquoise/5 tracking-tight">Premium</th>
                <th className="p-4 text-center font-display font-bold text-lg text-brand-midnight tracking-tight">Agency</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((row, i) => (
                <tr key={row.name} className={i % 2 === 0 ? "bg-white" : "bg-brand-cream/30"}>
                  <td className="p-4 text-sm font-medium text-brand-midnight">{row.name}</td>
                  <td className="p-4 text-center"><CellValue value={row.free} /></td>
                  <td className="p-4 text-center bg-brand-turquoise/5"><CellValue value={row.premium} /></td>
                  <td className="p-4 text-center"><CellValue value={row.agency} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile accordion */}
        <div className="md:hidden">
          <Accordion className="space-y-3">
            {comparisonFeatures.map((row, i) => (
              <AccordionItem key={row.name} value={`row-${i}`} className="bg-white rounded-2xl border border-brand-midnight/5 px-4">
                <AccordionTrigger className="font-medium text-brand-midnight hover:no-underline py-4">
                  {row.name}
                </AccordionTrigger>
                <AccordionContent className="pb-4 space-y-3">
                  {(["free", "premium", "agency"] as const).map((tier) => (
                    <div key={tier} className="flex justify-between items-center">
                      <span className="text-sm capitalize text-brand-midnight/60">{tier}</span>
                      <CellValue value={row[tier]} />
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
