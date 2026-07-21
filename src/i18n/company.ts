export type TeamMember = {
  name: string;
  role: string;
  background: string;
};

export const COMPANY = {
  legalName: "Coresec Finance Ltd",
  jurisdiction: "England and Wales, United Kingdom",
  registrationNumber: "13298452",
  foundedYear: "2021",
  team: [
    {
      name: "Andriy Kovalenko",
      role: "Founder & Lead Case Manager",
      background:
        "Former AML compliance analyst at a tier-1 exchange; has built source-of-funds and account-freeze appeals since 2019.",
    },
    {
      name: "Marina Sokolova",
      role: "Senior Case Manager, Chain Analysis",
      background:
        "Background in blockchain forensics; traces flagged deposits and assembles the evidence packages behind AML and KYC holds.",
    },
    {
      name: "James Whitfield",
      role: "Compliance Advisor",
      background:
        "Financial-services compliance consultant advising on regulatory review, escalation routes and exchange policy.",
    },
  ] as TeamMember[],

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
