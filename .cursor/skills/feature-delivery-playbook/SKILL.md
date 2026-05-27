---
name: feature-delivery-playbook
description: Delivers marketing features plan-first from scope to verification without slice folders. Use for cross-cutting enhancements, new sections, or multi-file marketing work.
---

# Feature Delivery Playbook (marketing)

## Workflow

1. Define scope (static site constraints; no Redux/slices unless APIs requested).
2. Identify layers: `src/app`, `src/components/marketing`, `src/content`, `src/lib`.
3. Concise plan with risks and verification (typecheck, lint, build, SEO).
4. Implement in small slices after approval for substantial work.
5. Update `CHLOG-AI.md` if architecture or route map changes materially.

## Checklist

- [ ] Scoped to marketing needs
- [ ] Component-system and content boundaries respected
- [ ] Sitemap/metadata updated when routes change
- [ ] CI commands pass

## Output format

```markdown
Feature plan:
- Scope:
- Risks:
- Verification:

Implementation result:
- Files changed:
- Behavior changes:
- Checks run:
```
