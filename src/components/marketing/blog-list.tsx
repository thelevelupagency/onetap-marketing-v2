"use client";

import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { posts, categoryLabels, type BlogCategory } from "@/content/blog/posts";
import { formatDate } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";

const categories: (BlogCategory | "all")[] = ["all", "best-practice", "success-stories", "how-to", "news"];

export function BlogList() {
  const searchParams = useSearchParams();
  const activeCategory = (searchParams.get("category") as BlogCategory) || null;

  const filtered = useMemo(() => {
    const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
    if (!activeCategory) return sorted;
    return sorted.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <div className="flex flex-wrap gap-2 justify-center mb-12">
        {categories.map((cat) => {
          const href = cat === "all" ? "/blog" : `/blog?category=${cat}`;
          const isActive = cat === "all" ? !activeCategory : activeCategory === cat;
          return (
            <Link key={cat} href={href}>
              <Badge
                className={cn(
                  "cursor-pointer px-4 py-1.5 text-sm transition-colors",
                  isActive
                    ? "bg-brand-midnight text-brand-cream hover:bg-brand-midnight"
                    : "bg-white text-brand-midnight/70 border-brand-midnight/10 hover:bg-brand-cream"
                )}
              >
                {cat === "all" ? "All" : categoryLabels[cat]}
              </Badge>
            </Link>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group bg-white rounded-3xl overflow-hidden border border-brand-midnight/5 hover:shadow-soft-diffusion hover:-translate-y-1 transition-all duration-300"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-6">
              <Badge className="mb-3 bg-brand-turquoise/20 text-brand-midnight border-brand-turquoise/30 text-xs">
                {categoryLabels[post.category]}
              </Badge>
              <h2 className="font-display text-xl text-brand-midnight mb-2 group-hover:text-brand-turquoise-dark transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-brand-midnight/60 text-sm mb-4 line-clamp-2">{post.excerpt}</p>
              <p className="text-xs text-brand-midnight/40">{formatDate(post.date)} · {post.author}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
