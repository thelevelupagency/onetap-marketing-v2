"use client";

import Image from "next/image";
import { IPhone13ProMaxMockup } from "./iphone-13-pro-max-mockup";
import { InfiniteScrollTrack } from "@/components/marketing/primitives/infinite-scroll-track";
import { useLocale } from "@/components/providers/locale-provider";
import { getChrome } from "@/content/get-content";
import { CARD_SCREENSHOTS } from "@/lib/phone-screenshots";

const realMockScreenshots = CARD_SCREENSHOTS;

export function AnimatedPhoneGrid() {
  const locale = useLocale();
  const chrome = getChrome(locale);

  const renderPhone = (item: { src: string; alt: string }, idx: number) => (
    <div key={idx} className="pointer-events-none shrink-0">
      <IPhone13ProMaxMockup scale={0.16}>
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-brand-navy">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            priority={idx < 3}
            className="object-cover object-top"
            unoptimized
          />
        </div>
      </IPhone13ProMaxMockup>
    </div>
  );

  return (
    <div className="relative flex h-[480px] w-full items-center justify-center overflow-hidden">
      <InfiniteScrollTrack
        direction="right"
        speed={1.2}
        ariaLabel={chrome.aria.digitalCardCarousel}
        className="h-full w-full"
        scrollClassName="h-full w-full items-center"
        contentClassName="items-center gap-6"
      >
        {realMockScreenshots.map((item, i) => renderPhone(item, i))}
      </InfiniteScrollTrack>
    </div>
  );
}
