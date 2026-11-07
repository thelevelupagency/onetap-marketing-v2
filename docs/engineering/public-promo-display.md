# Public promo display contract

Marketing asks onetap-app for the discount that should appear on plan prices. The route is not in this repo. Until it responds, prices stay the list price and the promo price badge stays off.

## Request

`GET {NEXT_PUBLIC_MAIN_APP_URL}/api/billing/promotions/public/display?promo={publicSlug}`

`promo` is the public campaign slug (`bf-test`), never a Lemon coupon code.

## Response

`200` JSON:

```json
{
  "discount": {
    "type": "percent",
    "percent": 40,
    "amountCents": null,
    "currency": "USD",
    "period": "both",
    "plans": ["pro", "team"]
  }
}
```

| Field | Meaning |
| --- | --- |
| `type` | `percent` or `amount` |
| `percent` | Percent off when `type` is `percent`. Otherwise `null`. |
| `amountCents` | Integer minor units off the checkout total when `type` is `amount`. Otherwise `null`. |
| `currency` | `USD` only. Anything else is ignored. |
| `period` | `monthly`, `annual`, or `both` — the billing period the discount changes. |
| `plans` | Eligible marketing plan ids: `free`, `pro`, `team`. |
| `discount` | `null` when the campaign does not change the price. |

A fixed amount uses `"type": "amount"`, `"percent": null`, and a positive integer `amountCents`.

The body must not include a coupon, Lemon code, or the keys `code`, `coupon`, `couponCode`, `discountCode`, `lemonCode`, or `promoCode`. Marketing rejects the payload if it does.

## Price math

Matches Lemon checkout, half-up to the cent:

- Percent: `round(listCents * (100 - percent) / 100)`
- Amount: `max(0, listCents - amountCents)`

Monthly checkout uses the monthly list price. Annual checkout uses the yearly total (the card's monthly-equivalent annual price × 12). The card then shows that discounted yearly total and the per-month equivalent (`round(yearlyCents / 12)`).

Non-200, timeout, or an unexpected body: list price, no promo badge.
