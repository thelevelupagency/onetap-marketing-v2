import { HeroSection } from "@/components/marketing/sections/hero-section";
import { HowItWorks } from "@/components/marketing/sections/how-it-works";
import { CardUxSection } from "@/components/marketing/sections/card-ux-section";
import { SolutionsGrid } from "@/components/marketing/sections/solutions-grid";
import { DashboardSection } from "@/components/marketing/sections/dashboard-section";
import { SocialProof } from "@/components/marketing/sections/social-proof";
import { PricingBlock } from "@/components/marketing/pricing/pricing-block";
import { FaqSection } from "@/components/marketing/sections/faq-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
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
    </main>
  );
}
