/**
 * Case files. `image` is the evidence screenshot shown in the lightbox; the copy for each
 * case lives in the dictionaries (`t.cases.items`) so it can be translated.
 *
 * Every claim in the copy must be true of the linked screenshot — this is the proof shown to
 * people deciding whether to trust us with a frozen account.
 */
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
