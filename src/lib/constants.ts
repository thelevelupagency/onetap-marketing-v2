import { sanitizeCardSlug } from "@/lib/card-slug";

const DEFAULT_APP_ORIGIN = "https://app.onetap-card.com";
const DEFAULT_CARD_BASE_URL = "https://card.onetap-card.com";

function normalizeOrigin(value: string): string {
  return value.replace(/\/$/, "");
}

function getAppOrigin(): string {
  const raw = process.env.NEXT_PUBLIC_MAIN_APP_URL?.trim();
  if (!raw) return DEFAULT_APP_ORIGIN;
  return normalizeOrigin(raw);
}

function getCardBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_CARD_BASE_URL?.trim();
  if (!raw) return DEFAULT_CARD_BASE_URL;
  return normalizeOrigin(raw);
}

export const APP_ORIGIN = getAppOrigin();
export const LOGIN_URL = `${APP_ORIGIN}/login`;
export const SIGNUP_URL = `${APP_ORIGIN}/register`;
export const PRIVACY_URL = `${APP_ORIGIN}/privacy`;
export const TERMS_URL = `${APP_ORIGIN}/terms`;

/** Host + trailing slash for inline slug inputs (e.g. `card.onetap-card.com/`). */
export function getCardHostPrefix(): string {
  try {
    const url = new URL(getCardBaseUrl());
    return `${url.host}/`;
  } catch {
    return "card.onetap-card.com/";
  }
}

export const CARD_HOST_PREFIX = getCardHostPrefix();

/** Wizard basics entry; optional slug is sanitized before append. */
export function buildCreateBasicsUrl(slug?: string): string {
  const base = `${APP_ORIGIN}/create/basics`;
  const trimmed = slug?.trim();
  if (!trimmed) return base;
  const sanitized = sanitizeCardSlug(trimmed);
  if (!sanitized) return base;
  return `${base}?slug=${encodeURIComponent(sanitized)}`;
}

export const CREATE_BASICS_URL = buildCreateBasicsUrl();
