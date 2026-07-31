import type { Metadata } from "next";
import { ThankYou } from "@/components/thank-you";
import { buildThankYouMetadata } from "@/lib/seo";

export const metadata: Metadata = buildThankYouMetadata("en");

export default function ThankYouPage() {
  return <ThankYou />;
}
