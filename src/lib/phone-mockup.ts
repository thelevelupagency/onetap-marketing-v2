const PHONE_WIDTH = 393;
const PHONE_HEIGHT = 852;

export const PHONE_BEZEL = 14;
export const PHONE_OUTER_RADIUS = 54;
export const PHONE_SCREEN_RADIUS = PHONE_OUTER_RADIUS - PHONE_BEZEL + 2;

export const PHONE_OUTER_WIDTH = PHONE_WIDTH + PHONE_BEZEL * 2;
export const PHONE_OUTER_HEIGHT = PHONE_HEIGHT + PHONE_BEZEL * 2;

/** Layout box size after scale transform (transform does not shrink flow otherwise). */
export function phoneLayoutDimensions(scale: number) {
  return {
    width: Math.round(PHONE_OUTER_WIDTH * scale),
    height: Math.round(PHONE_OUTER_HEIGHT * scale),
    outerRadius: Math.round(PHONE_OUTER_RADIUS * scale),
    screenRadius: Math.round(PHONE_SCREEN_RADIUS * scale),
  };
}

/** Shared scale for phone mocks in marketing carousels (mobile + desktop). */
export const PHONE_CAROUSEL_SCALE = 0.52;

/** Layout width at {@link PHONE_CAROUSEL_SCALE} — used for desktop column caps. */
export const PHONE_CAROUSEL_WIDTH = phoneLayoutDimensions(PHONE_CAROUSEL_SCALE).width;
