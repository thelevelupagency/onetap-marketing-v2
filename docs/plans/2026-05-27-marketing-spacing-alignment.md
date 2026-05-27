# Marketing spacing alignment (2026-05-27)

Plan: introduce `--marketing-*` CSS tokens in `globals.css`, wire primitives, migrate drift.

## Status

- [x] Tokens + docs (`globals.css`, `component-system.md`, `AGENTS.md`)
- [x] Primitives (`MarketingSection` hero variant, `MarketingPageHero`, token-based spacing)
- [x] Section + route migrations
- [x] CI: typecheck, lint, build

## Decisions

- Home hero: `pt-marketing-page-top` + `pb-marketing-hero-bottom` via `spacing="hero"`.
- Solution heroes: `MarketingPageHero` + `PageShell` on solution routes.
- Card padding: `p-marketing-card-padding` (`1.5rem`).
