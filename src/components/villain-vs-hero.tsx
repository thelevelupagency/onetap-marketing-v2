"use client";

import { motion } from "framer-motion";
import { Trash2, Smartphone, Sparkles, Check } from "lucide-react";

export function VillainVsHero() {
  return (
    <section className="py-24 md:py-32 bg-brand-midnight text-brand-cream overflow-hidden">
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
              {/* Falling cards */}
              {[0, 1, 2].map((i) => (
                <motion.div 
                  key={i}
                  initial={{ y: -150, x: (i - 1) * 20, rotate: i * 15, opacity: 0 }}
                  animate={{ 
                    y: 120, 
                    x: (i - 1) * 10, 
                    rotate: i * 25 + 10, 
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3, 
                    delay: i * 0.8,
                    ease: "easeIn"
                  }}
                  className="absolute w-40 h-24 bg-white rounded-md shadow-lg border border-gray-200 flex flex-col p-3 z-10"
                >
                  <div className="w-10 h-2 bg-gray-200 rounded-full mb-2" />
                  <div className="w-20 h-1 bg-gray-100 rounded-full mb-1" />
                  <div className="w-12 h-1 bg-gray-100 rounded-full" />
                </motion.div>
              ))}
              
              <div className="absolute bottom-8 flex flex-col items-center">
                 <Trash2 size={64} className="text-red-400/30" />
                 <div className="w-24 h-4 bg-red-400/10 rounded-full blur-xl mt-2" />
              </div>
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
            
            <div className="w-full max-w-sm aspect-square bg-gradient-to-br from-brand-turquoise/10 to-transparent rounded-3xl border border-brand-turquoise/20 flex items-center justify-center relative shadow-2xl backdrop-blur-sm overflow-hidden">
              
              {/* Digital Card */}
              <motion.div 
                className="absolute w-36 h-56 bg-brand-midnight rounded-2xl border border-brand-turquoise/40 flex flex-col items-center justify-center z-10 shadow-[0_0_30px_rgba(45,225,194,0.2)]"
                animate={{ 
                    rotateY: [0, 10, 0],
                    boxShadow: ["0 0 20px rgba(45,225,194,0.1)", "0 0 40px rgba(45,225,194,0.3)", "0 0 20px rgba(45,225,194,0.1)"]
                }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              >
                <div className="w-12 h-12 bg-brand-turquoise/10 rounded-full flex items-center justify-center mb-4">
                    <Sparkles className="text-brand-turquoise" size={24} />
                </div>
                <div className="w-20 h-2 bg-brand-turquoise/20 rounded-full mb-2" />
                <div className="w-12 h-2 bg-brand-turquoise/10 rounded-full" />
              </motion.div>
              
              {/* Phone Tapping Animation */}
              <motion.div 
                animate={{ 
                  x: [150, 40, 40, 150],
                  y: [-20, 0, 0, -20],
                  rotate: [15, -10, -10, 15]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  times: [0, 0.3, 0.7, 1],
                  ease: "easeInOut"
                }}
                className="absolute right-0 z-20"
              >
                <div className="relative">
                    <Smartphone className="text-white" size={120} strokeWidth={1.5} />
                    {/* Success Pulse */}
                    <motion.div 
                        animate={{ 
                            scale: [0, 1.5],
                            opacity: [0, 1, 0]
                        }}
                        transition={{ 
                            repeat: Infinity, 
                            duration: 4,
                            times: [0.3, 0.4, 0.6],
                        }}
                        className="absolute top-1/2 left-0 w-12 h-12 bg-brand-turquoise rounded-full blur-md -translate-y-1/2"
                    />
                </div>
              </motion.div>

              {/* Saved Notification */}
              <motion.div
                animate={{ 
                    opacity: [0, 0, 1, 1, 0],
                    y: [20, 20, 0, 0, -10]
                }}
                transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    times: [0, 0.35, 0.45, 0.7, 0.8],
                }}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white text-brand-midnight px-4 py-2 rounded-full flex items-center gap-2 shadow-xl z-30 text-sm font-medium"
              >
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                    <Check size={12} className="text-white" />
                </div>
                Contact Saved
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
