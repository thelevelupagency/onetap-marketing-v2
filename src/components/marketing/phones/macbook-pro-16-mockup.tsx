import Image from "next/image";
import { cn } from "@/lib/utils";
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
  className?: string;
}

/**
 * MacBook Pro 16" (5th Gen, Silver) device frame.
 * Screen slot + bezel overlay — matches Figma community mockup node 22:170.
 *
 * The unscaled bezel stack is position:absolute so the ~2170px box stays out of
 * flow and cannot widen the page under body overflow-x-clip on mobile.
 */
export function MacBookPro16Mockup({
  children,
  scale = MACBOOK_PRO_16_SCALE,
  className,
}: MacBookPro16MockupProps) {
  const layoutWidth = MACBOOK_PRO_16_OUTER_WIDTH * scale;
  const layoutHeight = (MACBOOK_PRO_16_OUTER_HEIGHT - MACBOOK_PRO_16_TOP_TRIM) * scale;

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden isolate leading-none",
        className
      )}
      style={{
        width: layoutWidth,
        height: layoutHeight,
        maxWidth: "100%",
      }}
    >
      <div
        className="absolute left-0"
        style={{
          width: MACBOOK_PRO_16_OUTER_WIDTH,
          height: MACBOOK_PRO_16_OUTER_HEIGHT,
          top: -(MACBOOK_PRO_16_TOP_TRIM * scale),
          transform: `scale(${scale})`,
          transformOrigin: "top left",
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
