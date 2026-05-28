import { PainPointsSection } from "@/components/marketing/sections/pain-points-section";
import { SocialProof } from "@/components/marketing/sections/social-proof";
import { FaqSection } from "@/components/marketing/sections/faq-section";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { PricingBlock } from "@/components/marketing/pricing/pricing-block";
import { FreelancerHero } from "@/components/marketing/solutions/freelancer-hero";
import { FreelancerFeatures } from "@/components/marketing/solutions/freelancer-features";
import { FreelancerProductSplit } from "@/components/marketing/solutions/freelancer-product-split";
import { FreelancerCreators } from "@/components/marketing/solutions/freelancer-creators";
import { SolutionHowItWorks } from "@/components/marketing/solutions/solution-how-it-works";
import { freelancersFaqs } from "@/content/faqs";
import {
  freelancersHowItWorksCopy,
  freelancersPainPointsCopy,
  freelancersPricingHeader,
  freelancersSocialProofCopy,
} from "@/content/solutions";

export function FreelancersSolutionSections() {
  return (
    <>
      <FreelancerHero />
      <PainPointsSection copy={freelancersPainPointsCopy} background="white" />
      <SolutionHowItWorks
        background="cream"
        title={freelancersHowItWorksCopy.title}
        accent={freelancersHowItWorksCopy.accent}
        description={freelancersHowItWorksCopy.description}
        steps={freelancersHowItWorksCopy.steps}
      />
      <FreelancerFeatures background="white" />
      <FreelancerProductSplit background="cream" />
      <FreelancerCreators background="white" />
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
