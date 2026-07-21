import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/case-detail";
import { JsonLd } from "@/components/json-ld";
import { caseBySlug } from "@/lib/cases";
import { CASE_SLUGS, isCaseSlug } from "@/lib/routes";
import { buildCaseMetadata } from "@/lib/seo";

export const dynamicParams = false;

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CASE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  if (!isCaseSlug(slug)) notFound();
  return buildCaseMetadata("en", slug);
}

export default async function CasePage({ params }: Params) {
  const { slug } = await params;
  const file = isCaseSlug(slug) ? caseBySlug(slug) : undefined;
  if (!file) notFound();

  return (
    <>
      <JsonLd lang="en" page="case" slug={file.slug} />
      <CaseDetail file={file} />
    </>
  );
}
