import { SocialProof } from "@/components/marketing/sections/social-proof";
import { FaqSection } from "@/components/marketing/sections/faq-section";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { PricingBlock } from "@/components/marketing/pricing/pricing-block";
import { FreelancerHero } from "@/components/marketing/solutions/freelancer-hero";
import { FreelancerNicheSelector } from "@/components/marketing/solutions/freelancer-niche-selector";
import { FreelancerCardIncludes } from "@/components/marketing/solutions/freelancer-card-includes";
import { CardUxSection } from "@/components/marketing/sections/card-ux-section";
import { getFaqs, getSolutions } from "@/content/get-content";
import type { Locale } from "@/lib/i18n/config";

export function FreelancersSolutionSections({ locale }: { locale: Locale }) {
  const solutions = getSolutions(locale);
  const faqs = getFaqs(locale);
  return (
    <>
      <FreelancerHero locale={locale} />
      <FreelancerNicheSelector locale={locale} background="white" />
      <FreelancerCardIncludes locale={locale} background="cream" />
      <CardUxSection locale={locale} />
      <SocialProof locale={locale} copy={solutions.freelancersSocialProofCopy} background="cream" />
      <PricingBlock
        locale={locale}
        surface="on-white"
        showHeader
        showFullPricingLink
        wrapInSection
        headerCopy={solutions.freelancersPricingHeader}
      />
      <FaqSection locale={locale} items={faqs.freelancersFaqs} background="cream" />
      <FinalCtaSection locale={locale} variant="freelancers" />
    </>
  );
}
