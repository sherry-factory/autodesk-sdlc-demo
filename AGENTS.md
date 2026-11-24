# AGENTS.md

To-do web app for the Factory Workstreams SDLC demo. Vite + React + TypeScript, persisted in `localStorage`, no backend.

## Setup

- Node 22 or later, with npm (do not use pnpm or yarn).
- Install dependencies: `npm ci`
- Install the Playwright browser once: `npx playwright install --with-deps chromium`

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server on http://localhost:5173 |
| `npm run build` | Type-check (`tsc -b`) and build to `dist/` |
| `npm test` | Vitest unit and component tests (`vitest run`, jsdom) |
| `npm run e2e` | Playwright smoke test; builds the app and serves it on port 4173 |

## Layout

- `src/todos.ts`: the `Todo` type, pure list operations, and `localStorage` load/save under `STORAGE_KEY`.
- `src/useTodos.ts`: React hook that owns the list state and saves on every change.
- `src/App.tsx`, `src/index.css`: the UI.
- `src/*.test.ts(x)`: Vitest tests. `src/test/setup.ts` clears `localStorage` after each test.
- `e2e/`: Playwright specs. Vitest only collects tests under `src/`.
- `.github/workflows/ci.yml`: the `ci` check (unit tests and e2e) on every pull request.
- `.github/workflows/droid-review.yml`: the `droid-review` check (Droid code review) on every pull request.

## Rules

- **Never push to main.** Create a branch, push it, and open a pull request. `main` only changes through reviewed, merged PRs.
- **One PR per ticket.** Title it `[<TICKET-ID>] <ticket title>` and link the ticket in the body. Do not mix tickets in one branch.
- **Tests must pass before opening a PR.** Run `npm test` and `npm run e2e` locally; both must be green. Add or update tests for every behavior you change.
- Never force-push a shared branch, and never merge your own PR.
- Keep user-facing behavior covered by role- and label-based queries (`getByRole`, `getByLabel`) so tests survive markup changes.
