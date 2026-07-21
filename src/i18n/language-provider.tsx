"use client";

import { createContext, useContext, useMemo } from "react";
import type { Dictionary } from "./translations";
import type { Lang } from "./langs";

type LanguageValue = {
  lang: Lang;
  t: Dictionary;
};

const LanguageContext = createContext<LanguageValue | null>(null);

export function LanguageProvider({
  lang,
  dictionary,
  children,
}: {
  lang: Lang;
  dictionary: Dictionary;
  children: React.ReactNode;
}) {
  const value = useMemo(() => ({ lang, t: dictionary }), [lang, dictionary]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
