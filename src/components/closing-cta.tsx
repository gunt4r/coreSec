"use client";

import { useLanguage } from "@/i18n/language-provider";
import { scrollTo } from "@/lib/scroll";
import { FadeUp } from "./fade-up";

export function ClosingCta() {
  const { t } = useLanguage();

  return (
    <section className="bg-deep py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-shell px-6 md:px-10 lg:px-16">
        <FadeUp>
          <div className="mx-auto max-w-[46rem] text-center">
            <h2 className="text-h2-soft font-extrabold leading-[1.1] tracking-[-0.025em] text-white">
              {t.closing.headline}
            </h2>
            <p className="mbs-6 text-lead leading-[1.7] text-white/60">{t.closing.sub}</p>
            <button
              onClick={() => scrollTo("#contact")}
              className="mbs-10 rounded-xl bg-emerald px-8 py-4 text-body font-bold tracking-wide text-white transition-all duration-200 hover:bg-emerald/90 hover:shadow-lg hover:shadow-emerald/20 active:scale-[0.98]"
            >
              {t.closing.cta}
            </button>
            <p className="mbs-5 text-micro text-white/35">{t.closing.reassurance}</p>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
