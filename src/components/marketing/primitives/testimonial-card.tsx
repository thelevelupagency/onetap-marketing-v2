"use client";

import React from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { type as typography } from "@/lib/typography";
import type { MarketingTestimonial } from "@/content/marketing-copy-types";

export interface TestimonialCardProps {
  testimonial: MarketingTestimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  const ratingCount = testimonial.rating ?? 5;

  return (
    <div
      className={cn(
        "group relative flex self-stretch w-[260px] shrink-0 flex-col items-center text-center sm:w-[300px] md:w-[320px]",
        "pt-6 sm:pt-7", // Extra top padding for protruding floating avatar
        className
      )}
    >
      {/* Floating Top-Center Avatar Logo Placeholder (Figma UI Card 9 Signature) */}
      <div className="absolute top-0 z-10 flex size-12 items-center justify-center overflow-hidden rounded-full bg-white ring-4 ring-white shadow-md transition-transform duration-300 group-hover:scale-105 sm:size-14">
        <Image
          src={testimonial.avatar}
          alt={testimonial.name}
          fill
          sizes="(max-width: 640px) 48px, 56px"
          className="object-contain opacity-100 p-2 sm:p-2.5"
          unoptimized
        />
      </div>

      {/* Main Card Body */}
      <div
        className={cn(
          "flex flex-1 w-full min-h-[200px] sm:min-h-[220px] flex-col items-center justify-between rounded-xl border-2 border-brand-turquoise/40 bg-white p-4 pt-8 shadow-sm transition-all duration-200 sm:rounded-2xl sm:p-5 sm:pt-9",
          "hover:border-primary hover:shadow-md"
        )}
      >
        {/* Headline Quote */}
        <h4 className={cn(typography.cardTitle, "mb-1.5 text-sm font-bold tracking-tight text-brand-midnight sm:text-base")}>
          &ldquo;{testimonial.headline || testimonial.name}&rdquo;
        </h4>

        {/* Content Body */}
        <p className={cn(typography.bodySm, "mb-3 flex-1 text-xs leading-relaxed text-brand-midnight/70 sm:text-sm")}>
          {testimonial.content}
        </p>

        {/* Author Details */}
        <div className="mt-auto mb-2.5 text-center">
          <p className={cn(typography.label, "text-xs font-semibold text-brand-midnight")}>
            {testimonial.name}
          </p>
          <p className={cn(typography.caption, "text-[11px] text-brand-midnight/50")}>
            {testimonial.role}
          </p>
        </div>

        {/* Rating Stars (5 Gold Stars) */}
        <div className="flex items-center justify-center gap-1" aria-label={`Rating: ${ratingCount} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "size-3.5 transition-transform duration-200 group-hover:scale-110",
                i < ratingCount
                  ? "fill-amber-400 text-amber-400"
                  : "fill-brand-midnight/10 text-brand-midnight/10"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
