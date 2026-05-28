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
import { Reveal } from "@/components/marketing/motion";
import { homepagePricingHeader } from "@/content/homepage";
import type { PricingHeaderCopy } from "@/content/marketing-copy-types";

export type { PricingHeaderCopy } from "@/content/marketing-copy-types";

interface PricingBlockProps {
  surface: "on-white" | "on-cream";
  showHeader?: boolean;
  showFullPricingLink?: boolean;
  wrapInSection?: boolean;
  headerCopy?: PricingHeaderCopy;
}

export function PricingBlock({
  surface,
  showHeader = false,
  showFullPricingLink = false,
  wrapInSection = false,
  headerCopy = homepagePricingHeader,
}: PricingBlockProps) {
  const [isAnnual, setIsAnnual] = useState(true);

  const content = (
    <MarketingContainer width={showHeader ? "full" : "wide"}>
      {showHeader ? (
        <>
          <Reveal>
            <SectionHeader
              title={headerCopy.title}
              accent={headerCopy.accent}
              lead={headerCopy.lead}
            />
          </Reveal>
          <div className="mb-marketing-header-gap-md flex justify-center">
            <PricingBillingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
          </div>
        </>
      ) : (
        <div className="mb-marketing-header-gap-md flex justify-center">
          <PricingBillingToggle isAnnual={isAnnual} onChange={setIsAnnual} />
        </div>
      )}

      <PricingPlanCards
        isAnnual={isAnnual}
        surface={surface}
        withStagger={showHeader}
      />

      {showFullPricingLink ? (
        <p className="mt-marketing-header-gap-md text-center">
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
