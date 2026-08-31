import type { Metadata } from "next";
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
import { getChrome } from "@/content/get-content";
import { LOCALES, localizePath, getLocaleAlternates, LOCALE_META } from "@/lib/i18n/config";
import { resolveLocaleParam, generateLocaleStaticParams } from "@/lib/i18n/locale-params";
import { type as typography } from "@/lib/typography";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const locales = generateLocaleStaticParams();
  const slugs = getAllSlugs("en");
  return locales.flatMap(({ locale }) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  const { slug } = await params;
  const chrome = getChrome(locale);
  const post = getPostBySlug(slug, locale);
  if (!post) return { title: chrome.metadata.postNotFound };
  const siteUrl = getSiteUrl();
  const path = localizePath(`/blog/${slug}`, locale);
  const canonical = `${siteUrl}${path}`;
  const ogImage = normalizeBlogImageSrc(post.coverImage, 1200);
  return {
    title: `${post.title} | OneTap-Card`,
    description: post.excerpt,
    alternates: {
      canonical,
      languages: getLocaleAlternates(`/blog/${slug}`, siteUrl),
    },
    openGraph: {
      type: "article",
      url: canonical,
      locale: LOCALE_META[locale].ogLocale,
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
  const locale = await resolveLocaleParam(params);
  const { slug } = await params;
  const chrome = getChrome(locale);
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const related = getRelatedPosts(slug, 3, locale);

  return (
    <PageShell pageBottom="none">
      <MarketingContainer width="wide">
        <BlogPostLayout headings={post.headings}>
          <MarketingContainer width="narrow" className="w-full min-w-0 px-0 lg:mx-0">
            <div className="mb-marketing-stack-gap-sm flex flex-col gap-marketing-stack-gap-sm">
              <Link
                href={localizePath("/blog", locale)}
                className={`${typography.label} flex w-fit items-center gap-2 text-brand-midnight/60 transition-colors hover:text-brand-midnight`}
              >
                <ArrowLeft className="h-4 w-4 rtl:rotate-180" /> {chrome.blog.backToBlog}
              </Link>
              <BlogPostBadges categories={post.categories} locale={locale} />
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
                  {formatDate(post.date, locale)} · {post.author} ·{" "}
                  {formatReadingTime(getPostReadingMinutes(post), locale)}
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

              <BlogPostContent post={post} locale={locale} />
            </div>

            <div className="mt-marketing-prose-section-gap border-t border-brand-midnight/10 pt-marketing-prose-section-gap">
              <BlogShare
                title={post.title}
                slug={post.slug}
                label={chrome.blog.shareLabel}
                locale={locale}
              />
            </div>

            <RelatedPosts posts={related} locale={locale} />
          </MarketingContainer>
        </BlogPostLayout>
      </MarketingContainer>
      <FinalCtaSection locale={locale} variant="blog" />
    </PageShell>
  );
}

// Keep LOCALES referenced for static analysis of generateStaticParams coverage
void LOCALES;
