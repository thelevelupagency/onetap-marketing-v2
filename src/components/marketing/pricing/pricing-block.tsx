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
import { getHomepage } from "@/content/get-content";
import type { PricingHeaderCopy } from "@/content/marketing-copy-types";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";

export type { PricingHeaderCopy } from "@/content/marketing-copy-types";

interface PricingBlockProps {
  locale: Locale;
  surface: "on-white" | "on-cream";
  showHeader?: boolean;
  showFullPricingLink?: boolean;
  wrapInSection?: boolean;
  headerCopy?: PricingHeaderCopy;
}

export function PricingBlock({
  locale,
  surface,
  showHeader = false,
  showFullPricingLink = false,
  wrapInSection = false,
  headerCopy,
}: PricingBlockProps) {
  const [isAnnual, setIsAnnual] = useState(true);
  const resolvedHeaderCopy = headerCopy ?? getHomepage(locale).homepagePricingHeader;

  const content = (
    <MarketingContainer width={showHeader ? "full" : "wide"}>
      {showHeader ? (
        <>
          <Reveal>
            <SectionHeader
              title={resolvedHeaderCopy.title}
              accent={resolvedHeaderCopy.accent}
              lead={resolvedHeaderCopy.lead}
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
        locale={locale}
      />

      {showFullPricingLink ? (
        <p className="mt-marketing-header-gap-md text-center">
          <TextLink href={localizePath("/pricing", locale)} showArrow={false}>
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
