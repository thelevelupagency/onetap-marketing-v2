import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  CHECKOUT_COUPON_QUERY_KEY,
  PROMO_SLUG_QUERY_KEY,
  appendAttributionParams,
  appendPromoQueryToHref,
  sanitizeCheckoutCouponCode,
  sanitizePromoSlug,
} from "../src/lib/constants";
import {
  resolvePriceBadgePhrase,
  resolveStripSentence,
  type PublicMarketingPromoCampaign,
} from "../src/lib/promotions/public-promo";

describe("sanitizePromoSlug", () => {
  it("lowercases and accepts kebab slugs", () => {
    assert.equal(sanitizePromoSlug("Black-Friday"), "black-friday");
    assert.equal(sanitizePromoSlug("fb-pro-50"), "fb-pro-50");
  });

  it("rejects invalid values", () => {
    assert.equal(sanitizePromoSlug(""), null);
    assert.equal(sanitizePromoSlug("has spaces"), null);
    assert.equal(sanitizePromoSlug("-leading"), null);
    assert.equal(sanitizePromoSlug("UPPER_UNDERSCORE"), null);
  });
});

describe("sanitizeCheckoutCouponCode", () => {
  it("stays independent of promo slug rules", () => {
    assert.equal(sanitizeCheckoutCouponCode("save70"), "SAVE70");
    assert.equal(sanitizeCheckoutCouponCode("black-friday"), "BLACK-FRIDAY");
  });
});

describe("appendPromoQueryToHref", () => {
  it("appends promo without dropping other query keys", () => {
    const next = appendPromoQueryToHref(
      "/pricing?coupon=SAVE70&category=success-stories",
      "black-friday",
    );
    const url = new URL(next, "https://onetap.local");
    assert.equal(url.searchParams.get(PROMO_SLUG_QUERY_KEY), "black-friday");
    assert.equal(url.searchParams.get(CHECKOUT_COUPON_QUERY_KEY), "SAVE70");
    assert.equal(url.searchParams.get("category"), "success-stories");
  });

  it("skips absolute and hash/mailto links", () => {
    assert.equal(appendPromoQueryToHref("#section", "black-friday"), "#section");
    assert.equal(
      appendPromoQueryToHref("mailto:hi@example.com", "black-friday"),
      "mailto:hi@example.com",
    );
    assert.equal(
      appendPromoQueryToHref("https://app.onetap-card.com/register", "black-friday"),
      "https://app.onetap-card.com/register",
    );
  });

  it("ignores invalid promo", () => {
    assert.equal(appendPromoQueryToHref("/pricing", "NOT VALID"), "/pricing");
  });
});

describe("appendAttributionParams dual keys", () => {
  it("stamps promo and coupon as separate keys", () => {
    const source = new URLSearchParams();
    source.set(CHECKOUT_COUPON_QUERY_KEY, "SAVE70");
    source.set(PROMO_SLUG_QUERY_KEY, "black-friday");
    const stamped = appendAttributionParams(
      "https://app.onetap-card.com/register",
      source,
    );
    const url = new URL(stamped);
    assert.equal(url.searchParams.get(CHECKOUT_COUPON_QUERY_KEY), "SAVE70");
    assert.equal(url.searchParams.get(PROMO_SLUG_QUERY_KEY), "black-friday");
  });

  it("does not write coupon from a promo slug", () => {
    const source = new URLSearchParams();
    source.set(PROMO_SLUG_QUERY_KEY, "black-friday");
    const stamped = appendAttributionParams(
      "https://app.onetap-card.com/register",
      source,
    );
    const url = new URL(stamped);
    assert.equal(url.searchParams.get(PROMO_SLUG_QUERY_KEY), "black-friday");
    assert.equal(url.searchParams.get(CHECKOUT_COUPON_QUERY_KEY), null);
  });

  it("does not write promo from a coupon code", () => {
    const source = new URLSearchParams();
    source.set(CHECKOUT_COUPON_QUERY_KEY, "SAVE70");
    const stamped = appendAttributionParams(
      "https://app.onetap-card.com/register",
      source,
    );
    const url = new URL(stamped);
    assert.equal(url.searchParams.get(CHECKOUT_COUPON_QUERY_KEY), "SAVE70");
    assert.equal(url.searchParams.get(PROMO_SLUG_QUERY_KEY), null);
  });
});

describe("public promo fail-closed copy helpers", () => {
  const base: PublicMarketingPromoCampaign = {
    slug: "black-friday",
    endsAt: "2025-12-02T05:00:00.000Z",
    priority: 100,
    marketingPublic: true,
    requiresPromoPin: false,
    copy: {
      payNow: { en: "Upgrade, this discount.", he: "שדרגו, ההנחה הזו." },
      priceBadge: { en: "this discount", he: "ההנחה הזו" },
    },
  };

  it("returns null for a null campaign", () => {
    assert.equal(resolveStripSentence(null, "en"), null);
    assert.equal(resolvePriceBadgePhrase(null, "en"), null);
  });

  it("returns null when the locale payNow sentence is blank", () => {
    const campaign: PublicMarketingPromoCampaign = {
      ...base,
      copy: {
        ...base.copy,
        payNow: { en: "   ", he: base.copy.payNow.he },
      },
    };
    assert.equal(resolveStripSentence(campaign, "en"), null);
    assert.equal(resolveStripSentence(campaign, "he"), "שדרגו, ההנחה הזו.");
  });

  it("returns null when the locale priceBadge phrase is blank", () => {
    const campaign: PublicMarketingPromoCampaign = {
      ...base,
      copy: {
        ...base.copy,
        priceBadge: { en: "", he: base.copy.priceBadge.he },
      },
    };
    assert.equal(resolvePriceBadgePhrase(campaign, "en"), null);
    assert.equal(resolvePriceBadgePhrase(campaign, "he"), "ההנחה הזו");
  });
});
