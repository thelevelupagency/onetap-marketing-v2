import type { BlogHeading } from "@/content/blog/posts";

/** DOM id for the blog article region tracked by the mobile reading bar. */
export const BLOG_READING_REGION_ID = "blog-reading-region";

/** Matches `scroll-mt-28` on blog section headings (7rem). */
export const BLOG_SCROLL_SPY_OFFSET_PX = 112;

export const BLOG_NAVIGATION_ALIGN_TOLERANCE_PX = 6;

export function blogScrollStorageKey(pathname: string) {
  return `blog-scroll:${pathname}`;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Progress through a DOM region: 0 at top, 1 when the bottom has been reached. */
export function getRegionReadingProgress(region: HTMLElement): number {
  const rect = region.getBoundingClientRect();
  const regionTop = rect.top + window.scrollY;
  const regionHeight = region.offsetHeight;
  const scrollMax = regionHeight - window.innerHeight;

  if (scrollMax <= 0) {
    const regionBottom = regionTop + regionHeight;
    return window.scrollY + window.innerHeight >= regionBottom ? 1 : 0;
  }

  return clamp((window.scrollY - regionTop) / scrollMax, 0, 1);
}

/** True when the target section has finished scrolling into place. */
export function isNavigationTargetSettled(
  id: string,
  offsetPx = BLOG_SCROLL_SPY_OFFSET_PX,
  tolerancePx = BLOG_NAVIGATION_ALIGN_TOLERANCE_PX
): boolean {
  const el = document.getElementById(id);
  if (!el) return true;
  const top = el.getBoundingClientRect().top;
  return Math.abs(top - offsetPx) <= tolerancePx;
}

/**
 * Last heading whose top edge has passed the scroll marker.
 * Works while reading section body — unlike IO on the h2 line alone.
 */
export function resolveActiveHeadingId(
  headings: BlogHeading[],
  offsetPx = BLOG_SCROLL_SPY_OFFSET_PX
): string {
  if (headings.length === 0) return "";

  const marker = window.scrollY + offsetPx + 1;
  let active = headings[0].id;

  for (const h of headings) {
    const el = document.getElementById(h.id);
    if (!el) continue;

    const top = el.getBoundingClientRect().top + window.scrollY;
    if (top <= marker) {
      active = h.id;
    } else {
      break;
    }
  }

  return active;
}

export function scrollHeadingIntoView(
  id: string,
  behavior: ScrollBehavior = "smooth"
): boolean {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior, block: "start" });
  window.history.replaceState(null, "", `#${id}`);
  return true;
}
