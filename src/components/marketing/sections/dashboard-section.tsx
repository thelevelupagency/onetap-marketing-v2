"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import {
  MarketingContainer,
  MarketingSection,
  SectionHeader,
  FeatureGrid,
  FeatureCard,
} from "@/components/marketing/primitives";
import { dashboardCopy } from "@/content/homepage";
import { dashboardIcons } from "@/lib/marketing-icons";

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
        "relative overflow-hidden",
        !isLight && "text-brand-cream"
      )}
    >
      <div
        className={cn(
          "pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full blur-3xl",
          isLight ? "bg-brand-navy/5" : "bg-brand-turquoise/10"
        )}
        aria-hidden
      />

      <MarketingContainer width="full" className="relative z-10">
        <SectionHeader
          title={dashboardCopy.title}
          accent={dashboardCopy.accent}
          lead={dashboardCopy.subheadline}
          variant={isLight ? "default" : "onDark"}
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
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
          </motion.div>

          <FeatureGrid columns={2} className="gap-4">
            {dashboardCopy.features.map((f, i) => {
              const Icon = dashboardIcons[f.icon];
              const isLast = i === dashboardCopy.features.length - 1;
              return (
                <FeatureCard
                  key={f.title}
                  icon={Icon}
                  title={f.title}
                  description={f.description}
                  variant="compact"
                  onDark={!isLight}
                  className={cn(isLast && "md:col-span-2 md:mx-auto md:max-w-md")}
                />
              );
            })}
          </FeatureGrid>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
