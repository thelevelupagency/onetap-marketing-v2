"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { textIncludes } from "@/lib/search";
import { type as typography } from "@/lib/typography";
import { posts, categoryLabels, type BlogCategory } from "@/content/blog/posts";
import { formatDate } from "@/lib/blog";
import { ContentSearch } from "@/components/marketing/content-search";
import {
  MarketingLinkCard,
  MarketingBadge,
} from "@/components/marketing/primitives";

const categories: (BlogCategory | "all")[] = [
  "all",
  "best-practice",
  "success-stories",
  "how-to",
  "news",
];

function postMatchesQuery(post: (typeof posts)[number], query: string) {
  if (!query.trim()) return true;
  return (
    textIncludes(post.title, query) ||
    textIncludes(post.excerpt, query) ||
    textIncludes(post.author, query) ||
    textIncludes(categoryLabels[post.category], query)
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
      .filter((p) => postMatchesQuery(p, query));
  }, [activeCategory, query]);

  return (
    <>
      <ContentSearch
        value={query}
        onChange={setQuery}
        placeholder="Search posts..."
        className="relative mx-auto mb-8 w-full max-w-md"
      />

      <div className="mx-auto mb-14 flex max-w-3xl flex-wrap justify-center gap-3">
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
        <p className="py-12 text-center text-brand-midnight/50">No posts match your search.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => (
            <MarketingLinkCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="overflow-hidden"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-marketing-card-padding">
                <MarketingBadge className="mb-3 text-xs">
                  {categoryLabels[post.category]}
                </MarketingBadge>
                <h2
                  className={`${typography.cardTitle} mb-2 line-clamp-2 transition-colors group-hover:text-brand-turquoise-dark`}
                >
                  {post.title}
                </h2>
                <p className={`${typography.body} mb-4 line-clamp-2`}>{post.excerpt}</p>
                <p className="text-xs text-brand-midnight/40">
                  {formatDate(post.date)} · {post.author}
                </p>
              </div>
            </MarketingLinkCard>
          ))}
        </div>
      )}
    </>
  );
}
