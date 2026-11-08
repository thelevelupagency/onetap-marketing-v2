# Public promo price contract

Marketing reads the discount from the same public promo route as the strip. There is no `/display` path. Until `price` is present and valid, plan cards keep the list price.

Source of truth (onetap-app):

- `src/app/api/billing/promotions/public/route.ts` — the route, `{ campaign, price }`.
- `src/slices/billing/domain/selectMarketingPromoCampaign.ts` — the `campaign` shape (incl. nullable `theme`).
- `src/slices/billing/domain/promoCampaignCopy.ts` — `copy.bannerSentence` (`{discount}` already filled).
- `src/slices/billing/domain/promoThemeStyle.ts` — how the `theme` hex palette becomes `--promo-*` CSS vars.
- `src/slices/billing/domain/promoCheckoutPrice.ts` — `PublicPromoPriceDisplay` (the `price` object, unchanged).

## Request

`GET {NEXT_PUBLIC_MAIN_APP_URL}/api/billing/promotions/public?promo={publicSlug}`

`promo` is the public campaign slug (`bf-test`), never a Lemon coupon code. Omitting it returns the current public campaign, if one is unpinned.

## Response

`200` JSON. `campaign` is the strip copy. `price` is top-level and may be `null`.

```json
{
  "campaign": {
    "slug": "bf-test",
    "endsAt": "2026-12-01T21:59:59.000Z",
    "priority": 10,
    "marketingPublic": true,
    "requiresPromoPin": false,
    "theme": {
      "background": "#1e3a5f",
      "foreground": "#ffffff",
      "accent": "#f5b301",
      "buttonBackground": "#ffffff",
      "buttonForeground": "#1e3a5f"
    },
    "copy": {
      "bannerSentence": { "en": "Upgrade, a test discount.", "he": "שדרגו, הנחת בדיקה." }
    }
  },
  "price": {
    "discount": { "kind": "percent", "percent": 40 },
    "duration": "forever",
    "durationInMonths": null,
    "eligiblePlans": ["pro", "team"],
    "eligiblePeriods": ["monthly", "yearly"]
  }
}
```

### `campaign` fields

| Field | Meaning |
| --- | --- |
| `slug` | Public campaign slug (kebab). Never a Lemon coupon code. |
| `endsAt` | ISO instant. A past `endsAt` is treated as expired (strip hidden, slug stripped). |
| `priority` | App-side ordering; higher wins when no `?promo=` is pinned. |
| `marketingPublic` | Must be `true` for the strip to render. |
| `requiresPromoPin` | Link-gated campaigns; informational for the site. |
| `theme` | Nullable `#rrggbb` palette (`background`, `foreground`, `accent`, `buttonBackground`, `buttonForeground`). Applied as inline `--promo-*` CSS vars on the strip (`bg-[var(--promo-bg)] text-[var(--promo-fg)]`) and as a subtle accent on discounted pricing notes. `null` → keep the site's brand tokens. If any field is missing or not `#rrggbb`, the whole theme is nulled (fail closed). |
| `copy.bannerSentence` | Marketing strip sentence per locale (`en`, `he`), `{discount}` already interpolated. Replaces the removed `copy.payNow`. |

Removed in the current contract: `copy.payNow` (superseded by `copy.bannerSentence`) and `copy.priceBadge` (the site renders struck prices from `price`, so the badge phrase and its `resolvePriceBadgePhrase` helper are gone).

A fixed amount:

```json
{
  "discount": { "kind": "fixed", "amountCents": 480 },
  "duration": "once",
  "durationInMonths": null,
  "eligiblePlans": ["pro"],
  "eligiblePeriods": ["monthly"]
}
```

A repeating discount sets `durationInMonths` to a positive integer. `durationInMonths` is `null` unless `duration` is `repeating`.

| Field | Meaning |
| --- | --- |
| `discount` | `{ kind: "percent", percent }` or `{ kind: "fixed", amountCents }`. `amountCents` is USD minor units off the variant charge. |
| `duration` | `once`, `repeating`, or `forever`. |
| `durationInMonths` | Set only when `duration` is `repeating`. `null` on a repeating discount means no promo price. |
| `eligiblePlans` | `pro` and/or `team`. |
| `eligiblePeriods` | `monthly` and/or `yearly`. The app uses `yearly`, not `annual`. |

There is no `fixedCents` field and no flat `percent` field beside `discount`. The payload must not include a coupon or Lemon code. Marketing ignores `price` when it contains `code`, `coupon`, `couponCode`, `discountCode`, `lemonCode`, or `promoCode`.

## Price math

The list price is the Lemon variant charge: the monthly price, or the yearly total (monthly-equivalent × 12).

- Percent: `off = Math.round(listCents * percent / 100)`, then clamp `off` at 0. A percent of 100 or more prices the variant at 0 (the public payload only sends 100; higher percents are already dropped by the app). A percent of 0 or less is no change.
- Fixed: `max(0, listCents - amountCents)`.

The payable total is `max(0, listCents - off)`. When it equals the list price, the card shows no strike. The yearly card shows that checkout total and `round(yearlyCents / 12)` per month.

`eligiblePeriods` decides which toggle is rewritten. It does not choose the sentence under the struck price. That sentence comes from `duration` and, for a repeating discount, `durationInMonths`, plus the billing period on screen:

| `duration` | Monthly card | Yearly card |
| --- | --- | --- |
| `once` | Discounted for the first month / הנחה לחודש הראשון | Discounted for the first year / הנחה לשנה הראשונה |
| `repeating` | Discounted for the first N months / הנחה ל-N החודשים הראשונים | Same. N is `durationInMonths`. One month uses the first-month sentence. |
| `forever` | Ongoing discount / הנחה מתמשכת | Same |

`429` and `503` (and any other non-200 or transport failure) leave the list price and hide the strip and badge. A `200` with `price: null` still shows the strip when `campaign` is valid.

## Slug check

Middleware confirms `?promo=` (and the `?coupon=` alias) with the same route, `cache: no-store`, and a 5 second timeout. A timeout, a network error, HTTP 408, HTTP 429, or any HTTP 5xx keeps the sanitized slug on the URL and on the request header, and does not set `onetap-promo-reject`. The page then reads the campaign again. If that read also fails, cards stay on the list price with no badge and no strip, and the slug remains so a refresh can retry.

Only a completed response that is unknown or expired strips the param and sets the reject cookie: HTTP 200 with `campaign: null`, a campaign whose `endsAt` has passed, or a campaign slug that does not match the alias. A locally invalid alias (not a kebab slug) is stripped the same way, without a fetch. The coupon code itself is never written into the page or into an outbound URL.
