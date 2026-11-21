# Pre-Production & Live Campaign Hardening Plan

**Date:** 2026-11-21  
**Status:** Approved & Implemented

## Goal

Resolve all verified critical findings from the pre-production and live Meta campaign audit of `onetap-marketing-v2`:
1. **Meta Pixel & Consent:** Load `fbevents.js` lazily only after marketing cookie consent is granted (`onetap-consent-marketing === "granted"`), guard `trackMetaEvent` on consent, restrict pixel activation strictly to `NEXT_PUBLIC_VERCEL_ENV === "production"` (or local `NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD === "true"`), classify card-creation placements as `InitiateCheckout` and signup/plan placements as `Lead`, and preserve modified clicks (`Cmd`/`Ctrl`/middle-click).
2. **Marketing → App Attribution & Billing Handoff:** Preserve incoming allowlisted `billing` (`pro` | `team`) and validated `slug` from landing URLs without overwriting explicit target `billing` or `slug` params; keep Free plan CTA isolated (`preserveBilling={false}`); wire `/solutions/agencies` "Start Team" CTAs to `SIGNUP_TEAM_URL`; and route Team-only promo strip campaigns to `SIGNUP_TEAM_URL` with `placement="promo_strip"`.
3. **Cross-App Promo & Layout Sync:** Accept link-gated (`marketingPublic: false`, `requiresPromoPin: true`) campaigns when `?promo=<slug>` explicitly matches; use `{ revalidate: 60 }` tagged cache in Edge Middleware; consolidate `<MarketingPromoStrip>` into `MarketingPromoShell` (`LocaleLayout`) and remove the duplicate strip from `BlogLayout`; and avoid rewriting clean organic URLs in `PromoQueryCarry`.
4. **Observability, Security (CSP), SEO & Mobile Core Web Vitals:** Add bilingual App Router error boundaries (`src/app/error.tsx`, `src/app/global-error.tsx`) backed by `src/content/{en,he}/chrome.ts`; allow `frame-src` and wildcard `*.facebook.com` / `*.facebook.net` in CSP; enforce `noindex` / `Disallow: /` on non-canonical staging domains via `isNonProductionDeployment()`; remove the 307-redirecting `/solutions` route from `sitemap.ts`; make `TextGenerateEffect` words immediately visible (`opacity-100`) on SSR and unwrap `SlugClaimCta` from `RevealItem`; and optimize `AnimatedPhoneGrid` + `IPhone13ProMaxMockup` image loading.

## Verification

- `npm test`
- `npm run check:i18n-rtl`
- `npm run check:i18n-copy`
- `npm run typecheck`
- `npm run lint`
- `npm run build`
