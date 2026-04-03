import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-brand-midnight text-brand-cream border-t border-white/10 pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-brand-turquoise rounded-full flex items-center justify-center font-serif text-brand-midnight text-xl font-bold">
                O
              </div>
              <span className="font-serif text-2xl tracking-tight text-brand-cream">
                OneTap
              </span>
            </Link>
            <div className="max-w-md">
              <p className="text-white/60 mb-6 leading-relaxed">
                We believe in reducing waste while improving connections. 
                Our platform eliminates the need for paper business cards, 
                saving trees and helping professionals network sustainably.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-turquoise/10 rounded-full border border-brand-turquoise/20 text-brand-turquoise text-sm font-medium">
                <Zap size={16} /> Eco-friendly networking
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white text-lg">Product</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-brand-turquoise hover:underline">Features</Link></li>
              <li><Link href="#pricing" className="text-brand-turquoise hover:underline">Pricing</Link></li>
              <li><Link href="#" className="text-brand-turquoise hover:underline">Integration</Link></li>
              <li><Link href="#" className="text-brand-turquoise hover:underline">Enterprise</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white text-lg">Company</h4>
            <ul className="space-y-4">
              <li><Link href="#" className="text-brand-turquoise hover:underline">About</Link></li>
              <li><Link href="#" className="text-brand-turquoise hover:underline">Support</Link></li>
              <li><Link href="#" className="text-brand-turquoise hover:underline">Privacy Policy</Link></li>
              <li><Link href="#" className="text-brand-turquoise hover:underline">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
          <p>© {new Date().getFullYear()} OneTap Inc. All rights reserved.</p>
          <p>Designed with a Tech-Organic approach.</p>
        </div>
      </div>
    </footer>
  );
}
