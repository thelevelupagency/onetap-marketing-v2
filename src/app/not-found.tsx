import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-brand-cream px-6 text-center">
      <h1 className="font-display text-6xl md:text-8xl text-brand-midnight mb-4">404</h1>
      <p className="text-xl text-brand-midnight/70 mb-8 max-w-md">
        This page doesn&apos;t exist — but your next great connection is one tap away.
      </p>
      <Link href="/">
        <Button className="bg-brand-midnight text-brand-cream rounded-full px-8 h-12">Back to Home</Button>
      </Link>
    </div>
  );
}
