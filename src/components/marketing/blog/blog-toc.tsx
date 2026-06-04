"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useHasHydrated } from "@/lib/use-has-hydrated";
import { useMotionConfig } from "@/lib/motion";
import type { BlogHeading } from "@/content/blog/posts";
import { useBlogScrollSpyContext } from "@/components/marketing/blog/blog-scroll-spy-context";

function BlogTocLink({
  heading,
  isActive,
  hasHydrated,
  onClick,
}: {
  heading: BlogHeading;
  isActive: boolean;
  hasHydrated: boolean;
  onClick: ReturnType<typeof useBlogScrollSpyContext>["handleHeadingClick"];
}) {
  const showActive = hasHydrated && isActive;

  return (
    <a
      href={`#${heading.id}`}
      onClick={(e) => onClick(e, heading.id)}
      aria-current={showActive ? "location" : undefined}
      title={heading.text}
      className={cn(
        "block min-w-0 truncate rounded-md px-2.5 py-1.5 text-sm leading-snug transition-[color,background-color,box-shadow] duration-200",
        showActive
          ? "bg-brand-turquoise/10 font-medium text-brand-turquoise-dark ring-1 ring-inset ring-brand-turquoise/25"
          : "text-brand-midnight/50 hover:bg-brand-midnight/4 hover:text-brand-midnight"
      )}
    >
      {heading.text}
    </a>
  );
}

/** Horizontal scroll pills for mobile/tablet — hidden at `lg` and up. */
export function BlogTocMobile() {
  const { headings, activeId, handleHeadingClick } = useBlogScrollSpyContext();
  const hasHydrated = useHasHydrated();
  const scrollRef = useRef<HTMLDivElement>(null);
  const pillRefs = useRef<Map<string, HTMLAnchorElement>>(new Map());

  const scrollActiveIntoView = useCallback(() => {
    if (!hasHydrated) return;
    const container = scrollRef.current;
    const activePill = pillRefs.current.get(activeId);
    if (!container || !activePill) return;

    const containerRect = container.getBoundingClientRect();
    const pillRect = activePill.getBoundingClientRect();
    const offset =
      pillRect.left -
      containerRect.left -
      containerRect.width / 2 +
      pillRect.width / 2;

    container.scrollBy({ left: offset, behavior: "smooth" });
  }, [activeId, hasHydrated]);

  useEffect(() => {
    scrollActiveIntoView();
  }, [scrollActiveIntoView]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="lg:hidden"
    >
      <p className="type-eyebrow mb-2 text-brand-midnight/40">On this page</p>
      <div
        ref={scrollRef}
        className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {headings.map((h) => {
          const showActive = hasHydrated && activeId === h.id;
          return (
            <a
              key={h.id}
              ref={(el) => {
                if (el) pillRefs.current.set(h.id, el);
                else pillRefs.current.delete(h.id);
              }}
              href={`#${h.id}`}
              onClick={(e) => handleHeadingClick(e, h.id)}
              aria-current={showActive ? "location" : undefined}
              title={h.text}
              className={cn(
                "max-w-48 shrink-0 truncate rounded-full px-3 py-1.5 text-sm leading-snug transition-[color,background-color,box-shadow] duration-200 sm:max-w-56",
                showActive
                  ? "bg-brand-turquoise/10 font-medium text-brand-turquoise-dark ring-1 ring-inset ring-brand-turquoise/25"
                  : "bg-brand-midnight/5 text-brand-midnight/60 hover:bg-brand-midnight/8 hover:text-brand-midnight"
              )}
            >
              {h.text}
            </a>
          );
        })}
      </div>
    </nav>
  );
}

export function BlogToc() {
  const { headings, activeId, isNavigating, handleHeadingClick } =
    useBlogScrollSpyContext();

  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());
  const [indicator, setIndicator] = useState({ top: 0, height: 0 });
  const hasHydrated = useHasHydrated();
  const { enterTransition, prefersReducedMotion } = useMotionConfig();
  const skipIndicatorMotion = prefersReducedMotion || isNavigating || !hasHydrated;

  const updateIndicator = useCallback(() => {
    const activeLi = itemRefs.current.get(activeId);
    const list = listRef.current;
    if (!activeLi || !list) return;

    setIndicator({
      top: activeLi.offsetTop,
      height: activeLi.offsetHeight,
    });
  }, [activeId]);

  useLayoutEffect(() => {
    if (!hasHydrated) return;
    updateIndicator();
    if (isNavigating) return;
    const activeLi = itemRefs.current.get(activeId);
    activeLi?.scrollIntoView({ block: "nearest" });
  }, [activeId, headings, hasHydrated, isNavigating, updateIndicator]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const observer = new ResizeObserver(updateIndicator);
    observer.observe(list);
    itemRefs.current.forEach((li) => observer.observe(li));

    return () => observer.disconnect();
  }, [activeId, headings, updateIndicator]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="On this page"
      className="sticky top-28 max-h-[calc(100vh-8rem)] w-full min-w-0 overflow-y-auto pb-marketing-stack-gap"
    >
      <p className="type-eyebrow mb-4 text-brand-midnight/40">On this page</p>
      <div className="relative pl-4">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 w-px bg-brand-midnight/10"
          aria-hidden
        />
        <motion.div
          className="pointer-events-none absolute left-0 w-0.5 bg-brand-turquoise"
          aria-hidden
          initial={false}
          animate={{ y: indicator.top, height: indicator.height }}
          transition={
            skipIndicatorMotion ? { duration: 0 } : enterTransition(0)
          }
          style={{ top: 0 }}
        />
        <ul ref={listRef} className="space-y-1">
          {headings.map((h) => (
            <li
              key={h.id}
              className="min-w-0"
              ref={(el) => {
                if (el) itemRefs.current.set(h.id, el);
                else itemRefs.current.delete(h.id);
              }}
            >
              <BlogTocLink
                heading={h}
                isActive={activeId === h.id}
                hasHydrated={hasHydrated}
                onClick={handleHeadingClick}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
