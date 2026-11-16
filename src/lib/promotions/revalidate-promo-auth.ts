import { createHash, timingSafeEqual } from "node:crypto";

function digest(value: string): Buffer {
  return createHash("sha256").update(value, "utf8").digest();
}

function secretsEqual(provided: string, expected: string): boolean {
  return timingSafeEqual(digest(provided), digest(expected));
}

export type MarketingPromoRevalidateAuth =
  | { ok: true }
  | { ok: false; status: 400 | 401 | 503; error: string };

/**
 * Authorize a marketing promo cache bust. Fail closed when the env secret is unset.
 */
export function authorizeMarketingPromoRevalidate(
  body: unknown,
  expectedSecret: string | undefined,
): MarketingPromoRevalidateAuth {
  const expected = expectedSecret?.trim();
  if (!expected) {
    return { ok: false, status: 503, error: "revalidate_unavailable" };
  }

  if (body == null || typeof body !== "object") {
    return { ok: false, status: 400, error: "invalid_json" };
  }

  const secret =
    "secret" in body ? String((body as { secret?: unknown }).secret ?? "") : "";

  if (!secret || !secretsEqual(secret, expected)) {
    return { ok: false, status: 401, error: "unauthorized" };
  }

  return { ok: true };
}
