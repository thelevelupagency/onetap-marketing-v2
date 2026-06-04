import Image from "next/image";
import type { BlogPost } from "@/content/blog/posts";
import { formatDate } from "@/lib/blog";
import { type as typography } from "@/lib/typography";
import {
  MarketingLinkCard,
  MarketingSection,
  SectionHeader,
} from "@/components/marketing/primitives";
import { BlogPostBadges } from "@/components/marketing/blog/blog-post-badges";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <MarketingSection background="transparent" spacing="compact" className="px-0">
      <SectionHeader title="Related" accent="posts" className="mb-marketing-header-gap-md" />
      <div className="grid auto-rows-fr gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <MarketingLinkCard
            key={post.slug}
            href={`/blog/${post.slug}`}
            radius="lg"
            lift={false}
            className="flex h-full flex-col overflow-hidden"
          >
            <div className="relative aspect-[16/10] shrink-0">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
            <div className="flex flex-1 flex-col p-marketing-card-padding">
              <BlogPostBadges categories={post.categories} className="mb-2" />
              <h3
                className={`${typography.cardTitle} transition-colors group-hover:text-brand-turquoise-dark`}
              >
                {post.title}
              </h3>
              <p className={`${typography.caption} mt-auto pt-2`}>{formatDate(post.date)}</p>
            </div>
          </MarketingLinkCard>
        ))}
      </div>
    </MarketingSection>
  );
}
