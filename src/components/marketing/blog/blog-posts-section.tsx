"use client";

import { type as typography } from "@/lib/typography";
import {
  BLOG_LIST_PAGE_SIZE,
  buildBlogPageHref,
  formatDate,
  formatReadingTime,
  getPostReadingMinutes,
} from "@/lib/blog";
import type { BlogCategory, BlogPost } from "@/content/blog/posts";
import { paginateItems, getPaginationPageNumbers } from "@/lib/pagination";
import { cn } from "@/lib/utils";
import { MarketingLinkCard } from "@/components/marketing/primitives";
import { BlogPostBadges } from "@/components/marketing/blog/blog-post-badges";
import { BlogImage } from "@/components/marketing/blog/blog-image";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface BlogPostsSectionProps {
  sectionId: string;
  posts: BlogPost[];
  activeCategory: BlogCategory | null;
  currentPage: number;
  isSearchActive: boolean;
  isPending: boolean;
  prefersReducedMotion: boolean;
  onPageNavigate: (page: number) => void;
}

export function BlogPostsSection({
  sectionId,
  posts,
  activeCategory,
  currentPage,
  isSearchActive,
  isPending,
  prefersReducedMotion,
  onPageNavigate,
}: BlogPostsSectionProps) {
  const { pageItems, totalPages, safePage } = paginateItems(posts, BLOG_LIST_PAGE_SIZE, currentPage);
  const displayItems = isSearchActive ? posts : pageItems;
  const showPagination = !isSearchActive && totalPages > 1;

  const sectionClassName = cn(
    "relative scroll-mt-24",
    !prefersReducedMotion && "transition-opacity duration-200",
  );

  if (posts.length === 0) {
    return (
      <section id={sectionId} aria-live="polite" className={sectionClassName}>
        <p className="py-12 text-center text-brand-midnight/50">No posts match your search.</p>
      </section>
    );
  }

  return (
    <section
      id={sectionId}
      aria-live="polite"
      aria-busy={isPending}
      className={sectionClassName}
    >
      <div className={cn(isPending && "pointer-events-none opacity-50")}>
        <div className="grid auto-rows-fr gap-marketing-grid-gap pb-marketing-header-gap-md md:grid-cols-2 md:gap-marketing-grid-gap-md lg:grid-cols-3">
          {displayItems.map((post) => (
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

        {showPagination && (
          <Pagination className="mb-marketing-header-gap-md">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={buildBlogPageHref(safePage - 1, activeCategory)}
                  aria-disabled={safePage <= 1}
                  tabIndex={safePage <= 1 ? -1 : undefined}
                  className={safePage <= 1 ? "pointer-events-none opacity-50" : undefined}
                  onClick={(e) => {
                    if (safePage <= 1) return;
                    e.preventDefault();
                    onPageNavigate(safePage - 1);
                  }}
                />
              </PaginationItem>

              {getPaginationPageNumbers(safePage, totalPages).map((item, idx) =>
                item === "ellipsis" ? (
                  <PaginationItem key={`ellipsis-${idx}`}>
                    <PaginationEllipsis />
                  </PaginationItem>
                ) : (
                  <PaginationItem key={item}>
                    <PaginationLink
                      href={buildBlogPageHref(item, activeCategory)}
                      isActive={item === safePage}
                      onClick={(e) => {
                        if (item === safePage) return;
                        e.preventDefault();
                        onPageNavigate(item);
                      }}
                    >
                      {item}
                    </PaginationLink>
                  </PaginationItem>
                ),
              )}

              <PaginationItem>
                <PaginationNext
                  href={buildBlogPageHref(safePage + 1, activeCategory)}
                  aria-disabled={safePage >= totalPages}
                  tabIndex={safePage >= totalPages ? -1 : undefined}
                  className={safePage >= totalPages ? "pointer-events-none opacity-50" : undefined}
                  onClick={(e) => {
                    if (safePage >= totalPages) return;
                    e.preventDefault();
                    onPageNavigate(safePage + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </section>
  );
}
