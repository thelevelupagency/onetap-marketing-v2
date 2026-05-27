"use client";

import { motion } from "framer-motion";
import { CardUxPhonePreview } from "@/components/marketing/phones/card-ux-phone-preview";
import {
  SplitContentSection,
  SectionHeader,
  FeatureGrid,
  FeatureCard,
} from "@/components/marketing/primitives";
import { cardUxCopy } from "@/content/homepage";
import { cardUxIcons } from "@/lib/marketing-icons";

export function CardUxSection() {
  return (
    <SplitContentSection id="features" background="white" width="full" reverseOnMobile>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <SectionHeader
          align="left"
          spacingBelow="none"
          title={cardUxCopy.title}
          accent={cardUxCopy.accent}
          lead={cardUxCopy.lead}
          className="mb-6"
        />
        <FeatureGrid columns={2} className="gap-4">
          {cardUxCopy.features.map((f) => {
            const Icon = cardUxIcons[f.icon];
            return (
              <FeatureCard
                key={f.label}
                icon={Icon}
                title={f.label}
                description={f.description}
                variant="compact"
              />
            );
          })}
        </FeatureGrid>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex min-w-0 justify-center overflow-visible leading-none lg:sticky lg:top-28 lg:self-start"
      >
        <CardUxPhonePreview />
      </motion.div>
    </SplitContentSection>
  );
}
