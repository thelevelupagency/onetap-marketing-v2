"use client";

import { createContext, useContext, type MouseEvent, type ReactNode } from "react";
import type { BlogHeading } from "@/content/blog/posts";
import { useBlogScrollSpy } from "@/components/marketing/blog/use-blog-scroll-spy";

interface BlogScrollSpyContextValue {
  headings: BlogHeading[];
  activeId: string;
  isNavigating: boolean;
  handleHeadingClick: (
    e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
    id: string
  ) => void;
}

const BlogScrollSpyContext = createContext<BlogScrollSpyContextValue | null>(null);

export { BlogScrollSpyContext };

export function BlogScrollSpyProvider({
  headings,
  children,
}: {
  headings: BlogHeading[];
  children: ReactNode;
}) {
  const spy = useBlogScrollSpy(headings);

  return (
    <BlogScrollSpyContext.Provider
      value={{
        headings,
        activeId: spy.activeId,
        isNavigating: spy.isNavigating,
        handleHeadingClick: spy.handleHeadingClick,
      }}
    >
      {children}
    </BlogScrollSpyContext.Provider>
  );
}

export function useBlogScrollSpyContext() {
  const ctx = useContext(BlogScrollSpyContext);
  if (!ctx) {
    throw new Error("useBlogScrollSpyContext must be used within BlogScrollSpyProvider");
  }
  return ctx;
}
