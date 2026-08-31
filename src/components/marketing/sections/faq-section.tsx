"use client";

import { getFaqs, getChrome } from "@/content/get-content";
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
  title,
  accent,
  background = "cream",
}: FaqSectionProps) {
  const chrome = getChrome(locale);
  const resolvedItems = items ?? getFaqs(locale).homeFaqs;
  const resolvedTitle = title ?? chrome.faqSection.title;
  const resolvedAccent = accent ?? chrome.faqSection.accent;

  return (
    <MarketingSection background={background} id="faq">
      <MarketingContainer width="narrow">
        <Reveal>
          <SectionHeader title={resolvedTitle} accent={resolvedAccent} />
        </Reveal>
        <Reveal>
          <FaqAccordion items={resolvedItems} />
        </Reveal>
        <div className="mt-marketing-header-gap-md text-center">
          <TextLink href={localizePath("/faq", locale)}>{chrome.faqSection.viewAll}</TextLink>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
