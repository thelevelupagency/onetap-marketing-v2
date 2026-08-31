---
name: marketing-i18n-change
description: Checklist for marketing i18n copy, locale switcher, RTL logical CSS, and en/he content trees. Use when changing bilingual marketing chrome, Hebrew routes, or layout mirroring.
---

# Marketing i18n Change

## Anchors

- Guide: [`docs/guides/marketing-i18n.md`](../../docs/guides/marketing-i18n.md)
- Catalog: [`src/lib/i18n/config.ts`](../../src/lib/i18n/config.ts)
- Content accessors: [`src/content/get-content.ts`](../../src/content/get-content.ts)
- Locale runtime: [`src/components/providers/locale-provider.tsx`](../../src/components/providers/locale-provider.tsx)
- CI: `npm run check:i18n-rtl`

## Checklist

- [ ] User-facing chrome string? Update **both** `src/content/en/**` and `src/content/he/**`
- [ ] New chrome key? Extend `ChromeCopy` type in `en/chrome.ts` + both locale files
- [ ] Layout/spacing? Logical CSS (`start`/`end`, `ps`/`pe`, `text-start`) — not `left`/`right`
- [ ] Directional icon? `rtl:-scale-x-100` on arrows/chevrons
- [ ] Slug field? Keep `dir="ltr"` on URL island only
- [ ] Policy/locale checks? `isNonDefaultLocale` / `isRtlLocale` — **no** `locale === "he"`
- [ ] Nav/footer? Wired through `[locale]/layout.tsx` with locale param
- [ ] Outbound app URL? `appendLocaleParam` / `navigateToApp` includes `lang`

## Required checks

```bash
npm run check:i18n-rtl
npm run typecheck && npm run lint && npm run build
```

## Stack with

- `ui-component-delivery`, `seo-page-setup`, `feature-delivery-playbook`
