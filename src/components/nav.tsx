"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/i18n/language-provider";
import { LANGS, LANG_LABELS, type Lang } from "@/i18n/translations";
import { scrollTo } from "@/lib/scroll";
import { EASE } from "./fade-up";
import { Logo } from "./logo";

export function Nav() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const go = (href: string) => {
    scrollTo(href);
    setMobileOpen(false);
  };

  const pickLang = (next: Lang) => {
    setLang(next);
    setMobileOpen(false);
  };

  const onDarkPanel = !scrolled;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 inset-bs-0 z-50"
        animate={
          scrolled
            ? {
                backgroundColor: "rgba(251,251,248,0.96)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 1px 0 0 rgba(0,0,0,0.07)",
              }
            : {
                backgroundColor: "rgba(251,251,248,0)",
                backdropFilter: "blur(0px)",
                boxShadow: "0 1px 0 0 rgba(0,0,0,0)",
              }
        }
        transition={{ duration: 0.4, ease: EASE }}
      >
        <div className="mx-auto flex h-header max-w-shell items-center justify-between px-6 md:px-10 lg:px-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center"
            aria-label="CORESEC FINANCE"
          >
            <Logo variant="light" />
          </button>

          <nav className="hidden items-center gap-9 md:flex">
            {t.nav.links.map((link) => (
              <button
                key={link.href}
                onClick={() => go(link.href)}
                className="group relative py-1 text-meta font-medium text-[#4A4A4A] transition-colors duration-300 hover:text-forest"
              >
                {link.label}
                <span className="absolute -inset-be-0.5 start-0 h-[0.09375rem] w-0 bg-forest transition-all duration-300 ease-out group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <div className="hidden items-center gap-4 md:flex">
              {LANGS.map((l) => {
                const active = lang === l;
                return (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    aria-pressed={active}
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
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => go("#contact")}
              className="hidden rounded-xl bg-forest px-4 py-2.5 text-[0.78125rem] font-semibold text-white transition-all duration-300 hover:bg-forest-dark active:scale-[0.98] md:flex"
            >
              {t.nav.cta}
            </button>

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
      </motion.header>

      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="fixed inset-0 z-40 flex flex-col bg-cream"
        >
          <div className="flex h-header items-center justify-between border-b border-black/[0.07] px-6">
            <span className="flex items-center">
              <Logo variant="light" />
            </span>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-[#444]" aria-label={t.nav.menu}>
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col px-6 pbe-4 pbs-6">
            {t.nav.links.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.3, ease: EASE }}
                onClick={() => go(link.href)}
                className="border-b border-black/[0.06] py-5 text-start text-[1.75rem] font-extrabold tracking-[-0.02em] text-ink transition-colors duration-200 hover:text-forest"
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          <div className="mbs-6 px-6">
            <div className="mbe-7 flex items-center gap-6">
              <span className="text-eyebrow font-semibold uppercase tracking-widest text-[#AAA]">
                {t.nav.lang}
              </span>
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => pickLang(l)}
                  aria-pressed={lang === l}
                  className={`relative pbe-0.5 text-[0.875rem] font-bold tracking-wider transition-colors duration-200 ${
                    lang === l ? "text-forest" : "text-[#BBB] hover:text-[#555]"
                  }`}
                >
                  {LANG_LABELS[l]}
                  {lang === l && <span className="absolute inset-x-0 -inset-be-0.5 h-[0.09375rem] bg-forest" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => go("#contact")}
              className="w-full rounded-2xl bg-forest py-4 text-[0.9375rem] font-bold text-white transition-all hover:bg-forest-dark active:scale-[0.98]"
            >
              {t.nav.cta}
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
