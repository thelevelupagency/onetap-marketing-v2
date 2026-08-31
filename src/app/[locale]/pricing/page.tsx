import type { Metadata } from "next";
import { PricingBlock } from "@/components/marketing/pricing/pricing-block";
import { PricingComparison } from "@/components/marketing/pricing/pricing-comparison";
import { PricingFaq } from "@/components/marketing/pricing/pricing-faq";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { PageShell, PageHero, MarketingSection } from "@/components/marketing/primitives";
import { getChrome } from "@/content/get-content";
import { buildLocaleMetadata } from "@/lib/i18n/metadata";
import { resolveLocaleParam } from "@/lib/i18n/locale-params";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  const chrome = getChrome(locale);
  return buildLocaleMetadata({
    locale,
    title: chrome.metadata.pricingTitle,
    description: chrome.metadata.pricingDescription,
    path: "/pricing",
  });
}

export default async function PricingPage({ params }: PageProps) {
  const locale = await resolveLocaleParam(params);
  const chrome = getChrome(locale);

  return (
    <PageShell pageBottom="none">
      <MarketingSection
        background="transparent"
        spacing="none"
        id="pricing"
        className="pb-marketing-section-y-compact"
      >
        <PageHero
          title={chrome.metadata.pricingHeroTitle}
          accent={chrome.metadata.pricingHeroAccent}
          lead={chrome.metadata.pricingHeroLead}
          className="mb-marketing-header-gap-md"
        />
        <PricingBlock locale={locale} surface="on-cream" />
      </MarketingSection>
      <PricingComparison locale={locale} />
      <PricingFaq locale={locale} />
      <FinalCtaSection locale={locale} variant="pricing" />
    </PageShell>
  );
}
