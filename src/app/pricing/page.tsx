import { Metadata } from "next";
import { PricingBlock } from "@/components/marketing/pricing/pricing-block";
import { PricingComparison } from "@/components/marketing/pricing/pricing-comparison";
import { PricingFaq } from "@/components/marketing/pricing/pricing-faq";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { PageShell, PageHero } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "Pricing | OneTap-Card",
  description: "Simple and transparent pricing for individuals and teams.",
};

export default function PricingPage() {
  return (
    <PageShell>
      <PageHero
        title="Simple &"
        accent="transparent."
        lead="Whether you're a solo freelancer or an enterprise team, we have a plan that scales with you."
      />
      <PricingBlock surface="on-cream" />
      <PricingComparison />
      <PricingFaq />
      <FinalCtaSection variant="pricing" />
    </PageShell>
  );
}
