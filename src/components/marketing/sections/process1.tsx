import Image from "next/image";
import { Asterisk } from "lucide-react";

import { GetCardCta } from "@/components/marketing/get-card-cta";
import { MarketingContainer } from "@/components/marketing/primitives";
import { cn } from "@/lib/utils";
import { type as typography } from "@/lib/typography";
import { CREATE_BASICS_URL } from "@/lib/constants";

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface Process1Props {
  className?: string;
  title: React.ReactNode;
  description: string;
  ctaLabel?: string;
  ctaHref?: string;
  steps: readonly ProcessStep[];
}

function StepIllustration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      {...props}
    >
      <line
        x1="0.607422"
        y1="2.57422"
        x2="21.5762"
        y2="2.57422"
        stroke="currentColor"
        strokeWidth="4"
      />
      <line
        x1="19.5762"
        y1="19.624"
        x2="19.5762"
        y2="4.57422"
        stroke="currentColor"
        strokeWidth="4"
      />
    </svg>
  );
}

export function Process1({
  className,
  title,
  description,
  ctaLabel = "Get your card",
  ctaHref = CREATE_BASICS_URL,
  steps,
}: Process1Props) {
  return (
    <section className={cn("bg-white py-16 md:py-24 lg:py-32", className)}>
      <MarketingContainer width="full" className="px-4 md:px-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20">
          <div className="col-span-2 flex h-fit w-full max-w-sm flex-col items-start overflow-visible lg:sticky lg:top-24">
            <div className="relative mb-6 w-fit overflow-visible">
              <h2 className={`${typography.hero} flex w-fit flex-wrap items-start gap-x-2 gap-y-0 lg:block lg:pr-0`}>
                <span className="inline">{title}</span>
                <Asterisk
                  aria-hidden
                  className="mt-0.5 size-7 shrink-0 text-brand-turquoise sm:size-8 md:size-9 lg:absolute lg:mt-0 lg:-top-2 lg:-right-10 lg:size-10 xl:-right-12"
                />
              </h2>
            </div>
            <p className={`${typography.sectionLead} mb-8 max-w-sm`}>{description}</p>

            <GetCardCta href={ctaHref} size="sm">
              {ctaLabel}
            </GetCardCta>
          </div>

          <ul className="relative col-span-4 w-full lg:pl-20">
            {steps.map((step) => (
              <li
                key={step.step}
                className="relative flex flex-col gap-6 border-t border-brand-midnight/10 py-8 first:border-t-0 lg:gap-8 lg:py-10"
              >
                <StepIllustration className="absolute top-4 right-0 text-brand-turquoise lg:top-6" />

                <div className="flex items-start gap-6 pr-8">
                  <div className="flex size-12 shrink-0 items-center justify-center bg-brand-cream px-4 py-1 font-display text-sm font-bold tracking-tight text-brand-midnight">
                    {step.step}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={`${typography.stepTitle} mb-4`}>
                      {step.title}
                    </h3>
                    <p className={`${typography.bodySm} max-w-2xl`}>
                      {step.description}
                    </p>
                  </div>
                </div>

                <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-brand-midnight/5 shadow-sm">
                  <Image
                    src={step.image}
                    alt={step.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </MarketingContainer>
    </section>
  );
}
