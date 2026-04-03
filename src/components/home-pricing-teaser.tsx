"use client";

import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MagneticWrapper } from "@/components/ui/magnetic-button";
import Link from "next/link";

export function HomePricingTeaser() {
  const LOGIN_URL = "https://app.onetap-card.com/login";

  return (
    <section className="py-24 md:py-32 bg-white relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-brand-midnight mb-4">
            Start for free. <span className="text-brand-turquoise-dark italic">Scale infinitely.</span>
          </h2>
          <p className="text-lg text-brand-midnight/70 font-sans">
            Your digital identity shouldn't have a paywall. Get the platform that converts more leads today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Free Forever */}
          <div className="bg-brand-cream/50 rounded-3xl p-8 border border-brand-midnight/5 flex flex-col">
            <h3 className="font-serif text-2xl text-brand-midnight mb-2">Basic</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-bold text-brand-midnight">$0</span>
              <span className="text-brand-midnight/60 font-sans">/forever</span>
            </div>
            <ul className="space-y-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-brand-midnight/80">
                <CheckCircle2 className="text-brand-turquoise" size={20} />
                <span>1 Active Digital Card</span>
              </li>
              <li className="flex items-center gap-3 text-brand-midnight/80">
                <CheckCircle2 className="text-brand-turquoise" size={20} />
                <span>6 Basic Social Buttons</span>
              </li>
              <li className="flex items-center gap-3 text-brand-midnight/80">
                <CheckCircle2 className="text-brand-turquoise" size={20} />
                <span>Standard Templates</span>
              </li>
            </ul>
            <Link href={LOGIN_URL}>
              <Button className="w-full bg-white text-brand-midnight border border-brand-midnight/10 hover:bg-brand-midnight/5 h-14 rounded-xl font-medium text-lg mt-auto">
                Create Free Card
              </Button>
            </Link>
          </div>

          {/* Premium */}
          <div className="bg-brand-midnight text-brand-cream rounded-3xl p-8 border border-brand-turquoise/30 shadow-soft-diffusion relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 p-4">
              <span className="bg-brand-turquoise text-brand-midnight text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</span>
            </div>
            <h3 className="font-serif text-2xl text-white mb-2">Premium</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-5xl font-bold text-white">$10</span>
              <span className="text-brand-cream/60 font-sans">/mo</span>
            </div>
            <ul className="space-y-4 mb-8 text-brand-cream/90 flex-1">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-turquoise" size={20} />
                <span>Unlimited Active Cards</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-turquoise" size={20} />
                <span>Deep Custom Branding</span>
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="text-brand-turquoise" size={20} />
                <span>Advanced Analytics & Leads</span>
              </li>
            </ul>
            <MagneticWrapper className="w-full mt-auto">
              <Link href={LOGIN_URL} className="block w-full">
                <Button className="w-full bg-brand-turquoise text-brand-midnight hover:bg-brand-turquoise/90 h-14 rounded-xl font-medium text-lg border-none shadow-glass">
                  Upgrade to Premium
                </Button>
              </Link>
            </MagneticWrapper>
          </div>
        </div>
        
        <div className="mt-12 text-center">
            <Link href="/pricing" className="text-brand-midnight/60 hover:text-brand-midnight font-medium transition-colors inline-flex items-center gap-2">
                View all plans and features <span>→</span>
            </Link>
        </div>
      </div>
    </section>
  );
}
