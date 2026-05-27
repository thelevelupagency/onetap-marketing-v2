"use client";

import { SectionHeader } from "@/components/marketing/primitives";
import { Reveal } from "@/components/marketing/motion";

interface Process1IntroProps {
  title: string;
  accent?: string;
  description: string;
}

export function Process1Intro({ title, accent, description }: Process1IntroProps) {
  return (
    <Reveal>
      <SectionHeader title={title} accent={accent} lead={description} align="center" />
    </Reveal>
  );
}
