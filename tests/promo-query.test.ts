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
  isCampaignCurrent,
  resolvePriceBadgePhrase,
  resolveStripSentence,
  selectActiveCampaign,
  type PublicMarketingPromoCampaign,
} from "../src/lib/promotions/public-promo";
import {
  planPromoNavigation,
  readPromoAlias,
  signupPromoSlug,
} from "../src/lib/promotions/promo-navigation";
import { quotePromoPrice, type PublicPromoDiscount } from "../src/lib/promotions/promo-price";
import { parsePublicPromoPrice } from "../src/lib/promotions/public-promo-display";
import { publicPromoPayloadFromHttp } from "../src/lib/promotions/public-promo";

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
  it("appends a validated slug and strips coupon codes", () => {
    const next = appendPromoQueryToHref(
      "/pricing?coupon=BFTEST&category=success-stories",
      "bf-test",
    );
    const url = new URL(next, "https://onetap.local");
    assert.equal(url.searchParams.get(PROMO_SLUG_QUERY_KEY), "bf-test");
    assert.equal(url.searchParams.get(CHECKOUT_COUPON_QUERY_KEY), null);
    assert.equal(url.searchParams.get("category"), "success-stories");
    assert.equal(next.includes("BFTEST"), false);
  });

  it("drops an invalid or expired promo when no validated slug is supplied", () => {
    assert.equal(appendPromoQueryToHref("/blog/post?promo=bftest", null), "/blog/post");
    assert.equal(appendPromoQueryToHref("/blog/post?coupon=BFTEST", null), "/blog/post");
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

describe("appendAttributionParams validated slug only", () => {
  it("stamps the validated slug and never a raw coupon", () => {
    const source = new URLSearchParams();
    source.set(CHECKOUT_COUPON_QUERY_KEY, "BFTEST");
    source.set(PROMO_SLUG_QUERY_KEY, "bftest");
    const stamped = appendAttributionParams(
      "https://app.onetap-card.com/register",
      source,
      "bf-test",
    );
    const url = new URL(stamped);
    assert.equal(url.searchParams.get(PROMO_SLUG_QUERY_KEY), "bf-test");
    assert.equal(url.searchParams.get(CHECKOUT_COUPON_QUERY_KEY), null);
    assert.equal(stamped.includes("BFTEST"), false);
    assert.equal(stamped.includes("bftest"), false);
  });

  it("does not write promo from a coupon code or stale source promo", () => {
    const source = new URLSearchParams();
    source.set(CHECKOUT_COUPON_QUERY_KEY, "BFTEST");
    source.set(PROMO_SLUG_QUERY_KEY, "bftest");
    const stamped = appendAttributionParams(
      "https://app.onetap-card.com/register",
      source,
      null,
    );
    const url = new URL(stamped);
    assert.equal(url.searchParams.get(CHECKOUT_COUPON_QUERY_KEY), null);
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

const liveCampaign: PublicMarketingPromoCampaign = {
  slug: "bf-test",
  endsAt: "2099-12-01T00:00:00.000Z",
  priority: 10,
  marketingPublic: true,
  requiresPromoPin: false,
  copy: {
    payNow: { en: "Upgrade, a test discount.", he: "שדרגו, הנחת בדיקה." },
    priceBadge: { en: "a test discount", he: "הנחת בדיקה" },
  },
};

describe("promo alias navigation", () => {
  it("treats promo and coupon as slug aliases", () => {
    assert.deepEqual(readPromoAlias(new URLSearchParams("promo=BF-TEST")), {
      kind: "promo",
      slug: "bf-test",
    });
    assert.deepEqual(readPromoAlias(new URLSearchParams("coupon=BF-TEST")), {
      kind: "coupon",
      slug: "bf-test",
    });
    assert.deepEqual(readPromoAlias(new URLSearchParams("coupon=bf-test")), {
      kind: "coupon",
      slug: "bf-test",
    });
  });

  it("keeps a valid alias on navigation and signup", () => {
    const plan = planPromoNavigation({
      search: new URLSearchParams("coupon=BF-TEST&utm_source=meta"),
      validatedSlug: "bf-test",
      rejectCookie: false,
    });
    assert.equal(plan.rejected, false);
    assert.equal(plan.requestedSlug, "bf-test");
    assert.equal(plan.redirectTo?.get(PROMO_SLUG_QUERY_KEY), "bf-test");
    assert.equal(plan.redirectTo?.get(CHECKOUT_COUPON_QUERY_KEY), null);
    assert.equal(plan.redirectTo?.get("utm_source"), "meta");
    assert.equal(plan.redirectTo?.toString().includes("BF"), false);

    const href = appendPromoQueryToHref("/blog/what-is-a-digital-business-card", "bf-test");
    assert.equal(href, "/blog/what-is-a-digital-business-card?promo=bf-test");
    assert.equal(
      signupPromoSlug({
        rejected: false,
        campaignSlug: "bf-test",
        storedCoupon: "BFTEST",
        storedPromo: "old-slug",
      }),
      "bf-test",
    );
  });

  it("rejects an invalid promo and does not carry stored codes", () => {
    const plan = planPromoNavigation({
      search: new URLSearchParams("promo=BFTEST"),
      validatedSlug: null,
      rejectCookie: false,
    });
    assert.equal(plan.rejected, true);
    assert.equal(plan.requestedSlug, null);
    assert.equal(plan.setRejectCookie, true);
    assert.equal(plan.redirectTo?.get(PROMO_SLUG_QUERY_KEY), null);
    assert.equal(plan.redirectTo?.toString().includes("BFTEST"), false);
    assert.equal(
      signupPromoSlug({
        rejected: true,
        campaignSlug: "bf-test",
        storedCoupon: "BFTEST",
        storedPromo: "bf-test",
      }),
      null,
    );
    const stamped = appendAttributionParams(
      "https://app.onetap-card.com/register",
      new URLSearchParams("coupon=BFTEST&promo=bftest"),
      signupPromoSlug({
        rejected: true,
        campaignSlug: "bf-test",
        storedCoupon: "BFTEST",
      }),
    );
    assert.equal(stamped.includes("BFTEST"), false);
    assert.equal(stamped.includes("promo="), false);
    assert.equal(stamped.includes("coupon="), false);
  });

  it("rejects an expired campaign", () => {
    const expired: PublicMarketingPromoCampaign = {
      ...liveCampaign,
      endsAt: "2000-01-01T00:00:00.000Z",
    };
    assert.equal(isCampaignCurrent(expired, Date.parse("2026-11-07T00:00:00.000Z")), false);
    assert.equal(selectActiveCampaign(expired, "bf-test"), null);
    const plan = planPromoNavigation({
      search: new URLSearchParams("promo=bf-test"),
      validatedSlug: null,
      rejectCookie: false,
    });
    assert.equal(plan.rejected, true);
    assert.equal(plan.redirectTo?.toString() ?? "", "");
  });

  it("keeps a live campaign and ignores a stale stored code on the next clean visit", () => {
    assert.equal(selectActiveCampaign(liveCampaign, "bf-test")?.slug, "bf-test");
    const followUp = planPromoNavigation({
      search: new URLSearchParams(),
      validatedSlug: null,
      rejectCookie: true,
    });
    assert.equal(followUp.rejected, true);
    assert.equal(followUp.clearRejectCookie, true);
    assert.equal(
      signupPromoSlug({
        rejected: false,
        campaignSlug: liveCampaign.slug,
        storedCoupon: "BFTEST",
        storedPromo: "not-a-campaign",
      }),
      "bf-test",
    );
  });
});

const percentBoth: PublicPromoDiscount = {
  discount: { kind: "percent", percent: 40 },
  duration: "forever",
  durationInMonths: null,
  eligiblePlans: ["pro", "team"],
  eligiblePeriods: ["monthly", "yearly"],
  period: "both",
};

describe("promo display prices", () => {
  const pro = { id: "pro", monthlyPrice: 12, annualPrice: 10 };
  const free = { id: "free", monthlyPrice: 0, annualPrice: 0 };

  it("prices a percent discount to the Lemon checkout cent", () => {
    const monthly = quotePromoPrice(pro, "monthly", percentBoth);
    assert.equal(monthly?.previousCents, 1200);
    assert.equal(monthly?.currentCents, 720);
    const annual = quotePromoPrice(pro, "annual", percentBoth);
    assert.equal(annual?.previousYearlyCents, 12000);
    assert.equal(annual?.yearlyCheckoutCents, 7200);
    assert.equal(annual?.currentCents, 600);
    assert.equal(annual?.previousCents, 1000);
  });

  it("leaves ineligible plans and the other billing period unchanged", () => {
    assert.equal(quotePromoPrice(free, "monthly", percentBoth), null);
    const monthlyOnly: PublicPromoDiscount = { ...percentBoth, period: "monthly" };
    assert.equal(quotePromoPrice(pro, "annual", monthlyOnly), null);
    assert.equal(quotePromoPrice(pro, "monthly", null), null);
  });

  it("applies a fixed amount to the yearly variant charge", () => {
    const amount: PublicPromoDiscount = {
      discount: { kind: "fixed", amountCents: 480 },
      duration: "once",
      durationInMonths: null,
      eligiblePlans: ["pro"],
      eligiblePeriods: ["yearly"],
      period: "annual",
    };
    const annual = quotePromoPrice(pro, "annual", amount);
    assert.equal(annual?.previousYearlyCents, 12000);
    assert.equal(annual?.yearlyCheckoutCents, 11520);
    assert.equal(quotePromoPrice(pro, "monthly", amount), null);
  });

  it("does not strike when the percent leaves the list price unchanged", () => {
    const full: PublicPromoDiscount = {
      ...percentBoth,
      discount: { kind: "percent", percent: 100 },
    };
    const zero: PublicPromoDiscount = {
      ...percentBoth,
      discount: { kind: "percent", percent: 0 },
    };
    assert.equal(quotePromoPrice(pro, "monthly", full), null);
    assert.equal(quotePromoPrice(pro, "monthly", zero), null);
  });

  it("reads the app price object and rejects a code", () => {
    assert.equal(
      parsePublicPromoPrice({
        campaign: { slug: "bf-test" },
        price: {
          discount: { kind: "percent", percent: 40 },
          duration: "forever",
          durationInMonths: null,
          eligiblePlans: ["pro"],
          eligiblePeriods: ["monthly", "yearly"],
          coupon: "BFTEST",
        },
      }),
      null,
    );
    const parsed = parsePublicPromoPrice({
      campaign: { slug: "bf-test" },
      price: {
        discount: { kind: "percent", percent: 40 },
        duration: "forever",
        durationInMonths: null,
        eligiblePlans: ["pro", "team"],
        eligiblePeriods: ["monthly", "yearly"],
      },
    });
    assert.deepEqual(parsed?.discount, { kind: "percent", percent: 40 });
    assert.equal(parsed?.duration, "forever");
    assert.equal(parsed?.durationInMonths, null);
    assert.equal(parsed?.period, "both");
    assert.deepEqual(parsed?.eligiblePlans, ["pro", "team"]);
    assert.equal(JSON.stringify(parsed).includes("BFTEST"), false);
  });

  it("applies a repeating discount only when durationInMonths is set", () => {
    const repeating = parsePublicPromoPrice({
      price: {
        discount: { kind: "percent", percent: 40 },
        duration: "repeating",
        durationInMonths: 3,
        eligiblePlans: ["pro"],
        eligiblePeriods: ["monthly"],
      },
    });
    assert.equal(repeating?.durationInMonths, 3);
    assert.equal(quotePromoPrice(pro, "monthly", repeating)?.currentCents, 720);
    assert.equal(
      parsePublicPromoPrice({
        price: {
          discount: { kind: "percent", percent: 40 },
          duration: "repeating",
          durationInMonths: null,
          eligiblePlans: ["pro"],
          eligiblePeriods: ["monthly"],
        },
      }),
      null,
    );
  });

  it("treats a fixed price and a missing price as the documented cases", () => {
    assert.equal(parsePublicPromoPrice({ campaign: { slug: "bf-test" }, price: null }), null);
    const fixed = parsePublicPromoPrice({
      price: {
        discount: { kind: "fixed", amountCents: 500 },
        duration: "once",
        durationInMonths: null,
        eligiblePlans: ["team"],
        eligiblePeriods: ["yearly"],
      },
    });
    assert.deepEqual(fixed?.discount, { kind: "fixed", amountCents: 500 });
    assert.equal(fixed?.period, "annual");
    assert.equal(quotePromoPrice(pro, "monthly", fixed), null);
    assert.equal(
      quotePromoPrice({ id: "team", monthlyPrice: 35, annualPrice: 28 }, "annual", fixed)
        ?.yearlyCheckoutCents,
      33100,
    );
  });

  it("falls back to the list price on 429 and 503", () => {
    for (const status of [429, 503]) {
      const payload = publicPromoPayloadFromHttp(status, {
        campaign: { slug: "bf-test" },
        price: {
          discount: { kind: "percent", percent: 40 },
          duration: "forever",
          durationInMonths: null,
          eligiblePlans: ["pro"],
          eligiblePeriods: ["monthly"],
        },
      });
      assert.equal(payload.campaign, null);
      assert.equal(payload.discount, null);
    }
  });
});
