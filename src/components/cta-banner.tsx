"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";

export const CTABanner = () => {
  const [name, setName] = useState("");

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-brand-midnight rounded-[2.5rem] overflow-hidden"
        >
          <BackgroundGradientAnimation 
            containerClassName="h-auto"
            className="p-12 md:p-16 text-center"
            gradientBackgroundStart="rgb(16, 24, 40)"
            gradientBackgroundEnd="rgb(16, 24, 40)"
            firstColor="45, 225, 194"
            secondColor="59, 130, 246"
            thirdColor="99, 102, 241"
            fourthColor="16, 24, 40"
            fifthColor="45, 225, 194"
            pointerColor="45, 225, 194"
            blendingValue="soft-light"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl text-brand-cream tracking-tight mb-4 font-serif leading-tight">
                Start for free in{" "}
                <span className="italic text-brand-turquoise">60 seconds.</span>
              </h2>
              <p className="font-sans text-brand-cream/70 text-lg max-w-md mx-auto mb-8 leading-relaxed">
                No credit card, no app download, no friction. Just your professional identity, ready to share.
              </p>

              <div className="flex items-center gap-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-full p-1.5 max-w-sm mx-auto shadow-sm">
                <span className="pl-4 pr-1 text-sm text-brand-cream/50 whitespace-nowrap font-sans">
                  onetap.link/
                </span>
                <input
                  type="text"
                  placeholder="yourname"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="flex-1 bg-transparent text-white font-sans text-sm outline-none placeholder:text-white/30 min-w-0"
                />
                <Link href="https://app.onetap-card.com/login">
                  <Button className="bg-brand-turquoise text-brand-midnight hover:bg-white rounded-full px-5 h-9 text-sm shrink-0 shadow-glass transition-all hover:scale-105 font-bold">
                    Claim <ArrowRight size={14} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </BackgroundGradientAnimation>
        </motion.div>
      </div>
    </section>
  );
};
