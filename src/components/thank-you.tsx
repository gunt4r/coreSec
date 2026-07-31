"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/i18n/language-provider";
import { fireLeadIfPending, hasLeadPending } from "./facebook-pixel";
import { FadeUp } from "./fade-up";
import { Footer } from "./footer";
import { Nav } from "./nav";
import { hrefFor, hrefForCases } from "@/lib/routes";

export function ThankYou() {
  const { lang, t } = useLanguage();
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const decided = useRef(false);

  useEffect(() => {
    if (decided.current) return;
    decided.current = true;

    if (hasLeadPending()) {
      setAllowed(true);
      fireLeadIfPending();
    } else {
      router.replace(hrefFor(lang));
    }
  }, [lang, router]);

  if (!allowed) return null;

  return (
    <>
      <Nav />
      <main className="flex min-h-[70vh] items-center bg-cream pbs-32 pbe-20 md:pbs-40 md:pbe-32">
        <div className="mx-auto w-full max-w-[42rem] px-6 text-center md:px-10">
          <FadeUp>
            <div className="mx-auto mbe-8 flex h-16 w-16 items-center justify-center rounded-full bg-mint">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 12L10 18L20 6"
                  stroke="#0F5D46"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="mbe-4 text-eyebrow font-semibold uppercase tracking-[0.14em] text-forest">
              {t.thankYou.eyebrow}
            </p>
            <h1 className="text-h2 font-extrabold leading-[1.1] tracking-[-0.025em] text-ink">
              {t.thankYou.heading}
            </h1>
            <p className="mx-auto mbs-6 max-w-[34rem] text-lead leading-[1.7] text-slate">
              {t.thankYou.body}
            </p>
            <p className="mx-auto mbs-4 max-w-[34rem] text-body leading-[1.7] text-graphite">
              {t.thankYou.detail}
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <div className="mbs-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href={hrefFor(lang)}
                className="w-full rounded-xl bg-forest px-8 py-[1.125rem] text-[0.875rem] font-bold tracking-wide text-white transition-all duration-200 hover:bg-forest-dark hover:shadow-lg hover:shadow-forest/20 active:scale-[0.995] sm:w-auto"
              >
                {t.thankYou.cta}
              </Link>
              <Link
                href={hrefForCases(lang)}
                className="text-meta font-semibold text-forest transition-colors duration-200 hover:text-forest-dark"
              >
                {t.thankYou.casesCta} →
              </Link>
            </div>
          </FadeUp>
        </div>
      </main>
      <Footer />
    </>
  );
}
