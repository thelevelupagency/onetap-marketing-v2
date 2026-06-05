import { SocialProof } from "@/components/marketing/sections/social-proof";
import { FaqSection } from "@/components/marketing/sections/faq-section";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { PricingBlock } from "@/components/marketing/pricing/pricing-block";
import { FreelancerHero } from "@/components/marketing/solutions/freelancer-hero";
import { FreelancerNicheSelector } from "@/components/marketing/solutions/freelancer-niche-selector";
import { FreelancerCardIncludes } from "@/components/marketing/solutions/freelancer-card-includes";
import { CardUxSection } from "@/components/marketing/sections/card-ux-section";
import { freelancersFaqs } from "@/content/faqs";
import {
  freelancersPricingHeader,
  freelancersSocialProofCopy,
} from "@/content/solutions";

export function FreelancersSolutionSections() {
  return (
    <>
      <FreelancerHero />
      <FreelancerNicheSelector background="white" />
      <FreelancerCardIncludes background="cream" />
      <CardUxSection />
      <SocialProof copy={freelancersSocialProofCopy} background="cream" />
      <PricingBlock
        surface="on-white"
        showHeader
        showFullPricingLink
        wrapInSection
        headerCopy={freelancersPricingHeader}
      />
      <FaqSection items={freelancersFaqs} background="cream" />
      <FinalCtaSection variant="freelancers" />
    </>
  );
}
