"use client";

import { MarketingPhonePreview } from "@/components/marketing/phones/marketing-phone-preview";
import { CardUxPhoneBubbles } from "@/components/marketing/phones/card-ux-phone-bubbles";
import { useIsMobile } from "@/lib/motion/use-media-query";
import {
  PHONE_CARD_UX_SCALE_DESKTOP,
  PHONE_CARD_UX_SCALE_MOBILE,
  phoneLayoutDimensions,
} from "@/lib/phone-mockup";
import { cn } from "@/lib/utils";

/** Horizontal padding so left/right bubbles clear section overflow-hidden. */
const BUBBLE_BLEED_X_DESKTOP = 28;
/** Mobile: no extra horizontal box — bubbles stay inside phone column. */
const BUBBLE_BLEED_X_MOBILE = 0;

type CardUxPhonePreviewProps = {
  className?: string;
};

export function CardUxPhonePreview({ className }: CardUxPhonePreviewProps) {
  const isMobile = useIsMobile();
  const scale = isMobile ? PHONE_CARD_UX_SCALE_MOBILE : PHONE_CARD_UX_SCALE_DESKTOP;
  const bubbleBleedX = isMobile ? BUBBLE_BLEED_X_MOBILE : BUBBLE_BLEED_X_DESKTOP;
  const layout = phoneLayoutDimensions(scale);

  return (
    <div
      className={cn(
        "relative mx-auto leading-none",
        isMobile ? "max-w-full overflow-hidden" : "overflow-visible",
        className
      )}
      style={{
        width: isMobile ? layout.width : layout.width + bubbleBleedX * 2,
        minHeight: layout.height,
        maxWidth: isMobile ? "100%" : undefined,
      }}
    >
      <div
        className={cn(
          "relative mx-auto",
          isMobile ? "overflow-hidden" : "overflow-visible"
        )}
        style={{ width: layout.width, height: layout.height }}
      >
        <MarketingPhonePreview scale={scale} />
        <CardUxPhoneBubbles />
      </div>
    </div>
  );
}
