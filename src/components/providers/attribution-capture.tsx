"use client";

import { useEffect } from "react";
import { captureCheckoutCoupon, captureLandingAttribution } from "@/lib/constants";

/**
 * Persist first-touch `fbclid`/UTMs and last-touch `?coupon=` so in-site
 * navigation does not drop the ad click or promo code.
 */
export function AttributionCapture() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    captureLandingAttribution(params);
    captureCheckoutCoupon(params);
  }, []);

  return null;
}
