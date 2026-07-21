import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("en", "terms");

export default function Terms() {
  return (
    <>
      <JsonLd lang="en" page="terms" />
      <LegalPage page="terms" />
    </>
  );
}
