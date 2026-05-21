"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LOGIN_URL } from "@/lib/constants";
import { HeroPhonePreview } from "@/components/marketing/hero-phone-preview";

export function HeroSection() {
  return (
    <section className="relative flex items-center bg-brand-cream pt-24 pb-8 lg:pt-28 lg:pb-12">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-turquoise/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-turquoise/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-6 xl:gap-10 items-center lg:items-center max-w-7xl mx-auto">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-6 bg-brand-turquoise/20 text-brand-midnight border-brand-turquoise/30 hover:bg-brand-turquoise/30">
                <Sparkles className="w-3 h-3 mr-1" />
                Digital business cards, reimagined
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-5xl md:text-6xl lg:text-7xl text-brand-midnight mb-6"
            >
              Your Digital Business Card in{" "}
              <span className="italic text-brand-turquoise-dark">One Tap.</span>
              <br />
              Appear Everywhere.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-brand-midnight/70 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
            >
              Create a stunning personal microsite, share it with a tap or scan, and capture leads automatically — no app required for recipients.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center lg:items-stretch"
            >
              <Link href={LOGIN_URL}>
                <Button size="lg" className="bg-brand-midnight text-brand-cream hover:bg-brand-turquoise hover:text-brand-midnight rounded-full h-14 px-8 text-lg shadow-soft-diffusion w-full sm:w-auto">
                  Get your card free
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-lg border-brand-midnight/20 hover:bg-brand-midnight/5 w-full sm:w-auto">
                  See how it works
                </Button>
              </Link>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-8 text-sm text-brand-midnight/50"
            >
              No credit card required · Setup in 60 seconds
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center leading-none m-0 p-0 min-w-0 w-full"
          >
            <HeroPhonePreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
