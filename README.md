# Hydration Starter Kit

Opinionated starter for new projects, built on [Vike](https://vike.dev),
React 19 (SSR), Tailwind v4, and [shadcn](https://ui.shadcn.com) UI
primitives, with env validation, SEO/OG meta helpers, a flash-free dark mode
toggle, and an SSR-safe "mounted" pattern for client-only UI.

## Getting started

```sh
npm install
cp .env.example .env
npm run dev
```

## Scripts

| Script                 | What it does                                        |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Start the dev server                                |
| `npm run build`        | Production build (client + SSR)                     |
| `npm run preview`      | Build, then serve the production build locally      |
| `npm run typecheck`    | `tsc --noEmit`                                      |
| `npm run lint`         | ESLint over `.ts`/`.tsx`                            |
| `npm run lint:css`     | Stylelint over `.css`                               |
| `npm run format`       | Prettier, write mode                                |
| `npm run format:check` | Prettier, check-only (used in CI)                   |
| `npm run test`         | Vitest                                              |
| `npm run check`        | Runs all of the above (typecheck → lint → test → …) |

A pre-commit hook (Husky + lint-staged) runs ESLint/Prettier/Stylelint on
staged files. CI (`.github/workflows/ci.yml`) runs the full `check` list plus
a build on every push/PR.

## Customizing for a new project

When you pull this repo down as the base for a new project, go through this
checklist:

- [ ] `package.json` — rename `"name"`
- [ ] `.env` — set `VITE_SITE_URL`, `VITE_BRAND_NAME`, and the
      `VITE_COMPANY_*` (address/email/phone) vars (validated by `src/env.ts`
      via zod; the app throws on startup if these are missing/invalid)
- [ ] `assets/logo.svg` — replace with the real logo (used in the navbar,
      favicon, and the page-loading overlay)
- [ ] `public/og-image.png` — replace the solid-color placeholder with real
      Open Graph artwork (1200×630 recommended). The path is defined once as
      `OG_IMAGE_PATH` in `components/site.ts`
- [ ] `pages/Layout.css` / `pages/tokens.css` — brand colors (`--brand-surface`,
      `--brand-on-surface`) and the shadcn/Tailwind design tokens
- [ ] `components/site.ts` — `NAV_LINKS` for the navbar/footer/mobile menu
- [ ] `pages/+Head.tsx` — JSON-LD block (`@type`, `sameAs`, etc.)
- [ ] `public/robots.txt`, `public/sitemap.xml`, `public/llms.txt` — update
      domain and crawling rules
- [ ] `LICENSE` — copyright holder
- [ ] `vercel.json` / `public/_headers` — only relevant if deploying to
      Vercel / Netlify-or-Cloudflare-Pages respectively; delete whichever you
      don't need

## Dark mode

`src/theme.ts` + `components/ThemeToggle.tsx` implement light/dark switching:

- A small inline script (`THEME_BOOTSTRAP_SCRIPT`, injected in `pages/+Head.tsx`)
  runs before hydration and applies the `.dark` class based on
  `localStorage["theme"]`, falling back to the `prefers-color-scheme` media
  query. This avoids a flash of the wrong theme on load.
- `ThemeToggle` reads the class the bootstrap script already applied and
  flips it on click, persisting the choice back to `localStorage`.
- Like the mobile nav menu, `ThemeToggle` renders a disabled placeholder
  until `useMounted()` flips true, since the real toggle depends on
  browser-only APIs (`localStorage`, `matchMedia`) that aren't available
  during SSR.

## Vike

This app is powered by [Vike](https://vike.dev) and [React](https://react.dev/learn).

### Plus files

[The + files are the interface](https://vike.dev/config) between Vike and your code.

- [`+config.ts`](https://vike.dev/settings) — Settings (e.g. `<title>`)
- [`+Page.tsx`](https://vike.dev/Page) — The `<Page>` component
- [`+data.ts`](https://vike.dev/data) — Fetching data (for your `<Page>` component)
- [`+Layout.tsx`](https://vike.dev/Layout) — The `<Layout>` component (wraps your `<Page>` components)
- [`+Head.tsx`](https://vike.dev/Head) - Sets `<head>` tags
- [`/pages/_error/+Page.tsx`](https://vike.dev/error-page) — The error page (rendered when an error occurs)
- [`+onPageTransitionStart.ts`](https://vike.dev/onPageTransitionStart) and `+onPageTransitionEnd.ts` — For page transition animations

### Routing

[Vike's built-in router](https://vike.dev/routing) lets you choose between:

- [Filesystem Routing](https://vike.dev/filesystem-routing) (the URL of a page is determined based on where its `+Page.jsx` file is located on the filesystem)
- [Route Strings](https://vike.dev/route-string)
- [Route Functions](https://vike.dev/route-function)

### SSR

SSR is enabled by default. You can [disable it](https://vike.dev/ssr) for all or specific pages.

### HTML Streaming

You can [enable/disable HTML streaming](https://vike.dev/stream) for all or specific pages.

### Prerendering

[`prerender`](https://vike.dev/prerender) is intentionally left off on this
branch: language (`/en/`, `/hu/`) is resolved per-request from the URL in
`pages/+onBeforeRoute.ts`, and Vike's default prerendering would only emit a
static page for the default-lang `/` route — `/en/...` and `/hu/...` would
404 on a static-only deploy. Enable it once prerendering enumerates all
lang-prefixed URLs.
