import Image from "next/image";
import {
  IPHONE_13_PRO_MAX_OUTER_HEIGHT,
  IPHONE_13_PRO_MAX_OUTER_WIDTH,
  PHONE_CAROUSEL_SCALE,
  iphone13ProMaxScreenRect,
} from "@/lib/phone-mockup";
import { IPHONE_13_PRO_MAX_BEZEL_SRC } from "@/lib/marketing-images";

interface IPhone13ProMaxMockupProps {
  children: React.ReactNode;
  scale?: number;
}

/**
 * iPhone 13 Pro Max (Silver) device frame.
 * Screen slot + bezel overlay — matches Figma community Product Bezels kit.
 *
 * The unscaled bezel stack is position:absolute so the 1500×3000 box stays out of
 * flow. Under page-level RTL, an in-flow oversized box + transform-origin top left
 * paints outside the clip shell (blank reserved space on Hebrew).
 */
export function IPhone13ProMaxMockup({
  children,
  scale = PHONE_CAROUSEL_SCALE,
}: IPhone13ProMaxMockupProps) {
  const layoutWidth = IPHONE_13_PRO_MAX_OUTER_WIDTH * scale;
  const layoutHeight = IPHONE_13_PRO_MAX_OUTER_HEIGHT * scale;
  const screen = iphone13ProMaxScreenRect();

  return (
    <div
      className="relative shrink-0 overflow-hidden isolate leading-none"
      style={{
        width: layoutWidth,
        height: layoutHeight,
        maxWidth: "100%",
      }}
    >
      <div
        className="absolute left-0 top-0"
        style={{
          width: IPHONE_13_PRO_MAX_OUTER_WIDTH,
          height: IPHONE_13_PRO_MAX_OUTER_HEIGHT,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        <div
          className="absolute overflow-hidden"
          style={{
            left: screen.left,
            top: screen.top,
            width: screen.width,
            height: screen.height,
            borderRadius: screen.borderRadius,
          }}
        >
          {children}
        </div>

        <Image
          src={IPHONE_13_PRO_MAX_BEZEL_SRC}
          alt=""
          width={IPHONE_13_PRO_MAX_OUTER_WIDTH}
          height={IPHONE_13_PRO_MAX_OUTER_HEIGHT}
          className="pointer-events-none absolute inset-0 z-10 size-full select-none"
          draggable={false}
          aria-hidden
          priority={false}
        />
      </div>
    </div>
  );
}
