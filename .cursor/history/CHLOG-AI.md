# AI change log

Two-line entries appended after material architecture, routing, SEO, CI, or agent-system changes.

2026-05-27 — Bootstrap layered AI guidance (AGENTS.md, .cursor rules/skills/agents/templates, CI workflows).
.cursor/, docs/engineering/, .github/workflows/

2026-05-27 — Post-review fixes: lint (blog-toc, iphone-mockup), getSiteUrl for sitemap, /solutions in sitemap, project-index typo, README AI section.
src/lib/use-is-client.ts, src/lib/site-url.ts, docs/README, quality-gates retries

2026-05-27 — Homepage motion system: shared Reveal primitives, Process1 active-step scroll, reduced-motion/mobile tokens.
src/lib/motion/, src/components/marketing/motion/, homepage sections

2026-05-27 — Card grid motion (CardReveal per-item viewport), marketing spacing tokens, Process1 layout/CLS fixes, CTA motion-a11y pass.
globals.css, motion/, process1-*, hero/faq/pricing sections

2026-06-05 — Freelancers PRD page, unified content-sized marketing carousel, phone screenshot constants in lib.
solutions/, marketing-carousel*, freelancer-niche-selector, phone-screenshots.ts

2026-08-22 — Consent-gated Meta Pixel, CTA conversions, and fbclid/UTM handoff to the app.
src/lib/meta-pixel.ts, marketing-consent, GetCardCta / outbound app links

2026-08-26 — Meta Pixel consent mode: load base snippet with revoke; grant only after banner accept.
src/components/providers/meta-pixel.tsx, src/lib/meta-pixel.ts

2026-08-26 — Fire Meta Pixel on Accept click via server-rendered stub + syncMetaPixelConsent.
src/components/providers/meta-pixel-bootstrap.tsx, cookie-consent-banner.tsx

