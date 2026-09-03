/**
 * Card slug rules mirrored from onetap-app/src/utils/handle.ts (marketing has no shared package).
 */

export type CardSlugValidationMessages = {
  tooShort: string;
  tooLong: string;
  reserved: string;
};

const DEFAULT_MESSAGES: CardSlugValidationMessages = {
  tooShort: "Card name needs at least 3 characters.",
  tooLong: "Card name cannot exceed 50 characters.",
  reserved: "This name is reserved and cannot be used.",
};

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

export function isCardSlugValid(
  slug: string,
  messages: CardSlugValidationMessages = DEFAULT_MESSAGES,
): { isValid: boolean; error?: string } {
  const sanitized = sanitizeCardSlug(slug);

  if (sanitized.length < 3) {
    return { isValid: false, error: messages.tooShort };
  }

  if (sanitized.length > 50) {
    return { isValid: false, error: messages.tooLong };
  }

  if ((HANDLE_BLACKLIST as readonly string[]).includes(sanitized)) {
    return { isValid: false, error: messages.reserved };
  }

  return { isValid: true };
}
