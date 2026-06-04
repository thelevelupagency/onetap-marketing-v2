export type { BlogCategory, BlogHeading, BlogPost } from "./types";
export { categoryLabels } from "./categories";

import { copywriterPosts } from "./copywriter-posts";
import { editorialPosts } from "./editorial-posts";
import type { BlogPost } from "./types";

export const posts: BlogPost[] = [...copywriterPosts, ...editorialPosts];

function assertBlogPosts(entries: BlogPost[]) {
  const slugs = new Set<string>();
  for (const post of entries) {
    if (slugs.has(post.slug)) {
      throw new Error(`Duplicate blog slug: ${post.slug}`);
    }
    if (post.categories.length === 0) {
      throw new Error(`Blog post "${post.slug}" must have at least one category`);
    }
    slugs.add(post.slug);
  }
}

assertBlogPosts(posts);
