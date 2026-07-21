"use client";

import { useLanguage } from "@/i18n/language-provider";
import { SectionHeading } from "./fade-up";
import { FeatureRows } from "./feature-rows";

export function WhyUs() {
  const { t } = useLanguage();

  return (
    <section className="bg-deep py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-shell px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow={t.why.eyebrow}
          headline={t.why.headline}
          dark
          className="mbe-12 max-w-[41.25rem] md:mbe-16"
          headlineClassName="text-h2-tight font-bold leading-[1.22] tracking-[-0.02em] text-white"
        />
        <FeatureRows items={t.why.items} dark />
      </div>
    </section>
  );
}
