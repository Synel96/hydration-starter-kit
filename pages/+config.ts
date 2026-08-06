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

  // `<html lang>` — see pages/+lang.ts (function-valued config settings
  // must live in their own +<name>.ts file, not inline here).

  // Generates static HTML for every page at build time (no dynamic,
  // per-request data is used) — see https://vike.dev/prerender. Lang
  // (/en/, /hu/) is normally resolved per-request in +onBeforeRoute.ts from
  // the URL, so every page needs its own +onBeforePrerenderStart.ts hook
  // enumerating its lang-prefixed URLs (see pages/index/+onBeforePrerenderStart.ts)
  // — otherwise only the un-prefixed default-lang URL gets prerendered.
  prerender: true,

  extends: [vikeReact],
};

export default config;
