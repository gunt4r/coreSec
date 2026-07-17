"use client";

import { useLanguage } from "@/i18n/language-provider";
import { Logo } from "./logo";
import { InstagramIcon, TelegramIcon } from "./social-icons";

const linkClass = "text-[14px] text-white/[0.78] transition-colors duration-200 hover:text-white";
const socialIconClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.12] text-white/70 transition-all duration-200 hover:border-white/40 hover:bg-white/[0.06] hover:text-white";

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto max-w-[1440px] px-6 py-14 md:px-10 md:py-16 lg:px-16">
        <div className="grid gap-10 md:grid-cols-[1fr_auto_auto] md:gap-16 lg:gap-28">
          <div>
            <Logo variant="dark" className="mb-4" />
            <p className="max-w-[220px] text-[13.5px] leading-relaxed text-white/60">{t.footer.tagline}</p>
          </div>

          <div>
            <h2 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/45 md:mb-5">
              {t.footer.contact}
            </h2>
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

        <div className="mt-12 border-t border-white/[0.08] pt-5">
          <p className="text-[12px] text-white/[0.38]">
            © {new Date().getFullYear()} CORESEC Finance. {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
