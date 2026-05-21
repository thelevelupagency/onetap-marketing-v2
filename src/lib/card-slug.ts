/**
 * Card slug rules mirrored from onetap-app/src/utils/handle.ts (marketing has no shared package).
 */

export function sanitizeCardSlug(slug: string): string {
  if (typeof slug !== "string") {
    return "";
  }
  return slug
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-");
}

export const HANDLE_BLACKLIST = [
  "admin",
  "dashboard",
  "billing",
  "api",
  "login",
  "register",
  "settings",
  "profile",
  "create",
  "edit",
  "auth",
  "legal",
  "terms",
  "privacy",
] as const;

export function isCardSlugValid(slug: string): { isValid: boolean; error?: string } {
  const sanitized = sanitizeCardSlug(slug);

  if (sanitized.length < 3) {
    return { isValid: false, error: "Card name needs at least 3 characters." };
  }

  if (sanitized.length > 50) {
    return { isValid: false, error: "Card name cannot exceed 50 characters." };
  }

  if ((HANDLE_BLACKLIST as readonly string[]).includes(sanitized)) {
    return { isValid: false, error: "This name is reserved and cannot be used." };
  }

  return { isValid: true };
}
