"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Users, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function PersonaSwitcher() {
  const [activeTab, setActiveTab] = useState<"individuals" | "teams">("individuals");

  const tabData = {
    individuals: {
      title: "For Individuals",
      subtitle: "Perfect for coaches, creators, and freelancers.",
      features: [
        "60-second setup",
        "Link-in-bio functionality",
        "Custom URL (onetap.link/you)",
        "Basic contact sharing",
      ],
      imageGradient: "bg-gradient-to-br from-brand-turquoise/10 to-blue-500/10"
    },
    teams: {
      title: "For Teams & Agencies",
      subtitle: "Built for law firms, real estate, and sales teams.",
      features: [
        "Brand Lock compliance",
        "CRM Sync (HubSpot, Salesforce)",
        "Centralized employee management",
        "Team analytics & lead capture",
      ],
      imageGradient: "bg-gradient-to-br from-purple-500/10 to-brand-midnight/10"
    }
  };

  const activeData = tabData[activeTab];

  return (
    <section className="py-24 bg-brand-cream relative" id="solutions">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-midnight mb-6">
            Built for you. <span className="italic text-brand-turquoise">Scaled for your team.</span>
          </h2>
          <p className="text-lg text-brand-midnight/70">
            Whether you are a solo creator or managing 500 agents, OneTap adapts to your workflow.
          </p>
        </div>

        {/* Custom High-End Tab Switcher */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-white p-1.5 rounded-full border border-brand-midnight/10 shadow-sm relative">
            {/* Active Tab Background Pill */}
            <motion.div
              layoutId="active-pill"
              className={cn(
                "absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-brand-midnight/5 rounded-full shadow-sm border border-brand-midnight/10 z-0 transition-all duration-300",
                activeTab === "teams" ? "left-[calc(50%+3px)]" : "left-1.5"
              )}
            />
            
            <button
              onClick={() => setActiveTab("individuals")}
              className={cn(
                "relative z-10 px-8 py-3 rounded-full flex items-center gap-2 font-medium transition-colors",
                activeTab === "individuals" ? "text-brand-midnight" : "text-brand-midnight/50 hover:text-brand-midnight"
              )}
            >
              <User size={18} />
              Individuals
            </button>
            <button
              onClick={() => setActiveTab("teams")}
              className={cn(
                "relative z-10 px-8 py-3 rounded-full flex items-center gap-2 font-medium transition-colors",
                activeTab === "teams" ? "text-brand-midnight" : "text-brand-midnight/50 hover:text-brand-midnight"
              )}
            >
              <Users size={18} />
              Teams
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="bg-white rounded-[2.5rem] border border-brand-midnight/5 shadow-xl overflow-hidden min-h-[450px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid lg:grid-cols-2 h-full"
            >
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <h3 className="font-serif text-3xl md:text-4xl text-brand-midnight mb-4">
                  {activeData.title}
                </h3>
                <p className="text-lg text-brand-midnight/60 mb-8">
                  {activeData.subtitle}
                </p>
                <ul className="space-y-4">
                  {activeData.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-brand-midnight/80">
                      <CheckCircle2 className="text-brand-turquoise" size={20} />
                      <span className="font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-12">
                  <button className="bg-brand-midnight text-brand-cream px-8 py-4 rounded-xl font-medium hover:bg-brand-turquoise hover:text-brand-midnight transition-colors shadow-lg">
                    {activeTab === "individuals" ? "Build your card" : "Book a demo"}
                  </button>
                </div>
              </div>
              <div className={cn("hidden lg:block relative", activeData.imageGradient)}>
                <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="w-full h-full bg-white/60 backdrop-blur-md rounded-2xl border border-white/80 shadow-2xl p-6 flex flex-col gap-4">
                     <div className="h-8 w-1/3 bg-brand-midnight/10 rounded-md"></div>
                     <div className="h-4 w-1/2 bg-brand-midnight/5 rounded-md"></div>
                     <div className="flex-1 mt-4 grid grid-cols-2 gap-4">
                       <div className="bg-brand-midnight/5 rounded-xl"></div>
                       <div className="bg-brand-midnight/5 rounded-xl"></div>
                     </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
