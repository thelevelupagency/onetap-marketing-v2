import Image from "next/image";
import {
  MACBOOK_PRO_16_OUTER_HEIGHT,
  MACBOOK_PRO_16_OUTER_WIDTH,
  MACBOOK_PRO_16_SCREEN_HEIGHT,
  MACBOOK_PRO_16_SCREEN_OFFSET_LEFT,
  MACBOOK_PRO_16_SCREEN_OFFSET_TOP,
  MACBOOK_PRO_16_SCREEN_RADIUS,
  MACBOOK_PRO_16_SCREEN_WIDTH,
  MACBOOK_PRO_16_SCALE,
  MACBOOK_PRO_16_TOP_TRIM,
} from "@/lib/laptop-mockup";
import { MACBOOK_PRO_16_BEZEL_SRC } from "@/lib/marketing-images";

interface MacBookPro16MockupProps {
  children: React.ReactNode;
  scale?: number;
}

/**
 * MacBook Pro 16" (5th Gen, Silver) device frame.
 * Screen slot + bezel overlay — matches Figma community mockup node 22:170.
 */
export function MacBookPro16Mockup({
  children,
  scale = MACBOOK_PRO_16_SCALE,
}: MacBookPro16MockupProps) {
  const layoutWidth = MACBOOK_PRO_16_OUTER_WIDTH * scale;
  const layoutHeight = (MACBOOK_PRO_16_OUTER_HEIGHT - MACBOOK_PRO_16_TOP_TRIM) * scale;

  return (
    <div
      className="relative shrink-0 overflow-hidden leading-none"
      style={{
        width: layoutWidth,
        height: layoutHeight,
      }}
    >
      <div
        className="relative"
        style={{
          width: MACBOOK_PRO_16_OUTER_WIDTH,
          height: MACBOOK_PRO_16_OUTER_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
          marginTop: -(MACBOOK_PRO_16_TOP_TRIM * scale),
        }}
      >
        {/* Screen content slot (behind bezel) */}
        <div
          className="absolute overflow-hidden bg-[#808080]"
          style={{
            left: MACBOOK_PRO_16_SCREEN_OFFSET_LEFT,
            top: MACBOOK_PRO_16_SCREEN_OFFSET_TOP,
            width: MACBOOK_PRO_16_SCREEN_WIDTH,
            height: MACBOOK_PRO_16_SCREEN_HEIGHT,
            borderRadius: MACBOOK_PRO_16_SCREEN_RADIUS,
          }}
        >
          {children}
        </div>

        {/* Bezel frame (Figma asset) */}
        <Image
          src={MACBOOK_PRO_16_BEZEL_SRC}
          alt=""
          width={MACBOOK_PRO_16_OUTER_WIDTH}
          height={MACBOOK_PRO_16_OUTER_HEIGHT}
          className="pointer-events-none absolute inset-0 size-full select-none"
          draggable={false}
          aria-hidden
          priority={false}
        />
      </div>
    </div>
  );
}
