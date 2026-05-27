"use client";

import { CardUxPhonePreview } from "@/components/marketing/phones/card-ux-phone-preview";
import {
  SplitContentSection,
  SectionHeader,
  FeatureCard,
} from "@/components/marketing/primitives";
import { CardReveal, MarketingStaggerGrid, Reveal } from "@/components/marketing/motion";
import { cardUxCopy } from "@/content/homepage";
import { cardUxIcons } from "@/lib/marketing-icons";

export function CardUxSection() {
  return (
    <SplitContentSection id="features" background="white" width="full">
      <div>
        <Reveal direction="left">
          <SectionHeader
            align="left"
            spacingBelow="none"
            title={cardUxCopy.title}
            accent={cardUxCopy.accent}
            lead={cardUxCopy.lead}
            className="mb-marketing-header-gap-md"
          />
        </Reveal>
        <MarketingStaggerGrid columns={2} gap="tight">
          {cardUxCopy.features.map((f, index) => {
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
