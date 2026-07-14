"use client";

import { motion } from "motion/react";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Shared eyebrow + headline block used by every section. */
export function SectionHeading({
  eyebrow,
  headline,
  dark = false,
  className,
  headlineClassName,
}: {
  eyebrow: string;
  headline: string;
  dark?: boolean;
  className?: string;
  headlineClassName?: string;
}) {
  return (
    <div className={className}>
      <FadeUp>
        <span
          className={`mb-5 block text-[11px] font-semibold uppercase tracking-[0.22em] ${
            dark ? "text-emerald" : "text-forest"
          }`}
        >
          {eyebrow}
        </span>
      </FadeUp>
      <FadeUp delay={0.06}>
        <h2
          className={
            headlineClassName ??
            `text-[32px] font-extrabold leading-[1.08] tracking-[-0.025em] sm:text-[40px] md:text-[48px] lg:text-[56px] ${
              dark ? "text-white" : "text-ink"
            }`
          }
        >
          {headline}
        </h2>
      </FadeUp>
    </div>
  );
}
