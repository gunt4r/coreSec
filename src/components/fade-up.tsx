"use client";

import { useEffect, useRef, useState } from "react";

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold: 0, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, inView };
}

export function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal${inView ? " reveal-shown" : ""}${className ? ` ${className}` : ""}`}
      style={delay ? ({ "--reveal-delay": `${delay}s` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}

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
          className={`mbe-5 block text-eyebrow font-semibold uppercase tracking-[0.22em] ${
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
            `text-h2 font-extrabold leading-[1.08] tracking-[-0.025em] ${
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
