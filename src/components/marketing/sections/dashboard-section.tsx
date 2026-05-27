"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BarChart3, RefreshCw, Edit3 } from "lucide-react";

import { cn } from "@/lib/utils";
import { BrandAccent, MarketingContainer } from "@/components/marketing/primitives";
import { type as typography } from "@/lib/typography";

const DASHBOARD_IMAGE =
  "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779393898/onetap/static/marketing/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2026-05-13_%D7%91-20.56.31_gtx3y5.png";

const features = [
  { icon: Edit3, title: "Real-Time Edit", description: "Update any card instantly. Changes reflect everywhere in seconds." },
  { icon: RefreshCw, title: "Automated Lead Flow", description: "Leads sync to HubSpot, Salesforce, and your inbox automatically." },
  { icon: BarChart3, title: "Performance Analytics", description: "Track views, taps, saves, and form submissions per card." },
];

interface DashboardSectionProps {
  /** Dark (homepage default) or light (e.g. after a dark hero on solution pages). */
  variant?: "dark" | "light";
}

export function DashboardSection({ variant = "dark" }: DashboardSectionProps) {
  const isLight = variant === "light";

  return (
    <section
      className={cn(
        "relative overflow-hidden py-24",
        isLight ? "bg-brand-cream text-brand-midnight" : "bg-brand-midnight text-brand-cream"
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
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className={cn(typography.sectionTitle, "mb-4", !isLight && "text-brand-cream")}>
            Your professional <BrandAccent>command center.</BrandAccent>
          </h2>
          <p className={cn(typography.sectionLead, !isLight && "text-brand-cream/70")}>
            Manage every card, lead, and insight from one powerful dashboard.
          </p>
        </div>

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
              src={DASHBOARD_IMAGE}
              alt="OneTap dashboard with card overview, analytics, and live phone preview"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={false}
            />
          </motion.div>

          <div className="space-y-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-4"
              >
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
                    isLight ? "bg-brand-turquoise/10" : "bg-brand-turquoise/20"
                  )}
                >
                  <f.icon
                    className={cn("h-6 w-6", isLight ? "text-brand-turquoise-dark" : "text-brand-turquoise")}
                  />
                </div>
                <div>
                  <h3 className={cn("type-subsection-title mb-1", !isLight && "text-brand-cream")}>
                    {f.title}
                  </h3>
                  <p className={cn("type-body-sm", !isLight && "text-brand-cream/70")}>{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </MarketingContainer>
    </section>
  );
}
