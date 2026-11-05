# Social Events Client

A community-service and social-development events platform built with **Next.js (App Router)**. Users can discover upcoming events, register and log in, create and manage their own events, and join events organised by others.

This is the frontend. It works together with the [Social Events Server](../social-events-server), an Express + MongoDB REST API that protects its private routes with JWT validation.

## Features

### Layout

- **Navbar** with the app logo/name and an *Upcoming Events* link
  - Logged out: a **Login** button
  - Logged in: the user's **profile picture** (hover shows the display name) and a **Logout** button
  - Profile picture dropdown: **Create Event**, **Manage Events**, **Joined Events** (all private routes)
- **Footer** with relevant information and an eye-catching design
- **Dark / Light theme toggle** that switches the entire app between themes

### Authentication

- Email + password **registration** (name, email, photo URL, password)
- Email + password **login**, plus Google or GitHub social login
- Password validation: at least one uppercase letter, one lowercase letter, and a minimum length of 6 characters. Errors are shown as toasts.
- Success toast after login and registration
- Private routes redirect unauthenticated users to the login page
- Built with [better-auth](https://www.better-auth.com/) and MongoDB. Better-auth issues the JWT that the server validates.

### Pages

| Page | Route | Access | Description |
| --- | --- | --- | --- |
| Home | `/` | Public | Banner, features, 6 recent upcoming events, static photo gallery, newsletter section (UI only) |
| Upcoming Events | `/up-comming` | Public | Grid of all events whose date has not passed |
| Event Details | `/up-comming/[id]` | Public | Full event details and a **Join Event** button (login required to join) |
| Login | `/sign-in` | Public | Email/password and social login |
| Register | `/sign-up` | Public | Name, email, photo URL, password |
| Create Event | `/create-event` | Private | Form to create an event; redirects to Upcoming Events on success |
| Joined Events | `/joined-event` | Private | Events joined by the logged-in user, sorted by event date |
| Manage Events | `/manage-event` | Private | Events created by the logged-in user, with update and delete |

### Event Rules

- An event has a **title, description, event type** (Cleanup, Plantation, Donation, etc.), **thumbnail image URL, location,** and **event date**.
- The event date must be in the **future**; past dates are rejected.
- The creator's email is stored with the event, so only the owner can update or delete it.
- Past events never appear on the Upcoming Events page.
- Joining an event stores the event and user data in the database.

## Tech Stack

- [Next.js](https://nextjs.org/) App Router + React 19
- TypeScript
- [better-auth](https://www.better-auth.com/) with `@better-auth/mongo-adapter` (MongoDB)
- [shadcn/ui](https://ui.shadcn.com/) (base-nova style) on `@base-ui/react`
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first config in `src/app/globals.css`)
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark theming

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Global layout (Navbar, Footer, Toaster, ThemeProvider)
│   │   ├── page.tsx            # Home page
│   │   ├── not-found.tsx       # Global 404 page
│   │   ├── globals.css         # Tailwind v4 tokens and light/dark theme variables
│   │   ├── favicon.ico
│   │   ├── api/                # Next.js API routes (auth handler)
│   │   ├── (root)/             # Public pages
│   │   │   ├── _components/    # Components used only by public pages
│   │   │   ├── up-comming/     # Upcoming events list
│   │   │   │   └── [id]/       # Event details
│   │   │   └── not-found.tsx
│   │   ├── (auth)/             # Authentication pages
│   │   │   ├── layout.tsx
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   └── (dashboard)/        # Private pages
│   │       ├── layout.tsx
│   │       ├── _components/    # Components used only by dashboard pages
│   │       ├── create-event/
│   │       ├── joined-event/
│   │       └── manage-event/
│   ├── components/             # Shared components (shadcn/ui primitives in ui/)
│   ├── contextApi/             # React context providers
│   ├── hooks/                  # Custom React hooks
│   ├── lib/                    # Utilities and auth configuration
│   ├── Type/                   # TypeScript types
│   └── proxy.ts                # Next.js proxy (replaces middleware), used for route protection
├── .env                        # Environment variables (gitignored)
├── AGENTS.md                   # Project notes and exact env variable names
├── components.json             # shadcn/ui configuration
├── eslint.config.mjs           # ESLint flat config
├── next.config.ts
├── package.json
├── package-lock.json
└── tsconfig.json
```

The `_components` folders are private folders: Next.js does not treat them as routes, so they are safe places for components that belong to a single route group.

## Getting Started

### Prerequisites

- Node.js 18 or later
- **npm** (the project uses `package-lock.json`; please don't switch package managers)
- A MongoDB database (shared with the server)
- The [Social Events Server](../social-events-server) running locally


### Installation


### 1. Install dependencies
```bash
git clone <https://github.com/nasifmustufakhan7220/social-events-client.git>
cd <social-events-client>
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root (it is gitignored). Use the exact variable names listed in `AGENTS.md`. Typically you need:

```env
# MongoDB connection used by better-auth
MONGO_CLIENT_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/

# better-auth
BETTER_AUTH_SECRET=<a-long-random-string>
BETTER_AUTH_URL=http://localhost:3000

# Social login (whichever provider you implement)
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
# GITHUB_CLIENT_ID=<your-github-client-id>
# GITHUB_CLIENT_SECRET=<your-github-client-secret>

# Base URL of the Express server
NEXT_PUBLIC_SERVER_URL=http://localhost:8000
```

> The database name is hardcoded as `socialEvenets` and must match the server's database.

### 3. Start the server

Event data comes from the Express API. Run it in a separate terminal, otherwise data pages will fail at runtime:

```bash
cd ../social-events-server
node index.js        # http://localhost:8000
```

In the server's `.env`, set `CLIENT_URL` to this app's URL **with a trailing slash** (e.g. `http://localhost:3000/`). The server verifies tokens against `${CLIENT_URL}api/auth/jwks`.

### 4. Run the client

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Dev server (Turbopack) on `http://localhost:3000` |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npx tsc --noEmit` | Type-check the project |

## JWT-Protected API Calls

Private server routes require a valid JWT. The client sends the token from better-auth in the request header:

```
Authorization: Bearer <token>
```

The server validates it using the JWKS published at `/api/auth/jwks`. Missing or invalid tokens receive a `401` response.

| Client action | Server endpoint | Protected |
| --- | --- | --- |
| List all events | `GET /all` | No |
| Event details | `GET /up-comming/:id` | No |
| Create event | `POST /create-event` | Yes |
| My events | `GET /manage-event/:email` | Yes |
| Update event | `PATCH /manage-event/:id` | Yes |
| Delete event | `DELETE /manage-delete/:id` | Yes |
| Join event | `POST /joined-users` | Yes |
| My joined events | `GET /joined-users/:email` | Yes |
| Leave event | `DELETE /joined-users/:id` | Yes |
| Users who joined an event | `GET /joined-events/:id` | Yes |

## Conventions

- Path alias: `@/*` maps to `src/*`.
- Shared components live in `src/components/<PascalCase>/`, shadcn primitives in `src/components/ui/`, hooks in `src/hooks/`.
- Add shadcn components with `npx shadcn add <component>`.
- Style with Tailwind classes and the CSS variables in `globals.css` (no hardcoded hex colors) so both themes work.
- Wrap section content in `max-w-7xl mx-auto px-4`.
- Route `params` and `searchParams` are Promises: `const { id } = await params`.

## Linting Note

`npm run lint` currently reports 2 pre-existing `react-hooks/set-state-in-effect` errors. Please don't introduce new ones.

## Deployment

Deploy on [Vercel](https://vercel.com/) and add the same environment variables in the project settings. Update `BETTER_AUTH_URL` and `NEXT_PUBLIC_SERVER_URL` to the production URLs, and set the server's `CLIENT_URL` to the deployed client URL (with a trailing slash).

## License

This project is licensed under the MIT License.
