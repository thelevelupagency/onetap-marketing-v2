/**
 * Frame + fill styles for Next/Image.
 * Typography `prose` sets img { height: auto } — overrides below keep fill images covering the frame.
 */
export const blogImageFrameClass =
  "relative isolate w-full max-w-full min-h-0 overflow-hidden bg-brand-midnight/[0.04] [&>span]:!absolute [&>span]:!inset-0 [&>span]:!block [&>span]:!size-full [&>img]:!absolute [&>img]:!inset-0 [&>img]:!size-full";

export const blogImageFillClass = "!size-full !object-cover !object-center";

/** Shared frame for in-article and cover images (3:2 inline aspect). */
export const blogInlineImageFrameClass =
  "rounded-2xl border border-brand-midnight/5 shadow-sm";

export const BLOG_INLINE_IMAGE_SIZES = "(max-width: 768px) 100vw, 42rem";
