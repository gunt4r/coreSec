import { type Lang } from "@/i18n/langs";
import { dictionaries } from "@/i18n/translations";
import { hrefFor, type Page } from "@/lib/routes";
import { absolute, SITE_NAME, SITE_URL } from "@/lib/seo";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

function socialProfiles(lang: Lang): string[] {
  const { telegram, instagram } = dictionaries[lang].footer;
  const profiles: string[] = [];
  if (telegram) profiles.push(`https://t.me/${telegram.replace("@", "")}`);
  if (instagram) profiles.push(`https://instagram.com/${instagram}`);
  return profiles;
}

function organization(lang: Lang) {
  const dict = dictionaries[lang];
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_URL,
    logo: absolute("/mark.svg"),
    description: dict.meta.description,
    sameAs: socialProfiles(lang),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: dict.footer.email,
      availableLanguage: ["English", "Ukrainian", "Russian"],
    },
  };
}

function website(lang: Lang) {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: lang,
    publisher: { "@id": ORGANIZATION_ID },
  };
}

function service(lang: Lang) {
  const dict = dictionaries[lang];
  return {
    "@type": "Service",
    name: dict.hero.eyebrow,
    serviceType: dict.hero.eyebrow,
    description: dict.meta.description,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absolute(hrefFor(lang)),
      availableLanguage: ["en", "uk", "ru"],
    },
  };
}

function faq(lang: Lang) {
  return {
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: dictionaries[lang].faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

function breadcrumbs(lang: Lang, page: Page) {
  const dict = dictionaries[lang];
  const label = page === "privacy" ? dict.footer.privacy : dict.footer.terms;
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: absolute(hrefFor(lang)) },
      { "@type": "ListItem", position: 2, name: label, item: absolute(hrefFor(lang, page)) },
    ],
  };
}

export function buildSchema(lang: Lang, page: Page = "") {
  const graph: object[] = [organization(lang), website(lang)];

  if (page === "") {
    graph.push(service(lang), faq(lang));
  } else {
    graph.push(breadcrumbs(lang, page));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
