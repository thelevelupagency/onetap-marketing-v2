# Fix Hebrew-only blank phone mockups (site-wide)

## Why this is a shared bug, not two one-offs

Both reported holes use the same `IPhone13ProMaxMockup`: in-flow 1500×3000 bezel + `transform: scale(...)` with `transformOrigin: "top left"`. Under `html[dir=rtl]` the painted phone lands outside the clip shell.

Reported:

- Agencies HE — שמרו על אחידות המותג (`agency-governance-section.tsx`)
- Freelancers HE — צפו בכרטיסים שמתאימים לתחום שלכם (`freelancer-niche-selector.tsx`)

Fixing the shared mockup once covers every caller.

## Full device inventory

| Surface | HE status | Covered by shared fix |
|---|---|---|
| Agencies brand-lock phone | Broken (reported) | Yes |
| Freelancers niche carousel phones | Broken (reported) | Yes |
| Homepage hero phone marquee | Likely OK (InfiniteScrollTrack LTR) | Yes (defense in depth) |
| Card UX phone | OK (`dir=ltr` wrapper) | Yes |
| All laptops | OK (prior absolute contain) | N/A |
| FreelancerCreators / HeroPhonePreview | Not mounted; latent | Yes |

## Fix

1. `iphone-13-pro-max-mockup.tsx` — absolute inner bezel + `isolate` (MacBook pattern)
2. `marketing-phone-preview.tsx` — `dir="ltr"` on outer shell (i18n RTL exception)

## Verification

```bash
npm run check:i18n-rtl
npm run typecheck && npm run lint && npm run build
```

Manual HE: agencies brand-lock phone, freelancers niche phones, homepage hero + card UX + dashboard laptop.
