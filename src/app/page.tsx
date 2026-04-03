import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { VillainVsHero } from "@/components/villain-vs-hero";
import { PersonaSwitcher } from "@/components/persona-switcher";
import { BentoGrid } from "@/components/bento-grid";
import { B2BShowcase } from "@/components/b2b-showcase";
import { Pricing } from "@/components/pricing";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <VillainVsHero />
        <PersonaSwitcher />
        <BentoGrid />
        <B2BShowcase />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
