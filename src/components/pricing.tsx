"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function Pricing() {
  const [isAnnual, setIsAnnual] = useState(true);

  return (
    <section className="py-24 bg-brand-cream" id="pricing">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-midnight mb-6">
            Simple, honest pricing.
          </h2>
          <p className="text-lg text-brand-midnight/70 mb-8">
            Start for free. Upgrade when you need more power.
          </p>
          
          <div className="flex items-center justify-center gap-4">
            <span className={cn("text-sm font-medium", !isAnnual ? "text-brand-midnight" : "text-brand-midnight/50")}>Monthly</span>
            <button
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-14 h-8 rounded-full bg-brand-midnight/10 p-1 transition-colors"
            >
              <div 
                className={cn(
                  "w-6 h-6 rounded-full bg-brand-midnight shadow-md transition-transform",
                  isAnnual ? "translate-x-6" : "translate-x-0"
                )}
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={cn("text-sm font-medium", isAnnual ? "text-brand-midnight" : "text-brand-midnight/50")}>Annually</span>
              <span className="bg-brand-turquoise/20 text-brand-turquoise text-xs font-bold px-2 py-1 rounded-full">2 Months Free</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Tier */}
          <div className="bg-white rounded-3xl p-8 border border-brand-midnight/10 shadow-sm flex flex-col">
            <h3 className="font-serif text-2xl mb-2">Free</h3>
            <p className="text-brand-midnight/60 text-sm mb-6">Perfect for trying out OneTap.</p>
            <div className="mb-6">
              <span className="text-5xl font-bold tracking-tight">$0</span>
              <span className="text-brand-midnight/50">/month</span>
            </div>
            <button className="w-full py-3 rounded-xl border-2 border-brand-midnight/10 font-medium hover:border-brand-midnight transition-colors mb-8">
              Get Started
            </button>
            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3">
                <Check size={20} className="text-brand-turquoise shrink-0" />
                <span className="text-sm font-medium">1 Active digital card</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-brand-turquoise shrink-0" />
                <span className="text-sm font-medium">6 Social/Contact links</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-brand-turquoise shrink-0" />
                <span className="text-sm font-medium">OneTap branding</span>
              </li>
            </ul>
          </div>

          {/* Premium Tier */}
          <div className="bg-brand-midnight text-brand-cream rounded-3xl p-8 border-2 border-brand-turquoise shadow-2xl relative flex flex-col transform md:-translate-y-4">
            <div className="absolute -top-4 inset-x-0 flex justify-center">
              <span className="bg-brand-turquoise text-brand-midnight text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Most Popular
              </span>
            </div>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent overflow-hidden rounded-3xl mix-blend-overlay"></div>
            
            <div className="relative z-10 flex flex-col h-full">
              <h3 className="font-serif text-2xl mb-2 text-brand-turquoise">Premium</h3>
              <p className="text-brand-cream/60 text-sm mb-6">For professionals building their brand.</p>
              <div className="mb-6">
                <span className="text-5xl font-bold tracking-tight">${isAnnual ? "10" : "12"}</span>
                <span className="text-brand-cream/50">/month</span>
                {isAnnual && <div className="text-sm text-brand-turquoise mt-1 font-medium">Billed $120 yearly</div>}
              </div>
              <button className="w-full py-3 rounded-xl bg-brand-turquoise text-brand-midnight font-bold hover:bg-white transition-colors mb-8 shadow-lg">
                Upgrade to Premium
              </button>
              <ul className="space-y-4 flex-1">
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-brand-turquoise shrink-0" />
                  <span className="text-sm font-medium">Unlimited sections (Video, FAQ)</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-brand-turquoise shrink-0" />
                  <span className="text-sm font-medium">Custom branding & colors</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-brand-turquoise shrink-0" />
                  <span className="text-sm font-medium">Advanced analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check size={20} className="text-brand-turquoise shrink-0" />
                  <span className="text-sm font-medium">Remove OneTap branding</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Agency Tier */}
          <div className="bg-white rounded-3xl p-8 border border-brand-midnight/10 shadow-sm flex flex-col">
            <h3 className="font-serif text-2xl mb-2">Agency</h3>
            <p className="text-brand-midnight/60 text-sm mb-6">For teams requiring control at scale.</p>
            <div className="mb-6">
              <span className="text-5xl font-bold tracking-tight">${isAnnual ? "249" : "299"}</span>
              <span className="text-brand-midnight/50">/month</span>
              {isAnnual && <div className="text-sm text-brand-midnight/50 mt-1">Billed $2,988 yearly</div>}
            </div>
            <button className="w-full py-3 rounded-xl border-2 border-brand-midnight/10 font-medium hover:border-brand-midnight transition-colors mb-8">
              Contact Sales
            </button>
            <ul className="space-y-4 flex-1">
              <li className="flex items-start gap-3">
                <Check size={20} className="text-brand-turquoise shrink-0" />
                <span className="text-sm font-medium">Up to 50 agent cards</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-brand-turquoise shrink-0" />
                <span className="text-sm font-medium">Admin dashboard & Brand Lock</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-brand-turquoise shrink-0" />
                <span className="text-sm font-medium">CRM Integration (HubSpot/Salesforce)</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={20} className="text-brand-turquoise shrink-0" />
                <span className="text-sm font-medium">Dedicated success manager</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
