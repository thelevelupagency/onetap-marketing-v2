"use client";

import { useEffect } from "react";
import { captureLandingAttribution } from "@/lib/constants";

/** Persist first-touch `fbclid`/UTMs so in-site navigation does not drop the ad click. */
export function AttributionCapture() {
  useEffect(() => {
    captureLandingAttribution(new URLSearchParams(window.location.search));
  }, []);

  return null;
}
