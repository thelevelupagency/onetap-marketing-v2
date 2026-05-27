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
import { MarketingBadge, MarketingContainer } from "@/components/marketing/primitives";
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
      <div className="flex flex-col w-full pt-28 pb-24 bg-brand-cream min-h-screen">
        <MarketingContainer width="wide">
          <Link href="/blog" className="inline-flex items-center gap-2 text-brand-midnight/60 hover:text-brand-midnight mb-8 text-sm transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>

          <div className="grid xl:grid-cols-[1fr_220px] gap-12">
            <div className="max-w-3xl">
              <MarketingBadge className="mb-4">{categoryLabels[post.category]}</MarketingBadge>
              <h1 className={`${typography.pageTitle} mb-4`}>{post.title}</h1>
              <p className="text-brand-midnight/50 text-sm mb-8">
                {formatDate(post.date)} · {post.author}
              </p>

              <div className="relative aspect-[21/9] rounded-3xl overflow-hidden mb-8 border border-brand-midnight/5">
                <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority sizes="(max-width: 768px) 100vw, 768px" />
              </div>

              <BlogPostContent post={post} />

              <div className="mt-10 py-5 border-t border-brand-midnight/10">
                <BlogShare title={post.title} slug={post.slug} label="Share this article" />
              </div>

              <RelatedPosts posts={related} />
            </div>

            <BlogToc headings={post.headings} />
          </div>
        </MarketingContainer>
      </div>
    </>
  );
}
