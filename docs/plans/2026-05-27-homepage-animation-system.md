# Homepage animation system (implemented)

**Status:** Shipped on homepage (`src/app/page.tsx`).

## Summary

- Shared motion layer: `src/lib/motion/`, `src/components/marketing/motion/`.
- All homepage sections use `Reveal*` + `useMotionConfig` (reduced motion + mobile simplification).
- Process1: sticky sidebar + `Process1Steps` with IntersectionObserver active step + progress rail (desktop).
- Native scroll only (no Lenis). Removed unused `motion` npm package and legacy CSS keyframes.

## Phase 2 (not in this delivery)

Apply same primitives to solutions, pricing, FAQ, and blog pages.

## Verification

```bash
npm run typecheck && npm run lint && npm run build
```

Manual: `prefers-reduced-motion`, mobile Process1 step tracking, `#how-it-works` anchor with fixed nav.
