# Homepage section layout redesign (implemented)

**Status:** Shipped — CardUx + Dashboard use `FeatureSpotlight`; Solutions use Embla carousel.

## Summary

- **CardUxSection** — 8 feature cards replaced with auto-advancing `FeatureSpotlight` (Framer Motion) beside phone preview.
- **SolutionsGrid** — 6 solution cards in responsive Embla carousel (1 / 2 / 3 per view).
- **DashboardSection** — 5 feature cards replaced with `FeatureSpotlight` beside dashboard screenshot.

## New primitives

- `src/components/marketing/primitives/feature-spotlight.tsx`
- `src/components/ui/carousel.tsx` (shadcn / Embla)

## Verification

```bash
npm run typecheck && npm run lint && npm run build
```

Manual: reduced motion, carousel swipe on mobile, spotlight dot nav keyboard, sticky phone column on lg+.
