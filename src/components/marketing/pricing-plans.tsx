"use client";

import { useState } from "react";
import { PricingBillingToggle } from "@/components/marketing/pricing-billing-toggle";
import { PricingPlanCards } from "@/components/marketing/pricing-plan-cards";

export function PricingPlans() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <div className="container mx-auto px-4 md:px-8">
      <PricingBillingToggle isAnnual={isAnnual} onChange={setIsAnnual} className="mb-16" />
      <PricingPlanCards isAnnual={isAnnual} surface="on-cream" />
    </div>
  );
}
