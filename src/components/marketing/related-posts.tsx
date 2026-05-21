import Link from "next/link";
import Image from "next/image";
import { categoryLabels, type BlogPost } from "@/content/blog/posts";
import { formatDate } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="pt-12 pb-4">
      <h2 className="font-display text-3xl text-brand-midnight mb-8">Related posts</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white rounded-2xl overflow-hidden border border-brand-midnight/5 hover:shadow-soft-diffusion transition-all"
          >
            <div className="relative aspect-[16/10]">
              <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="33vw" />
            </div>
            <div className="p-5">
              <Badge className="mb-2 bg-brand-turquoise/20 text-brand-midnight border-brand-turquoise/30 text-xs">
                {categoryLabels[post.category]}
              </Badge>
              <h3 className="font-display text-lg text-brand-midnight group-hover:text-brand-turquoise-dark transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-brand-midnight/40 mt-2">{formatDate(post.date)}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
