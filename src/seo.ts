import { BRAND_NAME, SITE_URL } from "../components/site";

type BuildMetaInput = {
  pathname: string;
  title?: string | null;
  description?: string | null;
};

export function buildMeta({ pathname, title, description }: BuildMetaInput) {
  const canonicalUrl = new URL(pathname, SITE_URL).toString();
  const resolvedTitle = title && title.trim().length > 0 ? title : BRAND_NAME;
  const resolvedDescription =
    description && description.trim().length > 0
      ? description
      : "Starter template page description. Replace with page-specific text.";

  return {
    canonicalUrl,
    title: resolvedTitle,
    description: resolvedDescription,
    image: `${SITE_URL}/og-image.jpg`,
  };
}
