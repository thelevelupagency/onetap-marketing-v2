"use client";

import { getFaqs } from "@/content/get-content";
import type { MarketingBandBackground, MarketingFaqItem } from "@/content/marketing-copy-types";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/config";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  FaqAccordion,
  TextLink,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";

interface FaqSectionProps {
  locale: Locale;
  items?: readonly MarketingFaqItem[];
  title?: string;
  accent?: string;
  background?: MarketingBandBackground;
}

export function FaqSection({
  locale,
  items,
  title = "Frequently asked",
  accent = "questions",
  background = "cream",
}: FaqSectionProps) {
  const resolvedItems = items ?? getFaqs(locale).homeFaqs;
  return (
    <MarketingSection background={background} id="faq">
      <MarketingContainer width="narrow">
        <Reveal>
          <SectionHeader title={title} accent={accent} />
        </Reveal>
        <Reveal>
          <FaqAccordion items={resolvedItems} />
        </Reveal>
        <div className="mt-marketing-header-gap-md text-center">
          <TextLink href={localizePath("/faq", locale)}>View all FAQs</TextLink>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
