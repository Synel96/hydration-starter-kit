import { describe, expect, it } from "vitest";
import { buildMeta } from "./seo";

describe("buildMeta", () => {
  it("falls back to the brand name and default description", () => {
    const meta = buildMeta({ pathname: "/about", lang: "en" });

    expect(meta.canonicalUrl).toBe("https://example.com/en/about");
    expect(meta.title).toBe("Brand Name");
    expect(meta.description).toContain("Replace with page-specific text.");
    expect(meta.image).toBe("https://example.com/og-image.png");
  });

  it("uses page-provided title and description when present", () => {
    const meta = buildMeta({
      pathname: "/",
      lang: "en",
      title: "Home | Brand Name",
      description: "Custom description",
    });

    expect(meta.title).toBe("Home | Brand Name");
    expect(meta.description).toBe("Custom description");
  });

  it("builds hreflang alternates for every supported language plus x-default", () => {
    const meta = buildMeta({ pathname: "/", lang: "hu" });

    expect(meta.alternates).toEqual(
      expect.arrayContaining([
        { hreflang: "en", href: "https://example.com/en/" },
        { hreflang: "hu", href: "https://example.com/hu/" },
        { hreflang: "x-default", href: "https://example.com/en/" },
      ])
    );
  });
});
