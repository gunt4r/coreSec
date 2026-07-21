export type TeamMember = {
  name: string;
  role: string;
  background: string;
};

export const COMPANY = {
  legalName: "",
  jurisdiction: "",
  registrationNumber: "",
  foundedYear: "",
  team: [] as TeamMember[],

  evidencedRecoveredUsdt: 220_711,
  documentedCases: 4,
  responseWindowHours: 24,
  exchanges: ["Binance", "Bybit", "Coinbase", "Kraken", "OKX", "KuCoin"],
} as const;

export function hasIdentity(): boolean {
  return Boolean(COMPANY.legalName && COMPANY.jurisdiction);
}

export function formatUsdt(value: number, lang: string): string {
  return new Intl.NumberFormat(lang === "en" ? "en-US" : lang).format(value);
}
