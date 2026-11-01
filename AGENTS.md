<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: social-events-client

Next.js 16 App Router client app (npm, `package-lock.json` — don't introduce another package manager). Early stage: one page (`src/app/page.tsx`) rendering `src/components/Shared/Navbar.tsx`.

## Rule for every request

- Clone the UI design only — no new features, no behavior changes, no refactors of existing functionality, no add new any functionality unless the user explicitly asks.
- Always make UI responsive for desktop, tablet, and mobile (Tailwind responsive prefixes: `sm`, `md`, `lg`).
- Wrap component/section content in a max-width container centered with `mx-auto` (e.g. `max-w-7xl mx-auto px-4`) so elements stay in the middle of the application.
- Write beginner-friendly code: plain, obvious patterns over clever or advanced ones (no exotic hooks, generics, or abstraction layers).
- Follow the user's command request exactly.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build` / `npm start` — production build/serve
- `npm run lint` — flat-config ESLint (`eslint.config.mjs`)
- No test or typecheck scripts exist. Typecheck with `npx tsc --noEmit`. Verify with `lint` + `tsc --noEmit` + `build`.

## Framework quirks (Next.js 16.4.3)

- `cacheComponents: true` and `partialPrefetching: true` are set in `next.config.ts`. With cache components, route segment configs (`export const dynamic`, `revalidate`, `fetchCache`) are **errors** — use `use cache` / `cacheLife` instead. Data fetching must be cache-friendly (see `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`).
- Layouts/pages use the global `LayoutProps<"/route">` / `PageProps` helpers (no import needed), e.g. `function RootLayout({ children }: LayoutProps<"/">)`.
- The bundled docs at `node_modules/next/dist/docs/` are version-matched — prefer them over training-data knowledge.

## UI stack (differs from typical shadcn setups)

- shadcn/ui **base-nova** style built on **`@base-ui/react`**, not Radix. Ignore Radix-based shadcn examples and docs; primitives import from `@base-ui/react/*`.
- Tailwind CSS **v4**, CSS-first: no `tailwind.config.*`. Theme tokens and the dark variant (`@custom-variant dark`) live in `src/app/globals.css`, which imports `shadcn/tailwind.css` and `tw-animate-css`. Styling uses Tailwind classes only.
- Add registry components with `npx shadcn add <component>` (`components.json` has the aliases configured); don't hand-copy components from the web.
- `src/lib/utils.ts` only re-exports `cn` from the `cn` package — ui components import `{ cn } from "cn"` directly. There is no `twMerge`/`clsx` helper.
- Theming: `next-themes` `ThemeProvider` in `src/app/layout.tsx`, fixed `defaultTheme="light"`, `enableSystem={false}`, `attribute="class"` (html has `suppressHydrationWarning`). `ThemeToggle` in `src/components/theme-toggle.tsx`.
- Brand color is the custom `--brand` token in `globals.css` (mapped to Tailwind as `bg-brand` / `text-brand`, teal in light, lighter teal in dark). Use it for brand-colored UI instead of hardcoding hex values.

## Conventions

- Path alias `@/*` → `src/*`. App code lives under `src/` (the README still says `app/` — it's stale create-next-app boilerplate).
- Shared (non-ui) components go in `src/components/<PascalCase>/`; shadcn primitives in `src/components/ui/`; hooks in `src/hooks/`.
