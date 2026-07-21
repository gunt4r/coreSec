"use client";

import { useLanguage } from "@/i18n/language-provider";
import { COMPANY } from "@/i18n/company";
import { FadeUp } from "./fade-up";
import { Footer } from "./footer";
import { Nav } from "./nav";
import type { Page } from "@/lib/routes";

export function LegalPage({ page }: { page: Exclude<Page, ""> }) {
  const { t } = useLanguage();
  const copy = page === "privacy" ? t.legal.privacy : t.legal.terms;

  return (
    <>
      <Nav />
      <main className="bg-cream pbs-32 pbe-20 md:pbs-40 md:pbe-32">
        <div className="mx-auto max-w-[48rem] px-6 md:px-10">
          <FadeUp>
            <h1 className="text-h2-soft font-extrabold leading-[1.1] tracking-[-0.025em] text-ink">
              {copy.heading}
            </h1>
            <p className="mbs-6 text-lead leading-[1.7] text-slate">{copy.intro}</p>
          </FadeUp>

          <div className="mbs-14 border-t border-black/[0.09]">
            {copy.sections.map((section, i) => (
              <FadeUp key={section.title} delay={0.03 * i}>
                <section className="border-b border-black/[0.09] pbs-8 pbe-8">
                  <h2 className="text-quote font-bold tracking-[-0.015em] text-ink">
                    {section.title}
                  </h2>
                  <p className="mbs-4 text-body leading-[1.75] text-graphite">{section.body}</p>
                </section>
              </FadeUp>
            ))}
          </div>

          <FadeUp>
            <p className="mbs-10 text-micro leading-[1.7] text-mist">
              {COMPANY.legalName ? `${COMPANY.legalName}. ` : null}
              {COMPANY.jurisdiction ? `${COMPANY.jurisdiction}. ` : null}
              {t.footer.contact}: {t.footer.email}
            </p>
          </FadeUp>
        </div>
      </main>
      <Footer />
    </>
  );
}
