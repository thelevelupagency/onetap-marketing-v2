"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const CTABanner = () => {
  const [name, setName] = useState("");

  return (
    <section className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-secondary rounded-3xl p-12 md:p-16 text-center overflow-hidden"
        >
          {/* Gradient orbs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl text-secondary-foreground tracking-tight mb-4 font-serif">
              Start for free in{" "}
              <span className="italic text-primary">60 seconds.</span>
            </h2>
            <p className="font-sans text-secondary-foreground/70 text-lg max-w-md mx-auto mb-8">
              No credit card, no app download, no friction. Just your professional identity, ready to share.
            </p>

            <div className="flex items-center gap-0 bg-secondary-foreground/5 border border-secondary-foreground/10 rounded-full p-1.5 max-w-sm mx-auto shadow-sm">
              <span className="pl-4 pr-1 text-sm text-secondary-foreground/50 whitespace-nowrap font-sans">
                onetap.link/
              </span>
              <input
                type="text"
                placeholder="yourname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 bg-transparent text-secondary-foreground font-sans text-sm outline-none placeholder:text-secondary-foreground/30 min-w-0"
              />
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-5 h-9 text-sm shrink-0 shadow-soft-diffusion transition-all hover:scale-105">
                Claim <ArrowRight size={14} className="ml-1" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
