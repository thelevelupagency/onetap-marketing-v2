"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import type { BlogHeading } from "@/content/blog/posts";

export function BlogToc({ headings }: { headings: BlogHeading[] }) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");

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
    <nav className="sticky top-28 hidden xl:block">
      <p className="text-xs uppercase tracking-wider text-brand-midnight/40 mb-4 font-medium">On this page</p>
      <ul className="space-y-2 border-l border-brand-midnight/10 pl-4">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
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
