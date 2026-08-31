import { notFound } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { generateLocaleStaticParams } from "@/lib/i18n/locale-params";

export function generateStaticParams() {
  return generateLocaleStaticParams();
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) {
    notFound();
  }
  return children;
}
