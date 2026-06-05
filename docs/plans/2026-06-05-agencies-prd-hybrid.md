# Agencies & Teams Solutions Page — PRD Hybrid Implementation

**Date:** 2026-06-05  
**Status:** Implemented  
**Reference:** Shipped freelancers lean funnel on `/solutions/freelancers` ([`2026-06-05-freelancers-prd-hybrid.md`](./2026-06-05-freelancers-prd-hybrid.md))

## Goal

Lean B2B landing page at `/solutions/agencies` with PRD hero (dual CTAs), workspace dashboard simulator, governance MacBook screenshots + FeatureSpotlight capabilities, and a 4-pillar enterprise grid — while dropping redundant pain points, how-it-works, generic dashboard, legacy features, and team split sections.

## Architecture

- [`src/content/solutions.ts`](../../src/content/solutions.ts) — `agenciesHeroCopy`, `agenciesWorkspaceCopy`, `agenciesGovernanceCopy`, `agenciesEnterpriseCopy`
- [`src/lib/marketing-images.ts`](../../src/lib/marketing-images.ts) — `AGENCIES_DASHBOARD_IMAGE_URL`, `AGENCIES_BRAND_LOCK_IMAGE_URL`, `AGENCIES_LEADS_CENTER_IMAGE_URL`
- [`src/content/final-cta.ts`](../../src/content/final-cta.ts) — `agencies` variant aligned to workspace/trial language
- [`src/components/marketing/solutions/agency-hero.tsx`](../../src/components/marketing/solutions/agency-hero.tsx) — midnight hero, `Start Free Trial` + `Talk to Sales`
- [`src/lib/laptop-mockup.ts`](../../src/lib/laptop-mockup.ts) — MacBook Pro 16" Figma dimensions (1728×1117 screen, 2170×1430 outer)
- [`public/marketing/devices/macbook-pro-16-silver.png`](../../public/marketing/devices/macbook-pro-16-silver.png) — bezel asset from [Figma community mockups](https://www.figma.com/design/mjqx30vEnLRYORURha0udE/Apple-Device-Mockups---iPhone--Mac--iPad--Apple-Watch--Community-?node-id=22-170)
- [`src/components/marketing/phones/macbook-pro-16-mockup.tsx`](../../src/components/marketing/phones/macbook-pro-16-mockup.tsx) — MacBook Pro 16" shell (screen slot + bezel overlay)
- [`src/components/marketing/phones/marketing-laptop-preview.tsx`](../../src/components/marketing/phones/marketing-laptop-preview.tsx) — MacBook wrapper + dashboard image
- [`src/components/marketing/solutions/agency-workspace-simulator.tsx`](../../src/components/marketing/solutions/agency-workspace-simulator.tsx) — centered MacBook hero with dashboard screenshot
- [`src/components/marketing/solutions/agency-governance-section.tsx`](../../src/components/marketing/solutions/agency-governance-section.tsx) — parent SectionHeader + Brand Lock / Leads Center rows (MacBook Pro 16 screenshots + `FeatureSpotlight`)
- [`src/components/marketing/solutions/agency-enterprise-grid.tsx`](../../src/components/marketing/solutions/agency-enterprise-grid.tsx) — 4 live-feature pillars (`PainPointCard` + `MarketingStaggerGrid`)
- [`src/components/marketing/solutions/agencies-solution-sections.tsx`](../../src/components/marketing/solutions/agencies-solution-sections.tsx) — lean section stack
- [`src/app/solutions/agencies/page.tsx`](../../src/app/solutions/agencies/page.tsx) — PRD metadata + openGraph

## Section order

| # | Section | Background |
|---|---------|------------|
| 1 | `AgencyHero` | midnight |
| 2 | `AgencyWorkspaceSimulator` | white |
| 3 | `AgencyGovernanceSection` | cream |
| 4 | `AgencyEnterpriseGrid` | white |
| 5 | `SocialProof` | cream |
| 6 | `PricingBlock` | on-white |
| 7 | `FaqSection` | cream |
| 8 | `FinalCtaSection` | variant-driven |

## Removed

- `PainPointsSection`, `DashboardSection`, `SolutionHowItWorks`
- `AgencyFeatures` (deleted), `AgencyTeamSplit` (deleted)
- `CardUxSection` — not added; agencies story uses workspace/governance mocks instead

Legacy copy exports (`agenciesPainPointsCopy`, `agenciesHowItWorksCopy`, `agenciesFeaturesCopy`) retained in `solutions.ts` but not rendered.

## Deferred

- GA4/Mixpanel analytics (per `AGENTS.md`)
- `?type=workspace` signup param (pending app register flow)
- SSO / White Label pillars (not self-serve)

## Verification

```bash
npm run typecheck && npm run lint && npm run build
```

Manual QA:

- Hero: PRD headline + dual CTAs (trial → signup, sales → login)
- Workspace: single centered MacBook mock with dashboard image; no CLS on image load; no horizontal scroll on mobile
- Governance: parent headline; Brand Lock + Leads Center badges; MacBook Pro 16 screenshots per row; `FeatureSpotlight` capability carousels; alternating column order on desktop
- Enterprise: 4 live pillars only; hover lift matches freelancers card-includes
- Social proof → final CTA unchanged behavior
- No orphaned imports to deleted agency components
