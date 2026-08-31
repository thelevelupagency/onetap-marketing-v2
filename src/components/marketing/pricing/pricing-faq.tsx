import { getPricing } from "@/content/get-content";
import type { Locale } from "@/lib/i18n/config";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  FaqAccordion,
} from "@/components/marketing/primitives";

export function PricingFaq({ locale }: { locale: Locale }) {
  const { pricingFaqs } = getPricing(locale);
  return (
    <MarketingSection background="cream" spacing="compact" id="billing-faq">
      <MarketingContainer width="narrow">
        <SectionHeader title="Billing" accent="FAQ" />
        <FaqAccordion
          items={pricingFaqs}
          getValue={(_faq, i) => `pricing-faq-${i}`}
        />
      </MarketingContainer>
    </MarketingSection>
  );
}
