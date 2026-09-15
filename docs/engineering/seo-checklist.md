# SEO checklist (marketing v2)

Use when adding routes, changing metadata, or shipping major content updates.  
Guide: [`docs/guides/marketing-seo-geo.md`](../guides/marketing-seo-geo.md).  
Agent standard: [`.cursor/rules/seo-geo-standard.mdc`](../../.cursor/rules/seo-geo-standard.mdc).

## Per page

- [ ] `export const metadata` / `generateMetadata` with unique `title` and `description` (EN + HE)
- [ ] `openGraph` where the route is shareable (blog posts, key landings)
- [ ] Canonical and OG URLs via `getSiteUrl()` / `buildLocaleMetadata` (www host)
- [ ] Page uses semantic heading order (`h1` once per view)
- [ ] JSON-LD matches visible copy when the route type requires it (see guide schema map)

## Site-wide

- [x] Canonical host is www (`getSiteUrl()` / `NEXT_PUBLIC_SITE_URL`, default `https://www.onetap-card.com`)
- [x] `metadataBase` in root layout for absolute OG URLs
- [x] `<html lang>` / `dir` set per locale via middleware + root layout (`en` LTR, `he` RTL)
- [x] Locale URLs: English unprefixed; Hebrew under `/he`
- [x] `hreflang` via `alternates.languages` on pages and sitemap
- [x] `/robots.txt` via `src/app/robots.ts` (Allow `/`, www Sitemap, preview Disallow)
- [x] `/sitemap.xml` via `src/app/sitemap.ts` (dynamic; no stale `public/sitemap.xml`)
- [x] `/llms.txt` for AI/GEO brand brief (keep truthful when primary landings change)
- [x] Preview deployments `noindex` (root metadata when `VERCEL_ENV === "preview"`)
- [ ] New public static route added to `src/app/sitemap.ts` (blog slugs automatic)
- [ ] Primary landing add/remove updates `/llms.txt`
- [ ] `/solutions` index listed in sitemap when that route is public (currently redirects; still listed)

## Blog

- [ ] Slug in content modules matches `generateStaticParams`
- [ ] `headings[]` ids and text align with every `##` and `###` in `content` (build asserts on import)
- [ ] Only `level: 2` headings appear in on-page TOC; `level: 3` is in-article anchors only
- [ ] `BlogPosting` JSON-LD present via shared helper

## Avoid

- Apex URLs in sitemap, canonicals, or JSON-LD
- Hand-maintained `public/robots.txt` / `public/sitemap.xml`
- FAQPage schema outside `/faq`
- App/dashboard/billing URLs in the marketing sitemap
- Making Vercel previews indexable
