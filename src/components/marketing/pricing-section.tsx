"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { plans } from "@/content/pricing";
import { Button } from "@/components/ui/button";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-brand-midnight mb-4">Simple, honest pricing.</h2>
          <p className="text-lg text-brand-midnight/70 mb-8">Start for free. Upgrade when you need more power.</p>
          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-sm font-medium", !isAnnual ? "text-brand-midnight" : "text-brand-midnight/50")}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 rounded-full bg-brand-midnight/10 p-1"
              aria-label="Toggle billing period"
            >
              <div className={cn("w-6 h-6 rounded-full bg-brand-midnight shadow-md transition-transform", isAnnual ? "translate-x-6" : "translate-x-0")} />
            </button>
            <span className={cn("text-sm font-medium", isAnnual ? "text-brand-midnight" : "text-brand-midnight/50")}>Annually</span>
            <span className="bg-brand-turquoise/20 text-brand-turquoise-dark text-xs font-bold px-2 py-1 rounded-full">2 Months Free</span>
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
                    ? "bg-brand-midnight text-brand-cream border-2 border-brand-turquoise shadow-2xl md:-translate-y-4 relative"
                    : "bg-brand-cream border border-brand-midnight/10 shadow-sm"
                )}
              >
                {isPopular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-turquoise text-brand-midnight text-xs font-bold px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                <h3 className={cn("font-display text-2xl mb-2", isPopular && "text-brand-turquoise")}>{plan.name}</h3>
                <p className={cn("text-sm mb-6", isPopular ? "text-brand-cream/60" : "text-brand-midnight/60")}>{plan.description}</p>
                <div className="mb-6">
                  <span className="text-5xl font-bold">${price}</span>
                  <span className={isPopular ? "text-brand-cream/50" : "text-brand-midnight/50"}>/month</span>
                  {isAnnual && plan.annualBilled && (
                    <p className={cn("text-sm mt-1", isPopular ? "text-brand-turquoise" : "text-brand-midnight/50")}>{plan.annualBilled}</p>
                  )}
                </div>
                <Link href={plan.ctaHref} className="mb-8">
                  <Button
                    className={cn(
                      "w-full rounded-xl h-12",
                      isPopular
                        ? "bg-brand-turquoise text-brand-midnight hover:bg-white"
                        : "bg-brand-midnight/5 text-brand-midnight hover:bg-brand-midnight/10 border border-brand-midnight/10"
                    )}
                  >
                    {plan.cta}
                  </Button>
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

        <p className="text-center mt-10">
          <Link href="/pricing" className="text-brand-turquoise-dark font-medium hover:underline">
            View full pricing & comparison →
          </Link>
        </p>
      </div>
    </section>
  );
}
