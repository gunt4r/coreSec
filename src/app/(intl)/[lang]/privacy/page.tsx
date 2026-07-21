import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { LegalPage } from "@/components/legal-page";
import { DEFAULT_LANG, isLang } from "@/i18n/langs";
import { buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang) || lang === DEFAULT_LANG) notFound();
  return buildMetadata(lang, "privacy");
}

export default async function Privacy({ params }: Params) {
  const { lang } = await params;
  if (!isLang(lang) || lang === DEFAULT_LANG) notFound();
  return (
    <>
      <JsonLd lang={lang} page="privacy" />
      <LegalPage page="privacy" />
    </>
  );
}
