"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { X, ZoomIn } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { CASE_FILES } from "@/lib/cases";
import { FadeUp, SectionHeading } from "./fade-up";

function Lightbox({
  src,
  alt,
  caption,
  onClose,
}: {
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

export function Cases() {
  const { t } = useLanguage();
  const [openId, setOpenId] = useState<string | null>(null);

  const close = useCallback(() => setOpenId(null), []);

  const open = openId ? CASE_FILES.find((c) => c.id === openId) : undefined;
  const openCopy = openId ? t.cases.items[openId as keyof typeof t.cases.items] : undefined;

  return (
    <section id="cases" className="bg-deep py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-shell px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow={t.cases.eyebrow}
          headline={t.cases.headline}
          dark
          className="max-w-[41.25rem]"
          headlineClassName="pbs-5 text-h2-soft font-bold leading-[1.22] tracking-[-0.02em] text-white"
        />
        <FadeUp delay={0.1}>
          <p className="mbs-5 max-w-[38.75rem] text-lead leading-[1.7] text-white/55">
            {t.cases.sub}
          </p>
        </FadeUp>

        <div className="mbs-12 grid gap-x-16 md:mbs-16 md:grid-cols-2">
          {CASE_FILES.map((file, i) => {
            const copy = t.cases.items[file.id];
            const initials = String(i + 1).padStart(2, "0");
            return (
              <FadeUp key={file.id} delay={0.05 * i}>
                <button
                  onClick={() => setOpenId(file.id)}
                  className="group flex w-full flex-col items-start border-t border-white/[0.08] py-10 text-start"
                >
                  <p className="text-quote leading-[1.6] tracking-[-0.01em] text-white/90">
                    {copy.body}
                  </p>

                  <div className="mbs-6 flex items-center gap-4">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-forest text-meta font-bold tracking-wider text-white">
                      {initials}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[0.875rem] font-bold text-white">{copy.label}</span>
                      <span className="mbs-0.5 text-[0.78125rem] text-white/50">{copy.meta}</span>
                    </span>
                  </div>

                  <p className="mbs-4 text-micro font-semibold uppercase tracking-[0.06em] text-emerald">
                    {copy.outcome}
                  </p>

                  <span className="mbs-4 inline-flex items-center gap-1.5 text-micro font-semibold text-white/45 transition-colors group-hover:text-emerald">
                    <ZoomIn size={13} />
                    <span className="border-b border-transparent group-hover:border-emerald/40">
                      {t.cases.view_proof}
                    </span>
                  </span>
                </button>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp>
          <p className="mbs-10 max-w-[45rem] text-[0.78125rem] leading-relaxed text-white/35">
            {t.cases.disclaimer}
          </p>
        </FadeUp>
      </div>

      {open && openCopy && (
        <Lightbox src={open.image} alt={openCopy.label} caption={openCopy.proof} onClose={close} />
      )}
    </section>
  );
}
