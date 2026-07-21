"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { LANGS, LANG_LABELS } from "@/i18n/langs";
import { hrefFor, resolvePath, swapLang } from "@/lib/routes";
import { scrollTo } from "@/lib/scroll";
import { Logo } from "./logo";

export function Nav({ overlay = false }: { overlay?: boolean }) {
  const { lang, t } = useLanguage();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const resolved = resolvePath(pathname);
  const home = hrefFor(lang);
  const onHome = resolved.kind === "route" && resolved.page === "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const jump = (event: React.MouseEvent, hash: string) => {
    setMobileOpen(false);
    if (!onHome) return;
    event.preventDefault();
    scrollTo(hash);
  };

  const toTop = (event: React.MouseEvent) => {
    setMobileOpen(false);
    if (!onHome) return;
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const solid = !overlay || scrolled;
  const onDarkPanel = overlay && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 inset-bs-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-400 ease-out ${
          solid
            ? "bg-cream/[0.96] shadow-[0_1px_0_0_rgba(0,0,0,0.07)] backdrop-blur-md"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-header max-w-shell items-center justify-between px-6 md:px-10 lg:px-16">
          <div className="flex items-center gap-8 lg:gap-12">
            <Link
              href={home}
              onClick={toTop}
              aria-label={`${t.nav.home} — CORESEC FINANCE`}
              className="flex items-center"
            >
              <Logo variant="light" />
            </Link>

            <nav aria-label={t.nav.primary} className="hidden items-center gap-7 md:flex lg:gap-9">
              {t.nav.links.map((link) => (
                <Link
                  key={link.href}
                  href={`${onHome ? "" : home}${link.href}`}
                  onClick={(event) => jump(event, link.href)}
                  className="group relative py-1 text-meta font-medium text-[#4A4A4A] transition-colors duration-300 hover:text-forest"
                >
                  {link.label}
                  <span className="absolute -inset-be-0.5 start-0 h-[0.09375rem] w-0 bg-forest transition-all duration-300 ease-out group-hover:w-full" />
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-4 md:flex">
              {LANGS.map((l) => {
                const active = lang === l;
                return (
                  <Link
                    key={l}
                    href={swapLang(pathname, l)}
                    hrefLang={l}
                    aria-current={active ? "true" : undefined}
                    className={`relative pbe-0.5 text-[0.71875rem] font-semibold tracking-[0.1em] transition-colors duration-200 ${
                      active
                        ? `text-forest ${onDarkPanel ? "lg:text-emerald" : ""}`
                        : `text-[#999] hover:text-[#444] ${
                            onDarkPanel ? "lg:text-white/55 lg:hover:text-white" : ""
                          }`
                    }`}
                  >
                    {LANG_LABELS[l]}
                    {active && (
                      <span
                        className={`absolute inset-x-0 -inset-be-0.5 h-[0.09375rem] rounded-full ${
                          onDarkPanel ? "bg-forest lg:bg-emerald" : "bg-forest"
                        }`}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            <Link
              href={`${onHome ? "" : home}#contact`}
              onClick={(event) => jump(event, "#contact")}
              className="hidden rounded-xl bg-forest px-4 py-2.5 text-[0.78125rem] font-semibold text-white transition-all duration-300 hover:bg-forest-dark active:scale-[0.98] md:flex"
            >
              {t.nav.cta}
            </Link>

            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="-me-2 p-2 text-[#333] md:hidden"
              aria-label={t.nav.menu}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex animate-fade-rise flex-col bg-cream">
          <div className="flex h-header items-center justify-between border-b border-black/[0.07] px-6">
            <Link href={home} onClick={toTop} className="flex items-center" aria-label={t.nav.home}>
              <Logo variant="light" />
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 text-[#444]"
              aria-label={t.nav.menu}
            >
              <X size={20} />
            </button>
          </div>

          <nav aria-label={t.nav.primary} className="flex flex-col px-6 pbe-4 pbs-6">
            {t.nav.links.map((link, i) => (
              <Link
                key={link.href}
                href={`${onHome ? "" : home}${link.href}`}
                onClick={(event) => jump(event, link.href)}
                style={{ animationDelay: `${0.05 + i * 0.06}s` }}
                className="animate-fade-rise border-b border-black/[0.06] py-5 text-start text-[1.75rem] font-extrabold tracking-[-0.02em] text-ink transition-colors duration-200 hover:text-forest"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mbs-6 px-6">
            <div className="mbe-7 flex items-center gap-6">
              <span className="text-eyebrow font-semibold uppercase tracking-widest text-[#AAA]">
                {t.nav.lang}
              </span>
              {LANGS.map((l) => (
                <Link
                  key={l}
                  href={swapLang(pathname, l)}
                  hrefLang={l}
                  onClick={() => setMobileOpen(false)}
                  aria-current={lang === l ? "true" : undefined}
                  className={`relative pbe-0.5 text-[0.875rem] font-bold tracking-wider transition-colors duration-200 ${
                    lang === l ? "text-forest" : "text-[#BBB] hover:text-[#555]"
                  }`}
                >
                  {LANG_LABELS[l]}
                  {lang === l && (
                    <span className="absolute inset-x-0 -inset-be-0.5 h-[0.09375rem] bg-forest" />
                  )}
                </Link>
              ))}
            </div>
            <Link
              href={`${onHome ? "" : home}#contact`}
              onClick={(event) => jump(event, "#contact")}
              className="block w-full rounded-2xl bg-forest py-4 text-center text-[0.9375rem] font-bold text-white transition-all hover:bg-forest-dark active:scale-[0.98]"
            >
              {t.nav.cta}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
