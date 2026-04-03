"use client";

import { motion } from "framer-motion";
import { Building2, Scale, Video, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function BentoGrid() {
  const industries = [
    {
      id: "real-estate",
      title: "Real Estate Brokers",
      description: "Embed virtual tours, active listings, and booking links.",
      icon: Building2,
      color: "bg-blue-500/10 text-blue-600",
      colSpan: "lg:col-span-2",
      image: "Virtual Tour Link Preview"
    },
    {
      id: "lawyers",
      title: "Lawyers & Partners",
      description: "Direct V-Card save with secure contact and firm branding.",
      icon: Scale,
      color: "bg-brand-midnight/10 text-brand-midnight",
      colSpan: "lg:col-span-1",
      image: "Save Contact Button"
    },
    {
      id: "creators",
      title: "Creators & Coaches",
      description: "Video intros, social hubs, and course sign-ups in one tap.",
      icon: Video,
      color: "bg-brand-turquoise/10 text-brand-turquoise",
      colSpan: "lg:col-span-3",
      image: "Video Hub Preview"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-midnight mb-4">
            Perfect for <span className="text-brand-turquoise italic border-b-2 border-brand-turquoise">your</span> industry.
          </h2>
          <p className="text-lg text-brand-midnight/70 max-w-2xl">
            Custom-built components that highlight what matters most to your clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={cn(
                "group relative bg-brand-cream/50 rounded-3xl border border-brand-midnight/5 p-8 overflow-hidden hover:shadow-xl transition-all duration-300",
                item.colSpan
              )}
            >
              <div className="relative z-10 flex flex-col h-full">
                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-6", item.color)}>
                  <item.icon size={28} />
                </div>
                <h3 className="font-serif text-2xl text-brand-midnight mb-3">{item.title}</h3>
                <p className="text-brand-midnight/70 mb-8 max-w-md">{item.description}</p>
                
                <div className="mt-auto group-hover:translate-x-2 transition-transform">
                  <a href="#" className="inline-flex items-center gap-2 text-sm font-bold text-brand-midnight">
                    See templates <ArrowRight size={16} />
                  </a>
                </div>
              </div>

              {/* Abstract decorative background representing the image/preview */}
              <div className={cn(
                "absolute -bottom-10 right-0 left-0 h-40 bg-gradient-to-t from-white to-transparent opacity-80 z-0",
                item.colSpan === "lg:col-span-3" ? "w-1/2 ml-auto" : ""
              )}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
