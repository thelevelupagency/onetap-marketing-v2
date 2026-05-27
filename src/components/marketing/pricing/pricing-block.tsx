"use client";

import { useState } from "react";
import { PricingBillingToggle } from "@/components/marketing/pricing/pricing-billing-toggle";
import { PricingPlanCards } from "@/components/marketing/pricing/pricing-plan-cards";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  TextLink,
} from "@/components/marketing/primitives";

interface PricingBlockProps {
  surface: "on-white" | "on-cream";
  showHeader?: boolean;
  showFullPricingLink?: boolean;
  wrapInSection?: boolean;
}

export function PricingBlock({
  surface,
  showHeader = false,
  showFullPricingLink = false,
  wrapInSection = false,
}: PricingBlockProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const content = (
    <MarketingContainer width={showHeader ? "full" : "wide"}>
      {showHeader ? (
        <>
          <SectionHeader
            title="Simple, honest pricing."
            lead="Start for free. Upgrade when you need more power."
          />
          <div className="mb-16 flex justify-center">
            <PricingBillingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
          </div>
        </>
      ) : (
        <PricingBillingToggle isAnnual={isAnnual} onChange={setIsAnnual} className="mb-16" />
      )}

      <PricingPlanCards isAnnual={isAnnual} surface={surface} />

      {showFullPricingLink ? (
        <p className="mt-10 text-center">
          <TextLink href="/pricing" showArrow={false}>
            View full pricing & comparison →
          </TextLink>
        </p>
      ) : null}
    </MarketingContainer>
  );

  if (wrapInSection) {
    return (
      <MarketingSection background="white" id="pricing">
        {content}
      </MarketingSection>
    );
  }

  return content;
}
