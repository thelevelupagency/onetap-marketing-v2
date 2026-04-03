"use client";

import { motion } from "framer-motion";
import { Lock, Users, BarChart3, RefreshCw } from "lucide-react";

export function B2BShowcase() {
  return (
    <section className="py-24 bg-brand-midnight text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-turquoise/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full bg-[#1A2333] rounded-3xl border border-white/10 shadow-2xl p-6 relative"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-brand-turquoise rounded-lg flex items-center justify-center">
                  <Users size={20} className="text-brand-midnight" />
                </div>
                <div>
                  <h4 className="font-bold text-lg">Empire Real Estate</h4>
                  <p className="text-xs text-white/50">250 Active Agents</p>
                </div>
              </div>
              <div className="bg-brand-turquoise/20 text-brand-turquoise px-3 py-1 rounded-full text-xs font-bold border border-brand-turquoise/30 flex items-center gap-2">
                <Lock size={12} />
                Brand Locked
              </div>
            </div>

            {/* Dashboard Mock Content */}
            <div className="space-y-4">
              {[1, 2, 3].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex flex-col gap-2 w-1/3">
                     <div className="h-4 bg-white/20 rounded w-full"></div>
                     <div className="h-3 bg-white/10 rounded w-2/3"></div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="h-6 w-16 bg-brand-turquoise/20 rounded-md border border-brand-turquoise/30"></div>
                  </div>
                </div>
              ))}
            </div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -right-8 -bottom-8 bg-[#1A2333] p-6 rounded-2xl border border-white/10 shadow-xl max-w-[250px]"
            >
              <div className="flex items-center gap-3 mb-4">
                <RefreshCw size={20} className="text-brand-turquoise" />
                <span className="font-bold text-sm">CRM Sync Active</span>
              </div>
              <p className="text-xs text-white/60">
                12 new leads pushed to Salesforce in the last hour.
              </p>
            </motion.div>
          </motion.div>

          <div className="flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">
              Total control for <br />
              <span className="italic text-brand-turquoise">enterprises.</span>
            </h2>
            <p className="text-lg text-white/70 mb-8 max-w-xl">
              Equip your entire organization with digital cards while maintaining strict brand compliance. Real-time CRM integrations ensure every scan turns into a tracked lead.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-turquoise/20 flex items-center justify-center shrink-0">
                  <Lock className="text-brand-turquoise" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Brand Lock</h4>
                  <p className="text-white/60">Apply law firm branding to 50 agent cards simultaneously to ensure consistency.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-turquoise/20 flex items-center justify-center shrink-0">
                  <BarChart3 className="text-brand-turquoise" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Advanced Analytics</h4>
                  <p className="text-white/60">Track impressions, button clicks, and vCard downloads per agent.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
