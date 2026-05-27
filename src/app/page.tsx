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
import { heroCopy } from "@/content/homepage";

export const metadata: Metadata = {
  title: "OneTap-Card | Your professional identity, one tap away",
  description: heroCopy.subheadline,
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PainPointsSection />
      <HowItWorks />
      <CardUxSection />
      <SolutionsGrid />
      <DashboardSection />
      <SocialProof />
      <PricingBlock
        surface="on-white"
        showHeader
        showFullPricingLink
        wrapInSection
      />
      <FaqSection />
      <FinalCtaSection />
    </main>
  );
}
