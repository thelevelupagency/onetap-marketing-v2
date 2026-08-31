import type { Metadata } from "next";
import { Assistant, Montserrat, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { headers } from "next/headers";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
import { BackNavigationReloadScript } from "@/components/providers/back-navigation-reload-script";
import { MarketingConsentProvider } from "@/components/providers/consent-provider";
import { CookieConsentBanner } from "@/components/providers/cookie-consent-banner";
import { AttributionCapture } from "@/components/providers/attribution-capture";
import { MetaPixelBootstrap } from "@/components/providers/meta-pixel-bootstrap";
import { LocaleProvider } from "@/components/providers/locale-provider";
import { MetaPixel } from "@/components/providers/meta-pixel";
import { getChrome } from "@/content/get-content";
import {
  DEFAULT_LOCALE,
  LOCALE_META,
  parseLocale,
  type Locale,
} from "@/lib/i18n/config";
import { LOCALE_HEADER } from "@/lib/i18n/locale-header";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "700"],
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: "700",
});

const assistant = Assistant({
  variable: "--font-hebrew",
  subsets: ["hebrew", "latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: "OneTap-Card | Your professional identity, one tap away",
  description: "A premium, web-first digital business card platform.",
  icons: {
    icon: [{ url: "/logos/onetap_logo.png", type: "image/png" }],
    apple: [{ url: "/logos/onetap_logo.png", type: "image/png" }],
    shortcut: "/logos/onetap_logo.png",
  },
};

async function readRequestLocale(): Promise<Locale> {
  const headerStore = await headers();
  return parseLocale(headerStore.get(LOCALE_HEADER) ?? DEFAULT_LOCALE);
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await readRequestLocale();
  const meta = LOCALE_META[locale];
  const chrome = getChrome(locale);

  return (
    <html
      lang={meta.htmlLang}
      dir={meta.dir}
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${montserrat.variable} ${assistant.variable} antialiased`}
    >
      <body className="min-h-svh flex flex-col font-sans bg-brand-cream overflow-x-clip">
        <MetaPixelBootstrap />
        <LocaleProvider locale={locale}>
          <MarketingConsentProvider>
            <AttributionCapture />
            <BackNavigationReloadScript />
            <MetaPixel />
            <Navigation chrome={chrome} locale={locale} />
            <div className="flex-1">{children}</div>
            <Footer />
            <CookieConsentBanner />
          </MarketingConsentProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
