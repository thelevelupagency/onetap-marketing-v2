"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  MarketingContainer,
  MarketingSection,
  SectionHeader,
  FeatureSpotlight,
} from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";
import { dashboardCopy } from "@/content/homepage";
import { dashboardIcons } from "@/lib/marketing-icons";

const dashboardSpotlightItems = dashboardCopy.features.map((f) => ({
  icon: dashboardIcons[f.icon],
  title: f.title,
  description: f.description,
}));

interface DashboardSectionProps {
  /** Dark (homepage default) or light (e.g. after a dark hero on solution pages). */
  variant?: "dark" | "light";
}

export function DashboardSection({ variant = "dark" }: DashboardSectionProps) {
  const isLight = variant === "light";

  return (
    <MarketingSection
      id="dashboard"
      background={isLight ? "cream" : "midnight"}
      className={cn(
        "relative overflow-visible",
        !isLight && "text-brand-cream"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full blur-3xl",
          isLight ? "bg-brand-navy/5" : "bg-brand-turquoise/10 dashboard-glow-pulse"
        )}
        aria-hidden
      />

      <MarketingContainer width="full" className="relative z-10">
        <Reveal>
          <SectionHeader
            title={dashboardCopy.title}
            accent={dashboardCopy.accent}
            lead={dashboardCopy.subheadline}
            variant={isLight ? "default" : "onDark"}
          />
        </Reveal>

        <div className="grid items-center gap-marketing-grid-gap-md lg:grid-cols-2">
          <Reveal direction="left" className="order-2 lg:order-1">
            <div
              className={cn(
                "relative aspect-video w-full overflow-hidden rounded-2xl shadow-2xl lg:aspect-[16/10]",
                isLight ? "border border-brand-midnight/10" : "border border-white/10"
              )}
            >
              <Image
                src={dashboardCopy.imageUrl}
                alt={dashboardCopy.imageAlt}
                fill
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={false}
              />
            </div>
          </Reveal>

          <Reveal
            direction="right"
            delay={0.08}
            className="order-1 w-full min-w-0 overflow-visible lg:order-2"
          >
            <FeatureSpotlight
              items={dashboardSpotlightItems}
              onDark={!isLight}
              className="w-full"
            />
          </Reveal>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
