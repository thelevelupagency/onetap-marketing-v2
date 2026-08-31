import { SocialProof } from "@/components/marketing/sections/social-proof";
import { FaqSection } from "@/components/marketing/sections/faq-section";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { PricingBlock } from "@/components/marketing/pricing/pricing-block";
import { AgencyHero } from "@/components/marketing/solutions/agency-hero";
import { AgencyWorkspaceSimulator } from "@/components/marketing/solutions/agency-workspace-simulator";
import { AgencyGovernanceSection } from "@/components/marketing/solutions/agency-governance-section";
import { AgencyEnterpriseGrid } from "@/components/marketing/solutions/agency-enterprise-grid";
import { getFaqs, getSolutions } from "@/content/get-content";
import type { Locale } from "@/lib/i18n/config";

export function AgenciesSolutionSections({ locale }: { locale: Locale }) {
  const solutions = getSolutions(locale);
  const faqs = getFaqs(locale);
  return (
    <>
      <AgencyHero locale={locale} />
      <AgencyWorkspaceSimulator locale={locale} background="white" />
      <AgencyGovernanceSection locale={locale} background="cream" />
      <AgencyEnterpriseGrid locale={locale} background="white" />
      <SocialProof locale={locale} copy={solutions.agenciesSocialProofCopy} background="cream" />
      <PricingBlock
        locale={locale}
        surface="on-white"
        showHeader
        showFullPricingLink
        wrapInSection
        headerCopy={solutions.agenciesPricingHeader}
      />
      <FaqSection locale={locale} items={faqs.agenciesFaqs} background="cream" />
      <FinalCtaSection locale={locale} variant="agencies" />
    </>
  );
}
