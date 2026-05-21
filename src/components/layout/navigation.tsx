"use client";

import { useEffect, useState } from "react";
import { Navbar1 } from "@/components/navbar1";
import { cn } from "@/lib/utils";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/constants";

const navSignInClassName =
  "rounded-full border-brand-midnight/20 bg-transparent px-6 text-sm font-medium text-brand-midnight shadow-none hover:bg-brand-midnight/5 hover:text-brand-midnight";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-100 flex h-[72px] items-center overflow-visible transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300",
        isScrolled
          ? "bg-brand-cream/80 backdrop-blur-2xl border-b border-brand-midnight/5 shadow-glass"
          : "bg-transparent border-b border-transparent"
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
