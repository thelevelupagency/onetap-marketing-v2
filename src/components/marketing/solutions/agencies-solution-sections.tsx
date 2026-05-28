import { PainPointsSection } from "@/components/marketing/sections/pain-points-section";
import { DashboardSection } from "@/components/marketing/sections/dashboard-section";
import { SocialProof } from "@/components/marketing/sections/social-proof";
import { FaqSection } from "@/components/marketing/sections/faq-section";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { PricingBlock } from "@/components/marketing/pricing/pricing-block";
import { AgencyHero } from "@/components/marketing/solutions/agency-hero";
import { AgencyFeatures } from "@/components/marketing/solutions/agency-features";
import { AgencyTeamSplit } from "@/components/marketing/solutions/agency-team-split";
import { SolutionHowItWorks } from "@/components/marketing/solutions/solution-how-it-works";
import { agenciesFaqs } from "@/content/faqs";
import {
  agenciesHowItWorksCopy,
  agenciesPainPointsCopy,
  agenciesPricingHeader,
  agenciesSocialProofCopy,
} from "@/content/solutions";

export function AgenciesSolutionSections() {
  return (
    <>
      <AgencyHero />
      <PainPointsSection copy={agenciesPainPointsCopy} background="white" />
      <DashboardSection variant="light" />
      <AgencyFeatures background="white" />
      <AgencyTeamSplit background="cream" />
      <SolutionHowItWorks
        background="white"
        title={agenciesHowItWorksCopy.title}
        accent={agenciesHowItWorksCopy.accent}
        description={agenciesHowItWorksCopy.description}
        steps={agenciesHowItWorksCopy.steps}
      />
      <SocialProof copy={agenciesSocialProofCopy} background="cream" />
      <PricingBlock
        surface="on-white"
        showHeader
        showFullPricingLink
        wrapInSection
        headerCopy={agenciesPricingHeader}
      />
      <FaqSection items={agenciesFaqs} background="cream" />
      <FinalCtaSection variant="agencies" />
    </>
  );
}
