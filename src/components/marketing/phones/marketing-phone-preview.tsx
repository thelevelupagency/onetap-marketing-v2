import Image from "next/image";
import { cn } from "@/lib/utils";
import { IPhone13ProMaxMockup } from "@/components/marketing/phones/iphone-13-pro-max-mockup";
import { phoneLayoutDimensions, PHONE_CAROUSEL_SCALE } from "@/lib/phone-mockup";
import { CARD_SCREENSHOT } from "@/lib/phone-screenshots";

export { phoneLayoutDimensions, PHONE_OUTER_HEIGHT } from "@/lib/phone-mockup";
export {
  CARD_SCREENSHOT,
  CARD_SCREENSHOTS,
} from "@/lib/phone-screenshots";

export interface MarketingPhonePreviewProps {
  scale?: number;
  imageSrc?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  /**
   * How the screenshot fills the screen slot.
   * - `cover` (default): crop to fill — card screenshots
   * - `contain`: show the full image (may letterbox)
   * - `fill`: stretch to the screen bounds
   */
  fit?: "cover" | "contain" | "fill";
}

/** Single iPhone preview — Figma Product Bezels frame + screenshot. */
export function MarketingPhonePreview({
  scale = PHONE_CAROUSEL_SCALE,
  imageSrc = CARD_SCREENSHOT,
  alt = "OneTap digital business card example",
  className,
  priority = false,
  fit = "cover",
}: MarketingPhonePreviewProps) {
  const layout = phoneLayoutDimensions(scale);

  return (
    <div
      className={cn("block leading-none overflow-hidden m-0 p-0", className)}
      style={{
        width: layout.width,
        height: layout.height,
      }}
    >
      <IPhone13ProMaxMockup scale={scale}>
        <Image
          src={imageSrc}
          alt={alt}
          fill
          sizes={`${layout.width}px`}
          className={cn(
            "pointer-events-none select-none",
            fit === "cover" && "object-cover object-top scale-[1.02] origin-top",
            fit === "contain" && "object-contain object-top bg-white",
            fit === "fill" && "object-fill"
          )}
          priority={priority}
          draggable={false}
        />
      </IPhone13ProMaxMockup>
    </div>
  );
}
