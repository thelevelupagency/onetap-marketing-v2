# SEO checklist (marketing v2)

Use when adding routes, changing metadata, or shipping major content updates.

## Per page

- [ ] `export const metadata` with unique `title` and `description`
- [ ] `openGraph` where the route is shareable (blog posts, key landings)
- [ ] Page uses semantic heading order (`h1` once per view)

## Site-wide

- [ ] New public route added to `src/app/sitemap.ts` (if not covered by dynamic blog slugs)
- [ ] Canonical host matches production (`getSiteUrl()` / `NEXT_PUBLIC_SITE_URL`, default `https://onetap-card.com`)
- [ ] `/solutions` index listed in sitemap when that route is public
- [ ] `lang="en"` on `<html>` until i18n is implemented

## Gaps (optional follow-ups)

- [ ] `robots.txt` route or static file
- [ ] JSON-LD for organization / product where valuable
- [ ] `metadataBase` in root layout for absolute OG URLs

## Blog

- [ ] Slug in `src/content/blog/posts.ts` matches `generateStaticParams`
- [ ] `headings` ids align with markdown-style `##` blocks in `content`
