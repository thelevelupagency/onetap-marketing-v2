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
7. **Hero CTA row stays LTR** — entire slug + button row uses `dir="ltr"` ([`HeroSection`](../../src/components/marketing/sections/hero-section.tsx)); Hebrew labels only, layout matches English.
8. **App handoff** — outbound CTAs append `lang=en|he` via `appendLocaleParam` / `navigateToApp`.

## Reserved English tokens (Hebrew copy)

Match onetap-app billing chrome: keep **SKU and brand names** in Latin inside Hebrew sentences — no `dir="ltr"` wrapper.

| Token | Rule |
|-------|------|
| OneTap / OneTap-Card | Always Latin |
| Free / Pro / Team | Plan **name** fields stay English |
| `חינם` / “free” as adverb | OK in CTAs (`התחילו בחינם`) |

Allowlist enforced by `npm run check:i18n-copy` (`scripts/check-i18n-copy.ts`).

## RTL exceptions (keep physical / LTR islands)

- Phone/card mockups and infinite `scrollLeft` tracks (`dir="ltr"` on scroll container).
- Hero CTA row (full slug + buttons block).
- Desktop process graph canvas + header overlay.
- Horizontal Embla carousel viewport.
- True centering (`left-1/2 -translate-x-1/2`), full-bleed `inset-x-0`.
- Decorative ambient blobs.

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
4. Run `npm run check:i18n-rtl`, `npm run check:i18n-copy`, typecheck, lint, build.

## Routing

## Verification

```bash
npm run check:i18n-rtl
npm run check:i18n-copy
npm run typecheck && npm run lint && npm run build
```
