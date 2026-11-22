import { stripLocalePrefix } from "@/lib/i18n/config";
import type { MarketingConsent } from "@/lib/marketing-consent";

export const MARKETING_PAGE_VIEWED = "marketing_page_viewed";
export const MARKETING_CONSENT_SHOWN = "marketing_consent_shown";
export const MARKETING_CONSENT_ACCEPTED = "marketing_consent_accepted";
export const MARKETING_CONSENT_REJECTED = "marketing_consent_rejected";

export type MarketingConsentState = "unset" | "granted" | "denied";

export type MarketingPageViewProperties = {
  pathname: string;
  locale: string;
  consent_state: MarketingConsentState;
  has_fbclid: boolean;
  counts_as_visitor: false;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
};

export type MarketingConsentEventProperties = {
  pathname: string;
  locale: string;
  counts_as_visitor: false;
  method?: "dismiss";
};

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;

type MeasurementEnv = {
  NEXT_PUBLIC_POSTHOG_KEY?: string;
  NEXT_PUBLIC_POSTHOG_HOST?: string;
  NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD?: string;
  NEXT_PUBLIC_VERCEL_ENV?: string;
};

function readMeasurementEnv(): MeasurementEnv {
  return {
    NEXT_PUBLIC_POSTHOG_KEY: process.env.NEXT_PUBLIC_POSTHOG_KEY,
    NEXT_PUBLIC_POSTHOG_HOST: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD: process.env.NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD,
    NEXT_PUBLIC_VERCEL_ENV: process.env.NEXT_PUBLIC_VERCEL_ENV,
  };
}

export function isMarketingMeasurementEnabled(
  env: MeasurementEnv = readMeasurementEnv(),
): boolean {
  const key = env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
  const host = env.NEXT_PUBLIC_POSTHOG_HOST?.trim();
  if (!key || !host) return false;
  if (env.NEXT_PUBLIC_META_PIXEL_ALLOW_NON_PROD === "true") return true;
  return env.NEXT_PUBLIC_VERCEL_ENV === "production";
}

export function consentStateFromStored(
  consent: MarketingConsent | null,
): MarketingConsentState {
  if (consent === "granted" || consent === "denied") return consent;
  return "unset";
}

function readOptionalParam(params: URLSearchParams, key: string): string | undefined {
  const value = params.get(key)?.trim();
  return value ? value : undefined;
}

export function buildMarketingPageViewProperties(input: {
  pathname: string;
  locale: string;
  consent: MarketingConsent | null;
  search: string;
}): MarketingPageViewProperties {
  const params = new URLSearchParams(
    input.search.startsWith("?") ? input.search.slice(1) : input.search,
  );
  const properties: MarketingPageViewProperties = {
    pathname: stripLocalePrefix(input.pathname),
    locale: input.locale,
    consent_state: consentStateFromStored(input.consent),
    has_fbclid: Boolean(readOptionalParam(params, "fbclid")),
    counts_as_visitor: false,
  };

  for (const key of UTM_KEYS) {
    const value = readOptionalParam(params, key);
    if (value) properties[key] = value;
  }

  return properties;
}

export function buildMarketingConsentShownProperties(input: {
  pathname: string;
  locale: string;
}): MarketingConsentEventProperties {
  return {
    pathname: stripLocalePrefix(input.pathname),
    locale: input.locale,
    counts_as_visitor: false,
  };
}

export function buildMarketingConsentAcceptedProperties(input: {
  pathname: string;
  locale: string;
}): MarketingConsentEventProperties {
  return buildMarketingConsentShownProperties(input);
}

export function buildMarketingConsentRejectedProperties(input: {
  pathname: string;
  locale: string;
}): MarketingConsentEventProperties {
  return {
    ...buildMarketingConsentShownProperties(input),
    method: "dismiss",
  };
}

type PostHogClient = {
  init: (
    key: string,
    options: {
      api_host: string;
      autocapture: false;
      capture_pageview: false;
      capture_pageleave: false;
      disable_session_recording: true;
      disable_external_dependency_loading: true;
      persistence: "memory";
      person_profiles: "identified_only";
    },
  ) => void;
  capture: (event: string, properties?: Record<string, unknown>) => void;
};

let clientPromise: Promise<PostHogClient | null> | null = null;
const viewedPaths = new Set<string>();
let consentShownCaptured = false;

function loadClient(): Promise<PostHogClient | null> {
  if (clientPromise) return clientPromise;

  clientPromise = (async () => {
    if (typeof window === "undefined" || !isMarketingMeasurementEnabled()) {
      return null;
    }
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY?.trim();
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST?.trim();
    if (!key || !host) return null;

    const { default: posthog } = await import("posthog-js");
    posthog.init(key, {
      api_host: host,
      autocapture: false,
      capture_pageview: false,
      capture_pageleave: false,
      disable_session_recording: true,
      disable_external_dependency_loading: true,
      persistence: "memory",
      person_profiles: "identified_only",
    });
    return posthog;
  })().catch(() => null);

  return clientPromise;
}

function captureMarketingEvent(
  event: string,
  properties: Record<string, unknown>,
): void {
  if (!isMarketingMeasurementEnabled()) return;
  void loadClient().then((client) => {
    client?.capture(event, properties);
  });
}

export function trackMarketingPageView(input: {
  pathname: string;
  locale: string;
  consent: MarketingConsent | null;
  search: string;
}): void {
  if (!isMarketingMeasurementEnabled()) return;
  const properties = buildMarketingPageViewProperties(input);
  if (viewedPaths.has(properties.pathname)) return;
  viewedPaths.add(properties.pathname);
  captureMarketingEvent(MARKETING_PAGE_VIEWED, properties);
}

export function trackMarketingConsentShown(input: {
  pathname: string;
  locale: string;
}): void {
  if (!isMarketingMeasurementEnabled() || consentShownCaptured) return;
  consentShownCaptured = true;
  captureMarketingEvent(
    MARKETING_CONSENT_SHOWN,
    buildMarketingConsentShownProperties(input),
  );
}

export function trackMarketingConsentAccepted(input: {
  pathname: string;
  locale: string;
}): void {
  if (!isMarketingMeasurementEnabled()) return;
  captureMarketingEvent(
    MARKETING_CONSENT_ACCEPTED,
    buildMarketingConsentAcceptedProperties(input),
  );
}

export function trackMarketingConsentRejected(input: {
  pathname: string;
  locale: string;
}): void {
  if (!isMarketingMeasurementEnabled()) return;
  captureMarketingEvent(
    MARKETING_CONSENT_REJECTED,
    buildMarketingConsentRejectedProperties(input),
  );
}
