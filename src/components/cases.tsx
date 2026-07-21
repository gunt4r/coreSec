"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { CASE_FILES } from "@/lib/cases";
import { hrefForCase, hrefForCases } from "@/lib/routes";
import { FadeUp, SectionHeading } from "./fade-up";

export function Cases() {
  const { lang, t } = useLanguage();

  return (
    <section id="cases" className="bg-deep py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-shell px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow={t.cases.eyebrow}
          headline={t.cases.headline}
          dark
          className="max-w-[41.25rem]"
          headlineClassName="pbs-5 text-h2-soft font-bold leading-[1.22] tracking-[-0.02em] text-white"
        />
        <FadeUp delay={0.1}>
          <p className="mbs-5 max-w-[38.75rem] text-lead leading-[1.7] text-white/55">
            {t.cases.sub}
          </p>
        </FadeUp>

        <div className="mbs-12 grid gap-x-16 md:mbs-16 md:grid-cols-2">
          {CASE_FILES.map((file, i) => {
            const copy = t.cases.items[file.id];
            const initials = String(i + 1).padStart(2, "0");
            return (
              <FadeUp key={file.id} delay={0.05 * i}>
                <Link
                  href={hrefForCase(lang, file.slug)}
                  className="group flex w-full flex-col items-start border-t border-white/[0.08] py-10 text-start"
                >
                  <p className="text-quote leading-[1.6] tracking-[-0.01em] text-white/90">
                    {copy.body}
                  </p>

                  <div className="mbs-6 flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest text-meta font-bold tracking-wider text-white">
                      {initials}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[0.875rem] font-bold text-white">{copy.label}</span>
                      <span className="mbs-0.5 text-[0.78125rem] text-white/50">{copy.meta}</span>
                    </span>
                  </div>

                  <p className="mbs-4 text-micro font-semibold uppercase tracking-[0.06em] text-emerald">
                    {copy.outcome}
                  </p>

                  <span className="mbs-4 inline-flex items-center gap-1.5 text-micro font-semibold text-white/45 transition-colors group-hover:text-emerald">
                    <span className="border-b border-transparent group-hover:border-emerald/40">
                      {t.caseStudies.labels.read}
                    </span>
                    <ArrowRight size={13} aria-hidden="true" />
                  </span>
                </Link>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp>
          <Link
            href={hrefForCases(lang)}
            className="mbs-10 inline-flex items-center gap-2 rounded-xl border border-white/[0.18] px-6 py-3.5 text-[0.84375rem] font-semibold text-white transition-all duration-200 hover:border-emerald/50 hover:text-emerald"
          >
            {t.caseStudies.labels.back}
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
          <p className="mbs-8 max-w-[45rem] text-[0.78125rem] leading-relaxed text-white/35">
            {t.cases.disclaimer}
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
