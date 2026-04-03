"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Trash2, QrCode, ArrowDown } from "lucide-react";

export function ProblemVisualizer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Fade out problem, fade in solution
  const problemOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const solutionOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  
  const problemY = useTransform(scrollYProgress, [0, 0.4], [0, -50]);
  const solutionY = useTransform(scrollYProgress, [0.6, 1], [50, 0]);

  return (
    <section ref={containerRef} className="h-[300vh] bg-brand-midnight relative">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        
        {/* Center Guide indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-50 animate-bounce">
            <ArrowDown className="text-brand-cream/50" size={32} />
        </div>

        {/* Left Side: The Problem */}
        <motion.div 
          style={{ opacity: problemOpacity, y: problemY }}
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10"
        >
          <div className="w-32 h-32 bg-red-500/10 rounded-full flex items-center justify-center mb-12">
            <Trash2 className="text-red-500 w-16 h-16" />
          </div>
          <h2 className="text-6xl md:text-8xl font-serif text-brand-cream mb-8 tracking-tight">
            88% of paper cards <br/> are thrown away.
          </h2>
          <p className="text-2xl text-brand-cream/60 font-sans max-w-2xl">
            You're losing active leads before they even make it to the contact book. Stop printing money directly into the trash.
          </p>
        </motion.div>

        {/* Right Side: The Solution */}
        <motion.div 
          style={{ opacity: solutionOpacity, y: solutionY }}
          className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20"
        >
           <div className="w-32 h-32 bg-brand-turquoise/10 rounded-full flex items-center justify-center mb-12 shadow-soft-diffusion">
            <QrCode className="text-brand-turquoise w-16 h-16" />
          </div>
          <h2 className="text-6xl md:text-8xl font-serif text-brand-cream mb-8 tracking-tight">
            Instantly saved. <br/> <span className="text-brand-turquoise italic border-b-4 border-brand-turquoise">Forever.</span>
          </h2>
          <p className="text-2xl text-brand-cream/60 font-sans max-w-2xl">
            One tap is all it takes. Your entire professional identity is instantly mapped directly into their phone's native address book.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
