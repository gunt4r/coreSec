"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/i18n/language-provider";
import { LANGS, LANG_LABELS } from "@/i18n/langs";
import { COMPANY } from "@/i18n/company";
import { hrefFor, hrefForCases, swapLang } from "@/lib/routes";
import { Logo } from "./logo";
import { InstagramIcon, TelegramIcon } from "./social-icons";

const linkClass = "text-[0.875rem] text-white/[0.78] transition-colors duration-200 hover:text-white";
const headingClass =
  "mbe-4 text-eyebrow font-semibold uppercase tracking-[0.16em] text-white/45 md:mbe-5";
const socialIconClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] text-white/70 transition-all duration-200 hover:border-white/40 hover:bg-white/[0.06] hover:text-white";

export function Footer() {
  const { lang, t } = useLanguage();
  const pathname = usePathname();

  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto max-w-shell px-6 py-14 md:px-10 md:py-16 lg:px-16">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto_auto] md:gap-16 lg:gap-24">
          <div>
            <Link href={hrefFor(lang)} aria-label={t.nav.home} className="inline-flex">
              <Logo variant="dark" className="mbe-4" />
            </Link>
            <p className="max-w-[18rem] text-[0.84375rem] leading-relaxed text-white/60">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <p className={headingClass}>{t.footer.legal}</p>
            <div className="flex flex-col gap-4">
              <Link href={hrefForCases(lang)} className={linkClass}>
                {t.caseStudies.labels.breadcrumb}
              </Link>
              <Link href={hrefFor(lang, "privacy")} className={linkClass}>
                {t.footer.privacy}
              </Link>
              <Link href={hrefFor(lang, "terms")} className={linkClass}>
                {t.footer.terms}
              </Link>
            </div>
          </div>

          <div>
            <p className={headingClass}>{t.footer.language}</p>
            <nav aria-label={t.footer.language} className="flex flex-col gap-4">
              {LANGS.map((l) => (
                <Link
                  key={l}
                  href={swapLang(pathname, l)}
                  hrefLang={l}
                  aria-current={l === lang ? "true" : undefined}
                  className={l === lang ? `${linkClass} text-white` : linkClass}
                >
                  {LANG_LABELS[l]}
                </Link>
              ))}
            </nav>
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
