"use client";

import { useLanguage } from "@/i18n/language-provider";
import { FadeUp, SectionHeading, useInView } from "./fade-up";
import type { Feature } from "./feature-rows";

function StepBadge({ num }: { num: string }) {
  return (
    <span className="text-eyebrow font-bold tracking-widest text-forest">{num}</span>
  );
}

function HorizontalTimeline({ steps }: { steps: readonly Feature[] }) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div ref={ref} className={`relative${inView ? " reveal-shown" : ""}`}>
      <div className="absolute inset-x-0 inset-bs-[1.875rem] h-px bg-black/[0.07]">
        <div className="reveal-line h-full bg-forest/25" />
      </div>

      <div className="relative grid grid-cols-6 gap-3">
        {steps.map((step, i) => (
          <div
            key={step.num}
            style={{ "--reveal-delay": `${0.3 + i * 0.1}s` } as React.CSSProperties}
            className={`reveal flex flex-col items-center text-center${inView ? " reveal-shown" : ""}`}
          >
            <div className="relative z-10 mbe-5 flex h-[3.75rem] w-[3.75rem] items-center justify-center rounded-full border border-black/[0.1] bg-cream shadow-sm">
              <StepBadge num={step.num} />
            </div>
            <h3 className="mbe-2 text-meta font-bold leading-tight tracking-[-0.01em] text-ink">{step.title}</h3>
            <p className="text-micro leading-[1.6] text-[#888]">{step.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function VerticalTimeline({ steps }: { steps: readonly Feature[] }) {
  return (
    <div>
      {steps.map((step, i) => (
        <FadeUp key={step.num} delay={0.05 * i}>
          <div className="flex gap-5 pbe-7 last:pbe-0">
            <div className="flex shrink-0 flex-col items-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-black/[0.1] bg-white shadow-sm">
                <StepBadge num={step.num} />
              </div>
              {i < steps.length - 1 && <div className="mbs-2 w-px flex-1 bg-black/[0.07]" />}
            </div>
            <div className="pbs-3">
              <h3 className="mbe-1.5 text-[0.9375rem] font-bold text-ink">{step.title}</h3>
              <p className="text-[0.875rem] leading-[1.65] text-graphite">{step.desc}</p>
            </div>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}

export function Process() {
  const { t } = useLanguage();

  return (
    <section id="process" className="bg-cream py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-shell px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow={t.process.eyebrow}
          headline={t.process.headline}
          className="mbe-14 max-w-lg md:mbe-20"
        />

        <div className="hidden md:block">
          <HorizontalTimeline steps={t.process.steps} />
        </div>
        <div className="md:hidden">
          <VerticalTimeline steps={t.process.steps} />
        </div>
      </div>
    </section>
  );
}
