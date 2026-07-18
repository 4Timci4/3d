# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure & Module Organization

Next.js 16 App Router storefront in TypeScript with Tailwind v4 + shadcn/ui.

**Route groups:**
- `app/(site)/` — public storefront pages (with Header/Footer via `(site)/layout.tsx`)
- `app/(auth)/` — giriş, kayıt, hesabim (no Header/Footer, via `(auth)/layout.tsx`)
- `app/auth/actions.ts` — server actions: `login`, `register`, `logout`

**Key files:**
- `app/globals.css` — only `@import` statements + CSS tokens (`:root`) + reset. All other CSS is in `app/styles/`.
- `app/styles/` — 8 semantic CSS files: `layout.css`, `buttons.css`, `forms.css`, `home.css`, `product.css`, `cart.css`, `pages.css`, `responsive.css`.
- `components/` — grouped by feature: `cart/`, `home/`, `layout/`, `product/`, `shop/`.
- `components/ui/` — shadcn/ui components (Button, Input, Label, Card, Separator).
- `data/products.ts` — product catalog and filter data.
- `config/site.ts` — centralized brand, contact, social, and legal configuration.
- `lib/supabase/client.ts` + `server.ts` — Supabase browser and server clients.
- `proxy.ts` — Next.js 16 middleware (replaces `middleware.ts`). Export must be named `proxy`, not `middleware`.

## Build, Test, and Development Commands

- `npm run dev` — dev server at `http://localhost:3000`
- `npm run build` — production build
- `npm start` — serve production build
- `npm run lint` — ESLint
- `npm run verify` — Playwright checks (requires running server on port 3000)

Agent note: do not run build, lint, or verification commands unless the user explicitly requests them.

## Architecture Notes

**CSS approach:** No Tailwind utility classes in JSX — all styling via custom CSS classes in `app/styles/`. Tailwind v4 is used only for its engine; shadcn tokens are mapped to the site's design tokens (cream/ink/red/sage palette) in `globals.css`. Use `!important` overrides on shadcn components to enforce the site's sharp-edged, no-radius aesthetic.

**Auth flow:** Supabase email+password auth. Server actions in `app/auth/actions.ts` handle login/register/logout. `proxy.ts` protects `/hesabim` and redirects logged-in users away from `/giris` and `/kayıt`. Supabase env vars required: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

**"use client" boundary:** Add only when browser state, events, or `localStorage` are required. Forms use `useTransition` + server actions pattern (see `LoginForm.tsx`, `RegisterForm.tsx`).

**Design tokens:** All colors, spacing, and typography via CSS custom properties (`--cream`, `--red`, `--ink`, `--sage`, `--green`, `--display`, `--body`, `--mono`). Do not use hardcoded hex values or Tailwind color classes.

## Coding Style & Naming Conventions

Strict TypeScript, two-space indentation. PascalCase for components/files, camelCase for functions/variables, lowercase Turkish slugs for route folders (`uretim-sureci/`).

Prefer semantic HTML, visible focus states, 44px minimum touch targets. Avoid gradients, generic card grids, fake testimonials, and invented product claims.

## Testing Guidelines

Playwright in `scripts/verify.mjs`. Verify 375px, 768px, and 1440px widths. Keep console errors, horizontal overflow, and broken interactions at zero.

## Commit Guidelines

Conventional Commits: `feat: add product color filter`, `fix: align hero columns`. Call out edits to `config/site.ts`, product data, or legal placeholders in PR descriptions.
