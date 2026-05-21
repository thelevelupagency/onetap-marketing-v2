"use client";

import { motion } from "framer-motion";
import { Image, Video, ContactRound, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CardUxPhonePreview } from "@/components/marketing/card-ux-phone-preview";

const features = [
  { icon: Image, label: "Gallery", description: "Showcase your work and portfolio" },
  { icon: Video, label: "Video", description: "Embed intro videos and demos" },
  { icon: ContactRound, label: "One-Tap Save", description: "vCard download in one tap" },
  { icon: UserPlus, label: "Lead Capture", description: "Built-in forms that sync to CRM" },
];

export function CardUxSection() {
  return (
    <section className="py-24 bg-brand-cream overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <Badge className="mb-4 bg-brand-turquoise/20 text-brand-midnight border-brand-turquoise/30">
              The Card Experience
            </Badge>
            <h2 className="font-display text-4xl md:text-5xl text-brand-midnight mb-6">
              More than a card.
              <br />
              <span className="italic text-brand-turquoise">A personal microsite.</span>
            </h2>
            <p className="text-lg text-brand-midnight/70 mb-8 leading-relaxed">
              Your OneTap card is a fully interactive profile — not a static link tree. Rich media, lead forms, and analytics built in.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.label} className="flex gap-3 p-4 bg-white rounded-2xl border border-brand-midnight/5 shadow-sm">
                  <div className="w-10 h-10 bg-brand-turquoise/10 rounded-xl flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5 text-brand-turquoise-dark" />
                  </div>
                  <div>
                    <p className="font-semibold text-brand-midnight">{f.label}</p>
                    <p className="text-sm text-brand-midnight/60">{f.description}</p>
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
      </div>
    </section>
  );
}
