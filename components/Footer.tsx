import { BRAND_NAME, NAV_LINKS } from "./site";

type FooterProps = {
  brandName?: string;
};

export function Footer({ brandName = BRAND_NAME }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-(--brand-surface) text-(--brand-on-surface)">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 px-6 py-4 text-sm text-white/80">
        <nav aria-label="Footer links" className="flex flex-wrap items-center justify-center gap-4">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-white/85 transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <span>
          {year} {brandName}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
