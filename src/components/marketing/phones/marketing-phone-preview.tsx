import Image from "next/image";
import { cn } from "@/lib/utils";
import { IPhoneMockup } from "@/components/marketing/phones/iphone-mockup";
import { phoneLayoutDimensions } from "@/lib/phone-mockup";

export { phoneLayoutDimensions, PHONE_OUTER_HEIGHT } from "@/lib/phone-mockup";

/** Full-length card screenshots; viewport crops to the top (profile + actions). */
export const CARD_SCREENSHOT_FITNESS =
  "https://res.cloudinary.com/dudwjf2pu/image/upload/v1757706588/NFC/screenshots/fitness_full_dvc_gxcheq.png";

export const CARD_SCREENSHOT_INTERIOR =
  "https://res.cloudinary.com/dudwjf2pu/image/upload/v1757706607/NFC/screenshots/home-interior_full_dvc_oyw2mr.png";

export const CARD_SCREENSHOT_BARBER =
  "https://res.cloudinary.com/dudwjf2pu/image/upload/v1757706625/NFC/screenshots/barber_full_dvc_e9fmqv.png";

/** Default screenshot for single-phone sections (fitness). */
export const CARD_SCREENSHOT = CARD_SCREENSHOT_FITNESS;

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
            className="object-cover object-top select-none pointer-events-none"
            priority={priority}
            draggable={false}
          />
        </div>
      </IPhoneMockup>
    </div>
  );
}
