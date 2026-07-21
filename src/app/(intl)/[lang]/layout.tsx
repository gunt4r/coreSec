import { notFound } from "next/navigation";
import { SiteShell } from "@/components/site-shell";
import { DEFAULT_LANG, SECONDARY_LANGS, isLang } from "@/i18n/langs";

export const dynamicParams = false;

export function generateStaticParams() {
  return SECONDARY_LANGS.map((lang) => ({ lang }));
}

export default async function LocalisedLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLang(lang) || lang === DEFAULT_LANG) notFound();

  return <SiteShell lang={lang}>{children}</SiteShell>;
}
