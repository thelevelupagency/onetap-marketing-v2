import { type as typography } from "@/lib/typography";
import { BlogImage } from "@/components/marketing/blog/blog-image";
import {
  BLOG_INLINE_IMAGE_SIZES,
  blogInlineImageFrameClass,
} from "@/components/marketing/blog/blog-image-classes";

export function BlogBlockFigure({ alt, src }: { alt: string; src: string }) {
  const caption = alt.trim();

  return (
    <figure className="not-prose my-marketing-prose-gap flex w-full max-w-none flex-col items-stretch gap-marketing-prose-gap">
      <BlogImage
        src={src}
        alt={caption || "Blog illustration"}
        aspect="inline"
        sizes={BLOG_INLINE_IMAGE_SIZES}
        frameClassName={blogInlineImageFrameClass}
      />
      {caption ? (
        <figcaption className={`${typography.caption} text-center text-brand-midnight/60`}>
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
