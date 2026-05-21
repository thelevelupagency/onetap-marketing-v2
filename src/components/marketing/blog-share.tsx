"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";
import { IconBrandLinkedin, IconBrandTwitter } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function BlogShare({
  title,
  slug,
  label = "Share",
}: {
  title: string;
  slug: string;
  label?: string;
}) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `https://onetap-card.com/blog/${slug}`;

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const shareLinks = [
    {
      label: "LinkedIn",
      icon: IconBrandLinkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
    {
      label: "X",
      icon: IconBrandTwitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      label: "WhatsApp",
      icon: null,
      href: `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
    },
  ];

  const buttonClass =
    "rounded-full border-brand-midnight/10 h-9 px-3 gap-1.5 inline-flex items-center";

  return (
    <div className="flex flex-wrap items-center gap-2" role="group" aria-label={label}>
      <span className="text-sm font-medium text-brand-midnight/60 mr-1 shrink-0">{label}</span>
      {shareLinks.map((s) => (
        <a
          key={s.label}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${s.label}`}
          className="inline-flex shrink-0"
        >
          <Button variant="outline" size="sm" className={buttonClass}>
            {s.icon ? <s.icon className="w-4 h-4" /> : <span className="text-xs font-bold">WA</span>}
            <span className="text-xs hidden sm:inline">{s.label}</span>
          </Button>
        </a>
      ))}
      <Button variant="outline" size="sm" className={buttonClass} onClick={copyLink}>
        {copied ? <Check className="w-4 h-4 text-brand-turquoise" /> : <Link2 className="w-4 h-4" />}
        <span className="text-xs">{copied ? "Copied!" : "Copy Link"}</span>
      </Button>
    </div>
  );
}
