import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("en", "privacy");

export default function Privacy() {
  return (
    <>
      <JsonLd lang="en" page="privacy" />
      <LegalPage page="privacy" />
    </>
  );
}
