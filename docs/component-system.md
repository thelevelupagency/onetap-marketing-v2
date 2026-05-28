# Marketing component system

Reusable layout and brand primitives live in `src/components/marketing/primitives/`. Domain sections live under `sections/`, `pricing/`, `blog/`, `solutions/`, and `phones/`.

**AI contributors:** See [`AGENTS.md`](../AGENTS.md) and [`.cursor/rules/marketing-component-system.mdc`](../.cursor/rules/marketing-component-system.mdc) for enforcement and delivery skills under `.cursor/skills/`.

## Rules

1. **Pages** — metadata + `PageShell` + `PageHero` + domain sections only. No raw `container` or section `py-*` on route files. Use `PageShell offsetTop="none"` when the page starts with `MarketingPageHero` (hero supplies nav offset).
2. **Sections** — `MarketingSection` + `SectionHeader` + content. Do not hand-roll section padding.
3. **Headlines** — `SectionHeader` / `PageHero` with optional `accent` prop. Never inline `italic text-brand-turquoise`.
4. **CTAs** — `GetCardCta` for signup flows (`CREATE_BASICS_URL` via `@/lib/constants`), `MarketingPrimaryButton` for other primaries (e.g. demo → `LOGIN_URL`). Shared sizes in `get-card-cta.tsx`: `lg` (h-14, heroes + final CTA), `md` (h-12, in-section), `nav` / `sm` (compact). Do not hardcode app origins in new UI.
5. **FAQs** — `FaqAccordion` + data from `src/content/faqs.ts` (`faqPageEntries`, audience arrays for solution pages). FAQ index: `CategoryFilterPills` with `onSelect` (in-place filter) + `faqEntryMatchesQuery` in `@/lib/search`.
6. **Final CTA** — `FinalCtaSection` with `variant` from `@/content/final-cta.ts` on every page above the footer. Use `PageShell pageBottom="none"` when the final CTA is the last block (avoids a cream gap above the footer).
7. **Solution pages** — Copy in `src/content/solutions.ts`; compose via `*-solution-sections.tsx` under `solutions/`; thin `src/app/solutions/*/page.tsx` with `metadata` + `PageShell` only. Alternate `MarketingSection` backgrounds (`cream` / `white`) between bands; optional `background` prop on shared sections defaults to homepage behavior.
8. **Typography** — `import { type } from "@/lib/typography"` in TSX (kept in sync with `@utility` in `globals.css`).
9. **Split sections** — `SplitContentSection` + `splitCopyColumnClass` (centers copy/CTAs on mobile, left-aligns at `lg+`). `SectionHeader align="left"` is centered on mobile automatically.

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

- Tokens and hooks: `@/lib/motion` (`useMotionConfig`, `useRevealVisibility`, `MOTION_VIEWPORT`).
- Back navigation: `BackNavigationReloadScript` in `src/app/layout.tsx` (inline reload before React hydrates).
- UI primitives: `@/components/marketing/motion` (`Reveal`, `RevealStagger`, `RevealItem`, `CardReveal`, `MarketingStaggerGrid`).
- Card grids: `CardReveal` uses per-item `useRevealVisibility` with `MOTION_CARD_VIEWPORT` and stronger `getCardMotionTokens()` — not the parent-grid stagger pattern (which fired too early).
- Scroll reveals use controlled `animate` (via `useInView` + in-viewport mount check), not `whileInView` in sections; hero fold uses `mode="mount"`.
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
  CategoryFilterPills,
  splitCopyColumnClass,
} from "@/components/marketing/primitives";
import { FinalCtaSection } from "@/components/marketing/sections/final-cta-section";
```

Copy types for section overrides: `@/content/marketing-copy-types` (`PainPointsCopy`, `SocialProofCopy`, `PricingHeaderCopy`, `MarketingFaqItem`).
