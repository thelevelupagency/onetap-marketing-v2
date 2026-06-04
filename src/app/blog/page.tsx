import { Metadata } from "next";
import { BlogList } from "@/components/marketing/blog/blog-list";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { PageShell, PageHero, MarketingContainer } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "Blog | OneTap-Card",
  description:
    "Networking tips, success stories, and product updates from the OneTap team.",
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;

  return (
    <PageShell pageBottom="none">
      <PageHero
        title="The OneTap"
        accent="Blog"
        lead="Best practices, success stories, how-tos, and news for modern professionals."
      />
      <MarketingContainer width="wide">
        <BlogList initialCategory={params.category} initialPage={params.page} />
      </MarketingContainer>
      <FinalCtaSection variant="blog" />
    </PageShell>
  );
}
