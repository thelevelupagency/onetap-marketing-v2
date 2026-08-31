"use client";

import { Suspense, useLayoutEffect, useMemo, useState } from "react";
import { Briefcase, Building2, BookOpen, Trophy, HelpCircle } from "lucide-react";
import { Navbar1 } from "@/components/navbar1";
import { LanguageSwitcher } from "@/components/marketing/language-switcher";
import { cn } from "@/lib/utils";
import { LOGIN_URL, SIGNUP_URL } from "@/lib/constants";
import { localizePath, type Locale } from "@/lib/i18n/config";
import type { ChromeCopy } from "@/content/en/chrome";

const navSignInClassName = "rounded-full px-6 text-sm font-medium";

type NavigationProps = {
  chrome: ChromeCopy;
  locale: Locale;
};

export function Navigation({ chrome, locale }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(true);

  useLayoutEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menu = useMemo(
    () => [
      { title: chrome.nav.home, url: localizePath("/", locale) },
      {
        title: chrome.nav.solutions,
        url: "#",
        items: [
          {
            title: chrome.nav.freelancers,
            description: chrome.nav.freelancersDescription,
            icon: <Briefcase className="size-5 shrink-0 text-brand-turquoise-dark" />,
            url: localizePath("/solutions/freelancers", locale),
          },
          {
            title: chrome.nav.agencies,
            description: chrome.nav.agenciesDescription,
            icon: <Building2 className="size-5 shrink-0 text-brand-turquoise-dark" />,
            url: localizePath("/solutions/agencies", locale),
          },
        ],
      },
      {
        title: chrome.nav.learn,
        url: "#",
        items: [
          {
            title: chrome.nav.blog,
            description: chrome.nav.blogDescription,
            icon: <BookOpen className="size-5 shrink-0 text-brand-turquoise-dark" />,
            url: localizePath("/blog", locale),
          },
          {
            title: chrome.nav.successStories,
            description: chrome.nav.successStoriesDescription,
            icon: <Trophy className="size-5 shrink-0 text-brand-turquoise-dark" />,
            url: `${localizePath("/blog", locale)}?category=success-stories`,
          },
          {
            title: chrome.nav.faq,
            description: chrome.nav.faqDescription,
            icon: <HelpCircle className="size-5 shrink-0 text-brand-turquoise-dark" />,
            url: localizePath("/faq", locale),
          },
        ],
      },
      { title: chrome.nav.pricing, url: localizePath("/pricing", locale) },
    ],
    [chrome, locale],
  );

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-100 flex h-[72px] items-center overflow-visible bg-brand-cream/80 backdrop-blur-2xl border-b border-brand-midnight/5 transition-shadow duration-300",
        isScrolled && "shadow-glass",
      )}
    >
      <Navbar1
        className="w-full"
        logo={{
          url: localizePath("/", locale),
          theme: "dark",
          alt: "OneTap",
          className: "h-9 w-auto",
        }}
        menu={menu}
        languageSwitcher={
          <Suspense fallback={null}>
            <LanguageSwitcher />
          </Suspense>
        }
        auth={{
          login: {
            title: chrome.nav.signIn,
            url: LOGIN_URL,
            className: navSignInClassName,
          },
          signup: {
            title: chrome.nav.getYourCard,
            url: SIGNUP_URL,
          },
        }}
      />
    </header>
  );
}
