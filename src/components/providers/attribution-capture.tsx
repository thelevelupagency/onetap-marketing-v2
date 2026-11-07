"use client";

import { useEffect } from "react";
import {
  captureCheckoutCoupon,
  captureLandingAttribution,
  capturePromoSlug,
} from "@/lib/constants";

/**
 * Persist first-touch `fbclid`/UTMs and last-touch `?coupon=` / `?promo=` so
 * in-site navigation does not drop the ad click, Lemon code, or campaign pin.
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
