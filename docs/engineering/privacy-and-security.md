# Privacy and security (marketing site)

Canonical compliance checklist: **`onetap-app`** → [`docs/compliance-and-security-master-plan.md`](../../../onetap-app/docs/compliance-and-security-master-plan.md) (§2.2 `onetap-marketing-v2`).

## Current posture (static site)

| Area | Status |
|------|--------|
| Third-party trackers | Meta Pixel when `NEXT_PUBLIC_META_PIXEL_ID` is set **and** the visitor accepts marketing cookies. No PostHog, GA4, or Vercel Analytics. |
| Cookies | First-party `localStorage` key `onetap-consent-marketing`; Meta `_fbp` / `_fbc` only after accept. `sessionStorage` for blog scroll-spy and back-navigation UX. |
| Cookie banner | Required before `fbevents.js`. Reject keeps the site usable with no Facebook script. |
| Privacy / Terms | Footer links to app canonical pages via `NEXT_PUBLIC_MAIN_APP_URL` |
| Newsletter | Disabled until a real subscribe API exists |
| Security headers | `next.config.ts` `headers()` + `src/lib/security/*` |
| Public APIs | None (`src/app/api/**` dormant) |
| Ads measurement | Marketing owns `PageView`, `ViewContent`, `InitiateCheckout` (create-card CTAs), and `Lead` (register CTAs). Account and purchase events live on `onetap-app`. Outbound app URLs forward `fbclid` and UTM params. |

## When adding APIs or trackers

- Activate `.cursor/rules/marketing-api-future.mdc` and `.cursor/skills/marketing-api-delivery/SKILL.md`
- Zod validation, rate limits, Turnstile on public forms, scrubbed logs
- Cookie consent banner **before** loading non-essential marketing/analytics scripts (EU/UK default)

## Environment

See [environment-variables.md](./environment-variables.md). Only `NEXT_PUBLIC_*` origins ship to the browser until server APIs exist. Production pixel only unless `NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD=true`.
