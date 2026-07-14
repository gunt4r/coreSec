"use client";

import { useState } from "react";
import { useLanguage } from "@/i18n/language-provider";
import { useAttribution } from "@/lib/attribution";
import { FadeUp, SectionHeading } from "./fade-up";

const fieldClass =
  "w-full rounded-xl border border-black/[0.09] bg-white px-4 py-3.5 text-[15px] text-ink outline-none transition-all duration-200 placeholder:text-[#BDBDBD] focus:border-forest/60 focus:ring-2 focus:ring-forest/[0.08] md:px-5 md:py-4";

function Field({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className={fieldClass}
      />
    </div>
  );
}

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const { lang, t } = useLanguage();
  const attribution = useAttribution();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");

    const payload = {
      ...Object.fromEntries(new FormData(event.currentTarget)),
      lang,
      attribution,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="bg-white py-20 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 xl:gap-32">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow={t.form.eyebrow}
              headline={t.form.headline}
              headlineClassName="mb-5 text-[32px] font-extrabold leading-[1.08] tracking-[-0.025em] text-ink sm:text-[40px] md:text-[48px] lg:text-[52px]"
            />
            <FadeUp delay={0.1}>
              <p className="mb-8 max-w-[400px] text-[15px] leading-[1.7] text-slate md:text-[17px]">
                {t.form.sub}
              </p>
            </FadeUp>
            <FadeUp delay={0.14}>
              <div className="flex items-start gap-3 rounded-2xl border border-forest/10 bg-mint p-4 md:p-5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path
                      d="M2 5.5L4 7.5L8 3"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <p className="text-[13px] font-medium leading-[1.6] text-forest/75 md:text-[13.5px]">
                  {t.form.privacy}
                </p>
              </div>
            </FadeUp>
          </div>

          <div>
            {status === "sent" ? (
              <FadeUp>
                <div className="rounded-2xl border border-black/[0.07] bg-cream px-8 py-20 text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-mint">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M4 12L10 18L20 6"
                        stroke="#0F5D46"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <h3 className="mb-3 text-[22px] font-extrabold tracking-tight text-ink">
                    {t.form.success_title}
                  </h3>
                  <p className="text-[15px] text-graphite">{t.form.success_body}</p>
                </div>
              </FadeUp>
            ) : (
              <FadeUp delay={0.08}>
                <form
                  onSubmit={onSubmit}
                  className="space-y-4 rounded-2xl border border-black/[0.07] bg-cream p-6 md:space-y-5 md:p-8 lg:p-10"
                >
                  <div className="grid gap-4 sm:grid-cols-2 md:gap-5">
                    <Field name="name" label={t.form.name} placeholder={t.form.ph_name} required />
                    <Field
                      name="email"
                      type="email"
                      label={t.form.email}
                      placeholder={t.form.ph_email}
                      required
                    />
                    <Field name="telegram" label={t.form.telegram} placeholder={t.form.ph_telegram} />
                    <Field name="phone" type="tel" label={t.form.phone} placeholder={t.form.ph_phone} />
                  </div>

                  <Field name="exchange" label={t.form.exchange} placeholder={t.form.ph_exchange} />

                  <div>
                    <label
                      htmlFor="situation"
                      className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.12em] text-ink"
                    >
                      {t.form.situation}
                    </label>
                    <textarea
                      id="situation"
                      name="situation"
                      rows={5}
                      placeholder={t.form.ph_situation}
                      className={`${fieldClass} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <p className="text-[13px] font-medium text-red-600">{t.form.error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="mt-1 w-full rounded-xl bg-forest py-[18px] text-[14px] font-bold tracking-wide text-white transition-all duration-200 hover:bg-forest-dark hover:shadow-lg hover:shadow-forest/20 active:scale-[0.995] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {status === "sending" ? t.form.submitting : t.form.submit}
                  </button>
                </form>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
