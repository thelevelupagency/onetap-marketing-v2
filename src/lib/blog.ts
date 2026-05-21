import { posts, type BlogCategory, type BlogPost } from "@/content/blog/posts";

export function getPosts(category?: BlogCategory | null): BlogPost[] {
  if (!category) return [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return posts.filter((p) => p.category === category).sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const current = getPostBySlug(slug);
  if (!current) return [];
  return posts
    .filter((p) => p.slug !== slug)
    .sort((a, b) => {
      const aMatch = a.category === current.category ? 1 : 0;
      const bMatch = b.category === current.category ? 1 : 0;
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

export function renderContentBlock(block: string): { type: "heading" | "paragraph"; level?: 2 | 3; text: string; id?: string } {
  if (block.startsWith("## ")) {
    const text = block.slice(3).split("\n")[0];
    return { type: "heading", level: 2, text, id: text.toLowerCase().replace(/\s+/g, "-") };
  }
  if (block.startsWith("### ")) {
    const text = block.slice(4).split("\n")[0];
    return { type: "heading", level: 3, text, id: text.toLowerCase().replace(/\s+/g, "-") };
  }
  const parts = block.split("\n\n");
  const headingPart = parts.find((p) => p.startsWith("## "));
  if (headingPart) {
    const text = headingPart.slice(3);
    const body = parts.filter((p) => !p.startsWith("## ")).join("\n\n");
    return { type: "paragraph", text: body, id: text.toLowerCase().replace(/\s+/g, "-") };
  }
  return { type: "paragraph", text: block };
}
