"use client";

import { useLanguage } from "@/i18n/language-provider";
import { SectionHeading } from "./fade-up";
import { FeatureRows } from "./feature-rows";

export function Problems() {
  const { t } = useLanguage();

  return (
    <section id="problems" className="bg-cream py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-shell px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow={t.problems.eyebrow}
          headline={t.problems.headline}
          className="mbe-12 max-w-[33.75rem] md:mbe-16"
        />
        <FeatureRows items={t.problems.items} />
      </div>
    </section>
  );
}
