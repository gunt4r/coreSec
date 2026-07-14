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

  // At lg+ the hero's dark panel sits behind the right-hand controls until the header gains its background.
  const onDarkPanel = !scrolled;

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
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
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-6 md:px-10 lg:px-16">
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
                className="group relative py-1 text-[13px] font-medium text-[#4A4A4A] transition-colors duration-300 hover:text-forest"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-[1.5px] w-0 bg-forest transition-all duration-300 ease-out group-hover:w-full" />
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
                    className={`relative pb-0.5 text-[11.5px] font-semibold tracking-[0.1em] transition-colors duration-200 ${
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
                        className={`absolute inset-x-0 -bottom-0.5 h-[1.5px] rounded-full ${
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
              className="hidden rounded-xl bg-forest px-4 py-2.5 text-[12.5px] font-semibold text-white transition-all duration-300 hover:bg-forest-dark active:scale-[0.98] md:flex"
            >
              {t.nav.cta}
            </button>

            <button
              onClick={() => setMobileOpen((open) => !open)}
              className="-mr-2 p-2 text-[#333] md:hidden"
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
          <div className="flex h-[68px] items-center justify-between border-b border-black/[0.07] px-6">
            <span className="flex items-center">
              <Logo variant="light" />
            </span>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-[#444]" aria-label={t.nav.menu}>
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col px-6 pb-4 pt-6">
            {t.nav.links.map((link, i) => (
              <motion.button
                key={link.href}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.05 + i * 0.06, duration: 0.3, ease: EASE }}
                onClick={() => go(link.href)}
                className="border-b border-black/[0.06] py-5 text-left text-[28px] font-extrabold tracking-[-0.02em] text-ink transition-colors duration-200 hover:text-forest"
              >
                {link.label}
              </motion.button>
            ))}
          </div>

          <div className="mt-6 px-6">
            <div className="mb-7 flex items-center gap-6">
              <span className="text-[11px] font-semibold uppercase tracking-widest text-[#AAA]">
                {t.nav.lang}
              </span>
              {LANGS.map((l) => (
                <button
                  key={l}
                  onClick={() => pickLang(l)}
                  aria-pressed={lang === l}
                  className={`relative pb-0.5 text-[14px] font-bold tracking-wider transition-colors duration-200 ${
                    lang === l ? "text-forest" : "text-[#BBB] hover:text-[#555]"
                  }`}
                >
                  {LANG_LABELS[l]}
                  {lang === l && <span className="absolute inset-x-0 -bottom-0.5 h-[1.5px] bg-forest" />}
                </button>
              ))}
            </div>
            <button
              onClick={() => go("#contact")}
              className="w-full rounded-2xl bg-forest py-4 text-[15px] font-bold text-white transition-all hover:bg-forest-dark active:scale-[0.98]"
            >
              {t.nav.cta}
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
}
