import type { Metadata } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTABanner } from "@/components/cta-banner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OneTap-Card | Your professional identity, one tap away",
  description: "A premium, web-first digital business card platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${instrumentSerif.variable} antialiased h-full`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Navigation />
        <div className="flex-1">
          {children}
        </div>
        <CTABanner />
        <Footer />
      </body>
    </html>
  );
}
