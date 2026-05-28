/** Margin (px) when testing if a reveal element is already on screen after scroll restore. */
export const VIEWPORT_VISIBILITY_MARGIN = 48;

/** True when the current document load is from the back/forward cache (client only). */
export function isBackForwardNavigation(): boolean {
  if (typeof window === "undefined") return false;

  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;

  return nav?.type === "back_forward";
}

/** True when any part of the element intersects the viewport (with margin). */
export function isElementInViewport(
  el: Element,
  margin = VIEWPORT_VISIBILITY_MARGIN
): boolean {
  const rect = el.getBoundingClientRect();
  const viewHeight =
    window.innerHeight || document.documentElement.clientHeight;

  return (
    rect.width > 0 &&
    rect.height > 0 &&
    rect.bottom >= margin &&
    rect.top <= viewHeight - margin
  );
}
