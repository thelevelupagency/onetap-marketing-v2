import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import { authorizeMarketingPromoRevalidate } from "@/lib/promotions/revalidate-promo-auth";
import { MARKETING_PROMO_CACHE_TAG } from "@/lib/promotions/public-promo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Secret-protected bust for the marketing promo fetch cache.
 * Called by onetap-app after an admin promotion create/update/delete.
 * Body: `{ secret: string }` — must match `MARKETING_PROMO_REVALIDATE_SECRET`.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const auth = authorizeMarketingPromoRevalidate(
    body,
    process.env.MARKETING_PROMO_REVALIDATE_SECRET,
  );
  if (!auth.ok) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  revalidateTag(MARKETING_PROMO_CACHE_TAG, "max");
  return NextResponse.json({ ok: true, tag: MARKETING_PROMO_CACHE_TAG });
}
