# Meta ads conversion loop

**Audience:** marketing (campaigns, Events Manager, Ads Manager) + engineering (app / Vercel).  
**Status:** shipped in code. Browser pixel can run in production now. **Server Conversions API (CAPI) waits on a token from marketing** — the product still works without it.  
**Pixel ID (shared, public):** `28011734695135178`  
**Short brief for marketing:** [meta-conversion-loop-for-amit.md](./meta-conversion-loop-for-amit.md)

This is the working agreement for Facebook / Instagram ads measurement. Same document lives in `onetap-app` and `onetap-marketing-v2`.

---

## Why we built this

The marketing site is a **hop**, not the product. Identity (account created) and money (paid plan) live on the dashboard app.

A marketing-only PageView pixel can retarget visitors. It **cannot** tell Ads Manager who actually registered or who paid. If we optimized campaigns on “clicked Get your card,” we would pay for clicks, not customers.

So we built **one conversion loop across two projects**, with one pixel ID:

1. Ad lands on **onetap-card.com** with `fbclid` + UTMs.
2. Visitor accepts cookies → marketing fires PageView / ViewContent / CTA events.
3. CTA to the app **keeps** `fbclid` and UTMs (never overwrites the card `slug`).
4. App fires **CompleteRegistration** when the account is created (email or Google).
5. App fires **Purchase** when Lemon Squeezy creates a paid subscription.

That is what Meta can optimize on: **real users and real payers**.

---

## Who owns what

| Surface | Project | Domain | Marketing owns | Engineering owns |
|---------|---------|--------|----------------|------------------|
| Marketing site | `onetap-marketing-v2` | `onetap-card.com` | Cookie banner, ad landing, CTA copy, Events Manager, Ads Manager, pixel ID in Vercel **Production** | Pixel code, consent gate, URL handoff |
| Dashboard app | `onetap-app` | `app.onetap-card.com` | Campaigns that optimize on register / purchase (after CAPI is live) | Pixel after login, CAPI, Lemon Purchase, privacy copy, CSP |
| Public card pages | `onetap-card-v2` | `card.onetap-card.com` | **Out of scope** | **No Meta Pixel** — those visitors are *customers’* audiences, not ours |

**Event ownership (do not double-count):**

| Event | Who fires it | When |
|-------|----------------|------|
| `PageView` | Marketing | After cookie **Accept** |
| `ViewContent` | Marketing | Key pages: home, pricing, FAQ, blog, freelancer / agency solutions |
| `InitiateCheckout` | Marketing | CTA that goes to **create a card** (`/create/basics`) |
| `Lead` | Marketing | CTA that goes to **register** (`/register`) |
| `CompleteRegistration` | **App** (browser + CAPI) | Account **created** (email or Google), not email verify |
| `Purchase` | **App** (CAPI only) | Lemon `subscription_created`, paid plan, not free |
| `SubmitApplication` | **App** (CAPI only) | First card published — lookalikes, **not** the primary optimization event |

The app **must not** re-fire `InitiateCheckout` on `/create/basics`. Marketing already counted the click.

Login, agency “Contact us”, 404 → home, newsletter (still disabled): **no** conversion event.

---

## How the loop works

```
Meta ad
  → marketing site (consent → PageView / ViewContent)
  → CTA with fbclid + UTMs preserved
  → app stores first-touch attribution
  → CompleteRegistration (pixel + CAPI) when the account is created
  → Purchase (CAPI) when they pay in Lemon
```

**Consent**

- Marketing: first-party banner (Accept / Reject). Pixel stub loads immediately with `fbq('consent', 'revoke')`. Tracking (`grant` + PageView) starts on **Accept**. Refresh after Accept grants again from `localStorage`. Reject = site works, no events.
- App: **no** cookie banner. Pixel loads only for people who already have an account (Terms accepted) or at the moment of CompleteRegistration. Anonymous `/register` and `/create/basics` do **not** get a marketing PageView from the app.

**Attribution**

Allowlisted query params copied marketing → app (never overwrite `slug`):

`fbclid`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`

Marketing stores them **first-touch** in `sessionStorage` (`onetap-attribution`) so a visit to `/pricing` or `/faq` does not drop the ad click. Every app CTA (`GetCardCta`, nav register, slug claim) re-attaches those params on click.

Additionally, marketing always stamps **`lang=en|he`** from the current marketing locale onto outbound app CTAs (`appendLocaleParam` / `navigateToApp`). Hebrew marketing URLs live under `/he`; English stays unprefixed. The app bootstraps product chrome from `?lang=` (onetap-app marketing locale handoff).

The app also stores `_fbp` / `_fbc` when the browser has them, first-touch, on the user. Purchase later uses that so Meta can match the original click even though checkout happens on Lemon (off-site).

**Deduping**

Browser pixel and CAPI share the same `event_id` for CompleteRegistration so Meta counts **one** conversion, not two.

**Fail-soft**

If the CAPI token is missing or wrong, **signup, billing, and the website still work**. Meta simply does not get server events until the token is set in Vercel Production.

---

## Environment variables

### Shared (both projects)

| Key | Required? | Why |
|-----|-----------|-----|
| `NEXT_PUBLIC_META_PIXEL_ID` | **Yes for ads** (same value: `28011734695135178`) | Public pixel ID. Ships in the browser. Set on **Vercel Production only**. Omit on Preview so test deploys do not pollute Ads Manager. |
| `NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD` | **Local only** | Pixel is ignored unless this is `true` **or** production. Use `true` in local `.env.development`. Use `false` / omit on Vercel Production and Preview. |
| `NEXT_PUBLIC_VERCEL_ENV` | Automatic | Vercel injects this into the **browser** bundle. The pixel and cookie banner read this (`production`), not server-only `VERCEL_ENV`. Do not add it by hand. |
| `VERCEL_ENV` | Automatic | Vercel sets this on the **server**. Used by CAPI on the app. Do not add it by hand. |

### App only (`onetap-app`)

| Key | Required? | Why |
|-----|-----------|-----|
| `META_CAPI_ACCESS_TOKEN` | **Required for server conversions** (not required to merge or to run the product) | Server Conversions API. **Never** `NEXT_PUBLIC_*`. Without it, CompleteRegistration / Purchase do not reach Meta from the server. |
| `META_CAPI_TEST_EVENT_CODE` | Optional | Sends events into Events Manager → **Test events** while verifying. Clear it when you go live. |

Marketing has **no** CAPI token. Marketing is browser-only.

---

## How to use it in Ads Manager (get the most out of it)

Do this **after** production pixel + CAPI are verified. Until CAPI is live, do **not** scale conversion campaigns.

1. **Verify domains** in Events Manager: `onetap-card.com` and `app.onetap-card.com`.
2. **Aggregated Event Measurement (AEM) priority** (highest → lowest):
   1. `Purchase`
   2. `CompleteRegistration`
   3. `InitiateCheckout`
   4. `ViewContent`
   5. `PageView`
3. **Optimize campaigns on `CompleteRegistration` and `Purchase`**, not on CTA clicks.
4. Use `InitiateCheckout` / `Lead` / `ViewContent` for **funnel diagnostics and retargeting**, not as the optimization event you pay for.
5. Use **Test events** + Meta Pixel Helper + optional `META_CAPI_TEST_EVENT_CODE` before switching a live campaign to CompleteRegistration.
6. One join should show **one** CompleteRegistration (pixel + CAPI deduped), not two.

**Do not**

- Put the pixel on customer card pages (`card.onetap-card.com`).
- Optimize on `InitiateCheckout` / button click.
- Fire Meta `Lead` on the newsletter (form is still off).
- Add GA4 or extra ad SDKs without a new engineering pass.
- Set `NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD=true` on Vercel Production or Preview.

---

## Manual join check (when CAPI is live)

1. Open the marketing site in a private window with `?fbclid=test123` (or a real ad click).
2. **Reject** cookies → no `fbevents.js` in the network tab.
3. **Accept** → PageView fires.
4. Click Get your card → `InitiateCheckout` and the app URL still has `fbclid`.
5. Register a **new** account → Events Manager shows **one** CompleteRegistration.
6. (Paid plan) Lemon checkout → Events Manager shows Purchase with value + USD.

---

## Why these product choices

| Choice | Reason |
|--------|--------|
| Cookie banner on marketing only | Anonymous traffic is the marketing site. The app already has Terms at signup. A second banner would block register and create a PageView with no join. |
| CompleteRegistration at **account create**, not email verify | Google users never “verify” the same way. Waiting for verify would under-count the event Ads Manager should learn from. |
| Same pixel ID on both hosts | Meta can stitch the hop. Two pixels would split the funnel. |
| CAPI for Purchase | Lemon is off-site. Browser pixel on the app never sees the payment. |
| First-touch in user metadata, not a new table | Enough to attribute Purchase to the original `fbclid`. A CRM table can wait. |
| `SubmitApplication` for first card | Useful for lookalikes. Not the event we pay to optimize. |

---

## Current gap (marketing action)

Engineering is waiting on **`META_CAPI_ACCESS_TOKEN`** from Events Manager.

Until that token is in **Vercel → onetap-app → Production**:

- The websites and checkout work.
- Marketing pixel + consent + CTA handoff can still run in production.
- Server CompleteRegistration / Purchase will **not** show in Events Manager.

## Current gap (marketing action)

Engineering is waiting on **`META_CAPI_ACCESS_TOKEN`** from Events Manager.

Until that token is in **Vercel → onetap-app → Production**:

- The websites and checkout work.
- Marketing pixel + consent + CTA handoff can still run in production.
- Server CompleteRegistration / Purchase will **not** show in Events Manager.

How to generate it: Events Manager → this pixel → Settings → Conversions API → **Generate access token**. Send it in 1Password or a private message (not GitHub). Never name it `NEXT_PUBLIC_*`.

Short checklist for marketing: [meta-conversion-loop-for-amit.md](./meta-conversion-loop-for-amit.md).
