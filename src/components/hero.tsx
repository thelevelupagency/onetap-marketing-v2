"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  const [name, setName] = useState("");

  const displayName = name.trim() || "Your Name";

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-brand-cream">
      {/* Background gradients */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[800px] h-[800px] bg-brand-turquoise/20 rounded-full blur-3xl opacity-50" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-brand-midnight/5 rounded-full blur-3xl opacity-50" />
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left Column: The Aha Moment */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-8 max-w-xl"
          >
            <div className="inline-flex gap-2 items-center bg-brand-midnight/5 px-4 py-2 rounded-full border border-brand-midnight/10 w-fit">
              <Zap size={16} className="text-brand-turquoise" />
              <span className="text-sm font-medium text-brand-midnight">No App Required</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.1] text-brand-midnight">
              Your professional identity, <span className="text-brand-turquoise italic p-1">one tap</span> away.
            </h1>
            
            <p className="text-lg md:text-xl text-brand-midnight/70 font-sans">
              Build your modern digital business card in 60 seconds. Claim your custom URL and never carry paper again.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1 group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-midnight/50 font-medium">
                  onetap.link/
                </span>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="yourname"
                  className="w-full pl-32 pr-4 py-4 rounded-xl border border-brand-midnight/20 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-turquoise focus:border-transparent transition-all"
                />
              </div>
              <button className="bg-brand-midnight text-brand-cream px-8 py-4 rounded-xl font-medium hover:bg-brand-turquoise hover:text-brand-midnight transition-colors shadow-lg flex items-center justify-center gap-2 group whitespace-nowrap">
                Claim URL
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: 3D Mockup */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative h-[600px] flex items-center justify-center lg:justify-end"
          >
            {/* Phone Frame */}
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [-5, -6, -5] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="relative w-[300px] h-[600px] bg-brand-midnight rounded-[3rem] p-3 shadow-2xl border-4 border-white/20"
              style={{ transformOrigin: "bottom right" }}
            >
              {/* Screen */}
              <div className="relative w-full h-full bg-brand-cream rounded-[2.5rem] overflow-hidden flex flex-col">
                {/* Simulated Notch */}
                <div className="absolute top-0 inset-x-0 h-6 flex justify-center z-20">
                  <div className="w-24 h-6 bg-brand-midnight rounded-b-xl"></div>
                </div>
                
                {/* Digital Card Preview inside Screen */}
                <div className="flex-1 mt-12 px-4 pb-6 flex flex-col gap-4">
                  <div className="h-32 rounded-2xl bg-gradient-to-br from-brand-midnight to-brand-midnight/80 relative">
                    <div className="absolute -bottom-8 left-4 w-20 h-20 bg-white rounded-full p-1 shadow-md">
                      <div className="w-full h-full bg-brand-turquoise rounded-full flex items-center justify-center">
                        <span className="font-serif text-3xl text-brand-midnight">{displayName.charAt(0).toUpperCase()}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <h3 className="font-serif text-3xl text-brand-midnight tracking-tight truncate">
                      {displayName}
                    </h3>
                    <p className="text-brand-midnight/60 text-sm font-sans mt-1">Digital Marketing Expert</p>
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <button className="flex-1 bg-brand-midnight text-brand-cream py-2 rounded-lg text-sm font-medium">
                      Save Contact
                    </button>
                    <button className="w-10 bg-brand-midnight/5 text-brand-midnight py-2 rounded-lg flex items-center justify-center">
                      <ArrowRight size={16} />
                    </button>
                  </div>
                  
                  <div className="space-y-3 mt-4">
                    <div className="h-12 bg-white rounded-xl shadow-sm border border-brand-midnight/5 flex items-center px-4 gap-3">
                      <div className="w-6 h-6 bg-brand-midnight/10 rounded-full"></div>
                      <div className="h-2 w-24 bg-brand-midnight/10 rounded-full"></div>
                    </div>
                    <div className="h-12 bg-white rounded-xl shadow-sm border border-brand-midnight/5 flex items-center px-4 gap-3">
                      <div className="w-6 h-6 bg-brand-midnight/10 rounded-full"></div>
                      <div className="h-2 w-32 bg-brand-midnight/10 rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Floating Elements */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -left-12 top-1/4 bg-white p-4 rounded-2xl shadow-xl border border-brand-midnight/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-brand-turquoise/20 rounded-full flex items-center justify-center text-brand-turquoise">
                  <Zap size={20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-midnight">NFC Ready</p>
                  <p className="text-xs text-brand-midnight/60">Tap to share</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
