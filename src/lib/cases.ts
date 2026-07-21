export type CaseFile = {
  id: "appeal" | "withdrawal" | "manual_transfer" | "binance_withdrawal";
  image: string;
};

export const CASE_FILES: CaseFile[] = [
  { id: "appeal", image: "/cases/bybit-appeal-successful.jpg" },
  { id: "withdrawal", image: "/cases/bybit-withdrawal-released.jpg" },
  { id: "manual_transfer", image: "/cases/bybit-manual-transfer.jpg" },
  { id: "binance_withdrawal", image: "/cases/binance-withdrawal-submitted.jpg" },
];
