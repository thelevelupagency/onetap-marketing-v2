import Image from "next/image";
import { categoryLabels, type BlogPost } from "@/content/blog/posts";
import { formatDate } from "@/lib/blog";
import { type as typography } from "@/lib/typography";
import {
  MarketingLinkCard,
  MarketingBadge,
} from "@/components/marketing/primitives";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="pb-4 pt-12">
      <h2 className={`${typography.sectionTitle} mb-8`}>Related posts</h2>
      <div className="grid gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <MarketingLinkCard
            key={post.slug}
            href={`/blog/${post.slug}`}
            radius="lg"
            lift={false}
            className="overflow-hidden"
          >
            <div className="relative aspect-[16/10]">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover"
                sizes="33vw"
              />
            </div>
            <div className="p-5">
              <MarketingBadge className="mb-2 text-xs">
                {categoryLabels[post.category]}
              </MarketingBadge>
              <h3
                className={`${typography.cardTitle} line-clamp-2 transition-colors group-hover:text-brand-turquoise-dark`}
              >
                {post.title}
              </h3>
              <p className={`${typography.caption} mt-2`}>{formatDate(post.date)}</p>
            </div>
          </MarketingLinkCard>
        ))}
      </div>
    </section>
  );
}
