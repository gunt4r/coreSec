"use client";

import { useLanguage } from "@/i18n/language-provider";
import { scrollTo } from "@/lib/scroll";
import { HeroIllustration } from "./hero-illustration";

function IllustrationPanel() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-forest/[0.12] via-transparent to-deep" />
      <div className="relative z-10 h-full w-full animate-float-y p-8 py-4 lg:p-10 xl:p-14">
        <HeroIllustration />
      </div>
    </>
  );
}

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className="flex min-h-[100svh] flex-col overflow-hidden lg:flex-row">
      <div className="relative flex flex-1 flex-col justify-between px-6 pbe-10 pbs-24 md:px-10 md:pbe-12 md:pbs-28 lg:px-16 lg:pbe-16 lg:pbs-[9.25rem] xl:px-24">
        <div className="absolute end-0 inset-bs-0 hidden h-full w-px bg-black/[0.06] lg:block" />

        <span className="block animate-fade-in text-eyebrow font-semibold uppercase tracking-[0.22em] text-forest">
          {t.hero.eyebrow}
        </span>

        <div className="py-6 lg:py-0">
          <h1 className="text-display font-extrabold leading-[0.93] tracking-[-0.036em] text-ink">
            {t.hero.headline.split("\n").map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
        </div>

        <div>
          <div className="mbe-6 h-px bg-black/[0.08] md:mbe-8" />
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:flex-col lg:items-start xl:flex-row xl:items-end md:gap-8">
            <p className="max-w-[26.25rem] animate-fade-rise text-lead leading-[1.7] text-slate [animation-delay:0.15s]">
              {t.hero.sub}
            </p>

            <div className="flex shrink-0 animate-fade-rise flex-col gap-3 [animation-delay:0.25s] xs:flex-row">
              <button
                onClick={() => scrollTo("#contact")}
                className="whitespace-nowrap rounded-xl bg-forest px-6 py-3.5 text-[0.84375rem] font-semibold text-white transition-all duration-200 hover:bg-forest-dark hover:shadow-lg hover:shadow-forest/20 active:scale-[0.97]"
              >
                {t.hero.ctaPrimary}
              </button>
              <button
                onClick={() => scrollTo("#cases")}
                className="whitespace-nowrap rounded-xl border border-black/[0.13] px-6 py-3.5 text-[0.84375rem] font-semibold text-ink transition-all duration-200 hover:border-forest/40 hover:text-forest"
              >
                {t.hero.ctaSecondary}
              </button>
            </div>
          </div>

          <p className="mbs-5 animate-fade-in text-[0.71875rem] tracking-wide text-mist [animation-delay:0.4s]">
            {t.hero.detail}
          </p>
        </div>
      </div>

      <div className="relative hidden min-h-[100svh] w-[42%] animate-slide-in items-center justify-center overflow-hidden bg-deep [animation-delay:0.1s] lg:flex xl:w-[44%]">
        <IllustrationPanel />
      </div>

      <div className="relative flex h-[13.75rem] animate-fade-in items-center justify-center overflow-hidden bg-deep [animation-delay:0.2s] sm:h-[16.25rem] lg:hidden">
        <IllustrationPanel />
      </div>
    </section>
  );
}
