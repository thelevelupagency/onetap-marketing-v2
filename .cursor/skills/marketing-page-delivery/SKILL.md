---
name: marketing-page-delivery
description: Delivers new marketing or solutions pages with metadata, primitives, sitemap updates, and CI verification. Use when adding routes under src/app/ or new solutions landings.
---

# Marketing Page Delivery

## Workflow

1. Confirm route path, metadata (title, description, OG), and whether `PageShell` applies.
2. Read `docs/component-system.md` and scan similar pages (for example `src/app/faq/page.tsx`).
3. Add `src/app/<segment>/page.tsx` with `export const metadata`.
4. Create or reuse sections under `src/components/marketing/`.
5. Update `src/app/sitemap.ts` for new static URLs.
6. Run `npm run typecheck`, `npm run lint`, `npm run build`.

## Checklist

- [ ] No hand-rolled section `py-*` on `page.tsx`
- [ ] CTAs use `GetCardCta` / constants — no hardcoded app URLs
- [ ] Sitemap includes new public URL
- [ ] Semantic heading structure

## Output format

```markdown
Page delivery:
- Route:
- Metadata:
- Sections/components:
- Sitemap updated: yes/no

Verification:
- typecheck / lint / build:
- Manual notes:
```
