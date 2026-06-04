import type { BlogPost } from "@/content/blog/posts";

/** Append to `posts` in src/content/blog/posts.ts */
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
  ],
  content: [
    "Opening paragraph.",
    "## First section\n\nBody copy for the section.",
  ],
};
