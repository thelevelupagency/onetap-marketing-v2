import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { authorizeMarketingPromoRevalidate } from "../src/lib/promotions/revalidate-promo-auth";

describe("authorizeMarketingPromoRevalidate", () => {
  it("returns 503 when the secret env is unset", () => {
    assert.deepEqual(authorizeMarketingPromoRevalidate({ secret: "x" }, undefined), {
      ok: false,
      status: 503,
      error: "revalidate_unavailable",
    });
  });

  it("returns 401 for a wrong secret", () => {
    assert.deepEqual(
      authorizeMarketingPromoRevalidate({ secret: "wrong" }, "expected-secret"),
      { ok: false, status: 401, error: "unauthorized" },
    );
  });

  it("returns 400 for a non-object body", () => {
    assert.deepEqual(authorizeMarketingPromoRevalidate("nope", "expected-secret"), {
      ok: false,
      status: 400,
      error: "invalid_json",
    });
  });

  it("accepts a matching secret", () => {
    assert.deepEqual(
      authorizeMarketingPromoRevalidate({ secret: "expected-secret" }, "expected-secret"),
      { ok: true },
    );
  });
});
