import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import {
  getPostBySlug,
  getRelatedPosts,
  getAllSlugs,
  formatDate,
  formatReadingTime,
  getPostReadingMinutes,
  BLOG_READING_REGION_ID,
} from "@/lib/blog";
import { BlogPostBadges } from "@/components/marketing/blog/blog-post-badges";
import { BlogPostLayout } from "@/components/marketing/blog/blog-post-layout";
import { BlogShare } from "@/components/marketing/blog/blog-share";
import { BlogPostContent } from "@/components/marketing/blog/blog-post-content";
import { BlogImage } from "@/components/marketing/blog/blog-image";
import {
  BLOG_INLINE_IMAGE_SIZES,
  blogInlineImageFrameClass,
} from "@/components/marketing/blog/blog-image-classes";
import { BlogTocMobile } from "@/components/marketing/blog/blog-toc";
import { normalizeBlogImageSrc } from "@/lib/blog-images";
import { getSiteUrl } from "@/lib/site-url";
import { RelatedPosts } from "@/components/marketing/blog/related-posts";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
import { MarketingContainer, PageShell } from "@/components/marketing/primitives";
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
  const canonical = `${getSiteUrl()}/blog/${slug}`;
  const ogImage = normalizeBlogImageSrc(post.coverImage, 1200);
  return {
    title: `${post.title} | OneTap-Card`,
    description: post.excerpt,
    alternates: { canonical },
    openGraph: {
      type: "article",
      url: canonical,
      title: post.title,
      description: post.excerpt,
      publishedTime: `${post.date}T00:00:00.000Z`,
      authors: [post.author],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [ogImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug);

  return (
    <PageShell pageBottom="none">
      <MarketingContainer width="wide">
        <BlogPostLayout headings={post.headings}>
          <MarketingContainer width="narrow" className="w-full min-w-0 px-0 lg:mx-0">
            <div className="mb-marketing-stack-gap-sm flex flex-col gap-marketing-stack-gap-sm">
              <Link
                href="/blog"
                className={`${typography.label} flex w-fit items-center gap-2 text-brand-midnight/60 transition-colors hover:text-brand-midnight`}
              >
                <ArrowLeft className="h-4 w-4" /> Back to Blog
              </Link>
              <BlogPostBadges categories={post.categories} />
            </div>

            <div
              id={BLOG_READING_REGION_ID}
              className="flex flex-col gap-marketing-stack-gap"
            >
              <div className="flex flex-col gap-marketing-stack-gap-sm md:gap-marketing-prose-gap">
                <h1 className={`${typography.sectionTitle} text-pretty`}>
                  {post.title}
                </h1>
                <p className={typography.lead}>{post.excerpt}</p>
                <p className={typography.caption}>
                  {formatDate(post.date)} · {post.author} ·{" "}
                  {formatReadingTime(getPostReadingMinutes(post))}
                </p>
              </div>

              <BlogTocMobile />

              <BlogImage
                src={post.coverImage}
                alt={post.title}
                aspect="inline"
                priority
                sizes={BLOG_INLINE_IMAGE_SIZES}
                frameClassName={blogInlineImageFrameClass}
              />

              <BlogPostContent post={post} />
            </div>

            <div className="mt-marketing-prose-section-gap border-t border-brand-midnight/10 pt-marketing-prose-section-gap">
              <BlogShare title={post.title} slug={post.slug} label="Share this article" />
            </div>

            <RelatedPosts posts={related} />
          </MarketingContainer>
        </BlogPostLayout>
      </MarketingContainer>
      <FinalCtaSection variant="blog" />
    </PageShell>
  );
}
