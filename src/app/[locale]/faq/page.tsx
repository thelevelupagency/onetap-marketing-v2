import type { Metadata } from "next";
import { FaqPageContent } from "@/components/marketing/faq-page-content";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { PageShell, PageHero, MarketingContainer } from "@/components/marketing/primitives";
import { getChrome, getFaqs } from "@/content/get-content";
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
    title: chrome.metadata.faqTitle,
    description: chrome.metadata.faqDescription,
    path: "/faq",
  });
}

function FaqJsonLd({ entries }: { entries: { q: string; a: string }[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((faq) => ({
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

export default async function FaqPage({ params }: PageProps) {
  const locale = await resolveLocaleParam(params);
  const chrome = getChrome(locale);
  const { faqPageEntries } = getFaqs(locale);

  return (
    <PageShell pageBottom="none">
      <FaqJsonLd entries={faqPageEntries} />
      <PageHero
        title={chrome.metadata.faqHeroTitle}
        accent={chrome.metadata.faqHeroAccent}
        lead={chrome.metadata.faqHeroLead}
      />
      <MarketingContainer width="wide">
        <FaqPageContent locale={locale} />
      </MarketingContainer>
      <FinalCtaSection locale={locale} variant="faq" />
    </PageShell>
  );
}
