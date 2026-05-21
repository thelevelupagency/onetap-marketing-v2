import { HeroSection } from "@/components/marketing/hero-section";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { CardUxSection } from "@/components/marketing/card-ux-section";
import { SolutionsGrid } from "@/components/marketing/solutions-grid";
import { DashboardSection } from "@/components/marketing/dashboard-section";
import { SocialProof } from "@/components/marketing/social-proof";
import { PricingSection } from "@/components/marketing/pricing-section";
import { FaqSection } from "@/components/marketing/faq-section";

export default function Home() {
  return (
    <main>
      <HeroSection />
      <HowItWorks />
      <CardUxSection />
      <SolutionsGrid />
      <DashboardSection />
      <SocialProof />
      <PricingSection />
      <FaqSection />
    </main>
  );
}
