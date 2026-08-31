"use client";

import { Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getPricing } from "@/content/get-content";
import type { Locale } from "@/lib/i18n/config";
import { MarketingPrimaryButton } from "@/components/marketing/get-card-cta";
import { AppOutboundLink } from "@/components/marketing/app-outbound-link";
import { CardReveal, MarketingStaggerGrid } from "@/components/marketing/motion";
import { microTransition, useMotionConfig, type MotionTokenSet } from "@/lib/motion";
import { type as typography } from "@/lib/typography";
import type { MetaCtaPlacement } from "@/lib/meta-pixel";

type PricingSurface = "on-white" | "on-cream";

interface PricingPlanCardsProps {
  isAnnual: boolean;
  surface: PricingSurface;
  className?: string;
  locale: Locale;
  withStagger?: boolean;
}

function PlanPriceBlock({
  isAnnual,
  isPopular,
  planId,
  tokens,
  locale,
}: {
  isAnnual: boolean;
  isPopular: boolean;
  planId: string;
  tokens: MotionTokenSet;
  locale: Locale;
}) {
  const pricing = getPricing(locale);
  const period = isAnnual ? "annual" : "monthly";
  const plan = pricing.plans.find((p) => p.id === planId)!;
  const { current, previous, billedNote } = pricing.getPlanPriceDisplay(plan, period);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={period}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={microTransition(tokens)}
        className="mb-6 min-h-22"
      >
        <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
          {previous !== null && (
            <>
              <span className="sr-only">
                Was ${previous}, now ${current}
              </span>
              <span
                aria-hidden
                className={cn(
                  "text-xl font-medium line-through",
                  isPopular ? "text-brand-cream/50" : "text-brand-midnight/50"
                )}
              >
                ${previous}
              </span>
            </>
          )}
          <span className={typography.price}>${current}</span>
          <span className={isPopular ? "text-brand-cream/50" : "text-brand-midnight/50"}>
            /month
          </span>
        </div>
        {billedNote ? (
          <p
            className={cn(
              "text-sm mt-1",
              isPopular ? "text-brand-turquoise" : "text-brand-midnight/50"
            )}
          >
            {billedNote}
          </p>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
}

export function PricingPlanCards({
  isAnnual,
  surface,
  className,
  locale,
  withStagger = false,
}: PricingPlanCardsProps) {
  const { tokens } = useMotionConfig();
  const pricing = getPricing(locale);
  const nonPopularCardBg =
    surface === "on-white"
      ? "bg-brand-cream border border-brand-midnight/10"
      : "bg-white border border-brand-midnight/5";

  const grid = (
    <>
      {pricing.plans.map((plan, index) => {
        const isPopular = plan.popular;

        const card = (
          <div
            className={cn(
              "flex h-full flex-col rounded-3xl p-8",
              isPopular
                ? "relative border-2 border-brand-turquoise bg-brand-navy text-brand-cream shadow-2xl md:-translate-y-4"
                : cn(nonPopularCardBg, "shadow-sm")
            )}
          >
            {isPopular ? (
              <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-brand-turquoise px-3 py-1 text-xs font-bold text-brand-midnight">
                Most Popular
              </span>
            ) : null}
            <h3
              className={cn(
                typography.subsectionTitle,
                "mb-2",
                isPopular && "text-brand-turquoise"
              )}
            >
              {plan.name}
            </h3>
            <p
              className={cn(
                "mb-6 text-sm",
                isPopular ? "text-brand-cream/60" : "text-brand-midnight/60"
              )}
            >
              {plan.description}
            </p>
            <PlanPriceBlock
              isAnnual={isAnnual}
              isPopular={!!isPopular}
              planId={plan.id}
              tokens={tokens}
              locale={locale}
            />
            <ul className="mb-0 flex-1 space-y-3">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check size={18} className="mt-0.5 shrink-0 text-brand-turquoise" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
            <PlanCtaLink href={plan.ctaHref} planId={plan.id}>
              <MarketingPrimaryButton
                size="md"
                className={cn(
                  "w-full rounded-xl",
                  isPopular &&
                    "bg-brand-turquoise text-brand-midnight hover:bg-white hover:text-brand-midnight"
                )}
              >
                {plan.cta}
              </MarketingPrimaryButton>
            </PlanCtaLink>
          </div>
        );

        if (withStagger) {
          return (
            <CardReveal key={plan.id} staggerIndex={index}>
              <div className="h-full">{card}</div>
            </CardReveal>
          );
        }

        return (
          <div key={plan.id} className="h-full">
            {card}
          </div>
        );
      })}
    </>
  );

  if (withStagger) {
    return (
      <MarketingStaggerGrid columns={3} className={className}>
        {grid}
      </MarketingStaggerGrid>
    );
  }

  return (
    <div
      className={cn(
        "grid items-stretch gap-marketing-grid-gap md:grid-cols-3 md:gap-marketing-grid-gap-md",
        className
      )}
    >
      {grid}
    </div>
  );
}

function planPlacement(planId: string): MetaCtaPlacement | null {
  if (planId === "free") return "pricing_free";
  if (planId === "pro") return "pricing_pro";
  if (planId === "team") return "pricing_team";
  return null;
}

function PlanCtaLink({
  href,
  planId,
  children,
}: {
  href: string;
  planId: string;
  children: React.ReactNode;
}) {
  if (href.startsWith("http")) {
    return (
      <AppOutboundLink
        href={href}
        placement={planPlacement(planId)}
        className="mt-marketing-stack-gap block shrink-0"
      >
        {children}
      </AppOutboundLink>
    );
  }
  return <div className="mt-marketing-stack-gap block shrink-0">{children}</div>;
}
