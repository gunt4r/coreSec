"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/i18n/language-provider";
import { CASE_FILES } from "@/lib/cases";
import { hrefFor, hrefForCase } from "@/lib/routes";
import { FadeUp } from "./fade-up";
import { Footer } from "./footer";
import { Nav } from "./nav";

export function CaseIndex() {
  const { lang, t } = useLanguage();
  const { index, labels } = t.caseStudies;

  return (
    <>
      <Nav />
      <main className="bg-cream pbs-32 pbe-20 md:pbs-40 md:pbe-28">
        <div className="mx-auto max-w-shell px-6 md:px-10 lg:px-16">
          <FadeUp>
            <nav aria-label={labels.breadcrumb} className="mbe-6 flex items-center gap-2 text-meta text-slate">
              <Link href={hrefFor(lang)} className="transition-colors hover:text-forest">
                {t.nav.home}
              </Link>
              <span aria-hidden="true" className="text-mist">/</span>
              <span className="text-graphite">{labels.breadcrumb}</span>
            </nav>

            <h1 className="max-w-[41.25rem] text-h2 font-extrabold leading-[1.08] tracking-[-0.025em] text-ink">
              {index.heading}
            </h1>
            <p className="mbs-6 max-w-[45rem] text-lead leading-[1.7] text-slate">{index.intro}</p>
          </FadeUp>

          <div className="mbs-14 grid gap-8 md:mbs-16 md:grid-cols-2 lg:gap-10">
            {CASE_FILES.map((file, i) => {
              const card = t.cases.items[file.id];
              const study = t.caseStudies.items[file.id];
              return (
                <FadeUp key={file.id} delay={0.05 * i}>
                  <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.09] bg-white transition-all duration-200 hover:border-forest/30 hover:shadow-lg hover:shadow-forest/[0.06]">
                    <Link href={hrefForCase(lang, file.slug)} className="group flex h-full flex-col">
                      <Image
                        src={file.image}
                        alt={card.proof}
                        width={1280}
                        height={720}
                        sizes="(max-width: 48rem) 100vw, 40rem"
                        className="h-auto w-full border-b border-black/[0.07] object-cover"
                      />
                      <div className="flex flex-1 flex-col p-6 md:p-7">
                        <span className="text-eyebrow font-semibold uppercase tracking-[0.16em] text-forest/60">
                          {card.label} · {card.meta}
                        </span>
                        <h2 className="mbs-3 text-h3 font-bold leading-[1.25] tracking-[-0.02em] text-ink transition-colors group-hover:text-forest">
                          {study.heading}
                        </h2>
                        <p className="mbs-3 flex-1 text-body leading-[1.7] text-graphite">
                          {card.body}
                        </p>
                        <p className="mbs-5 text-micro font-semibold uppercase tracking-[0.06em] text-emerald">
                          {card.outcome}
                        </p>
                        <span className="mbs-4 text-meta font-semibold text-forest">
                          {labels.read} →
                        </span>
                      </div>
                    </Link>
                  </article>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp>
            <p className="mbs-10 max-w-[45rem] text-micro leading-[1.7] text-mist">
              {t.cases.disclaimer}
            </p>
          </FadeUp>
        </div>
      </main>
      <Footer />
    </>
  );
}
