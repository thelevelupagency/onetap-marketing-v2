import type { Metadata } from "next";
import { FaqPageContent } from "@/components/marketing/faq-page-content";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import {
  PageShell,
  PageHero,
  MarketingContainer,
  JsonLd,
} from "@/components/marketing/primitives";
import { getChrome, getFaqs } from "@/content/get-content";
import { buildLocaleMetadata } from "@/lib/i18n/metadata";
import { resolveLocaleParam } from "@/lib/i18n/locale-params";
import { buildFaqPageJsonLd } from "@/lib/seo/json-ld";

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

export default async function FaqPage({ params }: PageProps) {
  const locale = await resolveLocaleParam(params);
  const chrome = getChrome(locale);
  const { faqPageEntries } = getFaqs(locale);

  return (
    <PageShell pageBottom="none">
      <JsonLd data={buildFaqPageJsonLd(faqPageEntries)} />
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
