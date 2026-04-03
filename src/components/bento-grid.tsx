"use client";

import { motion } from "framer-motion";
import { Smartphone, Target, RefreshCw, BarChart3, ImagePlay, Globe2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function BentoGrid() {
  const features = [
    {
      id: "no-app",
      title: "No-App Experience",
      description: "Recipients view your card in any mobile browser instantly without downloading anything.",
      icon: Smartphone,
      color: "bg-indigo-500/10 text-indigo-500",
      colSpan: "lg:col-span-2",
    },
    {
      id: "leads",
      title: "Lead Capture",
      description: "Integrated forms send inquiries directly to your email or CRM.",
      icon: Target,
      color: "bg-rose-500/10 text-rose-500",
      colSpan: "lg:col-span-1",
    },
    {
      id: "realtime",
      title: "Real-Time Updates",
      description: "Change your phone number or logo once; it updates everywhere.",
      icon: RefreshCw,
      color: "bg-brand-turquoise/10 text-brand-turquoise",
      colSpan: "lg:col-span-1",
    },
    {
      id: "analytics",
      title: "Analytics Dashboard",
      description: "Track every view, click, and contact save natively.",
      icon: BarChart3,
      color: "bg-amber-500/10 text-amber-500",
      colSpan: "lg:col-span-2",
    },
    {
      id: "rich-media",
      title: "Rich Media",
      description: "Embed video intros, image galleries, and PDF portfolios directly inside.",
      icon: ImagePlay,
      color: "bg-fuchsia-500/10 text-fuchsia-500",
      colSpan: "lg:col-span-2",
    },
    {
      id: "global",
      title: "Global Ready",
      description: "Native support for English, Hebrew, Spanish, French, and Arabic.",
      icon: Globe2,
      color: "bg-emerald-500/10 text-emerald-500",
      colSpan: "lg:col-span-1",
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-brand-cream">
      <div className="container mx-auto px-6 lg:px-24">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="font-serif text-5xl md:text-6xl text-brand-midnight mb-6">
            Every feature you need. <br/> <span className="text-brand-turquoise-dark italic border-none">Nothing you don't.</span>
          </h2>
          <p className="text-xl text-brand-midnight/70 font-sans">
            Powerful enterprise-grade tools packed into a beautiful, lightning-fast digital interface.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "group relative bg-white rounded-[2rem] border border-brand-midnight/5 p-10 overflow-hidden hover:shadow-soft-diffusion transition-all duration-500",
                item.colSpan
              )}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110 duration-500", item.color)}>
                  <item.icon size={32} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-3xl text-brand-midnight mb-4">{item.title}</h3>
                <p className="text-brand-midnight/70 text-lg leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
