"use client";

import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-svh flex-col items-center justify-center bg-brand-cream px-4 text-center font-sans text-brand-midnight antialiased">
        <main className="mx-auto max-w-md space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">Something went wrong</h1>
          <p className="text-base text-brand-midnight/70">
            An unexpected error occurred. Please reload the page to continue.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-11 cursor-pointer items-center justify-center rounded-full bg-brand-navy px-6 text-sm font-medium text-white transition-colors hover:bg-brand-midnight"
          >
            Reload page
          </button>
        </main>
      </body>
    </html>
  );
}
