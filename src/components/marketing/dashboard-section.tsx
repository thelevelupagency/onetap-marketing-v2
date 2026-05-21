"use client";

import { motion } from "framer-motion";
import { BarChart3, RefreshCw, Edit3, Users, Lock } from "lucide-react";

const features = [
  { icon: Edit3, title: "Real-Time Edit", description: "Update any card instantly. Changes reflect everywhere in seconds." },
  { icon: RefreshCw, title: "Automated Lead Flow", description: "Leads sync to HubSpot, Salesforce, and your inbox automatically." },
  { icon: BarChart3, title: "Performance Analytics", description: "Track views, taps, saves, and form submissions per card." },
];

export function DashboardSection() {
  return (
    <section className="py-24 bg-brand-midnight text-brand-cream overflow-hidden relative">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-brand-turquoise/10 rounded-full blur-3xl pointer-events-none" aria-hidden />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl mb-4">
            Your professional <span className="italic text-brand-turquoise">command center.</span>
          </h2>
          <p className="text-lg text-brand-cream/70">
            Manage every card, lead, and insight from one powerful dashboard.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#1A2333] rounded-3xl border border-white/10 shadow-2xl p-6"
          >
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-turquoise rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-brand-midnight" />
                </div>
                <div>
                  <p className="font-bold">OneTap Dashboard</p>
                  <p className="text-xs text-white/50">12 active cards</p>
                </div>
              </div>
              <span className="bg-brand-turquoise/20 text-brand-turquoise text-xs font-bold px-3 py-1 rounded-full border border-brand-turquoise/30 flex items-center gap-1">
                <Lock size={10} /> Brand Locked
              </span>
            </div>
            <div className="space-y-3">
              {[
                { name: "Sarah Chen", views: "1.2k", leads: 24 },
                { name: "Marcus Webb", views: "890", leads: 18 },
                { name: "Elena Torres", views: "2.1k", leads: 41 },
              ].map((row) => (
                <div key={row.name} className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-sm">{row.name}</p>
                    <p className="text-xs text-white/40">{row.views} views</p>
                  </div>
                  <span className="text-brand-turquoise text-sm font-bold">{row.leads} leads</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-white/5 flex gap-4 text-xs text-white/50">
              <span className="flex items-center gap-1"><BarChart3 size={12} className="text-brand-turquoise" /> Analytics live</span>
              <span className="flex items-center gap-1"><RefreshCw size={12} className="text-brand-turquoise" /> CRM synced</span>
            </div>
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
                <div className="w-12 h-12 rounded-xl bg-brand-turquoise/20 flex items-center justify-center shrink-0">
                  <f.icon className="w-6 h-6 text-brand-turquoise" />
                </div>
                <div>
                  <h3 className="font-display text-xl mb-1">{f.title}</h3>
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
