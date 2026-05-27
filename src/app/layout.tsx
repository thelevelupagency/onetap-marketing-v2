import type { Metadata } from "next";
import { Montserrat, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import { Navigation } from "@/components/layout/navigation";
import { Footer } from "@/components/layout/footer";
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

export const metadata: Metadata = {
  title: "OneTap-Card | Your professional identity, one tap away",
  description: "A premium, web-first digital business card platform.",
  icons: {
    icon: "/logos/onetap_logo.png",
    apple: "/logos/onetap_logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${plusJakarta.variable} ${montserrat.variable} antialiased`}
    >
      <body className="min-h-svh flex flex-col font-sans bg-brand-cream overflow-x-clip">
        <Navigation />
        <div className="flex-1">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
