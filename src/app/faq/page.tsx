import { Metadata } from "next";
import { FaqPageContent } from "@/components/marketing/faq-page-content";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { PageShell, PageHero, MarketingContainer } from "@/components/marketing/primitives";
import { faqPageEntries } from "@/content/faqs";

const title = "FAQ | OneTap-Card";
const description =
  "Answers to common questions about OneTap digital business cards, features, and billing.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
  },
};

function FaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqPageEntries.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function FaqPage() {
  return (
    <PageShell pageBottom="none">
      <FaqJsonLd />
      <PageHero
        title="Got"
        accent="questions?"
        lead="Everything you need to know about OneTap digital business cards."
      />
      <MarketingContainer width="wide">
        <FaqPageContent />
      </MarketingContainer>
      <FinalCtaSection variant="faq" />
    </PageShell>
  );
}
