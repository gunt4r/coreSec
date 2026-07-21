"use client";

import { useLanguage } from "@/i18n/language-provider";
import { FadeUp, SectionHeading } from "./fade-up";

export function Objections() {
  const { t } = useLanguage();

  return (
    <section id="objections" className="bg-white py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-shell px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow={t.objections.eyebrow}
          headline={t.objections.headline}
          className="mbe-12 max-w-[41.25rem] md:mbe-16"
        />

        <div className="grid gap-x-16 gap-y-10 md:grid-cols-2 lg:gap-x-24">
          {t.objections.items.map((item, i) => (
            <FadeUp key={item.num} delay={0.05 * i}>
              <div className="border-t border-black/[0.09] pbs-6 md:pbs-8">
                <span className="text-eyebrow font-bold tracking-widest text-forest/45">
                  {item.num}
                </span>
                <h3 className="mbs-3 text-quote font-bold leading-[1.35] tracking-[-0.015em] text-ink">
                  {item.title}
                </h3>
                <p className="mbs-4 text-body leading-[1.75] text-graphite">{item.desc}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
