import { BRAND_NAME } from "./site";

type FooterProps = {
  brandName?: string;
};

export function Footer({ brandName = BRAND_NAME }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-(--brand-surface) text-(--brand-on-surface)">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-center px-6 py-4 text-sm text-white/80">
        <span>
          {year} {brandName}. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
