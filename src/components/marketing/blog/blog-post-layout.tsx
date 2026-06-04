"use client";

import type { ReactNode } from "react";
import type { BlogHeading } from "@/content/blog/posts";
import { BlogReadingProgress } from "@/components/marketing/blog/blog-reading-progress";
import { BlogScrollSpyProvider } from "@/components/marketing/blog/blog-scroll-spy-context";
import { BlogToc } from "@/components/marketing/blog/blog-toc";

interface BlogPostLayoutProps {
  headings: BlogHeading[];
  children: ReactNode;
}

/** Mobile reading bar + desktop TOC shell for blog post pages. */
export function BlogPostLayout({ headings, children }: BlogPostLayoutProps) {
  const showToc = headings.length > 0;

  return (
    <>
      <BlogReadingProgress />
      <BlogScrollSpyProvider headings={headings}>
        <div className="grid justify-items-center gap-12 lg:grid-cols-[minmax(0,48rem)_minmax(11rem,220px)] lg:justify-items-stretch">
          {children}
          {showToc ? (
            <aside className="hidden min-w-0 lg:block">
              <BlogToc />
            </aside>
          ) : null}
        </div>
      </BlogScrollSpyProvider>
    </>
  );
}
