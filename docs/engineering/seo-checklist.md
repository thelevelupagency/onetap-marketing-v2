# SEO checklist (marketing v2)

Use when adding routes, changing metadata, or shipping major content updates.

## Per page

- [ ] `export const metadata` with unique `title` and `description`
- [ ] `openGraph` where the route is shareable (blog posts, key landings)
- [ ] Page uses semantic heading order (`h1` once per view)

## Site-wide

- [ ] New public route added to `src/app/sitemap.ts` (if not covered by dynamic blog slugs)
- [ ] Canonical host matches production (`getSiteUrl()` / `NEXT_PUBLIC_SITE_URL`, default `https://onetap-card.com`)
- [x] `metadataBase` in root layout (`src/app/layout.tsx`) for absolute OG URLs
- [ ] `/solutions` index listed in sitemap when that route is public
- [ ] `lang="en"` on `<html>` until i18n is implemented

## Gaps (optional follow-ups)

- [ ] `robots.txt` route or static file
- [ ] JSON-LD for organization / product where valuable

## Blog

- [ ] Slug in `src/content/blog/posts.ts` matches `generateStaticParams`
- [ ] `headings[]` ids and text align with every `##` and `###` in `content` (build asserts on import)
- [ ] Only `level: 2` headings appear in on-page TOC; `level: 3` is in-article anchors only
