"use client";

import Link from "next/link";
import { useLanguage } from "@/i18n/language-provider";
import { COMPANY } from "@/i18n/company";
import { hrefFor } from "@/lib/routes";
import { Logo } from "./logo";
import { InstagramIcon, TelegramIcon } from "./social-icons";

const linkClass = "text-[0.875rem] text-white/[0.78] transition-colors duration-200 hover:text-white";
const headingClass =
  "mbe-4 text-eyebrow font-semibold uppercase tracking-[0.16em] text-white/45 md:mbe-5";
const socialIconClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] text-white/70 transition-all duration-200 hover:border-white/40 hover:bg-white/[0.06] hover:text-white";

export function Footer() {
  const { lang, t } = useLanguage();

  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto max-w-shell px-6 py-14 md:px-10 md:py-16 lg:px-16">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto_auto] md:gap-16 lg:gap-24">
          <div>
            <Logo variant="dark" className="mbe-4" />
            <p className="max-w-[13.75rem] text-[0.84375rem] leading-relaxed text-white/60">{t.footer.tagline}</p>
          </div>

          <div>
            <p className={headingClass}>{t.footer.legal}</p>
            <div className="flex flex-col gap-4">
              <Link href={hrefFor(lang, "privacy")} className={linkClass}>
                {t.footer.privacy}
              </Link>
              <Link href={hrefFor(lang, "terms")} className={linkClass}>
                {t.footer.terms}
              </Link>
            </div>
          </div>

          <div>
            <p className={headingClass}>{t.footer.contact}</p>
            <div className="flex flex-col gap-4">
              <a href={`mailto:${t.footer.email}`} className={linkClass}>
                {t.footer.email}
              </a>
              <div className="flex items-center gap-3">
                {t.footer.telegram && (
                  <a
                    href={`https://t.me/${t.footer.telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Telegram"
                    className={socialIconClass}
                  >
                    <TelegramIcon size={19} />
                  </a>
                )}
                {t.footer.instagram && (
                  <a
                    href={`https://instagram.com/${t.footer.instagram}`}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram"
                    className={socialIconClass}
                  >
                    <InstagramIcon size={19} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mbs-12 border-t border-white/[0.08] pbs-5">
          <p className="text-micro text-white/[0.38]">
            © {new Date().getFullYear()} {COMPANY.legalName || "CORESEC Finance"}
            {COMPANY.registrationNumber ? ` · ${COMPANY.registrationNumber}` : ""}
            {COMPANY.jurisdiction ? ` · ${COMPANY.jurisdiction}` : ""}. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
