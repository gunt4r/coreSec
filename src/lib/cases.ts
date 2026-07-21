import type { CaseSlug } from "@/lib/routes";

export type CaseId = "appeal" | "withdrawal" | "manual_transfer" | "binance_withdrawal";

export type CaseFile = {
  id: CaseId;
  slug: CaseSlug;
  image: string;
  exchange: string;
  publishedAt: string;
};

export const CASE_FILES: CaseFile[] = [
  {
    id: "appeal",
    slug: "bybit-abnormal-asset-origin-appeal",
    image: "/cases/bybit-appeal-successful.jpg",
    exchange: "Bybit",
    publishedAt: "",
  },
  {
    id: "withdrawal",
    slug: "bybit-withdrawal-compliance-hold",
    image: "/cases/bybit-withdrawal-released.jpg",
    exchange: "Bybit",
    publishedAt: "",
  },
  {
    id: "manual_transfer",
    slug: "bybit-manual-transfer-before-closure",
    image: "/cases/bybit-manual-transfer.jpg",
    exchange: "Bybit",
    publishedAt: "",
  },
  {
    id: "binance_withdrawal",
    slug: "binance-withdrawal-after-release",
    image: "/cases/binance-withdrawal-submitted.jpg",
    exchange: "Binance",
    publishedAt: "",
  },
];

export function caseBySlug(slug: string): CaseFile | undefined {
  return CASE_FILES.find((file) => file.slug === slug);
}
