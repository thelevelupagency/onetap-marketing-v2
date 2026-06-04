"use client";

import { useMemo, useState, useTransition } from "react";
import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  buildBlogPageHref,
  filterBlogPostsBySearch,
  getPosts,
  parseBlogCategoryParam,
  parseBlogPageParam,
} from "@/lib/blog";
import { categoryLabels, type BlogCategory } from "@/content/blog/posts";
import { ContentSearch } from "@/components/marketing/content-search";
import { CategoryFilterPills, type CategoryFilterPill } from "@/components/marketing/primitives";
import { BlogPostsSection } from "@/components/marketing/blog/blog-posts-section";

const BLOG_POSTS_SECTION_ID = "blog-posts";

const categories: (BlogCategory | "all")[] = [
  "all",
  "best-practice",
  "success-stories",
  "how-to",
  "news",
];

function scrollToBlogPosts(reducedMotion: boolean) {
  document.getElementById(BLOG_POSTS_SECTION_ID)?.scrollIntoView({
    behavior: reducedMotion ? "instant" : "smooth",
    block: "start",
  });
}

interface BlogListProps {
  initialCategory?: string | null;
  initialPage?: string | null;
}

export function BlogList({ initialCategory, initialPage }: BlogListProps) {
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [isPending, startTransition] = useTransition();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(() =>
    parseBlogCategoryParam(initialCategory),
  );
  const [currentPage, setCurrentPage] = useState(() => parseBlogPageParam(initialPage));
  const [urlSnapshot, setUrlSnapshot] = useState({
    category: initialCategory,
    page: initialPage,
  });

  // Sync when searchParams change from browser back/forward (React recommended prop-to-state pattern).
  if (
    initialCategory !== urlSnapshot.category ||
    initialPage !== urlSnapshot.page
  ) {
    setUrlSnapshot({ category: initialCategory, page: initialPage });
    setActiveCategory(parseBlogCategoryParam(initialCategory));
    setCurrentPage(parseBlogPageParam(initialPage));
  }

  const filtered = useMemo(
    () => filterBlogPostsBySearch(getPosts(activeCategory), query),
    [activeCategory, query],
  );

  const isSearchActive = query.trim().length > 0;

  const navigate = (category: BlogCategory | null, page: number, options?: { scrollToPosts?: boolean }) => {
    setActiveCategory(category);
    setCurrentPage(page);
    setUrlSnapshot({
      category: category ?? undefined,
      page: page > 1 ? String(page) : undefined,
    });
    startTransition(() => {
      router.replace(buildBlogPageHref(page, category), { scroll: false });
    });
    if (options?.scrollToPosts) {
      scrollToBlogPosts(prefersReducedMotion);
    }
  };

  const filterPills: CategoryFilterPill[] = categories.map((cat) => {
    const isActive = cat === "all" ? !activeCategory : activeCategory === cat;
    return {
      id: cat,
      label: cat === "all" ? "All" : categoryLabels[cat],
      isActive,
      onSelect: () => navigate(cat === "all" ? null : cat, 1, { scrollToPosts: true }),
    };
  });

  return (
    <>
      <ContentSearch
        value={query}
        onChange={(value) => {
          setQuery(value);
          setCurrentPage(1);
        }}
        placeholder="Search posts..."
        className="relative mx-auto mb-marketing-stack-gap w-full max-w-md"
      />

      <CategoryFilterPills
        items={filterPills}
        ariaLabel="Blog categories"
        className="mb-marketing-header-gap-md"
      />

      <BlogPostsSection
        sectionId={BLOG_POSTS_SECTION_ID}
        posts={filtered}
        activeCategory={activeCategory}
        currentPage={currentPage}
        isSearchActive={isSearchActive}
        isPending={isPending}
        prefersReducedMotion={prefersReducedMotion}
        onPageNavigate={(page) => navigate(activeCategory, page, { scrollToPosts: true })}
      />
    </>
  );
}
