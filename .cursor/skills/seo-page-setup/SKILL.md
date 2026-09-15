---
name: seo-page-setup
description: Configures SEO and GEO (AI search) for marketing routes — metadata, sitemap, JSON-LD, llms.txt, and canonical www. Use when changing SEO, adding public pages, or auditing discoverability.
---

# SEO + GEO Page Setup

## Workflow

1. Read [`docs/guides/marketing-seo-geo.md`](../../../docs/guides/marketing-seo-geo.md) and [`docs/engineering/seo-checklist.md`](../../../docs/engineering/seo-checklist.md).
2. Honor [`.cursor/rules/seo-geo-standard.mdc`](../../rules/seo-geo-standard.mdc) (www host, dynamic robots/sitemap, bilingual, preview noindex).
3. Update route `metadata` via `buildLocaleMetadata` (or blog `generateMetadata`) with unique title, description, and Open Graph where shareable.
4. Confirm canonical base via `getSiteUrl()` — production must be `https://www.onetap-card.com`.
5. Update `src/app/sitemap.ts` for new **static** public routes; blog slugs come from `getAllSlugs()` / `getBlogPosts()`.
6. Add or extend JSON-LD via `src/lib/seo/json-ld.ts` + `<JsonLd />` (match visible copy).
7. If this is a **primary landing** (home/pricing/solutions/faq/blog-level), update `/llms.txt` (`src/app/llms.txt/route.ts`).
8. Touch `src/app/robots.ts` only when crawl policy changes (legal/product decision).
9. Run build; spot-check `<title>`, canonical, hreflang, JSON-LD; curl `/robots.txt` and `/sitemap.xml` when discovery files change.

## Checklist

- [ ] Unique title and description per route (EN + HE)
- [ ] Canonical and OG URLs use `getSiteUrl()` (www)
- [ ] Sitemap coverage for new static URLs (or automatic for blog)
- [ ] JSON-LD type(s) appropriate; FAQPage only on `/faq`
- [ ] `/llms.txt` updated if primary landing added/removed
- [ ] No orphan public routes; no app/dashboard URLs in sitemap
- [ ] Blog OG/image fields when applicable

## Output format

```markdown
SEO / GEO changes:
- Routes:
- Canonical host:
- Metadata updates:
- Sitemap:
- JSON-LD:
- llms.txt:
- Robots (if changed):

Verification:
- typecheck / lint / build:
- curl robots/sitemap (if discovery changed):
```
