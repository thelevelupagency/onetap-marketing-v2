import Image from "next/image";
import { cn } from "@/lib/utils";
import { normalizeBlogImageSrc } from "@/lib/blog-images";
import { blogImageFillClass, blogImageFrameClass } from "@/components/marketing/blog/blog-image-classes";

export type BlogImageAspect = "card" | "inline";

const aspectClasses: Record<BlogImageAspect, string> = {
  card: "aspect-[16/10]",
  /** Slightly taller than cards — reads better for in-article photos */
  inline: "aspect-[3/2]",
};

const normalizeWidth: Record<BlogImageAspect, 800 | 1200> = {
  card: 800,
  inline: 1200,
};

const imageCoverStyle = {
  objectFit: "cover" as const,
  objectPosition: "center" as const,
};

interface BlogImageProps {
  src: string;
  alt: string;
  aspect?: BlogImageAspect;
  sizes: string;
  priority?: boolean;
  frameClassName?: string;
  imageClassName?: string;
}

/** Blog image with a sized frame, normalized src, and centered cover fit. */
export function BlogImage({
  src,
  alt,
  aspect = "card",
  sizes,
  priority = false,
  frameClassName,
  imageClassName,
}: BlogImageProps) {
  const normalizedSrc = normalizeBlogImageSrc(src, normalizeWidth[aspect]);

  return (
    <div
      className={cn(blogImageFrameClass, aspectClasses[aspect], frameClassName)}
    >
      <Image
        src={normalizedSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn(blogImageFillClass, imageClassName)}
        style={imageCoverStyle}
      />
    </div>
  );
}
