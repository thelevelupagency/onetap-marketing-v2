"use client";

import { CardUxPhonePreview } from "@/components/marketing/phones/card-ux-phone-preview";
import {
  MarketingContainer,
  MarketingSection,
  SectionHeader,
  FeatureSpotlight,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";
import { getHomepage } from "@/content/get-content";
import type { Locale } from "@/lib/i18n/config";
import { isRtlLocale } from "@/lib/i18n/config";
import { cardUxIcons } from "@/lib/marketing-icons";
import { cn } from "@/lib/utils";

interface CardUxSectionProps {
  locale: Locale;
}

export function CardUxSection({ locale }: CardUxSectionProps) {
  const { cardUxCopy } = getHomepage(locale);
  const isRtl = isRtlLocale(locale);

  const cardUxSpotlightItems = cardUxCopy.features.map((f) => ({
    icon: cardUxIcons[f.icon],
    title: f.label,
    description: f.description,
  }));

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

        <div
          className={cn(
            "grid items-center gap-marketing-grid-gap-md lg:grid-cols-2",
            isRtl && "lg:[direction:ltr]"
          )}
        >
          <Reveal
            direction="left"
            delay={0.08}
            className={cn(
              "order-1 w-full min-w-0 overflow-visible lg:order-1",
              isRtl && "lg:[direction:rtl]"
            )}
          >
            <FeatureSpotlight
              items={cardUxSpotlightItems}
              visibleCount={4}
              className="w-full"
            />
          </Reveal>

          <Reveal
            direction="right"
            className="order-2 flex w-full min-w-0 justify-center overflow-visible leading-none lg:order-2 lg:justify-center"
          >
            <div dir="ltr" className="flex w-full justify-center">
              <CardUxPhonePreview className="max-w-full" />
            </div>
          </Reveal>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
