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

  // Generates static HTML for every page at build time (no dynamic,
  // per-request data is used) — see https://vike.dev/prerender
  prerender: true,

  extends: [vikeReact],
};

export default config;
