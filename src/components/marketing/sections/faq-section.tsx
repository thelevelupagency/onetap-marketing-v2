import { homeFaqs } from "@/content/faqs";
import {
  MarketingSection,
  MarketingContainer,
  SectionHeader,
  FaqAccordion,
  TextLink,
} from "@/components/marketing/primitives";

export function FaqSection() {
  return (
    <MarketingSection background="cream" id="faq">
      <MarketingContainer width="narrow">
        <SectionHeader title="Frequently asked" accent="questions" />
        <FaqAccordion items={homeFaqs} />
        <div className="mt-10 text-center">
          <TextLink href="/faq">View all FAQs</TextLink>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
