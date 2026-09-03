"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocale } from "@/components/providers/locale-provider";
import { getChrome } from "@/content/get-content";

interface ContentSearchProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function ContentSearch({
  value,
  onChange,
  placeholder,
  className,
}: ContentSearchProps) {
  const locale = useLocale();
  const chrome = getChrome(locale);
  const resolvedPlaceholder = placeholder ?? chrome.search.defaultPlaceholder;

  return (
    <div className={className ?? "relative max-w-md mx-auto w-full"}>
      <Search className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-midnight/40 pointer-events-none" />
      <Input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={resolvedPlaceholder}
        aria-label={resolvedPlaceholder}
        className="h-11 w-full ps-11 pe-4 rounded-2xl border-brand-midnight/10 bg-white text-brand-midnight shadow-sm focus-visible:ring-brand-turquoise/30"
      />
    </div>
  );
}
