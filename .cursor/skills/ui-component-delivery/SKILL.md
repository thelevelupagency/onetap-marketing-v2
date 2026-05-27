---
name: ui-component-delivery
description: Builds and refactors marketing UI with Server/Client boundaries, component-system compliance, and accessibility defaults. Use when creating or updating components under src/components/marketing or layout.
---

# UI Component Delivery (marketing)

## Workflow

1. Confirm purpose: primitive vs section vs layout.
2. Read `docs/component-system.md`.
3. Default to Server Component; add `"use client"` only when needed.
4. Use primitives (`MarketingSection`, `SectionHeader`, etc.) before new shells.
5. Use `@/lib/typography` and brand tokens — no ad-hoc accent spans.
6. Run typecheck, lint, build.

## Checklist

- [ ] Typed props
- [ ] Spacing via component system
- [ ] Keyboard/focus for interactive UI
- [ ] `useReducedMotion` for motion components

## Output format

```markdown
UI delivery:
- Components:
- Server vs client:
- Component-system compliance:

Verification:
```
