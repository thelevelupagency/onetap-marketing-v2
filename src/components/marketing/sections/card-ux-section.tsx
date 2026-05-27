"use client";

import { motion } from "framer-motion";
import { Image, Video, ContactRound, UserPlus } from "lucide-react";
import { CardUxPhonePreview } from "@/components/marketing/phones/card-ux-phone-preview";
import {
  MarketingSection,
  MarketingContainer,
  MarketingBadge,
  BrandAccent,
} from "@/components/marketing/primitives";
import { type as typography } from "@/lib/typography";

const features = [
  { icon: Image, label: "Gallery", description: "Showcase your work and portfolio" },
  { icon: Video, label: "Video", description: "Embed intro videos and demos" },
  { icon: ContactRound, label: "One-Tap Save", description: "vCard download in one tap" },
  { icon: UserPlus, label: "Lead Capture", description: "Built-in forms that sync to CRM" },
] as const;

export function CardUxSection() {
  return (
    <MarketingSection background="cream" className="overflow-hidden">
      <MarketingContainer width="full">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <MarketingBadge className="mb-4">The Card Experience</MarketingBadge>
            <h2 className={`${typography.hero} mb-6`}>
              More than a card.
              <br />
              <BrandAccent>A personal microsite.</BrandAccent>
            </h2>
            <p className={`${typography.sectionLead} mb-8`}>
              Your OneTap card is a fully interactive profile — not a static link tree. Rich
              media, lead forms, and analytics built in.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex gap-3 rounded-2xl border border-brand-midnight/5 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-turquoise/10">
                    <f.icon className="h-5 w-5 text-brand-turquoise-dark" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-midnight">{f.label}</p>
                    <p className={typography.caption}>{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 flex justify-center overflow-visible leading-none lg:order-2"
          >
            <CardUxPhonePreview />
          </motion.div>
        </div>
      </MarketingContainer>
    </MarketingSection>
  );
}
