import { Metadata } from "next";
import { Suspense } from "react";
import { BlogList } from "@/components/marketing/blog/blog-list";
import { PageShell, PageHero, MarketingContainer } from "@/components/marketing/primitives";

export const metadata: Metadata = {
  title: "Blog | OneTap-Card",
  description:
    "Networking tips, success stories, and product updates from the OneTap team.",
};

export default function BlogPage() {
  return (
    <PageShell>
      <PageHero
        title="The OneTap"
        accent="Blog"
        lead="Best practices, success stories, how-tos, and news for modern professionals."
      />
      <MarketingContainer width="wide">
        <Suspense
          fallback={<div className="text-center text-brand-midnight/50">Loading posts...</div>}
        >
          <BlogList />
        </Suspense>
      </MarketingContainer>
    </PageShell>
  );
}
