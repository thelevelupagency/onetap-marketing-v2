---
name: seo-page-setup
description: Configures metadata, Open Graph, and sitemap entries for marketing routes. Use when changing SEO, adding public pages, or auditing discoverability.
---

# SEO Page Setup

## Workflow

1. Read `docs/engineering/seo-checklist.md`.
2. Update route `metadata` (and `openGraph` for shareable pages).
3. Update `src/app/sitemap.ts` for static routes; confirm blog slugs via `getAllSlugs()`.
4. Verify canonical base URL via `getSiteUrl()` (`src/lib/site-url.ts`).
5. Run build; spot-check rendered `<title>` and meta tags.

## Checklist

- [ ] Unique title and description per route
- [ ] Sitemap coverage for new URLs
- [ ] No orphan routes without intentional exclusion
- [ ] Blog OG/image fields when applicable

## Output format

```markdown
SEO changes:
- Routes:
- Metadata updates:
- Sitemap:

Gaps noted (robots, JSON-LD, metadataBase):
```
