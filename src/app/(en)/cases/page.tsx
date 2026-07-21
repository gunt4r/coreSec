import type { Metadata } from "next";
import { CaseIndex } from "@/components/case-index";
import { JsonLd } from "@/components/json-ld";
import { buildCasesMetadata } from "@/lib/seo";

export const metadata: Metadata = buildCasesMetadata("en");

export default function CasesPage() {
  return (
    <>
      <JsonLd lang="en" page="cases" />
      <CaseIndex />
    </>
  );
}
