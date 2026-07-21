"use client";

import { createContext, useCallback, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { dictionaries, type Dictionary } from "./translations";
import type { Lang } from "./langs";
import { hrefFor, pageOf } from "@/lib/routes";

type LanguageValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = useCallback(
    (next: Lang) => {
      if (next === lang) return;
      router.push(hrefFor(next, pageOf(pathname)));
    },
    [lang, pathname, router],
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
