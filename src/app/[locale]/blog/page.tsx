import type { Metadata } from "next";
import { BlogList } from "@/components/marketing/blog/blog-list";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { PageShell, PageHero, MarketingContainer } from "@/components/marketing/primitives";
import { getChrome } from "@/content/get-content";
import { buildLocaleMetadata } from "@/lib/i18n/metadata";
import { resolveLocaleParam } from "@/lib/i18n/locale-params";

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ category?: string; page?: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  const chrome = getChrome(locale);
  return buildLocaleMetadata({
    locale,
    title: chrome.metadata.blogTitle,
    description: chrome.metadata.blogDescription,
    path: "/blog",
  });
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const locale = await resolveLocaleParam(params);
  const chrome = getChrome(locale);
  const query = await searchParams;

  return (
    <PageShell pageBottom="none">
      <PageHero
        title={chrome.metadata.blogHeroTitle}
        accent={chrome.metadata.blogHeroAccent}
        lead={chrome.metadata.blogHeroLead}
      />
      <MarketingContainer width="wide">
        <BlogList
          locale={locale}
          initialCategory={query.category}
          initialPage={query.page}
        />
      </MarketingContainer>
      <FinalCtaSection locale={locale} variant="blog" />
    </PageShell>
  );
}
