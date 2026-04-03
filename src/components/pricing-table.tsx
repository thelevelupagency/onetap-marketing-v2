"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck, Zap, Globe, Headset } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function PricingTable() {
  const [isAnnual, setIsAnnual] = useState(true);
  const LOGIN_URL = "https://app.onetap-card.com/login";

  return (
    <div className="container mx-auto px-6">
      <div className="flex flex-col items-center mb-16">
        <div className="bg-brand-midnight/5 p-1 rounded-full inline-flex relative border border-brand-midnight/10 mb-4">
          <button
            onClick={() => setIsAnnual(false)}
            className={cn(
              "px-6 py-2.5 rounded-full font-medium text-sm transition-all z-10",
              !isAnnual ? "bg-white text-brand-midnight shadow-sm" : "text-brand-midnight/60 hover:text-brand-midnight"
            )}
          >
            Monthly
          </button>
          <button
            onClick={() => setIsAnnual(true)}
            className={cn(
              "px-6 py-2.5 rounded-full font-medium text-sm transition-all z-10 flex items-center gap-2",
              isAnnual ? "bg-white text-brand-midnight shadow-sm" : "text-brand-midnight/60 hover:text-brand-midnight"
            )}
          >
            Annually <span className="bg-brand-turquoise/20 text-brand-midnight text-xs px-2 py-0.5 rounded-full border border-brand-turquoise/30">Save 33%</span>
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
        {/* Free */}
        <div className="bg-white rounded-3xl p-8 border border-brand-midnight/5 flex flex-col hover:shadow-soft-diffusion transition-shadow">
          <h3 className="font-serif text-3xl text-brand-midnight mb-2">Basic</h3>
          <p className="text-brand-midnight/60 font-sans mb-6 text-sm">Perfect to get your networking started.</p>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-bold text-brand-midnight">$0</span>
            <span className="text-brand-midnight/60 font-sans text-sm">/forever</span>
          </div>
          <Link href={LOGIN_URL}>
            <Button className="w-full bg-brand-midnight/5 text-brand-midnight hover:bg-brand-midnight/10 h-12 rounded-xl text-lg mb-8 shadow-none border-none transition-colors border-transparent">
              Get Started Free
            </Button>
          </Link>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-brand-midnight/80 text-sm">
              <CheckCircle2 className="text-brand-turquoise" size={18} />
              <span>1 Active Digital Card</span>
            </li>
            <li className="flex items-center gap-3 text-brand-midnight/80 text-sm">
              <CheckCircle2 className="text-brand-turquoise" size={18} />
              <span>6 Basic Social Buttons</span>
            </li>
            <li className="flex items-center gap-3 text-brand-midnight/80 text-sm">
              <CheckCircle2 className="text-brand-turquoise" size={18} />
              <span>Standard Templates</span>
            </li>
            <li className="flex items-center gap-3 text-brand-midnight/80 text-sm">
              <CheckCircle2 className="text-brand-turquoise" size={18} />
              <span>OneTap Branding</span>
            </li>
          </ul>
        </div>

        {/* Premium */}
        <div className="bg-brand-midnight text-brand-cream rounded-3xl p-8 border border-brand-turquoise/30 shadow-soft-diffusion relative flex flex-col transform md:-translate-y-4">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2">
            <span className="bg-brand-turquoise text-brand-midnight text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap shadow-lg">MOST POPULAR</span>
          </div>
          <h3 className="font-serif text-3xl text-white mb-2">Premium</h3>
          <p className="text-brand-cream/60 font-sans mb-6 text-sm">For professionals who need real growth.</p>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-bold text-white">${isAnnual ? "10" : "15"}</span>
            <span className="text-brand-cream/60 font-sans text-sm">/mo</span>
          </div>
          <Link href={LOGIN_URL}>
            <Button className="w-full bg-brand-turquoise text-brand-midnight hover:bg-brand-turquoise/90 h-12 rounded-xl text-lg mb-8 border-none shadow-glass transition-colors">
              Upgrade to Premium
            </Button>
          </Link>
          <ul className="space-y-4 mb-8 flex-1 text-brand-cream/90">
            <li className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="text-brand-turquoise" size={18} />
              <span>Unlimited Active Cards</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="text-brand-turquoise" size={18} />
              <span>Deep Custom Branding</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="text-brand-turquoise" size={18} />
              <span>Advanced Analytics</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <CheckCircle2 className="text-brand-turquoise" size={18} />
              <span>Lead Capture Forms</span>
            </li>
          </ul>
        </div>

        {/* Agency */}
        <div className="bg-white rounded-3xl p-8 border border-brand-midnight/5 flex flex-col hover:shadow-soft-diffusion transition-shadow">
          <h3 className="font-serif text-3xl text-brand-midnight mb-2">Agency</h3>
          <p className="text-brand-midnight/60 font-sans mb-6 text-sm">Designed for massive office scaling.</p>
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-5xl font-bold text-brand-midnight">${isAnnual ? "249" : "299"}</span>
            <span className="text-brand-midnight/60 font-sans text-sm">/mo</span>
          </div>
          <Link href={LOGIN_URL}>
            <Button className="w-full bg-brand-midnight text-brand-cream hover:bg-brand-midnight/90 h-12 rounded-xl text-lg mb-8 shadow-soft-diffusion transition-colors">
              Contact Sales
            </Button>
          </Link>
          <ul className="space-y-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-brand-midnight/80 text-sm">
              <CheckCircle2 className="text-brand-turquoise" size={18} />
              <span>Admin Org Workspace</span>
            </li>
            <li className="flex items-center gap-3 text-brand-midnight/80 text-sm">
              <CheckCircle2 className="text-brand-turquoise" size={18} />
              <span>Brand Lock Controls</span>
            </li>
            <li className="flex items-center gap-3 text-brand-midnight/80 text-sm">
              <CheckCircle2 className="text-brand-turquoise" size={18} />
              <span>CRM Integrations</span>
            </li>
            <li className="flex items-center gap-3 text-brand-midnight/80 text-sm">
              <CheckCircle2 className="text-brand-turquoise" size={18} />
              <span>Bulk Order Discounts</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Enterprise Full Width Card */}
      <div className="max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-white to-brand-cream/30 rounded-[2.5rem] p-8 md:p-12 border border-brand-midnight/5 shadow-xl hover:shadow-2xl transition-all relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-turquoise/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand-turquoise/10 transition-colors" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-stretch gap-12">
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-midnight text-brand-cream text-xs font-bold mb-6 tracking-wider uppercase">
                <Globe size={14} className="text-brand-turquoise" />
                Enterprise Solution
              </div>
              <h3 className="font-serif text-4xl md:text-5xl text-brand-midnight mb-6">
                Scale without <span className="italic text-brand-turquoise-dark">compromise.</span>
              </h3>
              <p className="text-lg text-brand-midnight/60 font-sans max-w-xl mb-8 leading-relaxed">
                For global organizations requiring advanced security, custom integrations, and white-glove support.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href={LOGIN_URL}>
                  <Button className="bg-brand-midnight text-brand-cream hover:bg-brand-turquoise hover:text-brand-midnight h-14 px-10 rounded-2xl text-lg font-medium shadow-lg transition-all">
                    Book a Demo
                  </Button>
                </Link>
                <Link href={LOGIN_URL}>
                  <Button variant="outline" className="h-14 px-10 rounded-2xl text-lg font-medium border-brand-midnight/10 hover:bg-brand-midnight/5">
                    Talk to Sales
                  </Button>
                </Link>
              </div>
            </div>

            <div className="w-full lg:w-px bg-brand-midnight/5 hidden lg:block" />

            <div className="flex-1 w-full">
              <div className="grid sm:grid-cols-2 gap-x-8 gap-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-turquoise/10 rounded-xl flex items-center justify-center shrink-0">
                    <ShieldCheck className="text-brand-turquoise" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-midnight mb-1">Security & Auth</h4>
                    <p className="text-sm text-brand-midnight/60">SSO, SAML, and custom security audits.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-turquoise/10 rounded-xl flex items-center justify-center shrink-0">
                    <Zap className="text-brand-turquoise" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-midnight mb-1">Custom API</h4>
                    <p className="text-sm text-brand-midnight/60">Full access to our API for custom workflows.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-turquoise/10 rounded-xl flex items-center justify-center shrink-0">
                    <Headset className="text-brand-turquoise" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-midnight mb-1">Priority Support</h4>
                    <p className="text-sm text-brand-midnight/60">24/7 dedicated account manager.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-brand-turquoise/10 rounded-xl flex items-center justify-center shrink-0">
                    <CheckCircle2 className="text-brand-turquoise" size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-midnight mb-1">Global Scale</h4>
                    <p className="text-sm text-brand-midnight/60">Multi-region compliance and hosting.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 text-brand-midnight/60 font-medium pb-12">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-brand-turquoise" size={18} />
          <span>No credit card required to start</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle2 className="text-brand-turquoise" size={18} />
          <span>Cancel anytime securely</span>
        </div>
      </div>
    </div>
  );
}
