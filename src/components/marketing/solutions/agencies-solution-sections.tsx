import { SocialProof } from "@/components/marketing/sections/social-proof";
import { FaqSection } from "@/components/marketing/sections/faq-section";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { PricingBlock } from "@/components/marketing/pricing/pricing-block";
import { AgencyHero } from "@/components/marketing/solutions/agency-hero";
import { AgencyWorkspaceSimulator } from "@/components/marketing/solutions/agency-workspace-simulator";
import { AgencyGovernanceSection } from "@/components/marketing/solutions/agency-governance-section";
import { AgencyEnterpriseGrid } from "@/components/marketing/solutions/agency-enterprise-grid";
import { agenciesFaqs } from "@/content/faqs";
import { agenciesPricingHeader, agenciesSocialProofCopy } from "@/content/solutions";

export function AgenciesSolutionSections() {
  return (
    <>
      <AgencyHero />
      <AgencyWorkspaceSimulator background="white" />
      <AgencyGovernanceSection background="cream" />
      <AgencyEnterpriseGrid background="white" />
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
