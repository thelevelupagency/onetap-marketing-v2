import { Metadata } from "next";
import { PricingBlock } from "@/components/marketing/pricing/pricing-block";
import { PricingComparison } from "@/components/marketing/pricing/pricing-comparison";
import { PricingFaq } from "@/components/marketing/pricing/pricing-faq";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { PageShell, PageHero, MarketingSection } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "Pricing | OneTap-Card",
  description: "Simple and transparent pricing for individuals and teams.",
};

export default function PricingPage() {
  return (
    <PageShell pageBottom="none">
      <MarketingSection
        background="transparent"
        spacing="none"
        id="pricing"
        className="pb-marketing-section-y-compact"
      >
        <PageHero
          title="Simple &"
          accent="transparent."
          lead="Whether you're a solo freelancer or an enterprise team, we have a plan that scales with you."
          className="mb-marketing-header-gap-md"
        />
        <PricingBlock surface="on-cream" />
      </MarketingSection>
      <PricingComparison />
      <PricingFaq />
      <FinalCtaSection variant="pricing" />
    </PageShell>
  );
}
