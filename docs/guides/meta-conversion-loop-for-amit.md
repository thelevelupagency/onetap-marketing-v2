# Meta conversion loop — brief for Amit

**Pixel ID (keep this one, do not create another):** `28011734695135178`  
**Full reference:** [meta-conversion-loop.md](./meta-conversion-loop.md)

---

## What we built

One measurement loop across two sites, same pixel:

1. Ad lands on **onetap-card.com** (marketing). Visitor accepts cookies → we fire PageView / ViewContent / CTA events.
2. “Get your card” / register keeps **`fbclid` + UTMs** into **app.onetap-card.com**.
3. **Account created** (email or Google) → `CompleteRegistration`.
4. **Paid Lemon subscription** → `Purchase`.

We did this so Ads Manager can optimize on **real signups and payers**, not button clicks.

Marketing site owns the cookie banner and click events. The **app** owns register and purchase. **No pixel on customer card pages** (`card.onetap-card.com`).

---

## What you should set (your side)

### Events Manager

- [ ] Confirm we are on pixel **`28011734695135178`** only.
- [ ] Verify domains: **`onetap-card.com`** and **`app.onetap-card.com`**.
- [ ] When CAPI is live, AEM order: **Purchase → CompleteRegistration → InitiateCheckout → ViewContent → PageView**.
- [ ] Optimize campaigns on **CompleteRegistration** and **Purchase**. Use CTA events (`InitiateCheckout` / `Lead`) for diagnostics and retargeting only — **do not pay to optimize on clicks**.

### Vercel (if you have access)

| Project | Environment | Key | Value |
|---------|-------------|-----|--------|
| Marketing (`onetap-marketing-v2`) | **Production only** | `NEXT_PUBLIC_META_PIXEL_ID` | `28011734695135178` |
| App (`onetap-app`) | **Production only** | `NEXT_PUBLIC_META_PIXEL_ID` | `28011734695135178` (same) |
| Both | Preview | pixel ID | **omit** (don’t pollute ads data) |
| Both | Production / Preview | `NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD` | **omit or `false`** (never `true` on Vercel) |

---

## What we still need from you (this unblocks the loop)

**`META_CAPI_ACCESS_TOKEN`** — Conversions API token for the **app only**.

Without it: sites and checkout work, but Meta will **not** get server-side register/purchase (the events we should optimize on).

1. Events Manager → pixel `28011734695135178` → **Settings** → **Conversions API** → **Generate access token**.
2. Send it via **1Password or a private message** (not GitHub / Slack public).
3. Engineering puts it on **Vercel → onetap-app → Production** and redeploys.

Optional, only for a test week: Events Manager → **Test events** → send the test event code as `META_CAPI_TEST_EVENT_CODE`. We remove it before live campaigns.

---

## Do not

- Create a second pixel.
- Put the pixel on `card.onetap-card.com`.
- Optimize on “Get your card” / `InitiateCheckout`.
- Name the CAPI token `NEXT_PUBLIC_*` (that would leak it in the browser).

When the token is in production, tell us — we’ll confirm one signup = **one** CompleteRegistration, then you can switch campaign optimization.
