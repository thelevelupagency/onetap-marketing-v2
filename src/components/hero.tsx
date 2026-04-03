"use client";

import React, { useState } from "react";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap } from "lucide-react";

export function Hero() {
  const [name, setName] = useState("");

  return (
    <div className="w-full bg-brand-cream dark:bg-[#0B0B0F] relative overflow-hidden">

      {/* Background gradients */}
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-brand-turquoise/20 rounded-full blur-3xl opacity-50 pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-brand-midnight/5 rounded-full blur-3xl opacity-50 pointer-events-none" />

      {/* Hero Text Content */}
      <div className="pt-32 md:pt-48 pb-16 md:pb-24 container mx-auto px-6 md:px-4 text-center relative z-10 flex flex-col items-center justify-center">
        <div className="inline-flex gap-2 items-center bg-brand-midnight/5 px-4 py-2 rounded-full border border-brand-midnight/10 w-fit mb-6 animate-in fade-in slide-in-from-top-4 duration-1000">
          <Zap size={16} className="text-brand-turquoise" />
          <span className="text-sm font-medium text-brand-midnight">No App Required</span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif tracking-tight text-brand-midnight leading-[1.1] mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
          Your professional identity, <br className="hidden sm:block" /> <span className="italic text-brand-turquoise">one tap away.</span>
        </h1>

        <p className="text-base md:text-xl text-brand-midnight/70 font-sans max-w-2xl mx-auto mb-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          Build your modern digital business card in 60 seconds. Claim your custom URL and never carry paper again.
        </p>

        {/* Claim Input */}
        <div className="flex items-center gap-0 bg-brand-midnight/5 border border-brand-midnight/10 rounded-full p-1.5 w-full max-w-sm mx-auto shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
          <span className="pl-3 md:pl-4 pr-1 text-xs md:text-sm text-brand-midnight/50 whitespace-nowrap font-sans">
            onetap.link/
          </span>
          <input
            type="text"
            placeholder="yourname"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-transparent text-brand-midnight font-sans text-xs md:text-sm outline-none placeholder:text-brand-midnight/30 min-w-0"
          />
          <Button className="bg-brand-midnight text-brand-cream hover:bg-brand-turquoise hover:text-brand-midnight rounded-full px-4 md:px-5 h-8 md:h-9 text-xs md:text-sm shrink-0 transition-colors shadow-soft-diffusion">
            Claim <ArrowRight size={14} className="ml-1" />
          </Button>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mt-8 w-full sm:w-auto px-4 sm:px-0 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <Button className="bg-brand-turquoise text-brand-midnight hover:bg-brand-turquoise/90 h-12 md:h-14 px-8 rounded-xl font-medium text-base md:text-lg shadow-soft-diffusion">
            Get Started for Free
          </Button>
          <Button variant="outline" className="bg-transparent border-brand-midnight/20 text-brand-midnight hover:bg-brand-midnight/5 h-12 md:h-14 px-8 rounded-xl font-medium text-base md:text-lg">
            Watch 30s Demo
          </Button>
        </div>
      </div>

      {/* Macbook Scroll Section */}
      <div className="w-full flex flex-col items-center mt-0">
        <MacbookScroll
          title={null}
          badge={
            <div className="h-8 w-8 md:h-10 md:w-10 -rotate-12 transform">
              <Badge />
            </div>
          }
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop"
          showGradient={true}
        />
      </div>
    </div>
  );
}

// Peerlist logo
const Badge = () => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
        fill="#00AA45"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M28 54C42.3594 54 54 42.3594 54 28C54 13.6406 42.3594 2 28 2C13.6406 2 2 13.6406 2 28C2 42.3594 13.6406 54 28 54ZM28 56C43.464 56 56 43.464 56 28C56 12.536 43.464 0 28 0C12.536 0 0 12.536 0 28C0 43.464 12.536 56 28 56Z"
        fill="#219653"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.0769 12H15V46H24.3846V38.8889H27.0769C34.7305 38.8889 41 32.9048 41 25.4444C41 17.984 34.7305 12 27.0769 12ZM24.3846 29.7778V21.1111H27.0769C29.6194 21.1111 31.6154 23.0864 31.6154 25.4444C31.6154 27.8024 29.6194 29.7778 27.0769 29.7778H24.3846Z"
        fill="#24292E"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18 11H29.0769C36.2141 11 42 16.5716 42 23.4444C42 30.3173 36.2141 35.8889 29.0769 35.8889H25.3846V43H18V11ZM25.3846 28.7778H29.0769C32.1357 28.7778 34.6154 26.39 34.6154 23.4444C34.6154 20.4989 32.1357 18.1111 29.0769 18.1111H25.3846V28.7778Z"
        fill="white"
      ></path>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 10H29.0769C36.7305 10 43 15.984 43 23.4444C43 30.9048 36.7305 36.8889 29.0769 36.8889H26.3846V44H17V10ZM19 12V42H24.3846V34.8889H29.0769C35.6978 34.8889 41 29.7298 41 23.4444C41 17.1591 35.6978 12 29.0769 12H19ZM24.3846 17.1111H29.0769C32.6521 17.1111 35.6154 19.9114 35.6154 23.4444C35.6154 26.9775 32.6521 29.7778 29.0769 29.7778H24.3846V17.1111ZM26.3846 19.1111V27.7778H29.0769C31.6194 27.7778 33.6154 25.8024 33.6154 23.4444C33.6154 21.0864 31.6194 19.1111 29.0769 19.1111H26.3846Z"
        fill="#24292E"
      ></path>
    </svg>
  );
};
