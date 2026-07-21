import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/case-detail";
import { JsonLd } from "@/components/json-ld";
import { DEFAULT_LANG, SECONDARY_LANGS, isLang } from "@/i18n/langs";
import { caseBySlug } from "@/lib/cases";
import { CASE_SLUGS, isCaseSlug } from "@/lib/routes";
import { buildCaseMetadata } from "@/lib/seo";

export const dynamicParams = false;

type Params = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return SECONDARY_LANGS.flatMap((lang) => CASE_SLUGS.map((slug) => ({ lang, slug })));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, slug } = await params;
  if (!isLang(lang) || lang === DEFAULT_LANG || !isCaseSlug(slug)) notFound();
  return buildCaseMetadata(lang, slug);
}

export default async function CasePage({ params }: Params) {
  const { lang, slug } = await params;
  if (!isLang(lang) || lang === DEFAULT_LANG) notFound();
  const file = isCaseSlug(slug) ? caseBySlug(slug) : undefined;
  if (!file) notFound();

  return (
    <>
      <JsonLd lang={lang} page="case" slug={file.slug} />
      <CaseDetail file={file} />
    </>
  );
}
