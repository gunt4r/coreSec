"use client";

import { useLanguage } from "@/i18n/language-provider";

const linkClass = "text-[14px] text-white/[0.78] transition-colors duration-200 hover:text-white";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 md:py-16 lg:px-16">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto] md:gap-16 lg:gap-28">
          <div>
            <div className="mb-4">
              <span className="text-[13px] font-black uppercase tracking-[0.22em] text-white">CORE</span>
              <span className="text-[13px] font-light uppercase tracking-[0.22em] text-white/70">SEC</span>
            </div>
            <p className="max-w-[220px] text-[13.5px] leading-relaxed text-white/60">{t.footer.tagline}</p>
          </div>

          <div>
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45 md:mb-5">
              {t.footer.contact}
            </h2>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${t.footer.email}`} className={linkClass}>
                {t.footer.email}
              </a>
              <a
                href={`https://t.me/${t.footer.telegram.replace("@", "")}`}
                target="_blank"
                rel="noreferrer"
                className={linkClass}
              >
                {t.footer.telegram}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/[0.08] pt-5">
          <p className="text-[12px] text-white/[0.38]">
            © {new Date().getFullYear()} Core Sec. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
