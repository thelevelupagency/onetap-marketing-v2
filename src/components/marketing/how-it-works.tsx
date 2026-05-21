"use client";

import { motion } from "framer-motion";
import { PenLine, Share2, Users } from "lucide-react";

const steps = [
  {
    icon: PenLine,
    title: "Create",
    description: "Build your card in 60 seconds. Add your photo, links, gallery, video, and lead capture form.",
    step: "01",
  },
  {
    icon: Share2,
    title: "Share",
    description: "Tap NFC, scan QR, or send your link. Recipients open instantly in their browser — no app needed.",
    step: "02",
  },
  {
    icon: Users,
    title: "Connect",
    description: "Contacts save with one tap. Leads flow to your dashboard and CRM automatically.",
    step: "03",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl text-brand-midnight mb-4">
            How it <span className="italic text-brand-turquoise">works</span>
          </h2>
          <p className="text-lg text-brand-midnight/70">
            Three steps from zero to everywhere your network needs you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5 bg-brand-turquoise/20" />
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="w-16 h-16 mx-auto mb-6 bg-brand-turquoise/10 rounded-2xl flex items-center justify-center border border-brand-turquoise/20 relative z-10">
                <step.icon className="w-7 h-7 text-brand-turquoise-dark" />
              </div>
              <span className="text-xs font-bold text-brand-turquoise tracking-widest mb-2 block">{step.step}</span>
              <h3 className="font-display text-2xl text-brand-midnight mb-3">{step.title}</h3>
              <p className="text-brand-midnight/60 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
