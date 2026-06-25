// pages/+onBeforeRoute.ts
// Extracts the language prefix from the URL and makes it available as
// pageContext.lang. The prefix is stripped so the rest of Vike routing
// works against ordinary paths (e.g. /en/about → routes to pages/about/).
//
// /           → 301 redirect to /en/
// /en/about   → urlLogical: /about, lang: "en"
// /hu/        → urlLogical: /,      lang: "hu"
// /unknown    → urlLogical: /unknown, lang: "en" (default, no redirect)

import { redirect } from "vike/abort";
import { SUPPORTED_LANGS, DEFAULT_LANG, type SupportedLang } from "../src/i18n-config";

export function onBeforeRoute(pageContext: { urlOriginal: string }) {
  const { urlOriginal } = pageContext;
  const url = new URL(urlOriginal, "http://localhost");
  const pathname = url.pathname;

  // Redirect bare / to the default language root
  if (pathname === "/") {
    throw redirect(`/${DEFAULT_LANG}/`, 301);
  }

  const segments = pathname.split("/").filter(Boolean);
  const maybeLang = segments[0] as SupportedLang;

  if ((SUPPORTED_LANGS as ReadonlyArray<string>).includes(maybeLang)) {
    const lang = maybeLang;
    // Build the logical path without the lang segment
    const logicalPath = segments.length > 1 ? "/" + segments.slice(1).join("/") : "/";
    return {
      pageContext: {
        lang,
        urlLogical: logicalPath + url.search + url.hash,
      },
    };
  }

  // No lang prefix — serve with default lang, no URL rewrite
  return {
    pageContext: {
      lang: DEFAULT_LANG,
    },
  };
}
