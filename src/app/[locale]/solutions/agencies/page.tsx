import type { Metadata } from "next";
import { PageShell } from "@/components/marketing/primitives";
import { AgenciesSolutionSections } from "@/components/marketing/solutions/agencies-solution-sections";
import { getChrome } from "@/content/get-content";
import { buildLocaleMetadata } from "@/lib/i18n/metadata";
import { resolveLocaleParam } from "@/lib/i18n/locale-params";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = await resolveLocaleParam(params);
  const chrome = getChrome(locale);
  return buildLocaleMetadata({
    locale,
    title: chrome.metadata.agenciesTitle,
    description: chrome.metadata.agenciesDescription,
    path: "/solutions/agencies",
  });
}

export default async function AgenciesPage({ params }: PageProps) {
  const locale = await resolveLocaleParam(params);
  return (
    <PageShell offsetTop="none" pageBottom="none" className="bg-brand-cream">
      <AgenciesSolutionSections locale={locale} />
    </PageShell>
  );
}
