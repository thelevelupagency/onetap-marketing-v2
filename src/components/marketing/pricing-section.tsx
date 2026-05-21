"use client";

import { useState } from "react";
import Link from "next/link";
import { PricingBillingToggle } from "@/components/marketing/pricing-billing-toggle";
import { PricingPlanCards } from "@/components/marketing/pricing-plan-cards";

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-24 bg-white" id="pricing">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-brand-midnight mb-4">
            Simple, honest pricing.
          </h2>
          <p className="text-lg text-brand-midnight/70 mb-8">
            Start for free. Upgrade when you need more power.
          </p>
          <PricingBillingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
        </div>

        <PricingPlanCards isAnnual={isAnnual} surface="on-white" />

        <p className="text-center mt-10">
          <Link href="/pricing" className="text-brand-turquoise-dark font-medium hover:underline">
            View full pricing & comparison →
          </Link>
        </p>
      </div>
    </section>
  );
}
