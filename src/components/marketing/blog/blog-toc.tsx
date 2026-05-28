"use client";

import { useEffect, useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import type { BlogHeading } from "@/content/blog/posts";

function scrollToHeading(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${id}`);
}

export function BlogToc({ headings }: { headings: BlogHeading[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

  function handleHeadingClick(e: MouseEvent<HTMLAnchorElement>, id: string) {
    e.preventDefault();
    scrollToHeading(id);
    setActiveId(id);
  }

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash || !headings.some((h) => h.id === hash)) return;

    const frame = requestAnimationFrame(() => {
      scrollToHeading(hash);
      setActiveId(hash);
    });
    return () => cancelAnimationFrame(frame);
  }, [headings]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(h.id);
        },
        { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-28 hidden max-h-[calc(100vh-8rem)] self-start overflow-y-auto xl:block">
      <p className="type-eyebrow mb-4 text-brand-midnight/40">On this page</p>
      <ul className="space-y-2 border-l border-brand-midnight/10 pl-4">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              onClick={(e) => handleHeadingClick(e, h.id)}
              className={cn(
                "text-sm transition-colors block py-0.5",
                h.level === 3 && "pl-3",
                activeId === h.id ? "text-brand-turquoise-dark font-medium" : "text-brand-midnight/50 hover:text-brand-midnight"
              )}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
