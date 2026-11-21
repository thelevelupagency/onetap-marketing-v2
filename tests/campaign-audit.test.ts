import assert from "node:assert/strict";
import { describe, it } from "node:test";

import {
  classifyOutboundHref,
  getMetaPixelId,
  syncMetaPixelConsent,
  trackMetaEvent,
} from "../src/lib/meta-pixel";
import {
  clearMarketingConsent,
  writeMarketingConsent,
} from "../src/lib/marketing-consent";
import { isNonProductionDeployment } from "../src/lib/site-url";
import { buildContentSecurityPolicy } from "../src/lib/security/contentSecurityPolicy";
import robots from "../src/app/robots";
import sitemap from "../src/app/sitemap";

async function withEnv(
  patch: Record<string, string | undefined>,
  run: () => void,
): Promise<void> {
  const prev: Record<string, string | undefined> = {};
  for (const [k, v] of Object.entries(patch)) {
    prev[k] = process.env[k];
    if (v === undefined) delete process.env[k];
    else process.env[k] = v;
  }
  try {
    run();
  } finally {
    for (const [k, v] of Object.entries(prev)) {
      if (v === undefined) delete process.env[k];
      else process.env[k] = v;
    }
  }
}

describe("Meta Pixel env gate", () => {
  it("requires NEXT_PUBLIC_VERCEL_ENV=production or NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD=true", async () => {
    await withEnv(
      {
        NEXT_PUBLIC_META_PIXEL_ID: "28011734695135178",
        NEXT_PUBLIC_VERCEL_ENV: "preview",
        VERCEL_ENV: "production",
        NODE_ENV: "production",
        NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD: undefined,
      },
      () => {
        assert.equal(getMetaPixelId(), null);
      },
    );

    await withEnv(
      {
        NEXT_PUBLIC_META_PIXEL_ID: "28011734695135178",
        NEXT_PUBLIC_VERCEL_ENV: "production",
        NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD: undefined,
      },
      () => {
        assert.equal(getMetaPixelId(), "28011734695135178");
      },
    );

    await withEnv(
      {
        NEXT_PUBLIC_META_PIXEL_ID: "28011734695135178",
        NEXT_PUBLIC_VERCEL_ENV: undefined,
        NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD: "true",
      },
      () => {
        assert.equal(getMetaPixelId(), "28011734695135178");
      },
    );
  });
});

describe("Meta Pixel consent gate", () => {
  it("never calls fbq when consent is unset or denied", () => {
    clearMarketingConsent();
    let calls = 0;
    const g = globalThis as unknown as { window?: { fbq?: (...args: unknown[]) => void } };
    const prevWindow = g.window;
    g.window = {
      fbq: () => {
        calls += 1;
      },
    };
    try {
      trackMetaEvent("Lead", { content_name: "nav", content_category: "signup" });
      assert.equal(calls, 0);

      writeMarketingConsent("denied");
      trackMetaEvent("InitiateCheckout", {
        content_name: "hero_slug",
        content_category: "create_card",
      });
      assert.equal(calls, 0);

      syncMetaPixelConsent("denied", "/");
      // Only a single 'consent', 'revoke' call is allowed if fbq already existed; zero track calls.
      assert.equal(calls, 1);
    } finally {
      clearMarketingConsent();
      g.window = prevWindow;
    }
  });
});

describe("Meta Pixel outbound event classification", () => {
  it("fires InitiateCheckout for card-creation placements and Lead for signup placements", () => {
    assert.equal(
      classifyOutboundHref("https://app.onetap-card.com/register?slug=alex", "hero_slug"),
      "InitiateCheckout",
    );
    assert.equal(
      classifyOutboundHref("https://app.onetap-card.com/register", "final_cta"),
      "InitiateCheckout",
    );
    assert.equal(
      classifyOutboundHref("https://app.onetap-card.com/register?billing=pro", "pricing_pro"),
      "Lead",
    );
    assert.equal(
      classifyOutboundHref("https://app.onetap-card.com/register", "nav"),
      "Lead",
    );
    assert.equal(
      classifyOutboundHref("https://app.onetap-card.com/register?billing=pro", "promo_strip"),
      "Lead",
    );
    assert.equal(
      classifyOutboundHref("https://app.onetap-card.com/login", null),
      null,
    );
  });
});

describe("Staging noindex deployment guard & robots/sitemap", () => {
  it("flags preview and non-canonical custom staging hosts as non-production", async () => {
    await withEnv(
      {
        VERCEL_ENV: undefined,
        NEXT_PUBLIC_VERCEL_ENV: undefined,
        NEXT_PUBLIC_SITE_URL: "https://staging.onetap-card.com",
      },
      () => {
        assert.equal(isNonProductionDeployment(), true);
        const r = robots();
        assert.deepEqual(r.rules, { userAgent: "*", disallow: "/" });
        assert.equal(r.sitemap, undefined);
      },
    );

    await withEnv(
      {
        VERCEL_ENV: undefined,
        NEXT_PUBLIC_VERCEL_ENV: undefined,
        NEXT_PUBLIC_SITE_URL: "https://www.onetap-card.com",
      },
      () => {
        assert.equal(isNonProductionDeployment(), false);
        const r = robots();
        assert.equal(r.sitemap, "https://www.onetap-card.com/sitemap.xml");
      },
    );
  });

  it("excludes redirecting /solutions index from sitemap while keeping localized solutions pages", () => {
    const entries = sitemap();
    const urls = entries.map((e) => e.url);
    assert.equal(urls.includes("https://www.onetap-card.com/solutions"), false);
    assert.equal(urls.includes("https://www.onetap-card.com/he/solutions"), false);
    assert.equal(urls.includes("https://www.onetap-card.com/solutions/freelancers"), true);
    assert.equal(urls.includes("https://www.onetap-card.com/he/solutions/freelancers"), true);
    assert.equal(urls.includes("https://www.onetap-card.com/solutions/agencies"), true);
    assert.equal(urls.includes("https://www.onetap-card.com/he/solutions/agencies"), true);
  });
});

describe("CSP Facebook Pixel & OpenBridge directives", () => {
  it("allows frame-src and wildcard facebook subdomains", () => {
    const csp = buildContentSecurityPolicy();
    assert.match(csp, /frame-src 'self' https:\/\/www\.facebook\.com https:\/\/connect\.facebook\.net/);
    assert.match(csp, /https:\/\/\*\.facebook\.com/);
    assert.match(csp, /https:\/\/\*\.facebook\.net/);
  });
});
