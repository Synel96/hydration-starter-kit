// src/i18n-config.ts
// Pure constants for i18n — imported by both src/i18n.ts and Vike route hooks.
// No React or browser imports here so it is safe to use in SSR context.

export const SUPPORTED_LANGS = ["en", "hu"] as const;
export type SupportedLang = (typeof SUPPORTED_LANGS)[number];
export const DEFAULT_LANG: SupportedLang = "en";

/** Prefixes a logical pathname (e.g. "/" or "/about") with a lang segment, matching the URLs +onBeforeRoute.ts parses. */
export function langPath(pathname: string, lang: SupportedLang) {
  return pathname === "/" ? `/${lang}/` : `/${lang}${pathname}`;
}
