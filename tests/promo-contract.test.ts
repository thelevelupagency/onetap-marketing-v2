import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { publicPromoPayloadFromHttp } from "../src/lib/promotions/public-promo";
import { parsePublicPromoPrice } from "../src/lib/promotions/public-promo-display";

/**
 * Wire contract between onetap-app and this marketing site.
 *
 * Source of truth (onetap-app):
 *   - src/app/api/billing/promotions/public/route.ts
 *   - src/slices/billing/domain/selectMarketingPromoCampaign.ts (campaign shape)
 *   - src/slices/billing/domain/promoCampaignCopy.ts (copy.bannerSentence)
 *   - src/slices/billing/domain/promoCheckoutPrice.ts (price shape)
 *
 * These tests are pure and offline. A representative payload is fed through the
 * same parsers the site uses so that an app-side change dropping or renaming a
 * field this parser depends on fails here instead of silently at runtime.
 */

/** The exact 200 body the marketing parser expects to consume. */
const WIRE_PAYLOAD = {
  campaign: {
    slug: "bf-test",
    endsAt: "2026-12-01T21:59:59.000Z",
    priority: 10,
    marketingPublic: true,
    requiresPromoPin: false,
    theme: {
      background: "#1e3a5f",
      foreground: "#ffffff",
      accent: "#f5b301",
      buttonBackground: "#ffffff",
      buttonForeground: "#1e3a5f",
    },
    copy: {
      bannerSentence: {
        en: "Upgrade, a test discount.",
        he: "שדרגו, הנחת בדיקה.",
      },
    },
  },
  price: {
    discount: { kind: "percent", percent: 40 },
    duration: "forever",
    durationInMonths: null,
    eligiblePlans: ["pro", "team"],
    eligiblePeriods: ["monthly", "yearly"],
  },
} as const;

describe("public promo wire contract — campaign", () => {
  it("accepts the documented campaign shape", () => {
    const { campaign } = publicPromoPayloadFromHttp(200, WIRE_PAYLOAD);
    assert.notEqual(campaign, null);
    assert.equal(campaign?.slug, "bf-test");
    assert.equal(campaign?.endsAt, "2026-12-01T21:59:59.000Z");
    assert.equal(campaign?.priority, 10);
    assert.equal(campaign?.marketingPublic, true);
    assert.equal(campaign?.requiresPromoPin, false);
  });

  it("carries theme as a nullable #rrggbb palette", () => {
    const { campaign } = publicPromoPayloadFromHttp(200, WIRE_PAYLOAD);
    assert.deepEqual(campaign?.theme, {
      background: "#1e3a5f",
      foreground: "#ffffff",
      accent: "#f5b301",
      buttonBackground: "#ffffff",
      buttonForeground: "#1e3a5f",
    });
    // theme is nullable: a payload with none is still a valid campaign.
    const { theme, ...noTheme } = WIRE_PAYLOAD.campaign;
    const dropped = publicPromoPayloadFromHttp(200, {
      ...WIRE_PAYLOAD,
      campaign: noTheme,
    });
    assert.equal(dropped.campaign?.theme, null);
    assert.ok(dropped.campaign);
  });

  it("depends on copy.bannerSentence per locale", () => {
    const { campaign } = publicPromoPayloadFromHttp(200, WIRE_PAYLOAD);
    assert.deepEqual(campaign?.copy, {
      bannerSentence: {
        en: "Upgrade, a test discount.",
        he: "שדרגו, הנחת בדיקה.",
      },
    });
  });

  it("rejects a campaign missing copy.bannerSentence (app contract drift)", () => {
    const { copy, ...noCopy } = WIRE_PAYLOAD.campaign;
    const { campaign } = publicPromoPayloadFromHttp(200, {
      ...WIRE_PAYLOAD,
      campaign: noCopy,
    });
    assert.equal(campaign, null);
  });
});

describe("public promo wire contract — price (unchanged)", () => {
  it("parses the documented price shape", () => {
    const discount = parsePublicPromoPrice(WIRE_PAYLOAD);
    assert.deepEqual(discount?.discount, { kind: "percent", percent: 40 });
    assert.equal(discount?.duration, "forever");
    assert.equal(discount?.durationInMonths, null);
    assert.deepEqual(discount?.eligiblePlans, ["pro", "team"]);
    assert.deepEqual(discount?.eligiblePeriods, ["monthly", "yearly"]);
    assert.equal(discount?.period, "both");
  });

  it("parses a fixed-amount price", () => {
    const discount = parsePublicPromoPrice({
      price: {
        discount: { kind: "fixed", amountCents: 480 },
        duration: "once",
        durationInMonths: null,
        eligiblePlans: ["pro"],
        eligiblePeriods: ["monthly"],
      },
    });
    assert.deepEqual(discount?.discount, { kind: "fixed", amountCents: 480 });
    assert.equal(discount?.period, "monthly");
  });

  it("couples campaign and price in one 200 body", () => {
    const { campaign, discount } = publicPromoPayloadFromHttp(200, WIRE_PAYLOAD);
    assert.equal(campaign?.slug, "bf-test");
    assert.equal(discount?.discount.kind, "percent");
    // The wire never leaks a Lemon coupon code anywhere in the parsed payload.
    assert.equal(JSON.stringify({ campaign, discount }).includes("coupon"), false);
  });
});
