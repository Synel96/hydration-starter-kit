// components/I18nProvider.tsx
// Reads pageContext.lang (set by onBeforeRoute from the URL prefix) and
// synchronously applies it to i18next before the tree renders.
// This ensures SSR HTML and client hydration always match the URL language.

import { type ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import i18n from "@/src/i18n";
import { DEFAULT_LANG, type SupportedLang } from "@/src/i18n-config";

export function I18nProvider({ children }: { children: ReactNode }) {
  const pageContext = usePageContext() as { lang?: SupportedLang };
  const lang = pageContext.lang ?? DEFAULT_LANG;

  // Synchronously change language before render so SSR output is correct
  if (i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  // Keep <html lang=""> in sync on client
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
