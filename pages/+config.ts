import type { Config } from "vike/types";
import vikeReact from "vike-react/config";

// Default config (can be overridden by pages)
// https://vike.dev/config

const config: Config = {
  // No default `title` here: +config.ts files run outside Vite's env
  // replacement, so they can't import BRAND_NAME from components/site.ts.
  // Leaving `title` unset lets pages/+Head.tsx's buildMeta() fall back to
  // BRAND_NAME instead (see src/seo.ts).
  description: "Demo showcasing Vike",

  // NOT prerendered: lang (/en/, /hu/) is resolved per-request in
  // +onBeforeRoute.ts from the URL, so `vike build` would only emit a
  // static HTML for the default-lang "/" route — /en/... and /hu/... would
  // 404 on a static-only deploy. Re-enable once prerendering enumerates all
  // lang-prefixed URLs (see https://vike.dev/prerender).
  extends: [vikeReact],
};

export default config;
