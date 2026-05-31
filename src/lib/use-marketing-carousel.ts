"use client";

import { useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

export const MARKETING_CAROUSEL_AUTOPLAY_MS = 4000;
export const PAUSE_AFTER_INTERACTION_MS = 10_000;

export function useMarketingCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [snapCount, setSnapCount] = useState(0);
  const pausedUntilRef = useRef(0);

  const pauseAutoplay = useCallback(() => {
    pausedUntilRef.current = Date.now() + PAUSE_AFTER_INTERACTION_MS;
  }, []);

  useEffect(() => {
    if (!api) return;

    const sync = () => {
      setSnapCount(api.scrollSnapList().length);
      setSelectedIndex(api.selectedScrollSnap());
    };

    const pauseOnInteract = () => pauseAutoplay();

    // Call immediately — "init" fires before our listener is registered, so
    // without this call snapCount would stay 0 and buttons would be disabled.
    sync();

    api.on("reInit", sync);
    api.on("select", sync);
    api.on("pointerDown", pauseOnInteract);

    return () => {
      api.off("reInit", sync);
      api.off("select", sync);
      api.off("pointerDown", pauseOnInteract);
    };
  }, [api, pauseAutoplay]);

  const scrollTo = useCallback(
    (index: number) => {
      pauseAutoplay();
      api?.scrollTo(index);
    },
    [api, pauseAutoplay]
  );

  return {
    api,
    setApi,
    selectedIndex,
    snapCount,
    scrollTo,
    pauseAutoplay,
    pausedUntilRef,
  };
}

export function useMarketingCarouselAutoplay(
  api: CarouselApi | undefined,
  intervalMs: number,
  pausedUntilRef: React.MutableRefObject<number>
) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  useEffect(() => {
    if (!api || intervalMs <= 0 || prefersReducedMotion) return;

    const id = window.setInterval(() => {
      if (Date.now() < pausedUntilRef.current) return;
      api.scrollNext();
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [api, intervalMs, pausedUntilRef, prefersReducedMotion]);
}
