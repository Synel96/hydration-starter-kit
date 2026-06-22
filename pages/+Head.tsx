// https://vike.dev/Head

import logoUrl from "../assets/logo.svg";
import geistFontUrl from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";

export function Head() {
  return (
    <>
      <link rel="icon" href={logoUrl} />
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
