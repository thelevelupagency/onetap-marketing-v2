# Marketing i18n (English + Hebrew)

Canonical guide for bilingual marketing site localization and RTL chrome.

**Owning skill:** [`.cursor/skills/marketing-i18n-change/SKILL.md`](../../.cursor/skills/marketing-i18n-change/SKILL.md)

## Invariants

1. **Two locales only** — `en` (unprefixed URLs) and `he` (`/he/...`). Catalog: [`src/lib/i18n/config.ts`](../../src/lib/i18n/config.ts).
2. **No Hebrew-only policy** — use `isNonDefaultLocale()` / `isRtlLocale()`; never `locale === "he"` in policy or layout.
3. **Live `html lang/dir`** — [`LocaleProvider`](../../src/components/providers/locale-provider.tsx) syncs `document.documentElement` on pathname change (client navigations).
4. **Chrome remounts per locale** — nav/footer live in [`src/app/[locale]/layout.tsx`](../../src/app/[locale]/layout.tsx).
5. **Copy in both trees** — parallel TS under `src/content/en/` and `src/content/he/`; access via `getContent(locale)`.
6. **Logical CSS** — prefer `start`/`end`, `ps`/`pe`, `ms`/`me`, `text-start` for layout; not `left`/`right`/`pl`/`pr`.
7. **Slug URL island stays LTR** — `dir="ltr"` on the slug field shell only ([`SlugClaimCta`](../../src/components/marketing/slug-claim-cta.tsx)).
8. **App handoff** — outbound CTAs append `lang=en|he` via `appendLocaleParam` / `navigateToApp`.

## Routing

| URL | Locale | `dir` |
|-----|--------|-------|
| `/`, `/pricing`, … | `en` | `ltr` |
| `/he`, `/he/pricing`, … | `he` | `rtl` |

Middleware rewrites unprefixed paths to `/en/...` internally; browser URL stays unprefixed for English.

## Language switcher

Globe icon + dropdown ([`LanguageSwitcher`](../../src/components/marketing/language-switcher.tsx)) — preserves query string (`utm_*`, `fbclid`).

## Copy change recipe

1. Update type in [`src/content/en/chrome.ts`](../../src/content/en/chrome.ts) if shape changes.
2. Update **both** `src/content/en/**` and `src/content/he/**` in the same change.
3. Wire components to `getChrome(locale)` / page content accessors — no hardcoded UI strings.
4. Run `npm run check:i18n-rtl`, typecheck, lint, build.

## RTL exceptions (keep physical)

- Phone/card mockups (product preview, not marketing chrome).
- True centering (`left-1/2 -translate-x-1/2`), full-bleed `inset-x-0`.
- Decorative ambient blobs.

## Verification

```bash
npm run check:i18n-rtl
npm run typecheck && npm run lint && npm run build
```

Manual: switch `/` ↔ `/he`; confirm nav, footer, cookie banner, and body copy flip; mobile sheet opens from the end side in RTL.
