"use client";

import { homeFaqs } from "@/content/faqs";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  FaqAccordion,
  TextLink,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";

export function FaqSection() {
  return (
    <MarketingSection background="cream" id="faq">
      <MarketingContainer width="narrow">
        <Reveal>
          <SectionHeader title="Frequently asked" accent="questions" />
        </Reveal>
        <Reveal>
          <FaqAccordion items={homeFaqs} />
        </Reveal>
        <div className="mt-marketing-header-gap-md text-center">
          <TextLink href="/faq">View all FAQs</TextLink>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
