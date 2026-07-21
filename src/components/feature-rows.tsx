"use client";

import { FadeUp } from "./fade-up";

export type Feature = { num: string; title: string; desc: string };

export function FeatureRows({ items, dark = false }: { items: readonly Feature[]; dark?: boolean }) {
  return (
    <div className={`border-t ${dark ? "border-white/[0.08]" : "border-black/[0.08]"}`}>
      {items.map((item, i) => (
        <FadeUp key={item.num} delay={0.04 * i}>
          <div
            className={`group grid grid-cols-[44px_1fr] gap-x-5 md:grid-cols-[56px_210px_1fr] md:gap-x-10 ${
              dark ? "border-b border-white/[0.06] py-5 md:py-6" : "border-b border-black/[0.08] py-6 md:py-8"
            }`}
          >
            <span
              className={`row-span-2 pbs-0.5 text-[0.71875rem] font-bold tracking-widest md:row-span-1 ${
                dark ? "text-emerald/55" : "text-forest/45"
              }`}
            >
              {item.num}
            </span>
            <h3
              className={`text-[0.9375rem] font-bold tracking-[-0.01em] transition-colors duration-300 ${
                dark ? "text-white/90 group-hover:text-white" : "text-ink group-hover:text-forest"
              }`}
            >
              {item.title}
            </h3>
            <p
              className={`mbs-1.5 text-body leading-[1.7] md:mbs-0 ${
                dark ? "text-white/50" : "text-graphite"
              }`}
            >
              {item.desc}
            </p>
          </div>
        </FadeUp>
      ))}
    </div>
  );
}
