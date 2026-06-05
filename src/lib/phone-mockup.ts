/**
 * iPhone 13 Pro Max (Silver) — Apple Product Bezels from Figma community device mockups.
 * @see https://www.figma.com/design/mjqx30vEnLRYORURha0udE — Product Bezels page
 *
 * Screen slot measured from the exported bezel PNG (1500×3000 @3x, ~428×926 logical).
 */

/** Screen content slot within the bezel PNG. */
export const IPHONE_13_PRO_MAX_SCREEN_WIDTH = 1280;
export const IPHONE_13_PRO_MAX_SCREEN_HEIGHT = 2766;

export const IPHONE_13_PRO_MAX_SCREEN_OFFSET_LEFT = 110;
export const IPHONE_13_PRO_MAX_SCREEN_OFFSET_TOP = 121;

export const IPHONE_13_PRO_MAX_OUTER_WIDTH = 1500;
export const IPHONE_13_PRO_MAX_OUTER_HEIGHT = 3000;

/** Inner screen corner radius (visible through bezel cutout). */
export const IPHONE_13_PRO_MAX_SCREEN_RADIUS = 160;

/**
 * Extend the screen slot slightly under the bezel to hide sub-pixel gaps
 * between screenshot edges and the frame PNG.
 */
export const IPHONE_13_PRO_MAX_SCREEN_BLEED = 3;

export function iphone13ProMaxScreenRect() {
  const bleed = IPHONE_13_PRO_MAX_SCREEN_BLEED;
  return {
    left: IPHONE_13_PRO_MAX_SCREEN_OFFSET_LEFT - bleed,
    top: IPHONE_13_PRO_MAX_SCREEN_OFFSET_TOP - bleed,
    width: IPHONE_13_PRO_MAX_SCREEN_WIDTH + bleed * 2,
    height: IPHONE_13_PRO_MAX_SCREEN_HEIGHT + bleed * 2,
    borderRadius: IPHONE_13_PRO_MAX_SCREEN_RADIUS + bleed,
  };
}

/** @deprecated Use IPHONE_13_PRO_MAX_OUTER_WIDTH */
export const PHONE_OUTER_WIDTH = IPHONE_13_PRO_MAX_OUTER_WIDTH;
/** @deprecated Use IPHONE_13_PRO_MAX_OUTER_HEIGHT */
export const PHONE_OUTER_HEIGHT = IPHONE_13_PRO_MAX_OUTER_HEIGHT;

/** Width of the old CSS-only phone shell — used to preserve visual scale when migrating. */
const LEGACY_PHONE_OUTER_WIDTH = 421;

/** Map a scale tuned for the old ~421px-wide mock to the Figma bezel dimensions. */
export function legacyPhoneScale(legacyScale: number) {
  return (legacyScale * LEGACY_PHONE_OUTER_WIDTH) / IPHONE_13_PRO_MAX_OUTER_WIDTH;
}

/** Layout box size after scale transform (transform does not shrink flow otherwise). */
export function phoneLayoutDimensions(scale: number) {
  return {
    width: Math.round(IPHONE_13_PRO_MAX_OUTER_WIDTH * scale),
    height: Math.round(IPHONE_13_PRO_MAX_OUTER_HEIGHT * scale),
    screenRadius: Math.round(IPHONE_13_PRO_MAX_SCREEN_RADIUS * scale),
  };
}

/** Shared scale for phone mocks in marketing carousels (mobile + desktop). */
export const PHONE_CAROUSEL_SCALE = legacyPhoneScale(0.52);

/** Hero fan — center and side phone scales (matched to previous CSS mock sizes). */
export const PHONE_HERO_CENTER_SCALE = legacyPhoneScale(0.65);
export const PHONE_HERO_SIDE_SCALE = legacyPhoneScale(0.56);

/** Freelancers creators split section. */
export const PHONE_CREATORS_SCALE = legacyPhoneScale(0.48);

/** Agencies governance split — larger than creators, fits half-column layout. */
export const PHONE_GOVERNANCE_SCALE = legacyPhoneScale(0.62);

/** Card UX section — desktop / mobile. */
export const PHONE_CARD_UX_SCALE_DESKTOP = legacyPhoneScale(0.65);
export const PHONE_CARD_UX_SCALE_MOBILE = legacyPhoneScale(0.52);

/** Layout width at {@link PHONE_CAROUSEL_SCALE} — used for desktop column caps. */
export const PHONE_CAROUSEL_WIDTH = phoneLayoutDimensions(PHONE_CAROUSEL_SCALE).width;
