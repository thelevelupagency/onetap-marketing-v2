"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { MacBookPro16Mockup } from "@/components/marketing/phones/macbook-pro-16-mockup";
import {
  MACBOOK_PRO_16_MAX_WIDTH,
  MACBOOK_PRO_16_SCALE_LG,
  MACBOOK_PRO_16_SCALE_MOBILE_MAX,
  macbookPro16LayoutDimensions,
  macbookPro16ScaleForWidth,
} from "@/lib/laptop-mockup";
import {
  AGENCIES_DASHBOARD_IMAGE_ALT,
  AGENCIES_DASHBOARD_IMAGE_URL,
} from "@/lib/marketing-images";

export {
  macbookPro16LayoutDimensions,
  laptopLayoutDimensions,
  MACBOOK_PRO_16_SCALE,
  LAPTOP_WORKSPACE_SCALE,
} from "@/lib/laptop-mockup";

export interface MarketingLaptopPreviewProps {
  /** Override fluid scale; omit to size from container width. */
  scale?: number;
  /** Upper bound when scale is fluid (defaults to {@link MACBOOK_PRO_16_SCALE_LG}). */
  maxScale?: number;
  imageSrc?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
}

/** MacBook Pro 16" preview — Figma bezel + dashboard screenshot, fluid width. */
export function MarketingLaptopPreview({
  scale: scaleOverride,
  maxScale = MACBOOK_PRO_16_SCALE_LG,
  imageSrc = AGENCIES_DASHBOARD_IMAGE_URL,
  alt = AGENCIES_DASHBOARD_IMAGE_ALT,
  className,
  priority = false,
}: MarketingLaptopPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [fluidScale, setFluidScale] = useState(MACBOOK_PRO_16_SCALE_MOBILE_MAX);

  useLayoutEffect(() => {
    if (scaleOverride != null) return;

    const el = containerRef.current;
    if (!el) return;

    const updateScale = () => {
      setFluidScale(macbookPro16ScaleForWidth(el.clientWidth, maxScale));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, [scaleOverride, maxScale]);

  const scale = scaleOverride ?? fluidScale;
  const layout = macbookPro16LayoutDimensions(scale);

  return (
    <div
      ref={containerRef}
      className={cn("mx-auto w-full leading-none", className)}
      style={{ maxWidth: MACBOOK_PRO_16_MAX_WIDTH }}
    >
      <div
        className="mx-auto block overflow-hidden m-0 p-0"
        style={{
          width: layout.width,
          height: layout.height,
        }}
      >
        <MacBookPro16Mockup scale={scale}>
          <div className="relative h-full w-full">
            <Image
              src={imageSrc}
              alt={alt}
              fill
              sizes={`(max-width: 1024px) 100vw, ${MACBOOK_PRO_16_MAX_WIDTH}px`}
              className="pointer-events-none select-none object-cover object-top"
              priority={priority}
              draggable={false}
            />
          </div>
        </MacBookPro16Mockup>
      </div>
    </div>
  );
}
