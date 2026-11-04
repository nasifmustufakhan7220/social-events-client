<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: social-events-client

Next.js 16 App Router client app (npm, `package-lock.json` — don't introduce another package manager). Routes live in three groups under `src/app/`: `(root)` (`/`, `/up-comming`), `(auth)` (sign-in/sign-up), `(dashboard)` (`create-event`, `joined-event`, `manage-event`). `src/app/page.tsx` is still an empty placeholder; most pages are early-stage. `Navbar` and `Toaster` are rendered globally in the root layout (`src/app/layout.tsx`), not per-page. Auth is wired to better-auth (see below).

## Rule for every request

- Clone the UI design only — no new features, no behavior changes, no refactors of existing functionality, no add new any functionality unless the user explicitly asks.
- Always make UI responsive for desktop, tablet, and mobile (Tailwind responsive prefixes: `sm`, `md`, `lg`) also all color should be from global.css variables for light and dark theme.
- Wrap component/section content in a max-width container centered with `mx-auto` (e.g. `max-w-7xl mx-auto px-4`) so elements stay in the middle of the application.
- Write beginner-friendly code: plain, obvious patterns over clever or advanced ones (no exotic hooks, generics, or abstraction layers).
- Follow the user's command request exactly.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build` / `npm start` — production build/serve
- `npm run lint` — flat-config ESLint (`eslint.config.mjs`). **Baseline already fails**: 4 pre-existing `react-hooks/set-state-in-effect` errors (`EventDetailsJoinedBtn.tsx`, `ui/carousel.tsx`, `EventContextApi.tsx`, `hooks/use-mobile.ts`) + 1 unused-var warning. Don't fix them unless asked; just don't add new ones.
- No test or typecheck scripts exist. Typecheck with `npx tsc --noEmit` (passes clean), then `npm run build` (passes clean). Use those two as verification; lint can't go green.

## Framework quirks (Next.js 16.4.3)

- `cacheComponents: true` and `partialPrefetching: true` are set in `next.config.ts`. With cache components, route segment configs (`export const dynamic`, `revalidate`, `fetchCache`) are **errors** — use `use cache` / `cacheLife` instead. Data fetching must be cache-friendly (see `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`).
- Layouts/pages use the global `LayoutProps<"/route">` / `PageProps` helpers (no import needed), e.g. `function RootLayout({ children }: LayoutProps<"/">)`.
- Route `params`/`searchParams` are Promises — `const { id } = await params` (see `up-comming/[id]/page.tsx`).
- The bundled docs at `node_modules/next/dist/docs/` are version-matched — prefer them over training-data knowledge.

## Auth (better-auth + MongoDB)

- Server config: `src/app/lib/auth.ts` — note it's under **`src/app/lib/`, not `src/lib/`**. MongoDB adapter, email+password **and Google social** enabled, db name hardcoded to `socialEvenets` (sic — it's a real database name, don't "fix" the typo without asking).
- Route handler: `src/app/api/auth/[...all]/route.ts` (`toNextJsHandler(auth)`).
- Client: `src/app/lib/auth-client.ts` exports two things: `authClient` (with `baseURL: process.env.BETTER_AUTH_URL`) and `signIn/signUp/signOut/useSession` from a **second** `createAuthClient()` without `baseURL`. All consumers (sign-in, sign-up, `Navbar`) import from the second one; `authClient` is unused. Don't "consolidate" them — `BETTER_AUTH_URL` has no `NEXT_PUBLIC_` prefix, so it's `undefined` in browser bundles; the bare client falls back to same-origin.
- Requires `.env` (gitignored): `MONGODB_CLIENT_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_GOOGLE_CLIENT_ID` / `BETTER_AUTH_GOOGLE_CLIENT_SECRET`, plus `NEXT_PUBLIC_BASE_URL` (see below). Fresh clones must create it — code reads env with `as string` casts, so missing vars fail at runtime, not typecheck.

## Backend API (separate repo)

- All event data comes from a sibling Express repo at `../social-events-server` (`node index.js`, port **8000**, same `socialEvenets` MongoDB db). It is not part of this repo — start it separately or every data page (`/up-comming`, details, manage-event, create-event) fails at runtime.
- Pages fetch as `${process.env.NEXT_PUBLIC_BASE_URL}<path>` with **no slash inserted**, so the value must end with `/` (e.g. `http://localhost:8000/`). The URL is baked in at build time (`NEXT_PUBLIC_` prefix).

## UI stack (differs from typical shadcn setups)

- shadcn/ui **base-nova** style built on **`@base-ui/react`**, not Radix. Ignore Radix-based shadcn examples and docs; primitives import from `@base-ui/react/*`.
- Tailwind CSS **v4**, CSS-first: no `tailwind.config.*`. Theme tokens and the dark variant (`@custom-variant dark`) live in `src/app/globals.css`, which imports `shadcn/tailwind.css` and `tw-animate-css`. Styling uses Tailwind classes only.
- Add registry components with `npx shadcn add <component>` (`components.json` has the aliases configured); don't hand-copy components from the web.
- `src/lib/utils.ts` only re-exports `cn` from the `cn` package — ui components import `{ cn } from "cn"` directly. There is no `twMerge`/`clsx` helper.
- Theming: `next-themes` `ThemeProvider` in `src/app/layout.tsx`, fixed `defaultTheme="light"`, `enableSystem={false}`, `attribute="class"` (html has `suppressHydrationWarning`). `ThemeToggle` in `src/components/theme-toggle.tsx`.
- Brand color is the custom `--brand` token in `globals.css` (`#38bdf8` sky blue in both light and dark; mapped to Tailwind as `bg-brand` / `text-brand`). Use it instead of hardcoding hex values. Other custom tokens live in the same file (`--sun`, `--nasif`, glass-toast colors), wired up in the `@theme inline` block — add new tokens there.

## Conventions

- Path alias `@/*` → `src/*`. App code lives under `src/` (the README still says `app/` — it's stale create-next-app boilerplate).
- Shared (non-ui) components go in `src/components/<PascalCase>/`; shadcn primitives in `src/components/ui/`; hooks in `src/hooks/`.
- "Joined volunteer" state lives in `src/contextApi/EventContextApi.tsx` and persists to `localStorage` keys `voluntear` / `loading` (sic) — it is not stored on the server.
