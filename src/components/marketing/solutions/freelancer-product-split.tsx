"use client";

import { CardUxPhonePreview } from "@/components/marketing/phones/card-ux-phone-preview";
import {
  SplitContentSection,
  splitCopyColumnClass,
  SectionHeader,
  FeatureCard,
} from "@/components/marketing/primitives";
import { CardReveal, MarketingStaggerGrid, Reveal } from "@/components/marketing/motion";
import type { MarketingBandBackground } from "@/content/marketing-copy-types";
import { freelancersProductSplitCopy } from "@/content/solutions";
import { cardUxIcons } from "@/lib/marketing-icons";

interface FreelancerProductSplitProps {
  background?: MarketingBandBackground;
}

export function FreelancerProductSplit({ background = "cream" }: FreelancerProductSplitProps) {
  return (
    <SplitContentSection background={background} width="full">
      <div className={splitCopyColumnClass}>
        <Reveal direction="left" className="w-full">
          <SectionHeader
            align="left"
            spacingBelow="none"
            title={freelancersProductSplitCopy.title}
            accent={freelancersProductSplitCopy.accent}
            lead={freelancersProductSplitCopy.lead}
            className="mb-marketing-header-gap-md max-w-none"
          />
        </Reveal>
        <MarketingStaggerGrid columns={2} gap="tight">
          {freelancersProductSplitCopy.features.map((f, index) => {
            const Icon = cardUxIcons[f.icon];
            return (
              <CardReveal key={f.label} staggerIndex={index}>
                <FeatureCard
                  icon={Icon}
                  title={f.label}
                  description={f.description}
                  variant="compact"
                />
              </CardReveal>
            );
          })}
        </MarketingStaggerGrid>
      </div>

      <Reveal
        direction="right"
        className="flex min-w-0 justify-center overflow-visible leading-none lg:sticky lg:top-28 lg:self-start"
      >
        <CardUxPhonePreview />
      </Reveal>
    </SplitContentSection>
  );
}
