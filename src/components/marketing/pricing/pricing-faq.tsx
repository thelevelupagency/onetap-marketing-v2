import { getChrome, getPricing } from "@/content/get-content";
import type { Locale } from "@/lib/i18n/config";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  FaqAccordion,
} from "@/components/marketing/primitives";

export function PricingFaq({ locale }: { locale: Locale }) {
  const { pricingFaqs } = getPricing(locale);
  const chrome = getChrome(locale);
  return (
    <MarketingSection background="cream" spacing="compact" id="billing-faq">
      <MarketingContainer width="narrow">
        <SectionHeader title={chrome.pricingFaq.title} accent={chrome.pricingFaq.accent} />
        <FaqAccordion
          items={pricingFaqs}
          valuePrefix="pricing-faq"
        />
      </MarketingContainer>
    </MarketingSection>
  );
}
