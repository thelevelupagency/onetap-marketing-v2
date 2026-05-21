"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { plans } from "@/content/pricing";
import { Button } from "@/components/ui/button";

export function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <>
      <div className="flex flex-col items-center mb-16">
        <div className="bg-brand-midnight/5 p-1 rounded-full inline-flex border border-brand-midnight/10">
          <button
            onClick={() => setIsAnnual(false)}
            className={cn(
              "px-6 py-2.5 rounded-full font-medium text-sm transition-all",
              !isAnnual ? "bg-white text-brand-midnight shadow-sm" : "text-brand-midnight/60"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={cn(
              "px-6 py-2.5 rounded-full font-medium text-sm transition-all flex items-center gap-2",
              isAnnual ? "bg-white text-brand-midnight shadow-sm" : "text-brand-midnight/60"
            )}
          >
            Annually
            <span className="bg-brand-turquoise/20 text-brand-midnight text-xs px-2 py-0.5 rounded-full">Save 33%</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {plans.map((plan) => {
          const price = isAnnual ? plan.annualPrice : plan.monthlyPrice;
          const isPopular = plan.popular;
          return (
            <div
              key={plan.id}
              className={cn(
                "rounded-3xl p-8 flex flex-col",
                isPopular
                  ? "bg-brand-midnight text-brand-cream border border-brand-turquoise/30 shadow-soft-diffusion md:-translate-y-4 relative"
                  : "bg-white border border-brand-midnight/5 shadow-sm"
              )}
            >
              {isPopular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-turquoise text-brand-midnight text-xs font-bold px-4 py-1 rounded-full">
                  MOST POPULAR
                </span>
              )}
              <h3 className={cn("font-display text-3xl mb-2", isPopular && "text-brand-turquoise")}>{plan.name}</h3>
              <p className={cn("text-sm mb-6", isPopular ? "text-brand-cream/60" : "text-brand-midnight/60")}>{plan.description}</p>
              <div className="mb-8">
                <span className="text-5xl font-bold">${price}</span>
                <span className={isPopular ? "text-brand-cream/60" : "text-brand-midnight/60"}>/mo</span>
              </div>
              <Link href={plan.ctaHref} className="mb-8">
                <Button className={cn("w-full h-12 rounded-xl", isPopular ? "bg-brand-turquoise text-brand-midnight" : "bg-brand-midnight text-brand-cream")}>
                  {plan.cta}
                </Button>
              </Link>
              <ul className="space-y-4 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm">
                    <Check className="text-brand-turquoise shrink-0" size={18} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}
