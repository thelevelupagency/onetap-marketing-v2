"use client";

import { MarketingPhonePreview } from "@/components/marketing/phones/marketing-phone-preview";
import { CardUxPhoneBubbles } from "@/components/marketing/phones/card-ux-phone-bubbles";
import { phoneLayoutDimensions } from "@/lib/phone-mockup";
import { cn } from "@/lib/utils";

const PHONE_SCALE = 0.65;

/** Horizontal padding so left/right bubbles clear section overflow-hidden. */
const BUBBLE_BLEED_X = 28;

type CardUxPhonePreviewProps = {
  className?: string;
  url?: string;
};

export function CardUxPhonePreview({
  className,
  url = "almog-menashe",
}: CardUxPhonePreviewProps) {
  const layout = phoneLayoutDimensions(PHONE_SCALE);

  return (
    <div
      className={cn("relative mx-auto overflow-visible leading-none", className)}
      style={{
        width: layout.width + BUBBLE_BLEED_X * 2,
        minHeight: layout.height,
      }}
    >
      <div
        className="relative mx-auto overflow-visible"
        style={{ width: layout.width, height: layout.height }}
      >
        <MarketingPhonePreview scale={PHONE_SCALE} url={url} />
        <CardUxPhoneBubbles />
      </div>
    </div>
  );
}
