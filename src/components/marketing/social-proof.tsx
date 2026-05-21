"use client";

import { motion } from "framer-motion";

const logos = ["Meridian", "Atlas Co", "Nova Labs", "Peak Agency", "Studio 9", "Vertex", "Bloom", "Arc"];

const testimonials = [
  {
    quote: "OneTap replaced our entire stack of paper cards. We captured 3x more leads at our last conference.",
    author: "Sarah Mitchell",
    role: "VP Sales, Meridian Group",
  },
  {
    quote: "Brand Lock alone saved our legal team weeks of compliance headaches. Every agent looks on-brand.",
    author: "David Park",
    role: "Managing Partner, Park & Associates",
  },
  {
    quote: "I set up my card in under a minute. Clients save my contact before I finish my elevator pitch.",
    author: "Elena Torres",
    role: "Freelance Brand Strategist",
  },
];

export function SocialProof() {
  return (
    <section className="py-24 bg-brand-cream overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-brand-midnight mb-4">
            Join thousands of professionals
          </h2>
          <p className="text-lg text-brand-midnight/70">Trusted by freelancers, creators, and agencies worldwide.</p>
        </div>

        <div className="relative mb-20 overflow-hidden">
          <div className="flex gap-12 animate-marquee w-max">
            {[...logos, ...logos].map((logo, i) => (
              <span
                key={`${logo}-${i}`}
                className="text-2xl font-display text-brand-midnight/20 whitespace-nowrap shrink-0"
              >
                {logo}
              </span>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-brand-midnight/5 shadow-sm"
            >
              <p className="text-brand-midnight/80 leading-snug mb-6 font-display font-medium text-lg italic tracking-tight">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-brand-midnight">{t.author}</p>
                <p className="text-sm text-brand-midnight/50">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
