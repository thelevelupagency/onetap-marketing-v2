# Marketing component system

Reusable layout and brand primitives live in `src/components/marketing/primitives/`. Domain sections live under `sections/`, `pricing/`, `blog/`, `solutions/`, and `phones/`.

**AI contributors:** See [`AGENTS.md`](../AGENTS.md) and [`.cursor/rules/marketing-component-system.mdc`](../.cursor/rules/marketing-component-system.mdc) for enforcement and delivery skills under `.cursor/skills/`.

## Rules

1. **Pages** — metadata + `PageShell` + `PageHero` + domain sections only. No raw `container` or section `py-*` on route files. Use `PageShell offsetTop="none"` when the page starts with `MarketingPageHero` (hero supplies nav offset).
2. **Sections** — `MarketingSection` + `SectionHeader` + content. Do not hand-roll section padding.
3. **Headlines** — `SectionHeader` / `PageHero` with optional `accent` prop. Never inline `italic text-brand-turquoise`.
4. **CTAs** — `GetCardCta` for signup flows, or `Button variant="brandPrimary"` for other primary actions.
5. **FAQs** — `FaqAccordion` + data from `src/content/`.
6. **Typography** — `import { type } from "@/lib/typography"` in TSX (kept in sync with `@utility` in `globals.css`).

## Spacing contract

CSS variables live in `src/app/globals.css` (`:root` + `@theme` aliases). Primitives consume Tailwind utilities derived from those tokens — do not hardcode `py-24` / `pt-32` in new code.

| CSS variable | Tailwind utility | Use |
|--------------|------------------|-----|
| `--marketing-gutter-x` / `--marketing-gutter-x-md` | `px-marketing-gutter-x md:px-marketing-gutter-x-md` | `MarketingContainer`, nav, footer |
| `--marketing-page-top` | `pt-marketing-page-top` | `PageShell`, `MarketingSection spacing="hero"` |
| `--marketing-page-bottom` | `pb-marketing-page-bottom` | `PageShell` |
| `--marketing-section-y` | `py-marketing-section-y` | `MarketingSection` default |
| `--marketing-section-y-compact` | `py-marketing-section-y-compact` | `MarketingSection` compact |
| `--marketing-hero-bottom` | `pb-marketing-hero-bottom` | Fold heroes (`spacing="hero"`, `MarketingPageHero`) |
| `--marketing-header-gap` | `mb-marketing-header-gap` | `PageHero` |
| `--marketing-header-gap-md` | `mb-marketing-header-gap-md` | `SectionHeader` (default) |
| `--marketing-card-padding` | `p-marketing-card-padding` | Marketing cards / tiles |
| `--marketing-grid-gap` | `gap-marketing-grid-gap` | Card grids (mobile / default row gap) |
| `--marketing-grid-gap-md` | `md:gap-marketing-grid-gap-md` | Card grids at `md+` |
| `--marketing-stack-gap` | `gap-marketing-stack-gap`, `space-y-marketing-stack-gap` | Split sections, vertical stacks |
| `--marketing-stack-gap-sm` | `gap-marketing-stack-gap-sm`, `space-y-marketing-stack-gap-sm` | Dense rows (FAQ accordion, compact features) |

| `MarketingSection` spacing | When |
|----------------------------|------|
| `default` | Standard sections (`py-marketing-section-y`) |
| `compact` | Dense bands, split sections, CTA bands |
| `hero` | Home / solution fold heroes (page-top + hero-bottom only) |
| `none` | Custom inner layout only — rare |

| `MarketingContainer` width | Max width |
|----------------------------|-----------|
| `narrow` | `max-w-3xl` |
| `default` | `max-w-5xl` |
| `wide` | `max-w-6xl` |
| `full` | `max-w-7xl` |
| `prose` | `max-w-4xl` |

## Motion (homepage / marketing sections)

- Tokens and hooks: `@/lib/motion` (`useMotionConfig`, `MOTION_VIEWPORT`).
- UI primitives: `@/components/marketing/motion` (`Reveal`, `RevealStagger`, `RevealItem`, `CardReveal`, `MarketingStaggerGrid`).
- Card grids: `CardReveal` uses per-item `whileInView` (`MOTION_CARD_VIEWPORT`) with stronger `getCardMotionTokens()` — not the parent-grid stagger pattern (which fired too early).
- Scroll reveals use `whileInView` with `viewport.once`; hero fold uses `mode="mount"`.
- Do not duplicate raw `initial={{ opacity: 0, y: 20 }}` in sections — see `.cursor/rules/motion-a11y.mdc`.

## Imports

```tsx
import {
  MarketingSection,
  MarketingContainer,
  PageShell,
  PageHero,
  MarketingPageHero,
  SectionHeader,
  FaqAccordion,
  MarketingBadge,
} from "@/components/marketing/primitives";
```
