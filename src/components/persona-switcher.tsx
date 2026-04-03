"use client";

import { motion } from "framer-motion";
import { User, Users, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

export function PersonaSwitcher() {
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

        <Tabs defaultValue="individuals" className="w-full">
          <div className="flex justify-center mb-16">
            <TabsList className="bg-white p-1.5 rounded-full border border-brand-midnight/10 shadow-sm h-auto flex">
              <TabsTrigger 
                value="individuals" 
                className="rounded-full px-8 py-3 text-base font-medium data-[state=active]:bg-brand-midnight/5 data-[state=active]:text-brand-midnight data-[state=active]:shadow-sm text-brand-midnight/50 flex items-center gap-2 transition-all"
              >
                <User size={18} />
                Individuals
              </TabsTrigger>
              <TabsTrigger 
                value="teams" 
                className="rounded-full px-8 py-3 text-base font-medium data-[state=active]:bg-brand-midnight/5 data-[state=active]:text-brand-midnight data-[state=active]:shadow-sm text-brand-midnight/50 flex items-center gap-2 transition-all"
              >
                <Users size={18} />
                Teams
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-brand-midnight/5 shadow-xl overflow-hidden min-h-[450px]">
            {["individuals", "teams"].map((key) => {
              const activeData = tabData[key as "individuals" | "teams"];
              return (
                <TabsContent key={key} value={key} className="mt-0 h-full data-[state=inactive]:hidden data-[state=active]:h-full">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
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
                        <Button size="lg" className="bg-brand-midnight text-brand-cream px-8 h-14 rounded-xl font-medium hover:bg-brand-turquoise hover:text-brand-midnight transition-colors shadow-lg text-lg">
                          {key === "individuals" ? "Build your card" : "Book a demo"}
                        </Button>
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
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
      </div>
    </section>
  );
}
