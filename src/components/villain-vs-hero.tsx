"use client";

import { motion } from "framer-motion";
import { Trash2, Smartphone, Sparkles } from "lucide-react";

export function VillainVsHero() {
  return (
    <section className="py-24 bg-brand-midnight text-brand-cream overflow-hidden">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="font-serif text-4xl md:text-5xl mb-6"
          >
            The old way is <span className="text-red-400 italic">broken.</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-brand-cream/70"
          >
            88% of paper business cards are thrown away within a week. Stop wasting money and killing trees.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* The Villain: Paper Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative flex flex-col items-center"
          >
            <div className="w-full max-w-sm aspect-square bg-white/5 rounded-3xl border border-white/10 flex items-center justify-center relative shadow-2xl overflow-hidden">
              <motion.div 
                animate={{ y: [0, 20], opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
                className="absolute w-48 h-24 bg-white rounded-md shadow-lg border border-gray-200 flex flex-col p-3"
              >
                <div className="w-12 h-2 bg-gray-200 rounded-full mb-3" />
                <div className="w-24 h-1.5 bg-gray-100 rounded-full mb-1" />
                <div className="w-16 h-1.5 bg-gray-100 rounded-full" />
              </motion.div>
              <Trash2 size={48} className="text-red-400 opacity-50 absolute bottom-12" />
            </div>
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-serif text-red-400 mb-2">Paper Cards</h3>
              <ul className="text-white/60 space-y-2">
                <li>• Expensive to reprint</li>
                <li>• Easily lost or discarded</li>
                <li>• Zero analytics</li>
              </ul>
            </div>
          </motion.div>

          {/* The Hero: OneTap NFC */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative flex flex-col items-center"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-turquoise/20 rounded-full blur-3xl" />
            
            <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-brand-turquoise/20 to-transparent rounded-3xl border border-brand-turquoise/30 flex items-center justify-center relative shadow-2xl backdrop-blur-sm">
              <motion.div 
                animate={{ scale: [1, 1.05, 1], boxShadow: ["0 0 0 rgba(45,225,194,0)", "0 0 40px rgba(45,225,194,0.3)", "0 0 0 rgba(45,225,194,0)"] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute w-32 h-48 bg-brand-midnight rounded-xl shadow-[0_0_30px_rgba(45,225,194,0.5)] border border-brand-turquoise/40 flex items-center justify-center z-10"
              >
                <Sparkles className="text-brand-turquoise" size={32} />
              </motion.div>
              
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
                className="absolute right-12 top-16"
              >
                <Smartphone className="text-brand-turquoise/60" size={64} strokeWidth={1} />
              </motion.div>
            </div>
            
            <div className="mt-8 text-center">
              <h3 className="text-2xl font-serif text-brand-turquoise mb-2">OneTap Digital</h3>
              <ul className="text-white/60 space-y-2">
                <li>• Update anytime, instantly</li>
                <li>• Never run out of cards</li>
                <li>• Track opens and clicks</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
