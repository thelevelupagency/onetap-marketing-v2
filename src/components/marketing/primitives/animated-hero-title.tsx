"use client";

import { BrandAccent } from "@/components/marketing/primitives/brand-accent";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useMotionConfig } from "@/lib/motion";

type AnimatedHeroTitleProps = {
  title: string;
  accent: string;
  className?: string;
};

export function AnimatedHeroTitle({ title, accent, className }: AnimatedHeroTitleProps) {
  const { prefersReducedMotion } = useMotionConfig();

  if (prefersReducedMotion) {
    return (
      <h1 className={className}>
        {title} <BrandAccent>{accent}</BrandAccent>
      </h1>
    );
  }

  return (
    <h1 className={className}>
      <TextGenerateEffect
        words={`${title} ${accent}`}
        className="inline"
        accentWords={accent}
        accentClassName="italic text-brand-turquoise"
      />
    </h1>
  );
}
