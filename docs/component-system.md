# Marketing component system

Reusable layout and brand primitives live in `src/components/marketing/primitives/`. Domain sections live under `sections/`, `pricing/`, `blog/`, `solutions/`, and `phones/`.

**AI contributors:** See [`AGENTS.md`](../AGENTS.md) and [`.cursor/rules/marketing-component-system.mdc`](../.cursor/rules/marketing-component-system.mdc) for enforcement and delivery skills under `.cursor/skills/`.

## Rules

1. **Pages** — metadata + `PageShell` + `PageHero` + domain sections only. No raw `container` or section `py-*` on route files.
2. **Sections** — `MarketingSection` + `SectionHeader` + content. Do not hand-roll section padding.
3. **Headlines** — `SectionHeader` / `PageHero` with optional `accent` prop. Never inline `italic text-brand-turquoise`.
4. **CTAs** — `GetCardCta` for signup flows, or `Button variant="brandPrimary"` for other primary actions.
5. **FAQs** — `FaqAccordion` + data from `src/content/`.
6. **Typography** — `import { type } from "@/lib/typography"` in TSX (kept in sync with `@utility` in `globals.css`).

## Spacing contract

| Token | Value |
|-------|--------|
| Horizontal padding | `px-4 md:px-8` (via `MarketingContainer`) |
| Section vertical | `py-24` default; `py-16` compact only |
| Page top offset | `pt-32` under fixed nav (`PageShell`) |
| Max widths | `narrow` 3xl, `default` 5xl, `wide` 6xl, `full` 7xl |

## Imports

```tsx
import {
  MarketingSection,
  MarketingContainer,
  PageShell,
  PageHero,
  SectionHeader,
  FaqAccordion,
  MarketingBadge,
} from "@/components/marketing/primitives";
```
