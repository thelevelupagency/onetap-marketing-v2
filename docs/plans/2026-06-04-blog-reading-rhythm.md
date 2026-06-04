# Blog reading rhythm

**Date:** 2026-06-04  
**Status:** Implemented

## Goal

Make blog posts easier to read by reducing oversized vertical gaps between paragraphs and sections, without changing global marketing stack spacing site-wide.

## Root cause

1. `@tailwindcss/typography` default `p` / heading margins stacked on top of flex `gap-marketing-stack-gap` (24px).
2. Section blocks added a second 24px via `pt-marketing-stack-gap` on top of article flex gap (~48px between sections).
3. Body copy used `leading-7` instead of `type-body`’s `leading-relaxed`.

## Changes

### Tokens (`src/app/globals.css`)

| Token | Value | Utility |
|-------|-------|---------|
| `--marketing-prose-gap` | `spacing * 3` (~12px) | `gap-marketing-prose-gap` |
| `--marketing-prose-section-gap` | `spacing * 7` (~28px) | `gap-marketing-prose-section-gap`, `pt-marketing-prose-section-gap` |

Documented in `docs/component-system.md`.

### `BlogPostContent`

- Article: `gap-marketing-prose-section-gap`, `prose-p:my-0`, `prose-headings:mt-0 prose-headings:mb-0`.
- Paragraph groups: wrapper with `gap-marketing-prose-gap`.
- Sections: removed `pt-marketing-stack-gap`; border-top only (no double padding); `gap-2` between `h2` and body.
- Body: `typography.body` only (removed `leading-7`).

### `blog/[slug]/page.tsx`

- Title block and cover image: `mb-marketing-stack-gap-sm`.
- Share row: `mt-marketing-prose-section-gap`.

## Out of scope

- Content rewrites in `src/content/blog/*.ts`
- MDX / bullet list renderer
- Global `--marketing-stack-gap` changes

## Verification

- [x] `npm run typecheck`
- [x] `npm run lint`
- [x] `npm run build`
- Manual: `/blog/what-is-a-digital-business-card` and one shorter post (desktop + mobile)
