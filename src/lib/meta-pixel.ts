const PIXEL_ID_PATTERN = /^\d+$/;

export type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Pixel IDs are public (browser snippet). Digits-only avoids injecting untrusted strings. */
export function getMetaPixelId(): string | null {
  const id = process.env.NEXT_PUBLIC_META_PIXEL_ID?.trim();
  if (!id || !PIXEL_ID_PATTERN.test(id)) {
    return null;
  }
  return id;
}
