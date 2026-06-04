import type { BlogPost } from "@/content/blog/types";

/** Append to copywriter-posts.ts or editorial-posts.ts */
export const examplePost: BlogPost = {
  slug: "example-slug",
  title: "Example Post Title",
  excerpt: "Short excerpt for cards and meta.",
  categories: ["how-to"],
  date: "2026-05-27",
  author: "OneTap Team",
  coverImage: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop",
  headings: [
    { id: "first-section", text: "First section", level: 2 },
    // level: 3 — in-article anchor only; not listed in on-page TOC
    { id: "a-subsection", text: "A subsection", level: 3 },
  ],
  content: [
    "Opening paragraph — keep it short.",
    "## First section\n\nBody copy.\n\n### A subsection\n\nMore copy.\n\n- Bullet one\n- Bullet two\n\n> Tip: Optional callout for clarity.\n\n![Caption for inline image](https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&auto=format&fit=crop)",
  ],
};
