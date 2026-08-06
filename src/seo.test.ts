import { describe, expect, it } from "vitest";
import { buildMeta } from "./seo";

describe("buildMeta", () => {
  it("falls back to the brand name and default description", () => {
    const meta = buildMeta({ pathname: "/about" });

    expect(meta.canonicalUrl).toBe("https://example.com/about");
    expect(meta.title).toBe("Brand Name");
    expect(meta.description).toContain("Replace with page-specific text.");
    expect(meta.image).toBe("https://example.com/og-image.png");
  });

  it("combines a page-provided title with the brand name, and uses the page description when present", () => {
    const meta = buildMeta({
      pathname: "/",
      title: "Home",
      description: "Custom description",
    });

    expect(meta.title).toBe("Home | Brand Name");
    expect(meta.description).toBe("Custom description");
  });
});
