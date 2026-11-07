# Public promo price contract

Marketing reads the discount from the same public promo route as the strip. There is no `/display` path. Until `price` is present and valid, plan cards keep the list price.

Source: onetap-app `src/app/api/billing/promotions/public/route.ts` and `src/slices/billing/domain/promoCheckoutPrice.ts` (`PublicPromoPriceDisplay`, PR 412).

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
    "copy": {
      "payNow": { "en": "Upgrade, a test discount.", "he": "שדרגו, הנחת בדיקה." },
      "priceBadge": { "en": "a test discount", "he": "הנחת בדיקה" }
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

`eligiblePeriods` decides which toggle is rewritten. `429` and `503` (and any other non-200 or transport failure) leave the list price. A `200` with `price: null` still shows the strip when `campaign` is valid.
