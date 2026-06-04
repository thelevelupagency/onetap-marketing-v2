const ALLOWED_IMAGE_HOSTS = new Set(["images.unsplash.com", "res.cloudinary.com"]);

const INLINE_IMAGE_RE = /!\[[^\]]*\]\(([^)]+)\)/g;

/** Normalize remote image URLs for consistent cropping and quality. */
export function normalizeBlogImageSrc(
  src: string,
  width: 800 | 1200 = 800
): string {
  const trimmed = src.trim();
  try {
    const url = new URL(trimmed);
    if (url.hostname === "images.unsplash.com") {
      url.searchParams.set("auto", "format");
      url.searchParams.set("fit", "crop");
      url.searchParams.set("w", String(width));
      url.searchParams.set("q", "80");
      return url.toString();
    }
    return trimmed;
  } catch {
    return trimmed;
  }
}

export function isAllowedBlogImageSrc(src: string): boolean {
  try {
    const url = new URL(src.trim());
    return url.protocol === "https:" && ALLOWED_IMAGE_HOSTS.has(url.hostname);
  } catch {
    return false;
  }
}

/** Collect cover + inline image URLs from post content for validation. */
export function collectPostImageSrcs(
  coverImage: string,
  content: string[]
): string[] {
  const inline: string[] = [];
  for (const block of content) {
    for (const match of block.matchAll(INLINE_IMAGE_RE)) {
      inline.push(match[1]);
    }
  }
  return [coverImage, ...inline];
}

export function assertPostImages(slug: string, coverImage: string, content: string[]) {
  for (const src of collectPostImageSrcs(coverImage, content)) {
    if (!isAllowedBlogImageSrc(src)) {
      throw new Error(
        `Blog post "${slug}" has disallowed or invalid image URL: ${src}`
      );
    }
  }
}
