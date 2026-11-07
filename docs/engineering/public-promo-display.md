# Public promo price contract

Marketing reads the discount from the same public promo route as the strip. There is no `/display` path. Until `price` is present and valid, plan cards keep the list price.

Source: onetap-app `GET /api/billing/promotions/public` (PR 412).

## Request

`GET {NEXT_PUBLIC_MAIN_APP_URL}/api/billing/promotions/public?promo={publicSlug}`

`promo` is the public campaign slug (`bf-test`), never a Lemon coupon code. Omitting it returns the current public campaign, if one is unpinned.

## Response

`200` JSON. `campaign` is the strip copy. `price` is the checkout discount, or `null` when the campaign does not change the price.

```json
{
  "campaign": {
    "slug": "bf-test",
    "endsAt": "2026-12-01T21:59:59.000Z",
    "priority": 10,
    "marketingPublic": true,
    "requiresPromoPin": false,
    "copy": {
      "payNow": { "en": "Upgrade, a test discount.", "he": "שדרגו, הנחת בדיקה." },
      "priceBadge": { "en": "a test discount", "he": "הנחת בדיקה" }
    }
  },
  "price": {
    "percent": 40,
    "fixedCents": null,
    "duration": "forever",
    "eligiblePlans": ["pro", "team"],
    "eligiblePeriods": ["monthly", "yearly"]
  }
}
```

A fixed amount sets `percent` to `null` and `fixedCents` to a positive integer (USD minor units):

```json
{
  "percent": null,
  "fixedCents": 480,
  "duration": "once",
  "eligiblePlans": ["pro"],
  "eligiblePeriods": ["monthly"]
}
```

| Field | Meaning |
| --- | --- |
| `percent` | Percent off. `null` when the discount is a fixed amount. |
| `fixedCents` | Cents off the checkout total. `null` when the discount is a percent. Exactly one of `percent` and `fixedCents` is set. |
| `duration` | Lemon duration: `once`, `repeating`, or `forever`. |
| `eligiblePlans` | `pro` and/or `team`. |
| `eligiblePeriods` | `monthly` and/or `yearly`. The app uses `yearly`, not `annual`. |

The body must not include a coupon or Lemon code. Marketing ignores `price` when it contains `code`, `coupon`, `couponCode`, `discountCode`, `lemonCode`, or `promoCode`.

## Price math

Matches Lemon checkout, half-up to the cent:

- Percent: `round(listCents * (100 - percent) / 100)`
- Fixed: `max(0, listCents - fixedCents)`

Monthly checkout uses the monthly list price. Yearly checkout uses the yearly total (the card's monthly-equivalent annual price × 12). The card then shows that discounted yearly total and the per-month equivalent (`round(yearlyCents / 12)`).

`eligiblePeriods` decides which toggle is rewritten: `monthly`, `yearly` (shown as annual), or both. `duration` is kept with the discount and does not change that checkout total.

Non-200, timeout, missing `price`, or an unexpected `price`: list price, no promo price. A valid `campaign` can still show the strip.
