"use client";

import { CardUxPhonePreview } from "@/components/marketing/phones/card-ux-phone-preview";
import {
  MarketingContainer,
  MarketingSection,
  SectionHeader,
  FeatureSpotlight,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";
import { cardUxCopy } from "@/content/homepage";
import { cardUxIcons } from "@/lib/marketing-icons";

const cardUxSpotlightItems = cardUxCopy.features.map((f) => ({
  icon: cardUxIcons[f.icon],
  title: f.label,
  description: f.description,
}));

export function CardUxSection() {
  return (
    <MarketingSection id="features" background="white" className="overflow-visible">
      <MarketingContainer width="full">
        <Reveal>
          <SectionHeader
            title={cardUxCopy.title}
            accent={cardUxCopy.accent}
            lead={cardUxCopy.lead}
          />
        </Reveal>

        <div className="grid items-center gap-marketing-grid-gap-md lg:grid-cols-2">
          <Reveal
            direction="left"
            delay={0.08}
            className="order-1 w-full min-w-0 overflow-visible"
          >
            <FeatureSpotlight
              items={cardUxSpotlightItems}
              visibleCount={4}
              className="w-full"
            />
          </Reveal>

          <Reveal
            direction="right"
            className="order-2 flex w-full min-w-0 justify-center overflow-x-clip leading-none lg:justify-center lg:overflow-visible"
          >
            <CardUxPhonePreview className="max-w-full" />
          </Reveal>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
