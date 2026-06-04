export type { BlogCategory, BlogHeading, BlogPost } from "./types";
export { categoryLabels } from "./categories";

import { assertPostImages } from "@/lib/blog-images";
import { extractContentHeadings } from "@/lib/blog-markdown";
import { copywriterPosts } from "./copywriter-posts";
import { editorialPosts } from "./editorial-posts";
import type { BlogPost } from "./types";

export const posts: BlogPost[] = [...copywriterPosts, ...editorialPosts];

const BLOG_LINK_RE = /\/blog\/([a-z0-9-]+)/g;

function assertPostHeadings(post: BlogPost) {
  const fromContent = extractContentHeadings(post.content);
  const declared = post.headings;

  if (fromContent.length !== declared.length) {
    throw new Error(
      `Blog post "${post.slug}" headings count mismatch: content has ${fromContent.length}, headings[] has ${declared.length}`
    );
  }

  for (let i = 0; i < fromContent.length; i++) {
    const a = fromContent[i];
    const b = declared[i];
    if (a.text !== b.text || a.level !== b.level) {
      throw new Error(
        `Blog post "${post.slug}" headings[${i}] mismatch: content "${a.text}" (level ${a.level}) vs headings[] "${b.text}" (level ${b.level})`
      );
    }
  }
}

function assertPostInternalLinks(post: BlogPost, validSlugs: Set<string>) {
  for (const block of post.content) {
    for (const match of block.matchAll(BLOG_LINK_RE)) {
      const slug = match[1];
      if (!validSlugs.has(slug)) {
        throw new Error(
          `Blog post "${post.slug}" links to unknown slug: /blog/${slug}`
        );
      }
    }
  }
}

function assertBlogPosts(entries: BlogPost[]) {
  const slugs = new Set<string>();
  for (const post of entries) {
    if (slugs.has(post.slug)) {
      throw new Error(`Duplicate blog slug: ${post.slug}`);
    }
    if (post.categories.length === 0) {
      throw new Error(`Blog post "${post.slug}" must have at least one category`);
    }
    assertPostImages(post.slug, post.coverImage, post.content);
    assertPostHeadings(post);
    slugs.add(post.slug);
  }

  for (const post of entries) {
    assertPostInternalLinks(post, slugs);
  }
}

assertBlogPosts(posts);
