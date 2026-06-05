import Image from "next/image";
import { cn } from "@/lib/utils";
import { IPhone13ProMaxMockup } from "@/components/marketing/phones/iphone-13-pro-max-mockup";
import { phoneLayoutDimensions, PHONE_CAROUSEL_SCALE } from "@/lib/phone-mockup";
import { CARD_SCREENSHOT } from "@/lib/phone-screenshots";

export { phoneLayoutDimensions, PHONE_OUTER_HEIGHT } from "@/lib/phone-mockup";
export {
  CARD_SCREENSHOT,
  CARD_SCREENSHOT_BARBER,
  CARD_SCREENSHOT_FITNESS,
  CARD_SCREENSHOT_INTERIOR,
} from "@/lib/phone-screenshots";

export interface MarketingPhonePreviewProps {
  scale?: number;
  imageSrc?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

/** Single iPhone preview — Figma Product Bezels frame + screenshot. */
export function MarketingPhonePreview({
  scale = PHONE_CAROUSEL_SCALE,
  imageSrc = CARD_SCREENSHOT,
  alt = "OneTap digital business card example",
  className,
  priority = false,
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
          className="pointer-events-none select-none object-cover object-top scale-[1.02] origin-top"
          priority={priority}
          draggable={false}
        />
      </IPhone13ProMaxMockup>
    </div>
  );
}
