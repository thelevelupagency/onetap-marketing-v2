# Privacy and security (marketing site)

Canonical compliance checklist: **`onetap-app`** → [`docs/compliance-and-security-master-plan.md`](../../../onetap-app/docs/compliance-and-security-master-plan.md) (§2.2 `onetap-marketing-v2`).

## Current posture (static site)

| Area | Status |
|------|--------|
| Third-party trackers | None (no PostHog, GA4, Meta Pixel, Vercel Analytics) |
| Cookies | None; `sessionStorage` only for blog scroll-spy and back-navigation UX |
| Cookie banner | Not required while no non-essential trackers are present |
| Privacy / Terms | Footer links to app canonical pages via `NEXT_PUBLIC_MAIN_APP_URL` |
| Newsletter | Disabled until a real subscribe API exists |
| Security headers | `next.config.ts` `headers()` + `src/lib/security/*` |
| Public APIs | None (`src/app/api/**` dormant) |

## When adding APIs or trackers

- Activate `.cursor/rules/marketing-api-future.mdc` and `.cursor/skills/marketing-api-delivery/SKILL.md`
- Zod validation, rate limits, Turnstile on public forms, scrubbed logs
- Cookie consent banner **before** loading non-essential marketing/analytics scripts (EU/UK default)

## Environment

See [environment-variables.md](./environment-variables.md). Only `NEXT_PUBLIC_*` origins ship to the browser until server APIs exist.
