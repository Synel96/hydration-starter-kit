import { env } from "@/src/env";

export const BRAND_NAME = env.VITE_BRAND_NAME;
export const SITE_URL = env.VITE_SITE_URL;

// Placeholder Open Graph image — replace public/og-image.png with real artwork per project.
export const OG_IMAGE_PATH = "/og-image.png";

export const NAV_LINKS = [{ href: "/", labelKey: "nav.home" }] as const;
