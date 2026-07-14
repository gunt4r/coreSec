"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { FadeUp, SectionHeading } from "./fade-up";

export function Faq() {
  const { t } = useLanguage();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="bg-cream py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-24 xl:gap-32">
          <SectionHeading
            eyebrow={t.faq.eyebrow}
            headline={t.faq.headline}
            className="lg:sticky lg:top-28 lg:self-start"
            headlineClassName="mb-8 text-[32px] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[40px] md:text-[44px] lg:mb-0"
          />

          <div className="border-t border-black/[0.08]">
            {t.faq.items.map((item, i) => {
              const expanded = open === i;
              return (
                <FadeUp key={item.q} delay={0.03 * i}>
                  <div className="border-b border-black/[0.08]">
                    <button
                      onClick={() => setOpen(expanded ? null : i)}
                      aria-expanded={expanded}
                      aria-controls={`faq-${i}`}
                      className="group flex w-full items-start justify-between gap-5 py-5 text-left md:py-6"
                    >
                      <span className="text-[14.5px] font-semibold leading-snug tracking-[-0.01em] text-ink transition-colors duration-200 group-hover:text-forest md:text-[15.5px]">
                        {item.q}
                      </span>
                      <ChevronDown
                        size={16}
                        aria-hidden="true"
                        className={`mt-1 shrink-0 transition-transform duration-300 ease-out ${
                          expanded ? "rotate-180 text-forest" : "text-mist group-hover:text-[#888]"
                        }`}
                      />
                    </button>
                    <div
                      id={`faq-${i}`}
                      className="grid overflow-hidden transition-[grid-template-rows] duration-400 ease-out"
                      style={{ gridTemplateRows: expanded ? "1fr" : "0fr" }}
                    >
                      <div className="min-h-0 overflow-hidden">
                        <p className="pb-6 text-[14px] leading-[1.75] text-graphite md:text-[14.5px]">
                          {item.a}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
