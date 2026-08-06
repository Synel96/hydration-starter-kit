// https://vike.dev/lang

import { DEFAULT_LANG, type SupportedLang } from "../src/i18n-config";

// `<html lang>` — resolved per-request from pageContext.lang (set by
// +onBeforeRoute.ts from the URL). Without this it defaults to a static
// "en" for every page, including /hu/.
export default (pageContext: { lang?: SupportedLang }) => pageContext.lang ?? DEFAULT_LANG;
