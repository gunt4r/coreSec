"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { CASE_FILES, type CaseFile } from "@/lib/cases";
import { hrefFor, hrefForCase, hrefForCases } from "@/lib/routes";
import { FadeUp } from "./fade-up";
import { Footer } from "./footer";
import { Nav } from "./nav";

function Lightbox({ src, alt, caption, onClose }: {
  src: string;
  alt: string;
  caption: string;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={caption}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black/85 p-4 backdrop-blur-sm md:p-10"
    >
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute end-4 inset-bs-4 rounded-full border border-white/20 p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white md:end-8 md:inset-bs-8"
      >
        <X size={20} />
      </button>
      <div onClick={(e) => e.stopPropagation()} className="max-h-full w-full max-w-5xl">
        <Image
          src={src}
          alt={alt}
          width={1280}
          height={720}
          className="h-auto max-h-[78vh] w-full rounded-xl object-contain shadow-2xl"
        />
        <p className="mbs-4 text-center text-meta leading-relaxed text-white/60">{caption}</p>
      </div>
    </div>
  );
}

export function CaseDetail({ file }: { file: CaseFile }) {
  const { lang, t } = useLanguage();
  const [zoomed, setZoomed] = useState(false);
  const close = useCallback(() => setZoomed(false), []);

  const card = t.cases.items[file.id];
  const study = t.caseStudies.items[file.id];
  const labels = t.caseStudies.labels;
  const related = CASE_FILES.filter((other) => other.id !== file.id);

  return (
    <>
      <Nav />
      <main className="bg-cream pbs-32 pbe-20 md:pbs-40 md:pbe-28">
        <article className="mx-auto max-w-[48rem] px-6 md:px-10">
          <FadeUp>
            <nav aria-label={labels.breadcrumb} className="mbe-6 flex flex-wrap items-center gap-2 text-meta text-slate">
              <Link href={hrefFor(lang)} className="transition-colors hover:text-forest">
                {t.nav.home}
              </Link>
              <span aria-hidden="true" className="text-mist">/</span>
              <Link href={hrefForCases(lang)} className="transition-colors hover:text-forest">
                {labels.breadcrumb}
              </Link>
            </nav>

            <h1 className="text-h2-soft font-extrabold leading-[1.12] tracking-[-0.025em] text-ink">
              {study.heading}
            </h1>
            <p className="mbs-6 text-lead leading-[1.7] text-slate">{study.intro}</p>
          </FadeUp>

          <FadeUp delay={0.05}>
            <dl className="mbs-10 grid gap-6 border-y border-black/[0.09] py-6 sm:grid-cols-3">
              <div>
                <dt className="text-eyebrow font-semibold uppercase tracking-[0.16em] text-mist">
                  {labels.exchange}
                </dt>
                <dd className="mbs-2 text-body font-bold text-ink">{card.label}</dd>
              </div>
              <div>
                <dt className="text-eyebrow font-semibold uppercase tracking-[0.16em] text-mist">
                  {labels.trigger}
                </dt>
                <dd className="mbs-2 text-body font-medium text-graphite">{card.meta}</dd>
              </div>
              <div>
                <dt className="text-eyebrow font-semibold uppercase tracking-[0.16em] text-mist">
                  {labels.outcome}
                </dt>
                <dd className="mbs-2 text-body font-bold text-forest">{card.outcome}</dd>
              </div>
            </dl>
          </FadeUp>

          {study.sections.map((section, i) => (
            <FadeUp key={section.title} delay={0.03 * i}>
              <section className="mbs-10">
                <h2 className="text-quote font-bold tracking-[-0.015em] text-ink">{section.title}</h2>
                <p className="mbs-4 text-body leading-[1.8] text-graphite">{section.body}</p>
              </section>
            </FadeUp>
          ))}

          <FadeUp>
            <section className="mbs-14">
              <h2 className="text-quote font-bold tracking-[-0.015em] text-ink">{labels.evidence}</h2>
              <button
                onClick={() => setZoomed(true)}
                className="group mbs-5 block w-full overflow-hidden rounded-2xl border border-black/[0.09] bg-white p-2 transition-colors hover:border-forest/35"
              >
                <Image
                  src={file.image}
                  alt={card.proof}
                  width={1280}
                  height={720}
                  sizes="(max-width: 48rem) 100vw, 44rem"
                  className="h-auto w-full rounded-xl object-contain"
                />
                <span className="mbs-3 flex items-center justify-center gap-1.5 pbe-2 text-micro font-semibold text-slate transition-colors group-hover:text-forest">
                  <ZoomIn size={13} />
                  {t.cases.view_proof}
                </span>
              </button>
              <p className="mbs-4 text-meta leading-[1.7] text-graphite">{card.proof}</p>
              <p className="mbs-6 text-micro leading-[1.7] text-mist">{t.cases.disclaimer}</p>
            </section>
          </FadeUp>

          <FadeUp>
            <section className="mbs-14 rounded-2xl bg-deep px-6 py-10 text-center md:px-10 md:py-12">
              <h2 className="text-h3 font-extrabold leading-tight tracking-[-0.02em] text-white">
                {t.caseStudies.cta.headline}
              </h2>
              <p className="mbs-4 text-body leading-[1.7] text-white/60">{t.caseStudies.cta.sub}</p>
              <Link
                href={`${hrefFor(lang)}#contact`}
                className="mbs-7 inline-block rounded-xl bg-emerald px-7 py-3.5 text-body font-bold text-white transition-all duration-200 hover:bg-emerald/90 active:scale-[0.98]"
              >
                {t.caseStudies.cta.button}
              </Link>
            </section>
          </FadeUp>

          <FadeUp>
            <section className="mbs-14 border-t border-black/[0.09] pbs-8">
              <h2 className="text-eyebrow font-semibold uppercase tracking-[0.16em] text-mist">
                {labels.related}
              </h2>
              <ul className="mbs-5 flex flex-col gap-4">
                {related.map((other) => (
                  <li key={other.id}>
                    <Link
                      href={hrefForCase(lang, other.slug)}
                      className="group flex flex-col gap-1 text-start"
                    >
                      <span className="text-body font-bold text-ink transition-colors group-hover:text-forest">
                        {t.caseStudies.items[other.id].heading}
                      </span>
                      <span className="text-meta text-graphite">
                        {t.cases.items[other.id].outcome}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href={hrefForCases(lang)}
                className="mbs-8 inline-block text-meta font-semibold text-forest transition-colors hover:text-forest-dark"
              >
                {labels.back} →
              </Link>
            </section>
          </FadeUp>
        </article>
      </main>
      <Footer />

      {zoomed && (
        <Lightbox src={file.image} alt={card.label} caption={card.proof} onClose={close} />
      )}
    </>
  );
}
