# Blog Pagination Foundation

**Date:** 2026-06-04  
**Status:** Implemented

## Summary

Added a reusable pagination foundation and wired it into the blog listing page so posts are browsed in pages of 6 instead of a single full-grid dump.

## Files Added

- `src/components/ui/pagination.tsx` — shadcn-style Pagination primitives (`Pagination`, `PaginationContent`, `PaginationItem`, `PaginationLink`, `PaginationPrevious`, `PaginationNext`, `PaginationEllipsis`).
- `src/lib/pagination.ts` — generic `paginateItems<T>` utility: accepts `(items, pageSize, currentPage)`, returns `{ pageItems, totalPages, safePage }`. Pure function — no React primitives; reusable on any future listing page.

## Files Modified

- `src/components/marketing/blog/blog-list.tsx` — integrated pagination:
  - Reads `?page` URL param alongside existing `?category`.
  - Pipes filtered posts through `usePagination(filtered, 6, currentPage)`.
  - Renders `pageItems` (6 posts) in the grid when not searching.
  - Shows `<Pagination>` controls below the grid when there is more than one page.
  - When a text search query is active, all matching results are shown without page controls (navigating to a page number would clear the local search state).

## Key Decisions

- **Page size 6**: fits the 2- and 3-column grid evenly; produces 3 pages for current 18-post corpus.
- **URL-based pagination**: `?page=N` — shareable, bookmarkable, consistent with `?category=x`.
- **Search uses pagination**: filtered results paginate like the default list; changing the search query resets to page 1 (search stays client-side).
- **Ellipsis logic**: `getPageNumbers` in `blog-list.tsx` handles ranges > 7 pages with leading/trailing ellipsis — future-proofed for a growing blog.
- **Blog list UX**: client-side filter state with URL sync; posts-only pending state; scroll-to-posts on page/category change (`prefers-reduced-motion` uses instant scroll).
- **Shared helpers** in `src/lib/blog.ts` (URL params, `BLOG_LIST_PAGE_SIZE`, search filter) and `src/lib/pagination.ts` (`getPaginationPageNumbers`).
