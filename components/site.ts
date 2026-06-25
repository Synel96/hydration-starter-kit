import { env } from "@/src/env";

export const BRAND_NAME = env.VITE_BRAND_NAME;
export const SITE_URL = env.VITE_SITE_URL;

export const NAV_LINKS = [{ href: "/", labelKey: "nav.home" }] as const;
