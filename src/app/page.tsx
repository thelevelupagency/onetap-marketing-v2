import { Hero } from "@/components/hero";
import { VillainVsHero } from "@/components/villain-vs-hero";
import { BentoGrid } from "@/components/bento-grid";
import { HomePricingTeaser } from "@/components/home-pricing-teaser";
import { HomeFaqTeaser } from "@/components/home-faq-teaser";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <VillainVsHero />
      <BentoGrid />
      <HomePricingTeaser />
      <HomeFaqTeaser />
    </main>
  );
}
