"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { BarChart3, RefreshCw, Edit3 } from "lucide-react";

const DASHBOARD_IMAGE =
  "https://res.cloudinary.com/dudwjf2pu/image/upload/v1779393898/onetap/static/marketing/%D7%A6%D7%99%D7%9C%D7%95%D7%9D_%D7%9E%D7%A1%D7%9A_2026-05-13_%D7%91-20.56.31_gtx3y5.png";

const features = [
  { icon: Edit3, title: "Real-Time Edit", description: "Update any card instantly. Changes reflect everywhere in seconds." },
  { icon: RefreshCw, title: "Automated Lead Flow", description: "Leads sync to HubSpot, Salesforce, and your inbox automatically." },
  { icon: BarChart3, title: "Performance Analytics", description: "Track views, taps, saves, and form submissions per card." },
];

export function DashboardSection() {
  return (
    <section className="relative overflow-hidden bg-brand-midnight py-24 text-brand-cream">
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-brand-turquoise/10 blur-3xl"
        aria-hidden
      />

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 font-display text-4xl md:text-5xl">
            Your professional <span className="italic text-brand-turquoise">command center.</span>
          </h2>
          <p className="text-lg text-brand-cream/70">
            Manage every card, lead, and insight from one powerful dashboard.
          </p>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl lg:aspect-[16/10]"
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
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-turquoise/20">
                  <f.icon className="h-6 w-6 text-brand-turquoise" />
                </div>
                <div>
                  <h3 className="mb-1 font-display text-xl">{f.title}</h3>
                  <p className="text-brand-cream/60">{f.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
