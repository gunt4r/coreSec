"use client";

import { COMPANY, formatUsdt } from "@/i18n/company";
import { useLanguage } from "@/i18n/language-provider";
import { FadeUp } from "./fade-up";

export function ProofStrip() {
  const { lang, t } = useLanguage();

  const stats = [
    {
      value: formatUsdt(COMPANY.evidencedRecoveredUsdt, lang),
      label: t.proof.recovered,
      note: t.proof.recovered_note,
    },
    {
      value: String(COMPANY.exchanges.length),
      label: t.proof.exchanges,
      note: t.proof.exchanges_note,
    },
    {
      value: String(COMPANY.documentedCases),
      label: t.proof.evidence,
      note: t.proof.evidence_note,
    },
    {
      value: `${COMPANY.responseWindowHours}h`,
      label: t.proof.response,
      note: t.proof.response_note,
    },
  ];

  return (
    <section className="border-b border-black/[0.07] bg-white">
      <div className="mx-auto max-w-shell px-6 py-10 md:px-10 md:py-12 lg:px-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={0.05 * i}>
              <p className="text-h2-tight font-extrabold leading-none tracking-[-0.03em] text-forest">
                {stat.value}
              </p>
              <p className="mbs-3 text-eyebrow font-semibold uppercase tracking-[0.14em] text-ink">
                {stat.label}
              </p>
              <p className="mbs-2 text-meta leading-[1.6] text-graphite">{stat.note}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
