# Content module checklist

Use when editing `src/content/**` (blog, FAQ, pricing).

## Blog post

- [ ] Unique `slug`
- [ ] Valid `category`
- [ ] ISO `date`
- [ ] `headings[].id` matches `##` sections in `content`
- [ ] `coverImage` host allowed in `next.config.ts`
- [ ] Build passes (`generateStaticParams` picks up slug)

## FAQ

- [ ] Entries consumed by `FaqAccordion` / page content — no duplicate copy in components

## Pricing

- [ ] Plan data matches UI in `src/components/marketing/pricing/`
- [ ] CTA links use constants / `GetCardCta` patterns

## After publish

- [ ] Sitemap (blog auto; static pages manual in `sitemap.ts`)
- [ ] Spot-check rendered page
