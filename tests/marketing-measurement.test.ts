import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  buildMarketingConsentRejectedProperties,
  buildMarketingPageViewProperties,
  consentStateFromStored,
  isMarketingMeasurementEnabled,
} from "../src/lib/marketing-measurement";

const FBCLID = "IwAR0secretClickId";

describe("marketing measurement properties", () => {
  it("does not copy fbclid and marks the hit as not a visitor", () => {
    const properties = buildMarketingPageViewProperties({
      pathname: "/he/pricing",
      locale: "he",
      consent: null,
      search: `?fbclid=${FBCLID}&utm_source=fb&utm_medium=paid_social&utm_campaign=onetap`,
    });

    assert.equal(properties.pathname, "/pricing");
    assert.equal(properties.locale, "he");
    assert.equal(properties.consent_state, "unset");
    assert.equal(properties.has_fbclid, true);
    assert.equal(properties.counts_as_visitor, false);
    assert.equal(properties.utm_source, "fb");
    assert.equal(properties.utm_medium, "paid_social");
    assert.equal(properties.utm_campaign, "onetap");
    assert.equal("fbclid" in properties, false);
    assert.equal(JSON.stringify(properties).includes(FBCLID), false);
  });

  it("maps stored consent and omits empty utm values", () => {
    assert.equal(consentStateFromStored(null), "unset");
    assert.equal(consentStateFromStored("granted"), "granted");
    assert.equal(consentStateFromStored("denied"), "denied");

    const granted = buildMarketingPageViewProperties({
      pathname: "/pricing",
      locale: "en",
      consent: "granted",
      search: "?utm_source=&fbclid=",
    });
    assert.equal(granted.consent_state, "granted");
    assert.equal(granted.has_fbclid, false);
    assert.equal(granted.utm_source, undefined);

    const denied = buildMarketingPageViewProperties({
      pathname: "/",
      locale: "en",
      consent: "denied",
      search: "",
    });
    assert.equal(denied.consent_state, "denied");
    assert.equal(denied.has_fbclid, false);
    assert.equal(denied.counts_as_visitor, false);
  });

  it("records dismiss as a rejection without treating it as a visitor", () => {
    const properties = buildMarketingConsentRejectedProperties({
      pathname: "/he",
      locale: "he",
    });
    assert.equal(properties.pathname, "/");
    assert.equal(properties.method, "dismiss");
    assert.equal(properties.counts_as_visitor, false);
    assert.equal(JSON.stringify(properties).includes("fbclid"), false);
  });

  it("stays off unless PostHog is configured and the pixel env gate is open", () => {
    assert.equal(
      isMarketingMeasurementEnabled({
        NEXT_PUBLIC_POSTHOG_KEY: "phc_test",
        NEXT_PUBLIC_POSTHOG_HOST: "https://us.i.posthog.com",
        NEXT_PUBLIC_VERCEL_ENV: "preview",
      }),
      false,
    );
    assert.equal(
      isMarketingMeasurementEnabled({
        NEXT_PUBLIC_POSTHOG_KEY: "phc_test",
        NEXT_PUBLIC_POSTHOG_HOST: "https://us.i.posthog.com",
        NEXT_PUBLIC_VERCEL_ENV: "production",
      }),
      true,
    );
    assert.equal(
      isMarketingMeasurementEnabled({
        NEXT_PUBLIC_POSTHOG_KEY: "phc_test",
        NEXT_PUBLIC_POSTHOG_HOST: "https://us.i.posthog.com",
        NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD: "true",
      }),
      true,
    );
    assert.equal(
      isMarketingMeasurementEnabled({
        NEXT_PUBLIC_VERCEL_ENV: "production",
      }),
      false,
    );
  });
});
