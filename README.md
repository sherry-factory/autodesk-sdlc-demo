# autodesk-sdlc-demo

A small to-do web app used to demo an agentic SDLC on Factory Workstreams: Product, Spec and Engineering workstreams hand tickets to each other through a Linear board, and every change lands here as a reviewed pull request.

## Stack

Vite, React and TypeScript. To-dos are saved in the browser's `localStorage`; there is no backend. Vitest runs the unit and component tests, and Playwright runs one end-to-end smoke test.

## Commands

```bash
npm ci                                      # install dependencies
npx playwright install --with-deps chromium # once, before the first e2e run
npm run dev                                 # dev server on http://localhost:5173
npm run build                               # type-check and build to dist/
npm test                                    # Vitest (jsdom)
npm run e2e                                 # Playwright smoke test against the production build
```

## Contributing

See [AGENTS.md](./AGENTS.md). In short: never push to `main`, one PR per ticket, and `npm test` and `npm run e2e` must pass before you open a PR. Every PR runs the `ci` and `droid-review` checks.
