# Dennis Maina — Portfolio

A modern, full-stack rebuild of a personal portfolio site that started life as
plain HTML, CSS, and vanilla JavaScript. The visual design, content, and every
original interaction (scroll-reveal animations, theme toggle, mobile menu,
animated stats, contact-form validation, etc.) are preserved — only the
implementation changed.

## Stack

| Layer     | Technology                                                                 |
| --------- | --------------------------------------------------------------------------- |
| Frontend  | React 19 + TypeScript + Vite                                               |
| Backend   | Node.js + Express + TypeScript                                             |
| Validation| Zod (shared logic between frontend and backend)                            |
| Testing   | Vitest + Testing Library (frontend), Vitest + Supertest (backend)          |
| Tooling   | ESLint (flat config), Prettier, npm workspaces                             |

### Why this stack, and not something else

**No database.** The original site is a static personal portfolio: a fixed
set of sections (About, Skills, Projects, Experience...) that only change
when Dennis edits them himself, plus one contact form. None of that needs to
be queried, filtered, or updated by a user at runtime, so a database would
add an operational dependency (hosting, backups, migrations) with nothing to
show for it. Content lives in [`frontend/src/data/portfolio.ts`](frontend/src/data/portfolio.ts) — a single
typed file that is trivial to edit and is version-controlled like everything
else. If the site ever grows a real need for dynamic, frequently-changing
data (e.g. a blog with an admin UI), that is the point to introduce
PostgreSQL — not before.

**A real (small) backend, not a "fake" one.** The one piece of genuine
server-side logic the original site has is the contact form. The original
vanilla-JS version only *pretended* to send it — it validated the fields and
showed a fake "success" message, but no email ever went anywhere. Giving the
form a real Express API means messages actually reach an inbox, with
server-side validation (the client can be bypassed; the server can't),
rate limiting, and a honeypot field against basic bots. This is deliberately
the *only* backend responsibility — no auth, no sessions, no ORM — because
nothing else in the brief needs one.

**React + Vite over Next.js.** This site has no server-rendered routes, no
per-request data fetching, and no SEO requirement beyond static meta tags
(which a plain `index.html` already provides). Next.js's App Router, data
fetching conventions, and server components solve problems this project
doesn't have; Vite gives the same modern TypeScript + React developer
experience with a much smaller mental model, which matters given you're
still learning the framework.

**npm workspaces over a single package.json.** `frontend` and `backend` have
almost no shared runtime code and deploy to different places (a static host
vs. a Node process), so keeping their dependencies separate avoids a
frontend bundle accidentally pulling in `express`, and vice versa. A single
root `package.json` still ties them together for convenience scripts
(`npm run dev` starts both).

## Project structure

```text
portfolio-website/
├── frontend/                  React + Vite app
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/        Header, Footer, BackToTop, PageLoader, ...
│   │   │   ├── sections/      One component per page section (Hero, About, ...)
│   │   │   └── ui/            Small reusable pieces (Button, Reveal, icons)
│   │   ├── features/contact/  The contact form: schema, component, section
│   │   ├── hooks/             Ported interactions (scroll-spy, reveal, ripple, ...)
│   │   ├── services/          contactApi.ts — talks to the backend
│   │   ├── data/portfolio.ts  ALL page content lives here
│   │   └── styles/global.css  The original stylesheet, carried over as-is
│   └── public/                Static assets (favicon, robots.txt)
│
├── backend/                    Express API (contact form only)
│   └── src/
│       ├── config/env.ts       Validates every environment variable at startup
│       ├── routes/ + controllers/  HTTP layer
│       ├── schemas/            Zod validation (the source of truth)
│       ├── services/email/     EmailService interface + console/SMTP adapters
│       └── middleware/         Error handling, request logging, validation
│
├── eslint.config.js             Shared lint config for both workspaces
├── .prettierrc.json
└── package.json                 Root scripts (dev, build, test, lint, ...)
```

## Prerequisites

- **Node.js 20.19+ or 22.12+** (required by Vite 8 — check with `node -v`)
- **npm 10+**

## Installation

```bash
git clone <your-repo-url> portfolio-website
cd portfolio-website
npm install
```

This installs dependencies for the root, `frontend`, and `backend`
workspaces in one step.

## Environment configuration

Copy the example files and adjust as needed:

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

**Backend** (`backend/.env`) — the important ones:

- `EMAIL_TRANSPORT` — `console` (default; prints messages to the terminal,
  perfect for local development) or `smtp` (sends real email; **required**
  in production).
- `CORS_ORIGIN` — the frontend's URL. Required in production.
- See `backend/.env.example` for the full list with explanations.

**Frontend** (`frontend/.env`) — usually nothing to change in development;
`VITE_API_URL` is only needed once you deploy (see below).

The server **refuses to start** in production with an incomplete or unsafe
configuration (e.g. `NODE_ENV=production` with `EMAIL_TRANSPORT=console`)
rather than silently dropping contact messages.

## Running locally

```bash
npm run dev
```

This starts both the backend (`http://localhost:4000`) and the frontend
(`http://localhost:5173`) together, with Vite proxying `/api/*` requests to
the backend — so there's nothing to configure to make the contact form work
locally.

To run them separately: `npm run dev:backend` / `npm run dev:frontend`.

## Building for production

```bash
npm run build      # builds backend then frontend
npm run start       # runs the built backend (serve frontend/dist with any static host)
```

- `backend/dist/` — compiled Node.js output, started with `node dist/server.js`.
- `frontend/dist/` — a static site: upload it as-is to Netlify, Vercel,
  GitHub Pages, S3/CloudFront, or any static host. Set `VITE_API_URL` in
  `frontend/.env` (or your host's environment settings) to the backend's
  deployed URL before building, since the two typically live on different
  domains in production.

## Available npm scripts (from the repo root)

| Script                | What it does                                            |
| ---------------------- | -------------------------------------------------------- |
| `npm run dev`          | Runs frontend + backend together, with hot reload        |
| `npm run build`        | Builds both workspaces for production                    |
| `npm run start`        | Runs the built backend                                   |
| `npm run test`         | Runs backend and frontend test suites (29 tests total)   |
| `npm run typecheck`    | Type-checks both workspaces with no emitted output       |
| `npm run lint`         | ESLint across the whole repo                              |
| `npm run format`       | Formats the whole repo with Prettier                      |
| `npm run check`        | lint + typecheck + test + build, in that order            |

## Important architectural decisions

- **The email service is an interface, not a hard dependency.** Controllers
  depend on `EmailService` (`sendContactMessage`), never on Nodemailer or SMTP
  directly. Switching to a provider API (Resend, SendGrid, SES) later means
  writing one new class and changing one line in
  `backend/src/services/email/index.ts` — nothing else in the app changes.
  This is the same pattern you'd use for a payment gateway or a third-party
  API integration.
- **Validation lives on the server; the client mirrors it.** The Zod schema
  in `backend/src/schemas/contact.schema.ts` is the actual contract — it's
  what rejects bad data. The frontend's copy in
  `frontend/src/features/contact/contact.schema.ts` exists only so the visitor
  sees an error instantly instead of waiting for a round trip; if the two
  ever disagree, the server always wins.
- **Errors carry a `code`, not just a message.** Every API error response has
  the shape `{ error: { code, message, fields? } }`. A stable `code` (like
  `RATE_LIMITED` or `VALIDATION_ERROR`) is something frontend code can safely
  branch on; a human-readable `message` can change wording without breaking
  anything that depends on it.
- **A honeypot field, not a CAPTCHA.** A hidden `website` input that real
  visitors never see or fill in (and that's skipped in tab order) catches
  the majority of automated spam without asking a human to solve a puzzle.
  Combined with server-side rate limiting, this is proportionate to what a
  portfolio contact form actually needs.

## How the original HTML/CSS/JS became this app

| Original                                            | Now                                                                 |
| ------------------------------------------------------ | ---------------------------------------------------------------------- |
| One long `index.html` with every section inline        | One React component per section, composed in `App.tsx`                 |
| Content mixed into the markup                          | Extracted into `data/portfolio.ts` — edit content without touching JSX |
| `styles.css` (hand-written CSS variables + classes)     | Carried over almost verbatim — same variables, same class names        |
| `document.querySelector` + manual class toggling        | React state + hooks (`useScrollSpy`, `useMobileMenu`, `useTheme`, ...) |
| `IntersectionObserver` wired up by hand for animations  | Wrapped in a reusable `<Reveal>` component / `useReveal` hook          |
| Contact form: client-only validation, no real submission | Real Zod-validated POST to an Express API, with an actual email backend |
| Google Fonts loaded from a CDN via `@import`            | Self-hosted via `@fontsource/poppins` (Latin subset only) — no external font request |
| Font Awesome loaded from a CDN                          | `react-icons` — no external stylesheet, tree-shaken to only the icons used |

One small, deliberate fix: the original site's mobile hero text was hidden
behind the fixed header (the header grows taller once JS injects the
theme-toggle button, but the hero's top padding was a fixed value that didn't
account for that). This rebuild adjusts that one padding value so the hero is
fully visible on mobile — everything else about the mobile layout, including
the original's left-aligned mobile menu, is unchanged.

## Deployment

Any platform that runs a Node.js process works for the backend (Render,
Railway, Fly.io, a plain VPS, ...); any static host works for the frontend
(Netlify, Vercel, GitHub Pages, Cloudflare Pages, ...). There's no coupling
between them beyond the `VITE_API_URL` / `CORS_ORIGIN` environment variables,
so they can live on entirely different providers.
