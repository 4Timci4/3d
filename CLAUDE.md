# Repository Guidelines

## Project Structure & Module Organization

This repository is a Next.js App Router storefront written in TypeScript.

- `app/`: routes, layouts, metadata, and global styles (`app/globals.css`).
- `components/`: reusable UI grouped by feature (`cart/`, `home/`, `layout/`, `product/`, `shop/`).
- `data/products.ts`: product catalog and filter data.
- `config/site.ts`: centralized brand, contact, social, and legal configuration.
- `lib/`: shared utilities such as Turkish currency formatting.
- `types/`: domain types.
- `scripts/verify.mjs`: Playwright interaction and responsive checks.
- `screenshots/`: generated visual verification artifacts; do not treat these as source assets.

Keep route-specific code in `app/`; move reusable behavior into `components/` or `lib/`.

## Build, Test, and Development Commands

- `npm run dev`: start the development server at `http://localhost:3000` with hot reload.
- `npm run build`: create a production build.
- `npm start`: serve the latest production build.
- `npm run lint`: run ESLint across the repository.
- `npm run verify`: run Playwright checks against a server already running on port 3000.

Agent note: do not run build, lint, or verification commands unless the user explicitly requests them.

## Coding Style & Naming Conventions

Use strict TypeScript and two-space indentation. Name React components and files with PascalCase (`ProductCard.tsx`), functions and variables with camelCase, and route folders with lowercase Turkish slugs (`uretim-sureci/`). Add `"use client"` only when browser state, events, or `localStorage` are required.

Prefer semantic HTML, visible focus states, 44px minimum touch targets, and existing palette/font variables from `globals.css`. Avoid gradients, generic card grids, fake testimonials, and invented product claims.

## Testing Guidelines

Playwright is the current test framework. Extend `scripts/verify.mjs` when adding navigation, cart, filtering, modal, or responsive behavior. Verify 375px, 768px, and 1440px widths. Keep console errors, horizontal overflow, and broken interactions at zero. No formal coverage threshold exists.

## Commit & Pull Request Guidelines

No Git history is available to infer an existing convention. Use concise Conventional Commits, for example `feat: add product color filter` or `fix: align hero columns`. Pull requests should include a focused summary, affected routes, manual test notes, and before/after screenshots for visual changes. Call out edits to `config/site.ts`, product data, or legal placeholders.
