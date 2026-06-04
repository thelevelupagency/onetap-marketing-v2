# Blog reader experience

**Date:** 2026-06-04  
**Status:** Implemented (18/18 posts migrated)

## Summary

Extended light-markdown rendering for blog posts, improved reading chrome (narrow measure, reading time, desktop + mobile TOC), and migrated all 18 articles to the scannable authoring pattern.

## Changes

### Parser and UI

- `src/lib/blog-markdown.ts` — parse lists, `###`, images, callouts, ignore `read-time:` artifacts
- `src/components/marketing/blog/blocks/*` — list, figure, callout, renderer
- `src/components/marketing/blog/blog-rich-text.tsx` — bold, external URLs, `/blog/` links
- `src/components/marketing/blog/blog-post-content.tsx` — `max-w-prose`, block renderer
- `src/components/marketing/blog/blog-toc.tsx` — `BlogToc` (desktop sidebar) and `BlogTocMobile` pills for `<lg`; **level-2 sections only** via `getTocHeadings()`
- `src/app/blog/[slug]/page.tsx` — mobile TOC above hero (`BlogTocMobile` self-hides when no sections)
- `src/lib/blog.ts` — `estimateReadingMinutes`, `getTocHeadings()`, `resolveTocActiveId()`, `getBlogLinkLabel()`

### Content (18/18 posts)

All posts use light markdown: short paragraphs, `-` lists, `###` subheads, inline images on substantive articles, synced `headings[]`, and optional callouts. No `keyTakeaways` field.

**Copywriter (7):** `what-is-a-digital-business-card`, `digital-business-card-vs-paper-business-card`, `how-to-create-a-digital-business-card`, `digital-business-card-for-small-business`, `digital-business-card-for-real-estate-agents`, `nfc-business-card-explained`, `digital-business-card-examples`

**Editorial (11):** `where-to-share-digital-business-card`, `networking-follow-up-with-digital-card`, `digital-card-lead-capture-best-practices`, `how-to-read-digital-card-analytics`, `agency-team-digital-card-rollout`, `consultant-discovery-calls-case-study`, `realtor-open-house-leads-case-study`, `photographer-booking-requests-case-study`, `onetap-lead-center-update-june-2026`, `onetap-agency-brand-templates-may-2026`, `onetap-card-editor-templates-april-2026`

## Supported authoring syntax

| Syntax | Renders as |
|--------|------------|
| `## Title` | Section `h2` (top-level `content[]` block) |
| `### Title` | `h3` in body (not in on-page TOC) |
| `- item` or `• item` | Bullet list |
| `1. item` | Numbered list |
| `**text**` | Bold |
| `![alt](url)` | Inline figure |
| `> Tip: …` / `> Summary: …` | Callout |
| `/blog/slug` | Internal link with short label via `getBlogLinkLabel()` |

## Verification

- `npm run typecheck`
- `npm run lint`
- `npm run build`
- Manual: sample posts per wave on mobile + desktop (inline images, lists, TOC anchors, reading time)
