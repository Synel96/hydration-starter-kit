// https://vike.dev/Head

import logoUrl from "../assets/logo.svg";
import geistFontUrl from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";
import { usePageContext } from "vike-react/usePageContext";
import { SITE_URL, BRAND_NAME } from "../components/site";
import { buildMeta } from "../src/seo";

export function Head() {
  const pageContext = usePageContext() as {
    urlPathname: string;
    config?: {
      title?: string;
      description?: string;
    };
  };
  const meta = buildMeta({
    pathname: pageContext.urlPathname,
    title: pageContext.config?.title,
    description: pageContext.config?.description,
  });

  return (
    <>
      <link rel="icon" href={logoUrl} />
      <link rel="canonical" href={meta.canonicalUrl} />

      {/* Open Graph / Social Media */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={meta.canonicalUrl} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={meta.canonicalUrl} />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />

      {/* JSON-LD Schema.org (Placeholder) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization", // Or "LocalBusiness", "Article", etc. depending on page
            name: BRAND_NAME,
            url: SITE_URL,
            logo: `${SITE_URL}/logo.svg`,
            // Add more fields as needed: sameAs, address, contactPoint, etc.
          }),
        }}
      />

      {/* Preload the primary (Latin) font so it starts downloading early */}
      <link
        rel="preload"
        href={geistFontUrl}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  );
}
