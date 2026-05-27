"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { getPlanPriceDisplay, plans } from "@/content/pricing";
import { MarketingPrimaryButton } from "@/components/marketing/get-card-cta";
import { type as typography } from "@/lib/typography";

type PricingSurface = "on-white" | "on-cream";

interface PricingPlanCardsProps {
  isAnnual: boolean;
  surface: PricingSurface;
  className?: string;
}

export function PricingPlanCards({ isAnnual, surface, className }: PricingPlanCardsProps) {
  const period = isAnnual ? "annual" : "monthly";
  const nonPopularCardBg =
    surface === "on-white" ? "bg-brand-cream border border-brand-midnight/10" : "bg-white border border-brand-midnight/5";

  return (
    <div className={cn("grid md:grid-cols-3 gap-8 max-w-6xl mx-auto", className)}>
      {plans.map((plan) => {
        const { current, previous, billedNote } = getPlanPriceDisplay(plan, period);
        const isPopular = plan.popular;

        return (
          <div
            key={plan.id}
            className={cn(
              "rounded-3xl p-8 flex flex-col",
              isPopular
                ? "bg-brand-navy text-brand-cream border-2 border-brand-turquoise shadow-2xl md:-translate-y-4 relative"
                : cn(nonPopularCardBg, "shadow-sm"),
            )}
          >
            {isPopular && (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-turquoise text-brand-midnight text-xs font-bold px-3 py-1 rounded-full">
                Most Popular
              </span>
            )}
            <h3 className={cn(typography.subsectionTitle, "mb-2", isPopular && "text-brand-turquoise")}>
              {plan.name}
            </h3>
            <p className={cn("text-sm mb-6", isPopular ? "text-brand-cream/60" : "text-brand-midnight/60")}>
              {plan.description}
            </p>
            <div className="mb-6 min-h-22">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                {previous !== null && (
                  <>
                    <span className="sr-only">
                      Was ${previous}, now ${current}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "text-xl font-medium line-through",
                        isPopular ? "text-brand-cream/50" : "text-brand-midnight/50",
                      )}
                    >
                      ${previous}
                    </span>
                  </>
                )}
                <span className={typography.price}>${current}</span>
                <span className={isPopular ? "text-brand-cream/50" : "text-brand-midnight/50"}>
                  /month
                </span>
              </div>
              {billedNote && (
                <p
                  className={cn(
                    "text-sm mt-1",
                    isPopular ? "text-brand-turquoise" : "text-brand-midnight/50",
                  )}
                >
                  {billedNote}
                </p>
              )}
            </div>
            <Link href={plan.ctaHref} className="mb-8 block">
              <MarketingPrimaryButton
                size="default"
                className={cn(
                  "h-12 w-full rounded-xl",
                  isPopular &&
                    "bg-brand-turquoise text-brand-midnight hover:bg-white hover:text-brand-midnight"
                )}
              >
                {plan.cta}
              </MarketingPrimaryButton>
            </Link>
            <ul className="space-y-3 flex-1">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check size={18} className="text-brand-turquoise shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
