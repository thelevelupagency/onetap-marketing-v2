import Image from "next/image";
import Link from "next/link";
import { Asterisk, CornerDownRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SIGNUP_URL } from "@/lib/constants";

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
  steps: ProcessStep[];
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
  ctaHref = SIGNUP_URL,
  steps,
}: Process1Props) {
  return (
    <section className={cn("bg-white py-16 md:py-24 lg:py-32", className)}>
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-6 lg:gap-20">
          <div className="col-span-2 flex h-fit w-fit flex-col items-start gap-3 space-y-7 py-8 lg:sticky lg:top-24">
            <div className="relative w-fit font-display text-5xl font-semibold tracking-tight text-brand-midnight lg:text-6xl">
              <h2 className="w-fit">{title}</h2>
              <Asterisk className="absolute -top-2 -right-2 size-5 text-brand-turquoise md:size-8 lg:-right-12 lg:size-10" />
            </div>
            <p className="max-w-sm text-base text-brand-midnight/60">{description}</p>

            <Button
              variant="ghost"
              className="inline-flex w-fit max-w-full items-center justify-start gap-2 rounded-full px-6 py-2 text-brand-midnight hover:bg-brand-cream hover:text-brand-midnight"
              render={<Link href={ctaHref} className="inline-flex w-fit items-center gap-2 px-1" />}
              nativeButton={false}
            >
              <CornerDownRight className="size-4 shrink-0 text-brand-turquoise" />
              {ctaLabel}
            </Button>
          </div>

          <ul className="relative col-span-4 w-full lg:pl-20">
            {steps.map((step) => (
              <li
                key={step.step}
                className="relative flex flex-col gap-6 border-t border-brand-midnight/10 py-8 lg:gap-8 lg:py-10"
              >
                <StepIllustration className="absolute top-4 right-0 text-brand-turquoise lg:top-6" />

                <div className="flex items-start gap-6 pr-8">
                  <div className="flex size-12 shrink-0 items-center justify-center bg-brand-cream px-4 py-1 font-display text-sm font-bold tracking-tight text-brand-midnight">
                    {step.step}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="mb-4 font-display text-2xl font-semibold tracking-tight text-brand-midnight lg:text-3xl">
                      {step.title}
                    </h3>
                    <p className="max-w-2xl text-brand-midnight/60 leading-relaxed">
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
      </div>
    </section>
  );
}
