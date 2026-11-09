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
  marketingPromoFromRead,
  PUBLIC_PROMO_FETCH_TIMEOUT_MS,
  publicPromoPayloadFromHttp,
  readPublicPromo,
  resolveEligiblePriceBadgePhrase,
  resolvePriceBadgePhrase,
  resolveStripSentence,
  selectActiveCampaign,
  slugAfterPublicPromoRead,
  type PublicMarketingPromoCampaign,
  type PublicPromoRead,
} from "../src/lib/promotions/public-promo";
import {
  planPromoNavigation,
  readPromoAlias,
  signupPromoSlug,
} from "../src/lib/promotions/promo-navigation";
import {
  promoDurationLabel,
  quotePromoPrice,
  type PromoDurationCopy,
  type PublicPromoDiscount,
} from "../src/lib/promotions/promo-price";
import { parsePublicPromoPrice } from "../src/lib/promotions/public-promo-display";

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
    theme: null,
    copy: {
      bannerSentence: { en: "Upgrade, this discount.", he: "שדרגו, ההנחה הזו." },
      discountPhrase: { en: "40% off", he: "40% הנחה" },
    },
  };

  it("returns null for a null campaign", () => {
    assert.equal(resolveStripSentence(null, "en"), null);
    assert.equal(resolvePriceBadgePhrase(null, "en"), null);
  });

  it("returns null when the locale bannerSentence is blank", () => {
    const campaign: PublicMarketingPromoCampaign = {
      ...base,
      copy: {
        bannerSentence: { en: "   ", he: base.copy.bannerSentence.he },
        discountPhrase: base.copy.discountPhrase,
      },
    };
    assert.equal(resolveStripSentence(campaign, "en"), null);
    assert.equal(resolveStripSentence(campaign, "he"), "שדרגו, ההנחה הזו.");
  });

  it("hides the price badge when the plan is ineligible or the phrase is blank", () => {
    assert.equal(resolveEligiblePriceBadgePhrase(base, "en", true), "40% off");
    assert.equal(resolveEligiblePriceBadgePhrase(base, "en", false), null);
    const blankPhrase: PublicMarketingPromoCampaign = {
      ...base,
      copy: {
        bannerSentence: base.copy.bannerSentence,
        discountPhrase: { en: "  ", he: base.copy.discountPhrase.he },
      },
    };
    assert.equal(resolveEligiblePriceBadgePhrase(blankPhrase, "en", true), null);
    const blankStrip: PublicMarketingPromoCampaign = {
      ...base,
      copy: {
        bannerSentence: { en: "", he: base.copy.bannerSentence.he },
        discountPhrase: base.copy.discountPhrase,
      },
    };
    assert.equal(resolveEligiblePriceBadgePhrase(blankStrip, "en", true), null);
  });
});

const liveCampaign: PublicMarketingPromoCampaign = {
  slug: "bf-test",
  endsAt: "2099-12-01T00:00:00.000Z",
  priority: 10,
  marketingPublic: true,
  requiresPromoPin: false,
  theme: null,
  copy: {
    bannerSentence: { en: "Upgrade, a test discount.", he: "שדרגו, הנחת בדיקה." },
    discountPhrase: { en: "40% off", he: "40% הנחה" },
  },
};

describe("public campaign sanitizer reads bannerSentence and theme", () => {
  const validTheme = {
    background: "#1e3a5f",
    foreground: "#ffffff",
    accent: "#f5b301",
    buttonBackground: "#ffffff",
    buttonForeground: "#1e3a5f",
  };
  const campaignBody = (overrides: Record<string, unknown> = {}) => ({
    slug: "bf-test",
    endsAt: "2099-12-01T00:00:00.000Z",
    priority: 10,
    marketingPublic: true,
    requiresPromoPin: false,
    copy: {
      bannerSentence: { en: "Upgrade, a test discount.", he: "שדרגו, הנחת בדיקה." },
      discountPhrase: { en: "40% off", he: "40% הנחה" },
    },
    ...overrides,
  });

  it("reads copy.bannerSentence per locale", () => {
    const { campaign } = publicPromoPayloadFromHttp(200, {
      campaign: campaignBody(),
    });
    assert.equal(campaign?.copy.bannerSentence.en, "Upgrade, a test discount.");
    assert.equal(campaign?.copy.bannerSentence.he, "שדרגו, הנחת בדיקה.");
    assert.equal(campaign?.copy.discountPhrase.en, "40% off");
    assert.equal(campaign?.copy.discountPhrase.he, "40% הנחה");
  });

  it("defaults omitted discountPhrase to empty strings without dropping the campaign", () => {
    const { campaign } = publicPromoPayloadFromHttp(200, {
      campaign: campaignBody({
        copy: {
          bannerSentence: { en: "Upgrade, a test discount.", he: "שדרגו, הנחת בדיקה." },
        },
      }),
    });
    assert.ok(campaign);
    assert.deepEqual(campaign?.copy.discountPhrase, { en: "", he: "" });
  });

  it("drops the campaign when copy.bannerSentence is missing", () => {
    const { campaign } = publicPromoPayloadFromHttp(200, {
      campaign: campaignBody({ copy: {} }),
    });
    assert.equal(campaign, null);
  });

  it("keeps a valid #rrggbb theme", () => {
    const { campaign } = publicPromoPayloadFromHttp(200, {
      campaign: campaignBody({ theme: validTheme }),
    });
    assert.deepEqual(campaign?.theme, validTheme);
  });

  it("nulls the whole theme when any field is not #rrggbb", () => {
    const { campaign } = publicPromoPayloadFromHttp(200, {
      campaign: campaignBody({
        theme: { ...validTheme, accent: "red" },
      }),
    });
    assert.equal(campaign?.slug, "bf-test");
    assert.equal(campaign?.theme, null);
  });

  it("nulls the theme when a field is missing", () => {
    const { background: _omit, ...partial } = validTheme;
    const { campaign } = publicPromoPayloadFromHttp(200, {
      campaign: campaignBody({ theme: partial }),
    });
    assert.equal(campaign?.theme, null);
  });

  it("leaves theme null when no theme is sent (brand fallback)", () => {
    const { campaign } = publicPromoPayloadFromHttp(200, {
      campaign: campaignBody(),
    });
    assert.equal(campaign?.theme, null);
    // A null theme drives the strip's brand-token fallback (no inline vars).
    assert.equal(resolveStripSentence(campaign, "en"), "Upgrade, a test discount.");
  });
});

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

  it("strikes the list price and shows $0 at 100 percent", () => {
    const full: PublicPromoDiscount = {
      ...percentBoth,
      discount: { kind: "percent", percent: 100 },
    };
    const monthly = quotePromoPrice(pro, "monthly", full);
    assert.equal(monthly?.previousCents, 1200);
    assert.equal(monthly?.currentCents, 0);
  });

  it("does not strike when the percent is 0 or less", () => {
    const zero: PublicPromoDiscount = {
      ...percentBoth,
      discount: { kind: "percent", percent: 0 },
    };
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

const durationCopyEn: PromoDurationCopy = {
  onceMonthly: "Discounted for the first month",
  onceYearly: "Discounted for the first year",
  repeatingMonths: "Discounted for the first {n} months",
  forever: "Ongoing discount",
};

const durationCopyHe: PromoDurationCopy = {
  onceMonthly: "הנחה לחודש הראשון",
  onceYearly: "הנחה לשנה הראשונה",
  repeatingMonths: "הנחה ל-{n} החודשים הראשונים",
  forever: "הנחה מתמשכת",
};

describe("promo duration notes", () => {
  const once: PublicPromoDiscount = { ...percentBoth, duration: "once" };

  it("names the first month or year for a one-time discount", () => {
    assert.equal(promoDurationLabel(once, "monthly", durationCopyEn), "Discounted for the first month");
    assert.equal(promoDurationLabel(once, "annual", durationCopyEn), "Discounted for the first year");
    assert.equal(promoDurationLabel(once, "monthly", durationCopyHe), "הנחה לחודש הראשון");
    assert.equal(promoDurationLabel(once, "annual", durationCopyHe), "הנחה לשנה הראשונה");
    assert.equal(promoDurationLabel(once, "monthly", durationCopyEn).includes("BFTEST"), false);
  });

  it("names the first N months for a repeating discount and ongoing for forever", () => {
    const repeating: PublicPromoDiscount = {
      ...percentBoth,
      duration: "repeating",
      durationInMonths: 3,
    };
    assert.equal(
      promoDurationLabel(repeating, "annual", durationCopyEn),
      "Discounted for the first 3 months",
    );
    assert.equal(
      promoDurationLabel(repeating, "monthly", durationCopyHe),
      "הנחה ל-3 החודשים הראשונים",
    );
    const oneMonth: PublicPromoDiscount = { ...repeating, durationInMonths: 1 };
    assert.equal(promoDurationLabel(oneMonth, "annual", durationCopyEn), "Discounted for the first month");
    assert.equal(promoDurationLabel(percentBoth, "monthly", durationCopyEn), "Ongoing discount");
    assert.equal(promoDurationLabel(percentBoth, "annual", durationCopyHe), "הנחה מתמשכת");
  });

  it("prices the live 40% once discount on Pro and Team", () => {
    const pro = { id: "pro", monthlyPrice: 12, annualPrice: 10 };
    const team = { id: "team", monthlyPrice: 35, annualPrice: 28 };
    const proMonth = quotePromoPrice(pro, "monthly", once);
    const teamMonth = quotePromoPrice(team, "monthly", once);
    const proYear = quotePromoPrice(pro, "annual", once);
    const teamYear = quotePromoPrice(team, "annual", once);
    assert.equal(proMonth?.previousCents, 1200);
    assert.equal(proMonth?.currentCents, 720);
    assert.equal(teamMonth?.previousCents, 3500);
    assert.equal(teamMonth?.currentCents, 2100);
    assert.equal(proYear?.previousYearlyCents, 12000);
    assert.equal(proYear?.yearlyCheckoutCents, 7200);
    assert.equal(teamYear?.previousYearlyCents, 33600);
    assert.equal(teamYear?.yearlyCheckoutCents, 20160);
  });
});

function jsonResponse(status: number, body: unknown): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

async function withFetch<T>(impl: typeof fetch, run: () => Promise<T>): Promise<T> {
  const original = globalThis.fetch;
  globalThis.fetch = impl;
  try {
    return await run();
  } finally {
    globalThis.fetch = original;
  }
}

describe("promo slug validation", () => {
  const livePrice = {
    campaign: liveCampaign,
    price: {
      discount: { kind: "percent", percent: 40 },
      duration: "once",
      durationInMonths: null,
      eligiblePlans: ["pro", "team"],
      eligiblePeriods: ["monthly", "yearly"],
    },
  };

  it("waits 5 seconds before a public promo read times out", () => {
    assert.equal(PUBLIC_PROMO_FETCH_TIMEOUT_MS, 5000);
  });

  it("keeps the slug when the read times out, throws, or returns 429 or 5xx", async () => {
    const cases: Array<{ name: string; impl: typeof fetch; timeoutMs?: number }> = [
      {
        name: "timeout",
        impl: (() => new Promise<Response>(() => {})) as typeof fetch,
        timeoutMs: 30,
      },
      {
        name: "network",
        impl: (() => Promise.reject(new Error("socket"))) as typeof fetch,
      },
      {
        name: "429",
        impl: (async () => new Response("rate", { status: 429 })) as typeof fetch,
      },
      {
        name: "500",
        impl: (async () => new Response("down", { status: 500 })) as typeof fetch,
      },
      {
        name: "503",
        impl: (async () => new Response("down", { status: 503 })) as typeof fetch,
      },
    ];

    for (const item of cases) {
      const read = await withFetch(item.impl, () =>
        readPublicPromo("BF-TEST", { revalidate: false, timeoutMs: item.timeoutMs ?? 200 }),
      );
      assert.equal(read.status, "unavailable", item.name);
      assert.equal(slugAfterPublicPromoRead("BF-TEST", read), "bf-test", item.name);
      const plan = planPromoNavigation({
        search: new URLSearchParams("promo=BF-TEST"),
        validatedSlug: slugAfterPublicPromoRead("BF-TEST", read),
        rejectCookie: false,
      });
      assert.equal(plan.rejected, false, item.name);
      assert.equal(plan.setRejectCookie, false, item.name);
      assert.equal(plan.requestedSlug, "bf-test", item.name);
      assert.equal(plan.redirectTo?.get(PROMO_SLUG_QUERY_KEY), "bf-test", item.name);
      assert.equal(plan.redirectTo?.toString().includes("BFTEST"), false, item.name);
      const kept = planPromoNavigation({
        search: new URLSearchParams("promo=bf-test"),
        validatedSlug: "bf-test",
        rejectCookie: false,
      });
      assert.equal(kept.redirectTo, null, item.name);
      assert.equal(kept.setRejectCookie, false, item.name);
      assert.equal(kept.rejected, false, item.name);
      const state = marketingPromoFromRead("bf-test", read);
      assert.equal(state.campaign, null, item.name);
      assert.equal(state.discount, null, item.name);
      assert.equal(state.forwardSlug, "bf-test", item.name);
    }
  });

  it("strips the slug and sets the reject cookie for an explicit unknown or expired campaign", () => {
    const unknown: PublicPromoRead = {
      status: "ok",
      payload: { campaign: null, discount: null },
    };
    assert.equal(slugAfterPublicPromoRead("bf-test", unknown), null);
    const unknownPlan = planPromoNavigation({
      search: new URLSearchParams("promo=bf-test"),
      validatedSlug: null,
      rejectCookie: false,
    });
    assert.equal(unknownPlan.rejected, true);
    assert.equal(unknownPlan.setRejectCookie, true);
    assert.equal(unknownPlan.requestedSlug, null);
    assert.equal(unknownPlan.redirectTo?.toString() ?? "", "");
    assert.equal(marketingPromoFromRead("bf-test", unknown).forwardSlug, null);

    const expired: PublicMarketingPromoCampaign = {
      ...liveCampaign,
      endsAt: "2000-01-01T00:00:00.000Z",
    };
    const expiredRead: PublicPromoRead = {
      status: "ok",
      payload: { campaign: expired, discount: null },
    };
    assert.equal(slugAfterPublicPromoRead("bf-test", expiredRead), null);
    const mismatch: PublicPromoRead = {
      status: "ok",
      payload: { campaign: { ...liveCampaign, slug: "other-sale" }, discount: null },
    };
    assert.equal(slugAfterPublicPromoRead("bf-test", mismatch), null);
  });

  it("keeps a live campaign and still falls back to the list price when the page read fails", async () => {
    const read = await withFetch(
      (async () => jsonResponse(200, livePrice)) as typeof fetch,
      () => readPublicPromo("bf-test", { revalidate: false, timeoutMs: 200 }),
    );
    assert.equal(read.status, "ok");
    if (read.status !== "ok") return;
    assert.equal(read.payload.campaign?.slug, "bf-test");
    assert.equal(read.payload.discount?.discount.kind, "percent");
    assert.equal(slugAfterPublicPromoRead("bf-test", read), "bf-test");
    const state = marketingPromoFromRead("bf-test", read);
    assert.equal(state.forwardSlug, "bf-test");
    assert.equal(state.discount?.duration, "once");
    assert.equal(JSON.stringify(state).includes("BFTEST"), false);

    const failed = await withFetch(
      (async () => new Response("down", { status: 502 })) as typeof fetch,
      () => readPublicPromo("bf-test", { revalidate: false }),
    );
    const fallback = marketingPromoFromRead("bf-test", failed);
    assert.equal(fallback.discount, null);
    assert.equal(fallback.campaign, null);
    assert.equal(fallback.forwardSlug, "bf-test");
  });
});
