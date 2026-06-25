// src/i18n.ts
// Initializes i18next with in-bundle translations.
// Language is determined exclusively by the URL prefix (/en/, /hu/, …) via
// Vike's onBeforeRoute hook — NOT by browser detection.
// To add a language: extend SUPPORTED_LANGS in i18n-config.ts, add a JSON
// file under /public/locales/{lang}/common.json, and add it to RESOURCES.

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "../public/locales/en/common.json";
import huCommon from "../public/locales/hu/common.json";

import { SUPPORTED_LANGS, DEFAULT_LANG, type SupportedLang } from "./i18n-config";
// Re-export so components can import everything from one place
export { SUPPORTED_LANGS, DEFAULT_LANG, type SupportedLang };

const RESOURCES: Record<SupportedLang, { common: typeof enCommon }> = {
  en: { common: enCommon },
  hu: { common: huCommon },
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: RESOURCES,
    // Language is set at runtime by I18nProvider (from pageContext.lang)
    lng: DEFAULT_LANG,
    fallbackLng: DEFAULT_LANG,
    supportedLngs: SUPPORTED_LANGS,
    defaultNS: "common",
    ns: ["common"],
    interpolation: { escapeValue: false },
  });
}

export default i18n;
