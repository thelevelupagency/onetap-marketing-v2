import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IconBrandGithub, IconBrandTwitter, IconBrandLinkedin, IconBrandInstagram } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: "Solutions", href: "/solutions" },
      { name: "Pricing", href: "/pricing" },
      { name: "Features", href: "/#features" },
      { name: "Templates", href: "/templates" },
      { name: "Integrations", href: "/integrations" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press Kit", href: "/press" },
      { name: "Contact", href: "/contact" },
    ],
    resources: [
      { name: "Help Center", href: "/help" },
      { name: "FAQ", href: "/faq" },
      { name: "Community", href: "/community" },
      { name: "Terms", href: "/terms" },
      { name: "Privacy", href: "/privacy" },
    ],
  };

  return (
    <footer className="w-full bg-brand-midnight text-brand-cream pt-12 md:pt-24 pb-8 md:pb-12 overflow-hidden border-t border-white/5">
      <div className="container mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12 md:mb-16">
          {/* Logo and About */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 md:mb-6">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-turquoise rounded-full flex items-center justify-center font-serif text-brand-midnight text-xl md:text-2xl font-bold">
                O
              </div>
              <span className="font-serif text-2xl md:text-3xl tracking-tight text-white">OneTap</span>
            </Link>
            <p className="text-brand-cream/60 max-w-sm mb-6 md:mb-8 text-base md:text-lg leading-relaxed">
              Elevate your networking with professional digital business cards. Save contacts, capture leads, and grow your brand in one tap.
            </p>
            <div className="flex gap-5">
              <Link href="#" className="text-brand-cream/40 hover:text-brand-turquoise transition-colors">
                <IconBrandTwitter size={20} />
              </Link>
              <Link href="#" className="text-brand-cream/40 hover:text-brand-turquoise transition-colors">
                <IconBrandLinkedin size={20} />
              </Link>
              <Link href="#" className="text-brand-cream/40 hover:text-brand-turquoise transition-colors">
                <IconBrandInstagram size={20} />
              </Link>
              <Link href="#" className="text-brand-cream/40 hover:text-brand-turquoise transition-colors">
                <IconBrandGithub size={20} />
              </Link>
            </div>
          </div>

          {/* Links Sections - Compact 2-column grid on mobile */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:col-span-3 gap-8">
            <div>
              <h4 className="font-serif text-lg md:text-xl text-white mb-4 md:mb-6">Product</h4>
              <ul className="space-y-3 md:space-y-4 text-sm md:text-base">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-brand-cream/60 hover:text-brand-turquoise transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-serif text-lg md:text-xl text-white mb-4 md:mb-6">Company</h4>
              <ul className="space-y-3 md:space-y-4 text-sm md:text-base">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-brand-cream/60 hover:text-brand-turquoise transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h4 className="font-serif text-lg md:text-xl text-white mb-4 md:mb-6">Resources</h4>
              <ul className="space-y-3 md:space-y-4 text-sm md:text-base grid grid-cols-2 md:grid-cols-1">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-brand-cream/60 hover:text-brand-turquoise transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Newsletter Section - More compact on mobile */}
        <div className="border-y border-white/10 py-8 md:py-12 mb-8 md:mb-12 flex flex-col lg:flex-row justify-between items-center gap-6 md:gap-8">
            <div className="max-w-md text-center lg:text-left">
                <h3 className="font-serif text-xl md:text-2xl text-white mb-2">Join our newsletter</h3>
                <p className="text-brand-cream/60 text-sm md:text-base">Get the latest networking tips and product updates delivered to your inbox.</p>
            </div>
            <div className="w-full max-w-md flex flex-col sm:flex-row gap-3">
                <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-brand-cream/30 focus:outline-none focus:ring-2 focus:ring-brand-turquoise/50 transition-all text-sm"
                />
                <Button className="bg-brand-turquoise text-brand-midnight hover:bg-white transition-colors h-11 md:h-12 px-6 rounded-xl font-medium shadow-glass text-sm md:text-base">
                    Subscribe
                    <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
            </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-xs md:text-sm text-brand-cream/40 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-1">
            <span>© {currentYear} OneTap Card. All rights reserved.</span>
            <span className="hidden md:inline mx-2">•</span>
            <span className="italic">Built for modern professionals.</span>
          </div>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <Link href="/privacy" className="hover:text-brand-turquoise transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-brand-turquoise transition-colors">Terms</Link>
            <Link href="/security" className="hover:text-brand-turquoise transition-colors">Security</Link>
          </div>
        </div>
      </div>

      {/* Aesthetic blur effect */}
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-brand-turquoise/5 rounded-full blur-[120px] -z-10 translate-x-1/2 translate-y-1/2" />
    </footer>
  );
}
