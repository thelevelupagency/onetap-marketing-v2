import type { BlogCategory, BlogHeading, BlogPost } from "@/content/blog/types";
import { getBlogCategoryLabels, getBlogPosts, getChrome } from "@/content/get-content";
import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE, localizePath } from "@/lib/i18n/config";
import { countBlogWords } from "@/lib/blog-markdown";
import { textIncludes } from "@/lib/search";

export type { BlogCategory, BlogHeading, BlogPost };

export const BLOG_LIST_PAGE_SIZE = 6;

export function parseBlogCategoryParam(value: string | null | undefined): BlogCategory | null {
  const labels = getBlogCategoryLabels(DEFAULT_LOCALE);
  const validBlogCategories = new Set(Object.keys(labels) as BlogCategory[]);
  if (!value || !validBlogCategories.has(value as BlogCategory)) return null;
  return value as BlogCategory;
}

export function parseBlogPageParam(value: string | null | undefined): number {
  const n = parseInt(value ?? "1", 10);
  return Number.isNaN(n) || n < 1 ? 1 : n;
}

/** Shareable blog index URL with optional category and page. */
export function buildBlogPageHref(
  page: number,
  category: BlogCategory | null,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (page > 1) params.set("page", String(page));
  const qs = params.toString();
  const base = localizePath("/blog", locale);
  return `${base}${qs ? `?${qs}` : ""}`;
}

export function filterBlogPostsBySearch(
  entries: BlogPost[],
  query: string,
  locale: Locale = DEFAULT_LOCALE,
): BlogPost[] {
  if (!query.trim()) return entries;
  const categoryLabels = getBlogCategoryLabels(locale);
  return entries.filter(
    (post) =>
      textIncludes(post.title, query) ||
      textIncludes(post.excerpt, query) ||
      textIncludes(post.author, query) ||
      post.categories.some((cat) => textIncludes(categoryLabels[cat], query)),
  );
}

/** DOM id for the blog index posts region (scroll target after pagination). */
export const BLOG_POSTS_SECTION_ID = "blog-posts";

export function getBlogListEmptyMessage(
  hasSearchQuery: boolean,
  hasCategoryFilter: boolean,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const chrome = getChrome(locale);
  if (hasSearchQuery && hasCategoryFilter) {
    return chrome.blog.emptySearchAndCategory;
  }
  if (hasSearchQuery) return chrome.blog.emptySearch;
  if (hasCategoryFilter) return chrome.blog.emptyCategory;
  return chrome.blog.empty;
}

export { BLOG_READING_REGION_ID } from "@/lib/blog-reading";

/** Section headings only — `###` subheads stay in prose, not the TOC. */
export function getTocHeadings(headings: BlogHeading[]): BlogHeading[] {
  return headings.filter((h) => h.level === 2);
}

/** Map any heading id (including `###`) to the TOC section id that should highlight. */
export function resolveTocActiveId(id: string, headings: BlogHeading[]): string {
  const tocHeadings = getTocHeadings(headings);
  if (tocHeadings.some((h) => h.id === id)) return id;

  const index = headings.findIndex((h) => h.id === id);
  if (index === -1) return tocHeadings[0]?.id ?? id;

  for (let i = index; i >= 0; i--) {
    if (headings[i].level === 2) return headings[i].id;
  }

  return tocHeadings[0]?.id ?? id;
}

/** Resolve DOM id for a heading line — prefers explicit ids from post.headings. */
export function getHeadingId(text: string, headings: BlogHeading[]): string {
  const match = headings.find((h) => h.text === text);
  if (match) return match.id;
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function categoryOverlap(a: BlogCategory[], b: BlogCategory[]): number {
  return a.filter((c) => b.includes(c)).length;
}

export function getPosts(
  category?: BlogCategory | null,
  locale: Locale = DEFAULT_LOCALE,
): BlogPost[] {
  const posts = getBlogPosts(locale);
  if (!category) return [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return posts
    .filter((p) => p.categories.includes(category))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): BlogPost | undefined {
  return getBlogPosts(locale).find((p) => p.slug === slug);
}

const MAX_INLINE_LINK_LABEL = 50;

/** Short, sentence-friendly label for inline `/blog/slug` links in prose. */
export function getBlogLinkLabel(
  slug: string,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const post = getPostBySlug(slug, locale);
  if (!post) {
    return slug.replace(/-/g, " ");
  }

  const colon = post.title.indexOf(":");
  if (colon > 0) {
    const beforeColon = post.title.slice(0, colon).trim();
    if (beforeColon.length <= MAX_INLINE_LINK_LABEL) {
      return beforeColon;
    }
  }

  if (post.title.length <= MAX_INLINE_LINK_LABEL) {
    return post.title;
  }

  return slug.replace(/-/g, " ");
}

export function getRelatedPosts(
  slug: string,
  limit = 3,
  locale: Locale = DEFAULT_LOCALE,
): BlogPost[] {
  const posts = getBlogPosts(locale);
  const current = getPostBySlug(slug, locale);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aMatch = categoryOverlap(a.categories, current.categories);
      const bMatch = categoryOverlap(b.categories, current.categories);
      return bMatch - aMatch || b.date.localeCompare(a.date);
    })
    .slice(0, limit);
}

export function getAllSlugs(locale: Locale = DEFAULT_LOCALE): string[] {
  return getBlogPosts(locale).map((p) => p.slug);
}

export function formatDate(dateStr: string, locale: Locale = DEFAULT_LOCALE): string {
  const displayLocale = locale === "he" ? "he-IL" : "en-US";
  return new Date(dateStr).toLocaleDateString(displayLocale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const WORDS_PER_MINUTE = 220;

/** Estimated reading time from post body strings. */
export function estimateReadingMinutes(content: string[]): number {
  const words = countBlogWords(content);
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}

export function formatReadingTime(
  minutes: number,
  locale: Locale = DEFAULT_LOCALE,
): string {
  const label = getChrome(locale).blog.minRead;
  return `${minutes} ${label}`;
}

export function getPostReadingMinutes(post: Pick<BlogPost, "content">): number {
  return estimateReadingMinutes(post.content);
}
