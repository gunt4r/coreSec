import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseIndex } from "@/components/case-index";
import { JsonLd } from "@/components/json-ld";
import { DEFAULT_LANG, isLang } from "@/i18n/langs";
import { buildCasesMetadata } from "@/lib/seo";

type Params = { params: Promise<{ lang: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang } = await params;
  if (!isLang(lang) || lang === DEFAULT_LANG) notFound();
  return buildCasesMetadata(lang);
}

export default async function CasesPage({ params }: Params) {
  const { lang } = await params;
  if (!isLang(lang) || lang === DEFAULT_LANG) notFound();

  return (
    <>
      <JsonLd lang={lang} page="cases" />
      <CaseIndex />
    </>
  );
}
