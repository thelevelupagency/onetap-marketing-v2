/**
 * MacBook Pro 16" (5th Gen, Silver) — from Figma community device mockups.
 * @see https://www.figma.com/design/mjqx30vEnLRYORURha0udE — node 22:170
 */

/** Screen content slot (Figma component bounds). */
export const MACBOOK_PRO_16_SCREEN_WIDTH = 1728;
export const MACBOOK_PRO_16_SCREEN_HEIGHT = 1117;

/** Bezel PNG extends beyond the screen slot (Figma inset percentages). */
export const MACBOOK_PRO_16_BEZEL_INSET = {
  top: 0.1406,
  right: 0.1279,
  bottom: 0.1397,
  left: 0.1279,
} as const;

export const MACBOOK_PRO_16_SCREEN_OFFSET_LEFT = Math.round(
  MACBOOK_PRO_16_SCREEN_WIDTH * MACBOOK_PRO_16_BEZEL_INSET.left
);
export const MACBOOK_PRO_16_SCREEN_OFFSET_TOP = Math.round(
  MACBOOK_PRO_16_SCREEN_HEIGHT * MACBOOK_PRO_16_BEZEL_INSET.top
);

export const MACBOOK_PRO_16_OUTER_WIDTH = Math.round(
  MACBOOK_PRO_16_SCREEN_WIDTH *
    (1 + MACBOOK_PRO_16_BEZEL_INSET.left + MACBOOK_PRO_16_BEZEL_INSET.right)
);
export const MACBOOK_PRO_16_OUTER_HEIGHT = Math.round(
  MACBOOK_PRO_16_SCREEN_HEIGHT *
    (1 + MACBOOK_PRO_16_BEZEL_INSET.top + MACBOOK_PRO_16_BEZEL_INSET.bottom)
);

/** Dead space above the laptop in the exported bezel PNG (partial crop — keeps lid visible). */
export const MACBOOK_PRO_16_TOP_TRIM = 85;

export const MACBOOK_PRO_16_VISIBLE_HEIGHT =
  MACBOOK_PRO_16_OUTER_HEIGHT - MACBOOK_PRO_16_TOP_TRIM;

/** Inner screen corner radius (visible through bezel cutout). */
export const MACBOOK_PRO_16_SCREEN_RADIUS = 12;

/** Layout box after scale transform (top-trimmed visible bounds). */
export function macbookPro16LayoutDimensions(scale: number) {
  return {
    width: Math.round(MACBOOK_PRO_16_OUTER_WIDTH * scale),
    height: Math.round(MACBOOK_PRO_16_VISIBLE_HEIGHT * scale),
    screenRadius: Math.round(MACBOOK_PRO_16_SCREEN_RADIUS * scale),
  };
}

/** Fluid scale: fit container width; tighter on viewports under 648px. */
export function macbookPro16ScaleForWidth(
  containerWidth: number,
  maxScale = MACBOOK_PRO_16_SCALE_LG
) {
  if (containerWidth <= 0) return MACBOOK_PRO_16_SCALE_MOBILE_MAX;

  const isMobile = containerWidth < MACBOOK_PRO_16_MOBILE_MAX_WIDTH;
  const usableWidth =
    containerWidth * (isMobile ? MACBOOK_PRO_16_MOBILE_WIDTH_FACTOR : 1);
  const scale = usableWidth / MACBOOK_PRO_16_OUTER_WIDTH;
  const cap = isMobile ? MACBOOK_PRO_16_SCALE_MOBILE_MAX : maxScale;

  return Math.min(cap, scale);
}

/** @deprecated Use macbookPro16LayoutDimensions */
export function laptopLayoutDimensions(scale: number) {
  return macbookPro16LayoutDimensions(scale);
}

/** Content width below which mobile scaling applies (<648px). */
export const MACBOOK_PRO_16_MOBILE_MAX_WIDTH = 648;

/** Fraction of container width used on mobile (inset from edges). */
export const MACBOOK_PRO_16_MOBILE_WIDTH_FACTOR = 0.82;

/** Max scale on mobile — keeps the mock from dominating the fold. */
export const MACBOOK_PRO_16_SCALE_MOBILE_MAX = 0.24;

/** Scales tuned for fluid layout (see macbookPro16ScaleForWidth). */
export const MACBOOK_PRO_16_SCALE = 0.34;
export const MACBOOK_PRO_16_SCALE_LG = 0.48;
export const MACBOOK_PRO_16_MAX_WIDTH = Math.round(
  MACBOOK_PRO_16_OUTER_WIDTH * MACBOOK_PRO_16_SCALE_LG
);

/** Agencies governance split — fluid cap (fits mobile; limits size in half-column desktop). */
export const MACBOOK_GOVERNANCE_SCALE_LG = 0.28;

/** @deprecated Use MACBOOK_PRO_16_SCALE */
export const LAPTOP_WORKSPACE_SCALE = MACBOOK_PRO_16_SCALE;
/** @deprecated Use MACBOOK_PRO_16_SCALE_LG */
export const LAPTOP_WORKSPACE_SCALE_LG = MACBOOK_PRO_16_SCALE_LG;
