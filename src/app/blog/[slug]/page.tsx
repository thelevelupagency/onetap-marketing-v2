import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getPostBySlug, getRelatedPosts, getAllSlugs, formatDate } from "@/lib/blog";
import { categoryLabels } from "@/content/blog/posts";
import { BlogReadingProgress } from "@/components/marketing/blog/blog-reading-progress";
import { BlogToc } from "@/components/marketing/blog/blog-toc";
import { BlogShare } from "@/components/marketing/blog/blog-share";
import { BlogPostContent } from "@/components/marketing/blog/blog-post-content";
import { RelatedPosts } from "@/components/marketing/blog/related-posts";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import {
  MarketingBadge,
  MarketingContainer,
  PageShell,
} from "@/components/marketing/primitives";
import { type as typography } from "@/lib/typography";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | OneTap Blog`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: [post.coverImage] },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  return (
    <>
      <BlogReadingProgress />
      <PageShell pageBottom="none">
        <MarketingContainer width="wide">
          <div className="grid gap-12 xl:grid-cols-[minmax(0,48rem)_220px]">
            <MarketingContainer width="narrow" className="mx-0 w-full max-w-3xl px-0">
              <div className="mb-marketing-stack-gap-sm flex flex-col gap-marketing-stack-gap-sm">
                <Link
                  href="/blog"
                  className={`${typography.label} flex w-fit items-center gap-2 text-brand-midnight/60 transition-colors hover:text-brand-midnight`}
                >
                  <ArrowLeft className="h-4 w-4" /> Back to Blog
                </Link>
                <MarketingBadge className="w-fit">
                  {categoryLabels[post.category]}
                </MarketingBadge>
              </div>
              <div className="mb-marketing-stack-gap flex flex-col gap-marketing-stack-gap-sm">
                <h1 className={typography.sectionTitle}>{post.title}</h1>
                <p className={typography.lead}>{post.excerpt}</p>
                <p className={typography.caption}>
                  {formatDate(post.date)} · {post.author}
                </p>
              </div>

              <div className="relative mb-marketing-stack-gap aspect-[21/9] overflow-hidden rounded-3xl border border-brand-midnight/5">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>

              <BlogPostContent post={post} />

              <div className="mt-marketing-stack-gap border-t border-brand-midnight/10 py-5">
                <BlogShare title={post.title} slug={post.slug} label="Share this article" />
              </div>

              <RelatedPosts posts={related} />
            </MarketingContainer>

            <BlogToc headings={post.headings} />
          </div>
        </MarketingContainer>
        <FinalCtaSection variant="blog" />
      </PageShell>
    </>
  );
}
