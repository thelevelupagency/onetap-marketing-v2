"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Briefcase, Building2, HelpCircle, Menu, Trophy } from "lucide-react";
import { GetCardCta } from "@/components/marketing/get-card-cta";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { MarketingContainer } from "@/components/marketing/primitives";
import type { LogoTheme } from "@/lib/logos";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    theme?: LogoTheme;
    variant?: "icon" | "wordmark";
    alt?: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login?: {
      title: string;
      url: string;
      className?: string;
    };
    signup?: {
      title: string;
      url: string;
      className?: string;
    };
  };
}

function NavAnchor({
  href,
  className,
  children,
  onClick,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}

function LogoMark({
  logo,
}: {
  logo: NonNullable<Navbar1Props["logo"]>;
}) {
  return (
    <Logo
      href={logo.url}
      theme={logo.theme ?? "dark"}
      variant={logo.variant ?? "wordmark"}
      alt={logo.alt ?? "OneTap"}
      imageClassName={logo.className}
      priority
    />
  );
}

const Navbar1 = ({
  logo = {
    url: "/",
    theme: "dark",
    alt: "OneTap",
    className: "h-9 w-auto",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Solutions",
      url: "#",
      items: [
        {
          title: "Freelancers",
          description: "Stand out and capture leads on the go",
          icon: <Briefcase className="size-5 shrink-0 text-brand-turquoise-dark" />,
          url: "/solutions/freelancers",
        },
        {
          title: "Agencies",
          description: "Brand-locked cards for every team member",
          icon: <Building2 className="size-5 shrink-0 text-brand-turquoise-dark" />,
          url: "/solutions/agencies",
        },
      ],
    },
    {
      title: "Learn",
      url: "#",
      items: [
        {
          title: "Blog",
          description: "Tips, guides, and product updates",
          icon: <BookOpen className="size-5 shrink-0 text-brand-turquoise-dark" />,
          url: "/blog",
        },
        {
          title: "Success Stories",
          description: "See how professionals grow with OneTap",
          icon: <Trophy className="size-5 shrink-0 text-brand-turquoise-dark" />,
          url: "/blog?category=success-stories",
        },
        {
          title: "FAQ",
          description: "Answers to common questions",
          icon: <HelpCircle className="size-5 shrink-0 text-brand-turquoise-dark" />,
          url: "/faq",
        },
      ],
    },
    { title: "Pricing", url: "/pricing" },
  ],
  auth,
  className,
}: Navbar1Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const blurMenuFocus = () => {
    requestAnimationFrame(() => {
      const active = document.activeElement;
      if (active instanceof HTMLElement) {
        active.blur();
      }
    });
  };

  const closeDesktopMenu = () => {
    setOpenMenu(null);
    blurMenuFocus();
  };

  const handleMenuValueChange = (value: string | null) => {
    setOpenMenu(value);
    if (value === null) {
      blurMenuFocus();
    }
  };

  return (
    <section className={cn("py-0", className)}>
      <MarketingContainer width="full" className="h-[72px]">
        <nav className="hidden h-full grid-cols-[1fr_auto_1fr] items-center lg:grid">
          <div className="flex items-center justify-start">
            <LogoMark logo={logo} />
          </div>
          <div className="flex items-center justify-center overflow-visible">
            <NavigationMenu
              className="flex-none max-w-none overflow-visible"
              value={openMenu}
              onValueChange={handleMenuValueChange}
            >
              <NavigationMenuList>
                {menu.map((item) => renderMenuItem(item, closeDesktopMenu))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex shrink-0 items-center justify-end gap-2">
            {auth?.login?.title ? (
              <Button
                variant="brandOutline"
                size="sm"
                className={cn("h-8 rounded-full", auth.login.className)}
                render={<NavAnchor href={auth.login.url}>{auth.login.title}</NavAnchor>}
                nativeButton={false}
              />
            ) : null}
            {auth?.signup?.title ? (
              <GetCardCta
                href={auth.signup.url}
                size="nav"
                className={cn("shrink-0", auth.signup.className)}
              >
                {auth.signup.title}
              </GetCardCta>
            ) : null}
          </div>
        </nav>

        <div className="block h-full lg:hidden">
          <div className="flex h-full items-center justify-between gap-4">
            <LogoMark logo={logo} />
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 border-brand-midnight/10 text-brand-midnight"
                    aria-label="Open menu"
                  />
                }
              >
                <Menu className="size-4" />
              </SheetTrigger>
              <SheetContent
                showCloseButton
                className="z-110 flex h-full w-full max-w-none flex-col gap-0 overflow-hidden border-brand-midnight/10 bg-brand-cream p-0 sm:max-w-sm"
              >
                <SheetHeader className="shrink-0 border-b border-brand-midnight/10 px-4 py-4 pr-14">
                  <SheetTitle className="text-left font-normal">
                    <LogoMark logo={logo} />
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-1 flex-col gap-6 overflow-y-auto px-4 py-6">
                  <nav className="flex flex-col gap-4">
                    {menu.map((item) =>
                      item.items
                        ? renderMobileMenuItem(item, () => setMobileOpen(false))
                        : renderMobileNavLink(item, () => setMobileOpen(false))
                    )}
                  </nav>
                </div>

                {auth && (auth.login?.title || auth.signup?.title) ? (
                  <div className="flex shrink-0 flex-col gap-3 border-t border-brand-midnight/10 px-4 py-4">
                    {auth.login?.title ? (
                      <Button
                        variant="brandOutline"
                        className="h-12 w-full rounded-full text-base font-medium"
                        render={
                          <NavAnchor href={auth.login.url} onClick={() => setMobileOpen(false)}>
                            {auth.login.title}
                          </NavAnchor>
                        }
                        nativeButton={false}
                      />
                    ) : null}
                    {auth.signup?.title ? (
                      <GetCardCta
                        href={auth.signup.url}
                        size="mobileNav"
                        onClick={() => setMobileOpen(false)}
                        className={auth.signup.className}
                      >
                        {auth.signup.title}
                      </GetCardCta>
                    ) : null}
                  </div>
                ) : null}
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </MarketingContainer>
    </section>
  );
};

const renderMenuItem = (item: MenuItem, closeDesktopMenu: () => void) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} value={item.title}>
        <NavigationMenuTrigger
          className={cn(
            "text-brand-midnight/60 hover:text-brand-midnight",
            "bg-transparent hover:bg-transparent focus:bg-transparent",
            "data-open:bg-transparent data-popup-open:bg-transparent",
            "data-open:hover:bg-transparent data-popup-open:hover:bg-transparent",
            "focus-visible:ring-brand-navy/25"
          )}
        >
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-white text-brand-midnight border border-brand-midnight/10">
          {item.items.map((subItem) => (
            <NavigationMenuLink
              key={subItem.title}
              className="w-80"
              closeOnClick
              render={
                <SubMenuLink
                  item={subItem}
                  className="min-w-80"
                  onClick={closeDesktopMenu}
                />
              }
            />
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        closeOnClick
        className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-brand-midnight/60 transition-colors hover:bg-brand-cream hover:text-brand-midnight"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileNavLink = (item: MenuItem, onNavigate: () => void) => (
  <SheetClose
    key={item.title}
    render={
      <NavAnchor
        href={item.url}
        onClick={onNavigate}
        className="block py-1 text-base font-semibold text-brand-midnight"
      >
        {item.title}
      </NavAnchor>
    }
  />
);

const renderMobileMenuItem = (item: MenuItem, onNavigate: () => void) => {
  if (!item.items) return null;

  return (
    <Accordion key={item.title} className="w-full">
      <AccordionItem value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 text-base font-semibold text-brand-midnight hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 flex flex-col gap-1">
          {item.items.map((subItem) => (
            <SheetClose
              key={subItem.title}
              render={
                <SubMenuLink
                  item={subItem}
                  onClick={onNavigate}
                  className="w-full min-w-0 max-w-full"
                />
              }
            />
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

const SubMenuLink = ({
  item,
  className,
  onClick,
}: {
  item: MenuItem;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <NavAnchor
      href={item.url}
      onClick={onClick}
      className={cn(
        "flex min-w-0 flex-row gap-4 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none hover:bg-brand-cream hover:text-brand-midnight",
        className
      )}
    >
      <div>{item.icon}</div>
      <div>
        <div className="text-sm font-semibold text-brand-midnight">{item.title}</div>
        {item.description && (
          <p className="text-sm leading-snug text-brand-midnight/60">
            {item.description}
          </p>
        )}
      </div>
    </NavAnchor>
  );
};

export { Navbar1 };
