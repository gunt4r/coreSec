import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { SiteHome } from "@/components/site-home";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata("en");

export default function Home() {
  return (
    <>
      <JsonLd lang="en" />
      <SiteHome />
    </>
  );
}
