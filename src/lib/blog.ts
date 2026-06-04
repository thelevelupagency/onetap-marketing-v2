import { posts, type BlogCategory, type BlogHeading, type BlogPost } from "@/content/blog/posts";
import { countBlogWords } from "@/lib/blog-markdown";

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

export function getPosts(category?: BlogCategory | null): BlogPost[] {
  if (!category) return [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return posts
    .filter((p) => p.categories.includes(category))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

const MAX_INLINE_LINK_LABEL = 50;

/** Short, sentence-friendly label for inline `/blog/slug` links in prose. */
export function getBlogLinkLabel(slug: string): string {
  const post = getPostBySlug(slug);
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

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
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

export function getAllSlugs(): string[] {
  return posts.map((p) => p.slug);
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
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

export function formatReadingTime(minutes: number): string {
  return `${minutes} min read`;
}

export function getPostReadingMinutes(post: Pick<BlogPost, "content">): number {
  return estimateReadingMinutes(post.content);
}
