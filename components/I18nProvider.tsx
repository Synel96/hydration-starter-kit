// components/I18nProvider.tsx
// Reads pageContext.lang (set by onBeforeRoute from the URL prefix) and
// synchronously applies it to i18next before the tree renders.
// This ensures SSR HTML and client hydration always match the URL language.

import { type ReactNode, useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { usePageContext } from "vike-react/usePageContext";
import i18n from "@/src/i18n";
import { DEFAULT_LANG, type SupportedLang } from "@/src/i18n-config";

export function I18nProvider({ children }: { children: ReactNode }) {
  const pageContext = usePageContext() as { lang?: SupportedLang };
  const lang = pageContext.lang ?? DEFAULT_LANG;
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Synchronously change language during the server render and the client's
  // first (hydration) render, so the produced HTML matches the URL — no
  // other component is subscribed to i18n yet at that point. On later
  // client-side navigations, other mounted components (Footer, Navbar, ...)
  // already subscribe to i18next, so changing the language here mid-render
  // would force-update them while React is still rendering this tree; that
  // case is handled by the effect below instead.
  if ((typeof window === "undefined" || isFirstRender) && i18n.language !== lang) {
    i18n.changeLanguage(lang);
  }

  useEffect(() => {
    // Intentional: flips the "first render" flag exactly once per mount (see comment above).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsFirstRender(false);
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
    document.documentElement.lang = lang;
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
