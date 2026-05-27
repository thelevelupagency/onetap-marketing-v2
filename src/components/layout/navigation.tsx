"use client";

import { useLayoutEffect, useState } from "react";
import { Navbar1 } from "@/components/navbar1";
import { cn } from "@/lib/utils";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/constants";

const navSignInClassName = "rounded-full px-6 text-sm font-medium";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(true);

  useLayoutEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-100 flex h-[72px] items-center overflow-visible bg-brand-cream/80 backdrop-blur-2xl border-b border-brand-midnight/5 transition-shadow duration-300",
        isScrolled && "shadow-glass"
      )}
    >
      <Navbar1
        className="w-full"
        logo={{
          url: "/",
          theme: "dark",
          alt: "OneTap",
          className: "h-9 w-auto",
        }}
        auth={{
          login: {
            title: "Sign in",
            url: LOGIN_URL,
            className: navSignInClassName,
          },
          signup: {
            title: "Get your card",
            url: SIGNUP_URL,
          },
        }}
      />
    </header>
  );
}
