<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project: social-events-client

Next.js 16.4.3 App Router client app. npm + `package-lock.json` only — don't introduce another package manager. App code lives under `src/` (the README's `app/` references are stale create-next-app boilerplate). Routes live in three groups under `src/app/`: `(root)` (`/`, `/up-comming`, `/up-comming/[id]`), `(auth)` (`sign-in`, `sign-up`), `(dashboard)` (`create-event`, `joined-event`, `manage-event`). `Navbar` and `Toaster` are global in `src/app/layout.tsx`. Auth is wired to better-auth.

Rule for every request:

- Clone the UI design only — no new features, no behavior changes, no refactors, no added functionality unless explicitly asked.
- Responsive for desktop/tablet/mobile (Tailwind `sm`/`md`/`lg`); all colors from `src/app/globals.css` CSS variables (light + dark), never hardcoded hex.
- Wrap section content in a centered max-width container (`max-w-7xl mx-auto px-4`).
- Plain, obvious code — no exotic hooks, generics, or abstraction layers.

Commands:

- `npm run dev` — dev server (Turbopack)
- `npm run build` / `npm start` — production build/serve
- `npm run lint` — flat-config ESLint (`eslint.config.mjs`). Baseline already fails: 2 pre-existing `react-hooks/set-state-in-effect` errors (`src/components/ui/carousel.tsx`, `src/hooks/use-mobile.ts`). Don't fix unless asked; don't add new ones.
- No test or typecheck scripts. Verify with `npx tsc --noEmit` (passes clean), then `npm run build` (passes clean). Lint can't go green.

Next.js 16.4.3 quirks:

- `cacheComponents: true` and `partialPrefetching: true` in `next.config.ts`. Route segment configs (`export const dynamic`, `revalidate`, `fetchCache`) are errors — use `use cache` / `cacheLife` instead. Data fetching must be cache-friendly (see `node_modules/next/dist/docs/01-app/02-guides/migrating-to-cache-components.md`).
- Layouts/pages use the global `LayoutProps<"/route">` / `PageProps` types (no import needed), e.g. `function RootLayout({ children }: LayoutProps<"/">)`.
- Route `params` / `searchParams` are Promises — `const { id } = await params` (see `src/app/(root)/up-comming/[id]/page.tsx`).
- Prefer the bundled docs in `node_modules/next/dist/docs/` over training data; they're version-matched.

Auth (better-auth + MongoDB):

- Server config: `src/app/lib/auth.ts` (NOT `src/lib/`). MongoDB adapter; email+password and Google social enabled. DB name is hardcoded `socialEvenets` (typo — don't "fix" without asking).
- Route handler: `src/app/api/auth/[...all]/route.ts` (`toNextJsHandler(auth)`).
- Client: `src/app/lib/auth-client.ts` exports two clients. `authClient` (with `jwtClient()`) is used for `authClient.token()` in client components; `signIn`/`signUp`/`signOut`/`useSession` come from a second bare `createAuthClient()`. Don't consolidate — `BETTER_AUTH_URL` lacks the `NEXT_PUBLIC_` prefix so it's `undefined` in browser bundles; the bare client falls back to same-origin.
- `.env` is gitignored and required: `MONGODB_CLIENT_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, `BETTER_AUTH_GOOGLE_CLIENT_ID`, `BETTER_AUTH_GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_BASE_URL`. Fresh clones must create it — env is read with `as string` casts, so missing vars fail at runtime, not typecheck. On Vercel set these in the dashboard; Vercel can't reach local Mongo — use Atlas, allow `0.0.0.0/0`, and cache the `MongoClient` on `global` to avoid `MongoTopologyClosedError`.

Backend API (separate repo):

- Event data comes from the sibling Express repo `../social-events-server` (`node index.js`, port 8000, same `socialEvenets` db). Start it separately or data pages (`/up-comming`, details, manage-event, create-event) fail at runtime.
- Pages fetch `${process.env.NEXT_PUBLIC_BASE_URL}<path>` with no slash inserted — `NEXT_PUBLIC_BASE_URL` must end with `/` (e.g. `http://localhost:8000/`). It's `NEXT_PUBLIC_`-prefixed, so baked in at build time.

UI stack (differs from typical shadcn):

- shadcn/ui **base-nova** built on **`@base-ui/react`**, not Radix. Ignore Radix-based shadcn examples; primitives import from `@base-ui/react/*`.
- Tailwind CSS v4, CSS-first: no `tailwind.config.*`. Theme tokens and `@custom-variant dark` live in `src/app/globals.css` (imports `shadcn/tailwind.css` and `tw-animate-css`). Style with Tailwind classes only.
- Add registry components with `npx shadcn add <component>` (`components.json` aliases configured); don't hand-copy from the web.
- `src/lib/utils.ts` re-exports `cn` from the `cn` package — UI components import `{ cn } from "cn"` directly. No `twMerge`/`clsx` helper.
- Theming: `next-themes` `ThemeProvider` in `src/app/layout.tsx`, `defaultTheme="light"`, `enableSystem={false}`, `attribute="class"` (html has `suppressHydrationWarning`). `ThemeToggle` at `src/components/theme-toggle.tsx`.
- Brand color is `--brand` (`#38bdf8`, mapped to `bg-brand`/`text-brand`) in `globals.css`. Other tokens (`--sun`, `--nasif`, glass-toast colors) are wired in the `@theme inline` block — add new tokens there.

Conventions:

- Path alias `@/*` → `src/*`.
- Shared non-ui components in `src/components/<PascalCase>/`; shadcn primitives in `src/components/ui/`; hooks in `src/hooks/`.
- "Joined volunteer" state lives in `src/contextApi/EventContextApi.tsx` as in-memory React context (not persisted, not on the server). Components that join/leave must update it via `setJoined` or the UI goes stale.
- `src/proxy.ts` is an auth guard for `/create-event`, `/joined-event`, `/manage-event`, but it's named `proxy.ts` not `middleware.ts`, so Next.js doesn't auto-register it.
