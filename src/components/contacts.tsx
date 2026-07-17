"use client";

import { useLanguage } from "@/i18n/language-provider";
import { FadeUp, SectionHeading } from "./fade-up";
import { EmailIcon, InstagramIcon, TelegramIcon } from "./social-icons";

const cardClass =
  "group flex items-center gap-4 rounded-2xl border border-black/[0.07] bg-cream p-5 transition-all duration-200 hover:border-forest/30 hover:shadow-lg hover:shadow-forest/[0.06] md:p-6";
const iconWrapClass =
  "flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-mint text-forest transition-colors duration-200 group-hover:bg-forest group-hover:text-white";
const labelClass = "text-[11px] font-semibold uppercase tracking-[0.14em] text-slate";
const valueClass = "text-[15px] font-semibold tracking-tight text-ink md:text-[16px]";

export function Contacts() {
  const { t } = useLanguage();

  const channels = [
    {
      label: t.contacts.email_label,
      value: t.footer.email,
      href: `mailto:${t.footer.email}`,
      external: false,
      icon: <EmailIcon />,
    },
    {
      label: t.contacts.telegram_label,
      value: t.footer.telegram,
      href: `https://t.me/${t.footer.telegram.replace("@", "")}`,
      external: true,
      icon: <TelegramIcon />,
    },
    {
      label: t.contacts.instagram_label,
      value: `@${t.footer.instagram}`,
      href: `https://instagram.com/${t.footer.instagram}`,
      external: true,
      icon: <InstagramIcon />,
    },
  ];

  return (
    <section id="contacts" className="bg-white py-20 md:py-28 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 lg:px-16">
        <SectionHeading
          eyebrow={t.contacts.eyebrow}
          headline={t.contacts.headline}
          className="mb-4 max-w-[560px]"
        />
        <FadeUp delay={0.1}>
          <p className="mb-10 max-w-[440px] text-[15px] leading-[1.7] text-slate md:mb-12 md:text-[17px]">
            {t.contacts.sub}
          </p>
        </FadeUp>
        <FadeUp delay={0.14}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                aria-label={c.label}
                {...(c.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className={cardClass}
              >
                <span className={iconWrapClass}>{c.icon}</span>
                <span className="flex flex-col gap-1">
                  <span className={labelClass}>{c.label}</span>
                  <span className={valueClass}>{c.value}</span>
                </span>
              </a>
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
