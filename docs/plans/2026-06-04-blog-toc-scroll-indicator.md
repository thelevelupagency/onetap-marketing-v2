# Blog TOC scroll indicator

**Date:** 2026-06-04  
**Status:** Implemented

## Goal

Blog post navigation split by breakpoint:

- **Below lg (1024px):** mobile reading progress bar (article region only)
- **lg and above:** desktop “On this page” TOC with sliding rail indicator

## Architecture

- [`src/lib/blog-reading.ts`](../../src/lib/blog-reading.ts) — pure scroll/progress helpers
- [`src/lib/use-has-hydrated.ts`](../../src/lib/use-has-hydrated.ts) — hydration-safe client UI
- [`src/components/marketing/blog/blog-post-layout.tsx`](../../src/components/marketing/blog/blog-post-layout.tsx) — progress bar + scroll spy + grid shell
- [`src/components/marketing/blog/use-blog-scroll-spy.ts`](../../src/components/marketing/blog/use-blog-scroll-spy.ts) — scroll spy hook
- [`src/components/marketing/blog/blog-toc.tsx`](../../src/components/marketing/blog/blog-toc.tsx) — desktop sidebar
- [`src/components/marketing/blog/blog-reading-progress.tsx`](../../src/components/marketing/blog/blog-reading-progress.tsx) — mobile bar
- [`src/app/blog/[slug]/page.tsx`](../../src/app/blog/[slug]/page.tsx) — thin server page

## Verification

- `npm run typecheck`, `npm run lint`, `npm run build`
- Mobile: progress bar tracks `#blog-reading-region` only; hidden at lg+
- Desktop: TOC visible at lg+; no progress bar; hash + scroll restore work
- No hydration warnings on share links or TOC active state
