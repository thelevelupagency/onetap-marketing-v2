import type { Metadata } from "next";
import { PageShell, PageHero, MarketingContainer } from "@/components/marketing/primitives";
// import { YourSection } from "@/components/marketing/sections/your-section";

export const metadata: Metadata = {
  title: "Page Title | OneTap-Card",
  description: "One sentence value proposition for search and social.",
  openGraph: {
    title: "Page Title | OneTap-Card",
    description: "One sentence value proposition for search and social.",
  },
};

export default function ExampleMarketingPage() {
  return (
    <PageShell>
      <PageHero
        title="Primary"
        accent="headline"
        lead="Supporting sentence for the page."
      />
      <MarketingContainer width="wide">
        {/* <YourSection /> */}
      </MarketingContainer>
    </PageShell>
  );
}
