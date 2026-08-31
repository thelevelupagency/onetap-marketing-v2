"use client";

import { useMemo, useState, useTransition } from "react";
import { useReducedMotion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  BLOG_LIST_PAGE_SIZE,
  BLOG_POSTS_SECTION_ID,
  buildBlogPageHref,
  filterBlogPostsBySearch,
  getPosts,
  parseBlogCategoryParam,
  parseBlogPageParam,
} from "@/lib/blog";
import { paginateItems } from "@/lib/pagination";
import { getBlogCategoryLabels } from "@/content/get-content";
import type { BlogCategory } from "@/content/blog/types";
import type { Locale } from "@/lib/i18n/config";
import { ContentSearch } from "@/components/marketing/content-search";
import { CategoryFilterPills, type CategoryFilterPill } from "@/components/marketing/primitives";
import { BlogPostsSection } from "@/components/marketing/blog/blog-posts-section";

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
  locale: Locale;
  initialCategory?: string | null;
  initialPage?: string | null;
}

export function BlogList({ locale, initialCategory, initialPage }: BlogListProps) {
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

  const hasSearchQuery = query.trim().length > 0;

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
    () => filterBlogPostsBySearch(getPosts(activeCategory, locale), query, locale),
    [activeCategory, query, locale],
  );

  const { pageItems, totalPages, safePage } = useMemo(
    () => paginateItems(filtered, BLOG_LIST_PAGE_SIZE, currentPage),
    [filtered, currentPage],
  );

  // Keep page in range when filters/search reduce the result set (e.g. page 3 → 1 page of matches).
  if (currentPage !== safePage) {
    setCurrentPage(safePage);
  }

  const syncPageToUrl = (page: number, category: BlogCategory | null) => {
    setUrlSnapshot({
      category: category ?? undefined,
      page: page > 1 ? String(page) : undefined,
    });
    startTransition(() => {
      router.replace(buildBlogPageHref(page, category, locale), { scroll: false });
    });
  };

  const navigate = (category: BlogCategory | null, page: number, options?: { scrollToPosts?: boolean }) => {
    setActiveCategory(category);
    setCurrentPage(page);
    syncPageToUrl(page, category);
    if (options?.scrollToPosts) {
      scrollToBlogPosts(prefersReducedMotion);
    }
  };

  const filterPills: CategoryFilterPill[] = categories.map((cat) => {
    const isActive = cat === "all" ? !activeCategory : activeCategory === cat;
    const categoryLabels = getBlogCategoryLabels(locale);
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
          if (urlSnapshot.page != null) {
            syncPageToUrl(1, activeCategory);
          }
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
        pageItems={pageItems}
        totalCount={filtered.length}
        totalPages={totalPages}
        safePage={safePage}
        activeCategory={activeCategory}
        hasSearchQuery={hasSearchQuery}
        isPending={isPending}
        prefersReducedMotion={prefersReducedMotion}
        locale={locale}
        onPageNavigate={(page) => navigate(activeCategory, page, { scrollToPosts: true })}
      />
    </>
  );
}
