import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { SiteHome } from "@/components/site-home";
import { DEFAULT_LANG, isLang } from "@/i18n/langs";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang) || lang === DEFAULT_LANG) notFound();
  return buildMetadata(lang);
}

export default async function LocalisedHome({ params }: Params) {
  const { lang } = await params;
  if (!isLang(lang) || lang === DEFAULT_LANG) notFound();

  return (
    <>
      <JsonLd lang={lang} />
      <SiteHome />
    </>
  );
}
