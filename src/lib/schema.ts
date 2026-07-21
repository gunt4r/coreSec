import { LANGS, type Lang } from "@/i18n/langs";
import { COMPANY } from "@/i18n/company";
import { dictionaries } from "@/i18n/translations";
import { caseBySlug } from "@/lib/cases";
import {
  hrefFor,
  hrefForCase,
  hrefForCases,
  type CaseSlug,
  type Page,
} from "@/lib/routes";
import { absolute, SITE_NAME, SITE_URL } from "@/lib/seo";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const LANGUAGE_NAMES = ["English", "Ukrainian", "Russian"];
const LANGUAGE_CODES = LANGS.map((lang) => lang as string);

export type SchemaPage = Page | "cases" | "case";

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
    ...(COMPANY.legalName ? { legalName: COMPANY.legalName } : {}),
    ...(COMPANY.foundedYear ? { foundingDate: COMPANY.foundedYear } : {}),
    ...(COMPANY.registrationNumber
      ? {
          identifier: {
            "@type": "PropertyValue",
            name: "Company registration number",
            value: COMPANY.registrationNumber,
          },
        }
      : {}),
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: absolute("/mark.svg"),
      width: 313,
      height: 356,
    },
    description: dict.meta.description,
    email: dict.footer.email,
    knowsLanguage: LANGUAGE_NAMES,
    areaServed: { "@type": "Place", name: "Worldwide" },
    sameAs: socialProfiles(lang),
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: dict.footer.email,
      availableLanguage: LANGUAGE_NAMES,
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

function webPage(lang: Lang, url: string, copy: { title: string; description: string }) {
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: copy.title,
    description: copy.description,
    inLanguage: lang,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
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
    areaServed: { "@type": "Place", name: "Worldwide" },
    audience: {
      "@type": "Audience",
      audienceType: "Cryptocurrency exchange account holders",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: absolute(hrefFor(lang)),
      availableLanguage: LANGUAGE_CODES,
    },
  };
}

function faq(lang: Lang) {
  return {
    "@type": "FAQPage",
    "@id": `${absolute(hrefFor(lang))}#faq`,
    inLanguage: lang,
    mainEntity: dictionaries[lang].faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

type Crumb = { name: string; item: string };

function breadcrumbs(crumbs: Crumb[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}

function caseList(lang: Lang) {
  const dict = dictionaries[lang];
  return {
    "@type": "ItemList",
    "@id": `${absolute(hrefForCases(lang))}#list`,
    name: dict.caseStudies.index.heading,
    itemListElement: CASE_ORDER.map((slug, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: absolute(hrefForCase(lang, slug)),
      name: caseCopy(lang, slug).heading,
    })),
  };
}

const CASE_ORDER: CaseSlug[] = [
  "bybit-abnormal-asset-origin-appeal",
  "bybit-withdrawal-compliance-hold",
  "bybit-manual-transfer-before-closure",
  "binance-withdrawal-after-release",
];

function caseCopy(lang: Lang, slug: CaseSlug) {
  const file = caseBySlug(slug);
  if (!file) throw new Error(`No case file for slug "${slug}"`);
  return dictionaries[lang].caseStudies.items[file.id];
}

function caseArticle(lang: Lang, slug: CaseSlug) {
  const file = caseBySlug(slug);
  if (!file) throw new Error(`No case file for slug "${slug}"`);
  const copy = dictionaries[lang].caseStudies.items[file.id];
  const url = absolute(hrefForCase(lang, slug));

  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: copy.heading,
    description: copy.description,
    articleSection: dictionaries[lang].caseStudies.labels.breadcrumb,
    inLanguage: lang,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    image: absolute(file.image),
    about: { "@type": "Thing", name: file.exchange },
    author: { "@id": ORGANIZATION_ID },
    publisher: { "@id": ORGANIZATION_ID },
    ...(file.publishedAt ? { datePublished: file.publishedAt } : {}),
  };
}

export function buildSchema(lang: Lang, page: SchemaPage = "", slug?: CaseSlug) {
  const dict = dictionaries[lang];
  const graph: object[] = [organization(lang), website(lang)];
  const homeCrumb: Crumb = { name: dict.nav.home, item: absolute(hrefFor(lang)) };

  if (page === "case") {
    if (!slug) throw new Error("buildSchema: a case page needs a slug");
    const url = absolute(hrefForCase(lang, slug));
    const copy = caseCopy(lang, slug);
    graph.push(
      webPage(lang, url, copy),
      caseArticle(lang, slug),
      breadcrumbs([
        homeCrumb,
        { name: dict.caseStudies.labels.breadcrumb, item: absolute(hrefForCases(lang)) },
        { name: copy.heading, item: url },
      ]),
    );
    return { "@context": "https://schema.org", "@graph": graph };
  }

  if (page === "cases") {
    const url = absolute(hrefForCases(lang));
    graph.push(
      webPage(lang, url, dict.caseStudies.index),
      caseList(lang),
      breadcrumbs([
        homeCrumb,
        { name: dict.caseStudies.labels.breadcrumb, item: url },
      ]),
    );
    return { "@context": "https://schema.org", "@graph": graph };
  }

  const url = absolute(hrefFor(lang, page));
  const copy =
    page === "privacy" ? dict.legal.privacy : page === "terms" ? dict.legal.terms : dict.meta;

  graph.push(webPage(lang, url, copy));

  if (page === "") {
    graph.push(service(lang), faq(lang));
  } else {
    const label = page === "privacy" ? dict.footer.privacy : dict.footer.terms;
    graph.push(breadcrumbs([homeCrumb, { name: label, item: url }]));
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
