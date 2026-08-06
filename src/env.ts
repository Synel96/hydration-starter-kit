import { z } from "zod";

const envSchema = z.object({
  // Public values exposed to the browser (Vite convention: VITE_*)
  VITE_SITE_URL: z.string().url().default("https://example.com"),
  VITE_BRAND_NAME: z.string().min(1).default("Brand Name"),

  // Company data, used for JSON-LD structured data (see components/site.ts).
  VITE_COMPANY_ADDRESS: z.string().min(1).default("123 Main St, Anytown, USA"),
  VITE_COMPANY_EMAIL: z.string().email().default("hello@example.com"),
  VITE_COMPANY_PHONE: z.string().min(1).default("+1 555 555 5555"),
});

const parsed = envSchema.safeParse({
  VITE_SITE_URL: import.meta.env.VITE_SITE_URL,
  VITE_BRAND_NAME: import.meta.env.VITE_BRAND_NAME,
  VITE_COMPANY_ADDRESS: import.meta.env.VITE_COMPANY_ADDRESS,
  VITE_COMPANY_EMAIL: import.meta.env.VITE_COMPANY_EMAIL,
  VITE_COMPANY_PHONE: import.meta.env.VITE_COMPANY_PHONE,
});

if (!parsed.success) {
  const issues = parsed.error.issues.map((issue) => `- ${issue.path.join(".")}: ${issue.message}`);
  throw new Error(`Invalid environment configuration:\n${issues.join("\n")}`);
}

export const env = parsed.data;
