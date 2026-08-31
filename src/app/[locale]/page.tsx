import type { Metadata } from "next";
import { HeroSection } from "@/components/marketing/sections/hero-section";
import { PainPointsSection } from "@/components/marketing/sections/pain-points-section";
import { HowItWorks } from "@/components/marketing/sections/how-it-works";
import { CardUxSection } from "@/components/marketing/sections/card-ux-section";
import { SolutionsGrid } from "@/components/marketing/sections/solutions-grid";
import { DashboardSection } from "@/components/marketing/sections/dashboard-section";
import { SocialProof } from "@/components/marketing/sections/social-proof";
import { PricingBlock } from "@/components/marketing/pricing/pricing-block";
import { FaqSection } from "@/components/marketing/sections/faq-section";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { getChrome, getHomepage } from "@/content/get-content";
import { buildLocaleMetadata } from "@/lib/i18n/metadata";
import { resolveLocaleParam } from "@/lib/i18n/locale-params";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  const chrome = getChrome(locale);
  const { heroCopy } = getHomepage(locale);
  return buildLocaleMetadata({
    locale,
    title: chrome.metadata.homeTitle,
    description: heroCopy.subheadline,
    path: "/",
  });
}

export default async function Home({ params }: PageProps) {
  const locale = await resolveLocaleParam(params);

  return (
    <main>
      <HeroSection locale={locale} />
      <PainPointsSection locale={locale} />
      <HowItWorks locale={locale} />
      <CardUxSection locale={locale} />
      <SolutionsGrid locale={locale} />
      <DashboardSection locale={locale} />
      <SocialProof locale={locale} />
      <PricingBlock
        locale={locale}
        surface="on-white"
        showHeader
        showFullPricingLink
        wrapInSection
      />
      <FaqSection locale={locale} />
      <FinalCtaSection locale={locale} />
    </main>
  );
}
