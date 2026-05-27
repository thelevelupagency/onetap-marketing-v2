import { Metadata } from "next";
import { FaqPageContent } from "@/components/marketing/faq-page-content";
import { PageShell, PageHero, MarketingContainer } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "FAQ | OneTap-Card",
  description: "Answers to common questions about OneTap digital business cards.",
};

export default function FaqPage() {
  return (
    <PageShell>
      <PageHero
        title="Got"
        accent="questions?"
        lead="Everything you need to know about OneTap digital business cards."
        className="mb-10"
      />
      <MarketingContainer width="wide">
        <FaqPageContent />
      </MarketingContainer>
    </PageShell>
  );
}
