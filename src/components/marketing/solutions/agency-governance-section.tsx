"use client";

import { MarketingLaptopPreview } from "@/components/marketing/phones/marketing-laptop-preview";
import { MarketingPhonePreview } from "@/components/marketing/phones/marketing-phone-preview";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  MarketingBadge,
  FeatureSpotlight,
  splitCopyColumnClass,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";
import { agenciesGovernanceCopy } from "@/content/solutions";
import {
  AGENCIES_BRAND_LOCK_IMAGE_URL,
  AGENCIES_BRAND_LOCK_IMAGE_ALT,
  AGENCIES_LEADS_CENTER_IMAGE_URL,
  AGENCIES_LEADS_CENTER_IMAGE_ALT,
} from "@/lib/marketing-images";
import { solutionFeatureIcons } from "@/lib/marketing-icons";
import { MACBOOK_GOVERNANCE_SCALE_LG } from "@/lib/laptop-mockup";
import { PHONE_GOVERNANCE_SCALE } from "@/lib/phone-mockup";
import { type as typography } from "@/lib/typography";
import { cn } from "@/lib/utils";

interface AgencyGovernanceSectionProps {
  background?: MarketingBandBackground;
}

export function AgencyGovernanceSection({
  background = "cream",
}: AgencyGovernanceSectionProps) {
  const copy = agenciesGovernanceCopy;
  const { brandLock, leads } = copy;

  const brandLockSpotlightItems = brandLock.capabilities.map((capability) => ({
    icon: solutionFeatureIcons[capability.icon],
    title: capability.title,
    description: capability.description,
  }));

  const leadsSpotlightItems = leads.capabilities.map((capability) => ({
    icon: solutionFeatureIcons[capability.icon],
    title: capability.title,
    description: capability.description,
  }));

  return (
    <MarketingSection
      background={background}
      spacing="compact"
      id="governance"
      className="overflow-x-clip"
    >
      <MarketingContainer width="wide" className="min-w-0">
        <Reveal>
          <SectionHeader title={copy.title} accent={copy.accent} lead={copy.lead} />
        </Reveal>

        <div className="flex flex-col">
          <div className="grid min-w-0 items-center gap-marketing-grid-gap-md lg:grid-cols-2">
            <Reveal
              direction="left"
              className={cn(splitCopyColumnClass, "min-w-0 w-full")}
            >
              <MarketingBadge tone="light" className={cn(typography.eyebrow, "mb-3")}>
                {brandLock.badge}
              </MarketingBadge>
              <SectionHeader
                align="left"
                size="subsection"
                title={brandLock.title}
                accent={brandLock.accent}
                lead={brandLock.lead}
                spacingBelow="none"
                className="max-w-none"
              />
              <FeatureSpotlight
                items={brandLockSpotlightItems}
                visibleCount={3}
                cardVariant="compactOnLight"
                className="mt-6 w-full min-w-0"
              />
            </Reveal>
            <Reveal
              direction="right"
              className="flex w-full min-w-0 items-center justify-center leading-none"
            >
              <MarketingPhonePreview
                scale={PHONE_GOVERNANCE_SCALE}
                imageSrc={AGENCIES_BRAND_LOCK_IMAGE_URL}
                alt={AGENCIES_BRAND_LOCK_IMAGE_ALT}
              />
            </Reveal>
          </div>

          <div className="grid min-w-0 items-center gap-marketing-grid-gap-md pt-marketing-header-gap-md lg:grid-cols-2">
            <Reveal
              direction="left"
              className="order-2 flex w-full min-w-0 items-center justify-center overflow-hidden leading-none lg:order-1"
            >
              <MarketingLaptopPreview
                maxScale={MACBOOK_GOVERNANCE_SCALE_LG}
                imageSrc={AGENCIES_LEADS_CENTER_IMAGE_URL}
                alt={AGENCIES_LEADS_CENTER_IMAGE_ALT}
                className="mx-auto w-full max-w-full min-w-0"
              />
            </Reveal>
            <Reveal
              direction="right"
              className={cn(splitCopyColumnClass, "order-1 min-w-0 w-full lg:order-2")}
            >
              <MarketingBadge tone="light" className={cn(typography.eyebrow, "mb-3")}>
                {leads.badge}
              </MarketingBadge>
              <SectionHeader
                align="left"
                size="subsection"
                title={leads.title}
                accent={leads.accent}
                lead={leads.lead}
                spacingBelow="none"
                className="max-w-none"
              />
              <FeatureSpotlight
                items={leadsSpotlightItems}
                visibleCount={3}
                cardVariant="compactOnLight"
                className="mt-6 w-full min-w-0"
              />
            </Reveal>
          </div>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
