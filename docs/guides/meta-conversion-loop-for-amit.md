# Meta conversion loop — for Amit

Pixel `28011734695135178` is already the one we use. Do not create another.  
Deep dive: [meta-conversion-loop.md](./meta-conversion-loop.md)

---

## How it tracks (so you can monitor it)

The ad is a hop. **Marketing** sees the click. **The app** sees the customer.

| Step | Where | What Meta receives | What you should see |
|------|--------|--------------------|---------------------|
| 1. Ad click | `onetap-card.com` | `fbclid` on the URL | Click in Ads Manager |
| 2. Cookie **Accept** | Marketing | `PageView`, then `ViewContent` on home / pricing / FAQ / blog / solutions | Events Manager, browser |
| 3. CTA | Marketing | `InitiateCheckout` = “Get your card” (create). `Lead` = register. Login is **not** a conversion | CTA volume, not the KPI |
| 4. Land on app | `app.onetap-card.com` | Same `fbclid` + UTMs (we copy them; we never overwrite `slug`) | URL still has `fbclid` |
| 5. **New account** | App | `CompleteRegistration` (browser + server once CAPI is on). Deduped to **one** event | **Primary optimization event** |
| 6. **Paid plan** | App, via Lemon | `Purchase` (server only — checkout is off-site) | **Highest-value event** |

Cookie **Reject** on marketing = no Facebook script. That is intended.

**Not tracked:** customer card sites (`card.onetap-card.com`), preview/dev deploys, login, agency “Contact us”.

Until CAPI is live, you will mostly see **browser** events from marketing. Register/purchase from the **server** will be missing or thin. Do not scale conversion campaigns until step 5 shows **Browser and Server** (deduped) in Events Manager.

---

## 1. Verify domains (production only)

Verify **two** domains in the **same** Meta Business as the pixel:

| Verify | Why |
|--------|-----|
| `onetap-card.com` | Ad landing + cookie banner + CTA events |
| `app.onetap-card.com` | Account create + purchase |

**Do not verify (and do not add) dev/preview:**

- `app-dev.onetap-card.com`
- `card.onetap-card.com` / `card-dev.onetap-card.com`
- `*.vercel.app` preview URLs

The pixel is **off** on preview/dev on purpose. Adding those domains only invites junk into Ads Manager.

### How to add them

1. [Meta Business Settings](https://business.facebook.com/settings/) → **Brand Safety** → **Domains** (sometimes under Events Manager → Settings → Domains).
2. **Add** `onetap-card.com`, then `app.onetap-card.com` (no `https://`, no path).
3. **Verify** with **DNS TXT** (preferred — no code change):
   - Copy Meta’s `facebook-domain-verification=…` record.
   - Add it at the DNS host for that domain.
   - Click verify (can take a few minutes to a few hours).
4. If DNS is blocked, send Ofir the meta-tag Meta shows. We can add it in the site `<head>`. Do not upload random HTML files to Vercel.

Both domains must show **Verified**. iOS Aggregated Event Measurement only works after that.

---

## 2. Send us the CAPI token (this is the missing piece)

We need **`META_CAPI_ACCESS_TOKEN`** so the **app** can send register + purchase to Meta from the server. You do **not** paste this token into Ads Manager or into a campaign.

1. [Events Manager](https://business.facebook.com/events_manager2) → our pixel → **Settings** → **Conversions API** → **Generate access token**.
2. Copy it once; store it in 1Password.
3. Send it to Ofir via **1Password or a private message** (not GitHub).
4. We put it on **Vercel → onetap-app → Production** and redeploy.

Optional, test week only: Events Manager → **Test events** → send the test event code. We set `META_CAPI_TEST_EVENT_CODE`, then **remove it** before live spend.

You do not set this token on the marketing Vercel project.

---

## 3. Confirm it is working

**Events Manager → Test events** (private window, production URLs):

1. `https://onetap-card.com/?fbclid=AmitTest1` → **Reject** cookies → no `fbevents.js` in the browser network tab.
2. Same URL → **Accept** → `PageView` (and `ViewContent` on home).
3. Click **Get your card** → `InitiateCheckout`, and the app URL still contains `fbclid`.
4. Register a **new** account → **one** `CompleteRegistration` (not two). After CAPI: source **Browser and Server**.
5. A real paid upgrade → `Purchase` with value + USD, **Server**.

**Events Manager → Overview (24–72h of real traffic):**

- Marketing events (`PageView`, `ViewContent`, CTAs) should move.
- `CompleteRegistration` should roughly follow **new** signups (not logins).
- `Purchase` should follow paid Lemon subs, not free.
- Event Match Quality on CAPI should not sit on “Poor” once the token is live.

If Overview is empty on production after a real Accept+click, the pixel ID is missing on that Vercel **Production** project — ping Ofir. Do not “fix” it by turning the pixel on for Preview.

---

## 4. How to use it in campaigns

Do this **after** domains are verified **and** Test events show CompleteRegistration with CAPI.

**Ads Manager**

- Objective: **Conversions** (or Sales, if you run purchase campaigns).
- Dataset: this pixel (the existing one).
- **Optimize for `CompleteRegistration`** until there is enough `Purchase` volume, then add/switch to **Purchase**.
- **Do not** optimize for link click, landing-page view, `InitiateCheckout`, or `Lead`. Those are the hop, not the outcome.
- Landing URL: production marketing (`https://onetap-card.com/...`). Let our CTAs pass `fbclid`. Do not strip query params in the URL builder.
- iOS: set AEM priority **Purchase → CompleteRegistration → InitiateCheckout → ViewContent → PageView**.

**What you never do manually**

- No extra pixel snippet in Ads Manager.
- No CAPI token in the campaign.
- No second pixel “for the app.”

**Retargeting (fine)**

- Viewed pricing, did not register → audience from `ViewContent` / `InitiateCheckout`.
- Registered, did not pay → audience from `CompleteRegistration` excluding `Purchase`.

---

## Checklist

- [ ] `onetap-card.com` verified  
- [ ] `app.onetap-card.com` verified  
- [ ] Dev/preview domains **not** added  
- [ ] CAPI token sent to Ofir  
- [ ] Test events: Accept → CTA → **one** CompleteRegistration  
- [ ] Campaigns optimize on CompleteRegistration / Purchase, not clicks  
