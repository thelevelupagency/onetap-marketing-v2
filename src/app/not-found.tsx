import { GetCardCta } from "@/components/marketing/get-card-cta";
import { type as typography } from "@/lib/typography";

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-brand-cream px-4 text-center md:px-8">
      <h1 className={`${typography.displayError} mb-4`}>404</h1>
      <p className={`${typography.lead} mb-8 max-w-md`}>
        This page doesn&apos;t exist — but your next great connection is one tap away.
      </p>
      <GetCardCta href="/" size="sm">
        Back to Home
      </GetCardCta>
    </div>
  );
}
