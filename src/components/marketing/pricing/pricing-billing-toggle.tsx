"use client";

import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { getChrome, getPricing } from "@/content/get-content";
import { useLocale } from "@/components/providers/locale-provider";
import {
  formatSaveBadgeTemplate,
  maxYearlySavingPercent,
} from "@/lib/pricing-savings";

interface PricingBillingToggleProps {
  isAnnual: boolean;
  onChange: (isAnnual: boolean) => void;
  className?: string;
}

export function PricingBillingToggle({
  isAnnual,
  onChange,
  className,
}: PricingBillingToggleProps) {
  const locale = useLocale();
  const chrome = getChrome(locale);
  const { pricingUi } = chrome;
  const pricing = getPricing(locale);

  const savePercent = useMemo(
    () => maxYearlySavingPercent(pricing.plans),
    [pricing.plans],
  );

  const saveBadgeLabel =
    savePercent != null && savePercent > 0
      ? formatSaveBadgeTemplate(pricingUi.saveBadgeTemplate, savePercent)
      : null;

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="bg-brand-midnight/5 p-1 rounded-full inline-flex border border-brand-midnight/10">
        <button
          type="button"
          onClick={() => onChange(false)}
          aria-pressed={!isAnnual}
          className={cn(
            "px-6 py-2.5 rounded-full font-medium text-sm transition-all",
            !isAnnual ? "bg-white text-brand-midnight shadow-sm" : "text-brand-midnight/60",
          )}
        >
          {pricingUi.monthly}
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          aria-pressed={isAnnual}
          className={cn(
            "px-6 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2",
            isAnnual ? "bg-white text-brand-midnight shadow-sm" : "text-brand-midnight/60",
          )}
        >
          {pricingUi.annually}
          {saveBadgeLabel ? (
            <span className="bg-brand-turquoise/20 text-brand-turquoise-dark text-xs font-bold px-2 py-0.5 rounded-full">
              {saveBadgeLabel}
            </span>
          ) : null}
        </button>
      </div>
    </div>
  );
}
