import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import {
  BILLING_INTENT_QUERY_KEY,
  SIGNUP_PRO_URL,
  SIGNUP_TEAM_URL,
  SIGNUP_URL,
  buildBillingSignupUrl,
} from "../src/lib/constants";
import { plans as enPlans } from "../src/content/en/pricing";
import { plans as hePlans } from "../src/content/he/pricing";

const here = dirname(fileURLToPath(import.meta.url));

describe("billing signup intent URLs", () => {
  it("builds allowlisted Pro and Team register URLs", () => {
    assert.equal(
      buildBillingSignupUrl("pro"),
      `${SIGNUP_URL}?${BILLING_INTENT_QUERY_KEY}=pro`,
    );
    assert.equal(SIGNUP_PRO_URL, buildBillingSignupUrl("pro"));
    assert.equal(SIGNUP_TEAM_URL, buildBillingSignupUrl("team"));
  });

  it("wires Pro and Team plan CTAs; Free stays plain register", () => {
    for (const plans of [enPlans, hePlans]) {
      const free = plans.find((p) => p.id === "free")!;
      const pro = plans.find((p) => p.id === "pro")!;
      const team = plans.find((p) => p.id === "team")!;

      assert.equal(free.ctaHref, SIGNUP_URL);
      assert.equal(pro.ctaHref, SIGNUP_PRO_URL);
      assert.equal(team.ctaHref, SIGNUP_TEAM_URL);
      assert.match(pro.ctaHref, /[?&]billing=pro(?:&|$)/);
      assert.match(team.ctaHref, /[?&]billing=team(?:&|$)/);
      assert.doesNotMatch(free.ctaHref, /billing=/);
    }
  });

  it("promo strip uses the Pro purchase-intent signup URL", () => {
    const source = readFileSync(
      join(here, "../src/components/marketing/marketing-promo-strip.tsx"),
      "utf8",
    );
    assert.match(source, /SIGNUP_PRO_URL/);
    assert.doesNotMatch(source, /href=\{SIGNUP_URL\}/);
  });
});
