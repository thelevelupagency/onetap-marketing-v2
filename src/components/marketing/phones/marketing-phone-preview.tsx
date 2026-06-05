import Image from "next/image";
import { cn } from "@/lib/utils";
import { IPhoneMockup } from "@/components/marketing/phones/iphone-mockup";
import { phoneLayoutDimensions } from "@/lib/phone-mockup";
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
  url?: string;
  imageSrc?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

/** Single iPhone preview — same shell + screenshot as the hero center phone. */
export function MarketingPhonePreview({
  scale = 0.52,
  url = "almog-menashe",
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
        borderRadius: layout.outerRadius,
      }}
    >
      <IPhoneMockup scale={scale} url={url}>
        <div className="relative h-full w-full">
          <Image
            src={imageSrc}
            alt={alt}
            fill
            sizes={`${layout.width}px`}
            className="pointer-events-none select-none object-cover object-top"
            priority={priority}
            draggable={false}
          />
        </div>
      </IPhoneMockup>
    </div>
  );
}
