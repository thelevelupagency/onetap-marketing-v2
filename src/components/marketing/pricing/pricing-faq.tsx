import { pricingFaqs } from "@/content/pricing";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  FaqAccordion,
} from "@/components/marketing/primitives";

export function PricingFaq() {
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
