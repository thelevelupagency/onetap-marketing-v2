"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { textIncludes } from "@/lib/search";
import { type as typography } from "@/lib/typography";
import { formatDate, formatReadingTime, getPostReadingMinutes } from "@/lib/blog";
import { posts, categoryLabels, type BlogCategory } from "@/content/blog/posts";
import { ContentSearch } from "@/components/marketing/content-search";
import {
  CategoryFilterPills,
  MarketingLinkCard,
  type CategoryFilterPill,
} from "@/components/marketing/primitives";
import { BlogPostBadges } from "@/components/marketing/blog/blog-post-badges";
import { BlogImage } from "@/components/marketing/blog/blog-image";

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
    post.categories.some((cat) => textIncludes(categoryLabels[cat], query))
  );
}

const validCategories = new Set(Object.keys(categoryLabels) as BlogCategory[]);

function parseCategoryParam(value: string | null): BlogCategory | null {
  if (!value || !validCategories.has(value as BlogCategory)) return null;
  return value as BlogCategory;
}

export function BlogList() {
  const searchParams = useSearchParams();
  const activeCategory = parseCategoryParam(searchParams.get("category"));
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
    return sorted
      .filter((p) => !activeCategory || p.categories.includes(activeCategory))
      .filter((p) => postMatchesQuery(p, query));
  }, [activeCategory, query]);

  const filterPills: CategoryFilterPill[] = categories.map((cat) => {
    const href = cat === "all" ? "/blog" : `/blog?category=${cat}`;
    const isActive = cat === "all" ? !activeCategory : activeCategory === cat;
    return {
      id: cat,
      label: cat === "all" ? "All" : categoryLabels[cat],
      href,
      isActive,
    };
  });

  return (
    <>
      <ContentSearch
        value={query}
        onChange={setQuery}
        placeholder="Search posts..."
        className="relative mx-auto mb-marketing-stack-gap w-full max-w-md"
      />

      <CategoryFilterPills
        items={filterPills}
        ariaLabel="Blog categories"
        className="mb-marketing-header-gap-md"
      />

      {filtered.length === 0 ? (
        <p className="py-12 text-center text-brand-midnight/50">No posts match your search.</p>
      ) : (
        <div className="grid auto-rows-fr gap-marketing-grid-gap pb-marketing-header-gap-md md:grid-cols-2 md:gap-marketing-grid-gap-md lg:grid-cols-3">
          {filtered.map((post) => (
            <MarketingLinkCard
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="flex h-full flex-col overflow-hidden"
            >
              <BlogImage
                src={post.coverImage}
                alt={post.title}
                aspect="card"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                frameClassName="shrink-0"
                imageClassName="transition-transform duration-500 group-hover:scale-105"
              />
              <div className="flex flex-1 flex-col p-marketing-card-padding">
                <BlogPostBadges categories={post.categories} className="mb-3" />
                <h2
                  className={`${typography.cardTitle} mb-2 transition-colors group-hover:text-brand-turquoise-dark`}
                >
                  {post.title}
                </h2>
                <p className={`${typography.body} mb-4 line-clamp-2`}>{post.excerpt}</p>
                <p className="mt-auto text-xs text-brand-midnight/40">
                  {formatDate(post.date)} · {post.author} ·{" "}
                  {formatReadingTime(getPostReadingMinutes(post))}
                </p>
              </div>
            </MarketingLinkCard>
          ))}
        </div>
      )}
    </>
  );
}
