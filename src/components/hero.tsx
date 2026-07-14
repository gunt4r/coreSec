"use client";

import { motion } from "motion/react";
import { useLanguage } from "@/i18n/language-provider";
import { scrollTo } from "@/lib/scroll";
import { EASE } from "./fade-up";
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
  const { lang, t } = useLanguage();

  return (
    <section className="flex min-h-[100svh] flex-col overflow-hidden lg:flex-row">
      <div className="relative flex flex-1 flex-col justify-between px-6 pb-10 pt-24 md:px-10 md:pb-12 md:pt-28 lg:px-16 lg:pb-16 lg:pt-[148px] xl:px-24">
        <div className="absolute right-0 top-0 hidden h-full w-px bg-black/[0.06] lg:block" />

        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="block text-[11px] font-semibold uppercase tracking-[0.22em] text-forest"
        >
          {t.hero.eyebrow}
        </motion.span>

        <div className="py-6 lg:py-0">
          <h1
            key={lang}
            className="text-[52px] font-extrabold leading-[0.93] tracking-[-0.036em] text-ink sm:text-[64px] md:text-[76px] lg:text-[82px] xl:text-[96px]"
          >
            {t.hero.headline.split("\n").map((line, i) => (
              <motion.span
                key={line}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.65, delay: 0.1 + i * 0.1, ease: EASE }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h1>
        </div>

        <div>
          <div className="mb-6 h-px bg-black/[0.08] md:mb-8" />
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end lg:flex-col lg:items-start xl:flex-row xl:items-end md:gap-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease: EASE }}
              className="max-w-[420px] text-[15px] leading-[1.7] text-slate md:text-[17px]"
            >
              {t.hero.sub}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65, ease: EASE }}
              className="flex shrink-0 flex-col gap-3 xs:flex-row"
            >
              <button
                onClick={() => scrollTo("#contact")}
                className="whitespace-nowrap rounded-xl bg-forest px-6 py-3.5 text-[13.5px] font-semibold text-white transition-all duration-200 hover:bg-forest-dark hover:shadow-lg hover:shadow-forest/20 active:scale-[0.97]"
              >
                {t.hero.ctaPrimary}
              </button>
              <button
                onClick={() => scrollTo("#contact")}
                className="whitespace-nowrap rounded-xl border border-black/[0.13] px-6 py-3.5 text-[13.5px] font-semibold text-ink transition-all duration-200 hover:border-forest/40 hover:text-forest"
              >
                {t.hero.ctaSecondary}
              </button>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-5 text-[11.5px] tracking-wide text-mist"
          >
            {t.hero.detail}
          </motion.p>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: EASE }}
        className="relative hidden min-h-[100svh] w-[42%] items-center justify-center overflow-hidden bg-deep lg:flex xl:w-[44%]"
      >
        <IllustrationPanel />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative flex h-[220px] items-center justify-center overflow-hidden bg-deep sm:h-[260px] lg:hidden"
      >
        <IllustrationPanel />
      </motion.div>
    </section>
  );
}
