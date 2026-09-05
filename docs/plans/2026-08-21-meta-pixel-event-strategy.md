# Meta Pixel event strategy (marketing ↔ app)

**Status:** recommendations only — not implemented beyond current `PageView`.  
**Date:** 2026-08-21  
**Repos:** `onetap-marketing-v2` (this site) + `onetap-app` (dashboard / create-card flow)

This document is the working agreement for ads measurement: which events to fire, which to skip, and how attribution survives the jump from the marketing site to the app.

---

## 1. What we have today

The marketing site already loads Meta Pixel when `NEXT_PUBLIC_META_PIXEL_ID` is set.

| Piece | Behavior |
|-------|----------|
| Snippet | `src/components/providers/meta-pixel.tsx` in root layout |
| Init | `fbq('init')` + `fbq('track', 'PageView')` |
| SPA | Extra `PageView` on client-side route changes (App Router) |
| Custom / standard conversions | **None** — no CTA, search, or content events |
| Consent banner | **None** — pixel loads for every visitor when the env var is present |
| Docs drift | `docs/engineering/privacy-and-security.md` still says “no Meta Pixel”; AGENTS.md still treats the SDK as unapproved unless the team opts in |

Create-card and auth **do not happen on this site**. They are cross-origin navigations:

| Control | Destination |
|---------|-------------|
| `GetCardCta` (default) | `{APP_ORIGIN}/create/basics` (`CREATE_BASICS_URL`) |
| `SlugClaimCta` (hero slug form) | `{APP_ORIGIN}/create/basics?slug=…` |
| Navbar “Get your card” / pricing CTAs | `{APP_ORIGIN}/register` (`SIGNUP_URL`) |
| Navbar “Sign in” / agency secondary | `{APP_ORIGIN}/login` (`LOGIN_URL`) |

Default app origin: `https://app.onetap-card.com` (`NEXT_PUBLIC_MAIN_APP_URL`).

**Implication:** marketing can measure *intent*. The app must measure *outcomes* (account created, card published, paid plan). Firing “CompleteRegistration” on this site would be a lie.

---

## 2. Principle: measure the funnel, not every mouse twitch

Meta Ads optimization works when a **small set of high-signal events** is consistent, named the same way in Events Manager, and mapped to campaign objectives.

Flooding the pixel with scroll depth, FAQ toggles, hover, 25% video, every blog heading, or slug keystrokes:

- Dilutes conversion quality (Meta learns the wrong “success”)
- Makes Event Match Quality and diagnostics noisy
- Increases privacy surface without improving ROAS
- Can look like event stuffing to Aggregated Event Measurement (AEM) limits (browser: a small set of prioritized conversion events)

**Collect the most important data** = every *decision point* in the path from ad → page → CTA → app → signup → value. Not every *interaction*.

---

## 3. Recommended event map

Use **standard events** wherever Meta already understands them. Use **custom events** only when no standard event fits. Pass **content metadata**, never PII (no email, phone, typed slug, name).

### 3.1 Marketing site (`onetap-marketing-v2`)

| Event | When | Parameters (keep small) | Why |
|-------|------|-------------------------|-----|
| `PageView` | First load + client navigations | (default) | Already implemented. Needed for landing and remarketing. |
| `ViewContent` | High-intent **pages**, not every blog post on first paint if volume is huge — see note | `content_name`: route key (`pricing`, `solutions_freelancers`, `faq`, `blog_index`, `blog_post`); `content_category`: `marketing`; optional `content_ids`: slug for a post | Tells Meta *what* they considered. Better lookalikes than PageView-only. |
| `Search` | FAQ or blog filter/search **submitted** (debounced, query length ≥ 2) | `search_string` **hashed or omitted** if it could contain PII; prefer `content_category` only | Intent signal. Do **not** send raw queries that look like emails. Safest: fire Search with no query string, or a coarse bucket (`faq` / `blog`). |
| `InitiateCheckout` | Click that **leaves for create-card** (`CREATE_BASICS_URL` / slug claim submit) | `content_name`: CTA placement (`hero_slug`, `nav`, `final_cta`, `process`, `freelancer_hero`, …); `content_category`: `create_card` | Primary **micro-conversion** for this site. Maps to “started the product.” |
| `Lead` | Click that **leaves for register** (`SIGNUP_URL`) or pricing plan CTA to register | `content_name`: `nav_signup` / `pricing_free` / `pricing_pro` / `agency_hero`; `content_category`: `signup` | Distinct from create-basics. Same user may hit both; naming must stay stable. |
| `Contact` | Only if a real contact / demo form ships later | `content_name`: form id | Do not invent this until a form exists. |

**Do not fire on marketing:**

| Skip | Reason |
|------|--------|
| `CompleteRegistration` | Happens on the **app**, after an account exists |
| `Subscribe` / `StartTrial` / `Purchase` | Billing lives in the app |
| `AddToCart` | No cart on marketing |
| Scroll %, time-on-page beacons, section in-view spam | Noise; use GA/product analytics later if needed, not Meta ads events |
| Every FAQ accordion open | Weak intent; `ViewContent` on `/faq` is enough |
| Slug field `input` / invalid slug | PII-adjacent + noise. Invalid submit can stay untracked or a single custom `SlugClaimInvalid` **only if** ads need it (usually they do not) |
| Internal links (blog → blog, Home in 404 `GetCardCta href="/"`) | Not a conversion. 404 “back home” must **not** reuse InitiateCheckout |
| Duplicate PageView on first paint | Current code already skips the first client effect; keep that |

**ViewContent volume note:** fire on `/`, `/pricing`, `/solutions`, `/solutions/freelancers`, `/solutions/agencies`, `/faq`, `/blog`. For `/blog/[slug]`, fire **one** ViewContent per post with `content_ids: [slug]` — that is useful for content-based remarketing and is still a bounded set. Do not fire ViewContent per heading or image.

**Placement parameter:** a shared helper on `GetCardCta` / `SlugClaimCta` should send `content_name` from a typed union (not free-text from button labels, which change with copy).

### 3.2 App (`onetap-app`) — required for the funnel to close

Same **pixel ID** as production marketing. Without this, Meta sees a click into a black hole.

| Event | When | Notes |
|-------|------|--------|
| `PageView` | App routes (respect consent) | Continues the session after handoff |
| `CompleteRegistration` | Account actually created (email verified if that is the product definition of “registered”) | **Optimization event** for most acquisition campaigns |
| `SubmitApplication` or custom `CardCreated` | First card published / wizard completed | Stronger quality signal than registration if many accounts never finish a card |
| `StartTrial` / `Subscribe` / `Purchase` | Paid plan | Use value + currency; this is the true revenue event |

Pick **one** primary AEM conversion for prospecting (usually `CompleteRegistration` or `Purchase`). Secondary events inform, they do not all get equal optimization weight.

---

## 4. How the create-card link is managed today (and the attribution gap)

### 4.1 Navigation

1. Visitor lands on marketing (often with `fbclid` from Meta ads, plus UTMs).
2. They click `GetCardCta` or submit `SlugClaimCta`.
3. Browser goes to `https://app.onetap-card.com/create/basics` (optional `?slug=`).
4. Marketing pixel never sees what happens next.

`buildCreateBasicsUrl()` only appends `slug`. It does **not** forward:

- `fbclid` (ad click id → `_fbc`)
- `utm_*`
- `_fbp` (browser pixel cookie is host-scoped; apex `onetap-card.com` ≠ `app.onetap-card.com`)

So even with the same pixel ID on the app, Safari / ITP / cookie partitioning often **breaks the click-to-signup join** unless we pass click ids and/or use Conversions API.

### 4.2 Two different “get started” destinations

This is a product inconsistency that also splits events:

- Most body CTAs → `/create/basics` (wizard)
- Nav signup + pricing + some agency CTAs → `/register`

**Recommendation:** treat them as two events (`InitiateCheckout` vs `Lead`) until product unifies the URL. Longer term, send everyone through one entry (`/create/basics` **or** `/register`) so Meta has one start-of-funnel event. Dual entry is fine if labeled; dual unlabeled is how dashboards become unusable.

### 4.3 Best-practice handoff (do this)

**A. Same pixel, both properties, both domains in Events Manager**

- Verify `onetap-card.com` and `app.onetap-card.com` (and preview hosts if you ever fire production pixel there — usually **do not**).
- Production pixel ID only on production marketing + production app. Preview/dev: separate test pixel or no pixel.

**B. Preserve ad identifiers on the outbound URL**

On CTA click / slug submit, copy from `window.location.search` onto the app URL:

- `fbclid` (required)
- `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term` (product + ads)

Do **not** put the typed card slug into Meta event params. Slug on the app URL is a product feature, not an ads parameter.

Optional: pass `_fbp` / `_fbc` as query params if the app cannot read them from cookies (subdomain split). Prefer Events Manager domain config first; query forwarding is the reliable fallback.

**C. Fire the micro-conversion *before* navigation**

`fbq('track', 'InitiateCheckout', {…})` then navigate. Pixel queues are async; for full-page `window.location.href` (slug form), use `fbq('track', …)` and a short `requestAnimationFrame` / `fbq` callback if available so the beacon is not cancelled. `GetCardCta` uses `<a href>` — the browser usually has time to send the beacon; still fire `onClick`.

Use a **shared `eventID`** (UUID) on the browser event and, later, on CAPI so Meta dedupes.

**D. Conversions API (CAPI) on the app — not on static marketing first**

Marketing is static; there is no trustworthy server event except “they loaded HTML.” The **authoritative** server events are:

- registration succeeded
- card published
- checkout succeeded

Send CAPI from the app with `event_name`, `event_id` (match browser if both fire), `fbp`, `fbc`/`fbclid`, `event_source_url`, and hashed user data **only after** the user has an account (Advanced Matching). Do **not** put CAPI access tokens in `NEXT_PUBLIC_*`.

CAPI is how iOS-restricted browser pixels still attribute signups.

**E. Deduping across sites**

| Bad | Good |
|-----|------|
| Marketing fires CompleteRegistration on CTA click | Marketing: InitiateCheckout; App: CompleteRegistration |
| App fires InitiateCheckout again on `/create/basics` landing | App: PageView only on that landing; CompleteRegistration later |
| Two pixels / two IDs in prod | One production pixel ID |

If the app also fires InitiateCheckout on wizard start, Meta will double-count. **Own InitiateCheckout on marketing only**, or **on app only**, not both.

**Recommendation:** marketing owns `InitiateCheckout` / `Lead` (click). App owns `CompleteRegistration` and revenue events. App landing = `PageView` only.

---

## 5. Consent, privacy, and legal (non-optional for EU/UK)

Pixel is a **non-essential marketing cookie**. Current site loads it with no banner.

**Best practice:**

1. Do not load `fbevents.js` until consent (EEA/UK). US-only ads ops may still want a banner for honesty and App Tracking Transparency alignment.
2. Update `docs/engineering/privacy-and-security.md` and the canonical privacy policy on the **app** (footer already points at `PRIVACY_URL`).
3. Never send: email, phone, name, raw slug, exact search strings that look like identifiers.
4. Advanced Matching: enable on the **app** after login (hashed email you already have), not on the anonymous marketing site.

This plan does not replace legal review. Team already documented cookie banner as required *when* trackers exist — trackers exist now.

---

## 6. Implementation shape on this repo (when approved)

Keep logic in `src/lib/meta-pixel.ts` (pure helpers). Do not sprinkle `window.fbq` in every section.

Suggested API:

```ts
trackMetaEvent(event: MetaStandardEvent, params?: MetaEventParams, eventId?: string): void
```

Wire once:

- `GetCardCta` / `MarketingHeroSecondaryCta` — classify href: create-basics → `InitiateCheckout`, register → `Lead`, login → skip or custom `LoginClick` (usually skip; login is not an ads conversion)
- `SlugClaimCta` — `InitiateCheckout` on successful submit
- Route-level `ViewContent` — small client helper keyed by pathname, or a single provider that maps known routes
- `ContentSearch` — `Search` on submit/debounce, **no raw PII**

CSP already allows Facebook script/connect/img. No CSP change expected.

Env: keep pixel ID public; CAPI token stays server-side on the **app**.

---

## 7. Events Manager setup (ops, not code)

1. One production pixel; name events exactly as in the table (case-sensitive standard names).
2. AEM priority (typical): Purchase → CompleteRegistration → InitiateCheckout → ViewContent → PageView.
3. Custom conversions: filter InitiateCheckout where `content_category = create_card` if you need a clean ads objective.
4. Test with Events Manager “Test events” and the Meta Pixel Helper on:
   - homepage → slug claim
   - pricing → Start for free
   - confirm `fbclid` present on app URL after an ad-preview click
5. Turn off automatic advanced matching on marketing if it tries to scrape the DOM (there is nothing useful; scraping is a privacy footgun).

---

## 8. What “track every possible event” should mean here

**Yes — cover every funnel step that changes money or intent:**

1. Land (PageView)
2. Consider (ViewContent on money pages + key solutions)
3. Search/filter (coarse Search)
4. Click create card (InitiateCheckout)
5. Click register from pricing/nav (Lead)
6. On app: register, publish card, pay

**No — do not cover every UI event.** That is product analytics (PostHog/GA), which this repo still treats as a separate, explicit approval. Mixing that into Meta trains the ad auction on vanity events.

---

## 9. Phased rollout

| Phase | Work | Owner |
|-------|------|--------|
| **0 — Hygiene** | Confirm prod pixel ID on Vercel; no pixel (or test pixel) on preview; fix privacy doc vs reality; legal/consent decision | Marketing + legal |
| **1 — Marketing micro-conversions** | `InitiateCheckout` + `Lead` on the two outbound types; forward `fbclid` + UTMs on create/register/login links | `onetap-marketing-v2` |
| **2 — Content signals** | `ViewContent` on listed routes; optional coarse `Search` | `onetap-marketing-v2` |
| **3 — App close-the-loop** | Same pixel; `CompleteRegistration` + card-complete + purchase; CAPI + event_id dedup | `onetap-app` |
| **4 — Quality** | Event Match Quality, AEM priorities, stop any duplicate InitiateCheckout | Ads + eng |

Do not start Meta campaign optimization on CompleteRegistration until phase 3 is live, or you will optimize for clicks that never become users.

---

## 10. Risks

| Risk | Mitigation |
|------|------------|
| Optimize on CTA click | Treat InitiateCheckout as **upper funnel**; optimize campaigns on app CompleteRegistration / Purchase |
| Lost `fbclid` | Append query params on every outbound app URL |
| Double counting | Split ownership of events across repos; document in this file |
| Preview deploys pollute prod pixel | Pixel ID only on production env |
| GDPR | Consent gate before snippet |
| Navbar vs body CTA URLs differ | Separate Lead vs InitiateCheckout until product unifies |
| Slug in pixel payload | Never send slug to `fbq` |

---

## 11. Verification (when implementing)

- `npm run typecheck && npm run lint && npm run build`
- Manual: Pixel Helper shows PageView → InitiateCheckout on Get card; app URL contains `fbclid` after simulated ad landing (`?fbclid=test`)
- No InitiateCheckout on in-site links (404 home)
- Confirm no pixel in CI (quality gates already omit the ID)

---

## 12. Decision summary (recommendations)

1. **Do not** fire every UI interaction. Fire **funnel events** only.
2. **Marketing** = PageView + ViewContent (key pages) + InitiateCheckout (create/basics) + Lead (register) + optional coarse Search.
3. **App** = same pixel + CompleteRegistration + card published + pay. That is where “more data about users” actually lives (identity, plan, activation).
4. **Handoff** = same pixel ID + domain verification + **forward `fbclid`/UTMs** + CAPI on the app. Cookie sharing across apex vs `app.` is not reliable enough alone.
5. **Do not** mark CTA click as CompleteRegistration.
6. **Consent** before the snippet in regions that require it; update privacy docs that currently contradict the code.
7. **Unify** create-basics vs register as a product follow-up so one start event exists; until then, two labeled events.

Implementation in this repo should wait for explicit approval (pixel + consent is cross-cutting). App work is a separate ticket; without it, extra marketing events only improve click-optimization, not user-quality optimization.
