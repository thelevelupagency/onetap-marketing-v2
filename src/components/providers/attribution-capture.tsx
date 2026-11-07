"use client";

import { useEffect } from "react";
import {
  captureCheckoutCoupon,
  captureLandingAttribution,
  capturePromoSlug,
} from "@/lib/constants";

/**
 * Persist first-touch `fbclid`/UTMs. Promo and coupon codes are not stored:
 * only a validated public campaign slug is forwarded, from the server.
 */
export function AttributionCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    captureLandingAttribution(params);
    captureCheckoutCoupon(params);
    capturePromoSlug(params);
  }, []);

  return null;
}
