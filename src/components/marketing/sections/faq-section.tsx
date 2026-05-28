"use client";

import { homeFaqs } from "@/content/faqs";
import type { MarketingBandBackground, MarketingFaqItem } from "@/content/marketing-copy-types";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  FaqAccordion,
  TextLink,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";

interface FaqSectionProps {
  items?: readonly MarketingFaqItem[];
  title?: string;
  accent?: string;
  background?: MarketingBandBackground;
}

export function FaqSection({
  items = homeFaqs,
  title = "Frequently asked",
  accent = "questions",
  background = "cream",
}: FaqSectionProps) {
  return (
    <MarketingSection background={background} id="faq">
      <MarketingContainer width="narrow">
        <Reveal>
          <SectionHeader title={title} accent={accent} />
        </Reveal>
        <Reveal>
          <FaqAccordion items={items} />
        </Reveal>
        <div className="mt-marketing-header-gap-md text-center">
          <TextLink href="/faq">View all FAQs</TextLink>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
