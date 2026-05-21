"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface ContentSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function ContentSearch({
  value,
  onChange,
  placeholder = "Search...",
  className,
}: ContentSearchProps) {
  return (
    <div className={className ?? "relative max-w-md mx-auto w-full"}>
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-midnight/40 pointer-events-none" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        className="h-11 w-full pl-11 pr-4 rounded-2xl border-brand-midnight/10 bg-white text-brand-midnight shadow-sm focus-visible:ring-brand-turquoise/30"
      />
    </div>
  );
}
