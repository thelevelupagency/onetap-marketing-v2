import { redirect } from "next/navigation";
import { localizePath } from "@/lib/i18n/config";
import { resolveLocaleParam } from "@/lib/i18n/locale-params";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export default async function SolutionsPage({ params }: PageProps) {
  const locale = await resolveLocaleParam(params);
  redirect(localizePath("/solutions/freelancers", locale));
}
