"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { posts, categoryLabels, type BlogCategory } from "@/content/blog/posts";
import { formatDate } from "@/lib/blog";
import { Badge } from "@/components/ui/badge";
import { ContentSearch } from "@/components/marketing/content-search";

const categories: (BlogCategory | "all")[] = ["all", "best-practice", "success-stories", "how-to", "news"];

function matchesQuery(
  post: (typeof posts)[number],
  query: string
) {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return (
    post.title.toLowerCase().includes(needle) ||
    post.excerpt.toLowerCase().includes(needle) ||
    post.author.toLowerCase().includes(needle) ||
    categoryLabels[post.category].toLowerCase().includes(needle)
  );
}

export function BlogList() {
  const searchParams = useSearchParams();
  const activeCategory = (searchParams.get("category") as BlogCategory) || null;
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
    return sorted
      .filter((p) => !activeCategory || p.category === activeCategory)
      .filter((p) => matchesQuery(p, query));
  }, [activeCategory, query]);

  return (
    <>
      <ContentSearch
        value={query}
        onChange={setQuery}
        placeholder="Search posts..."
        className="relative max-w-md mx-auto w-full mb-8"
      />

      <div className="flex flex-wrap gap-3 justify-center mb-14 max-w-3xl mx-auto">
        {categories.map((cat) => {
          const href = cat === "all" ? "/blog" : `/blog?category=${cat}`;
          const isActive = cat === "all" ? !activeCategory : activeCategory === cat;
          const label = cat === "all" ? "All" : categoryLabels[cat];
          return (
            <Link
              key={cat}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy/25 focus-visible:ring-offset-2 focus-visible:ring-offset-brand-cream"
            >
              <span
                className={cn(
                  "inline-flex min-h-11 items-center justify-center rounded-full border px-5 py-2.5 text-sm font-medium tracking-tight transition-all duration-200 sm:min-h-12 sm:px-6 sm:py-3 sm:text-base",
                  isActive
                    ? "border-brand-midnight bg-brand-midnight text-brand-cream shadow-soft-diffusion"
                    : "border-brand-midnight/12 bg-white text-brand-midnight/75 shadow-sm hover:border-brand-turquoise/35 hover:bg-brand-turquoise/15 hover:text-brand-midnight hover:shadow-md"
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-brand-midnight/50 py-12">No posts match your search.</p>
      ) : (
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
      )}
    </>
  );
}
