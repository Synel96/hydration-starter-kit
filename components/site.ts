import { env } from "@/src/env";

export const BRAND_NAME = env.VITE_BRAND_NAME;
export const SITE_URL = env.VITE_SITE_URL;

// Company data — used in JSON-LD structured data (pages/+Head.tsx) and anywhere
// else the business's real-world contact details are needed. Replace per project.
export const COMPANY_ADDRESS = env.VITE_COMPANY_ADDRESS;
export const COMPANY_EMAIL = env.VITE_COMPANY_EMAIL;
export const COMPANY_PHONE = env.VITE_COMPANY_PHONE;

// Placeholder Open Graph image — replace public/og-image.png with real artwork per project.
export const OG_IMAGE_PATH = "/og-image.png";

export const NAV_LINKS = [{ href: "/", label: "Home" }] as const;
