# Outcome Vault (OV3)

Planning and delivery analytics for Jira: plans made against real capacity, honest forecasts, and value tracking for delivery leaders. Successor of OV2 (`../OV2`, reference only: read its metric definitions, never port its architecture). Why OV3 exists and what was decided: `docs/context.md`.

## Scope

- **Jira only**, as a commercial proof of concept. No ServiceNow, no web version of the app, no "later integration" code until a paying customer asks for it. The marketing site (`apps/site`) is the one piece outside Jira.
- **One feature at a time.** What the MVP is: `docs/context.md` § The MVP.

## Architecture: API-first, thin client

- A React SPA that only renders data and sends user actions; **all business logic lives behind a typed API**. The frontend never computes business rules.
- The contract is defined once (Zod schemas, shared by both sides); a broken contract fails the build.
- The frontend is built against a mock API (MSW) until the real one exists.
- On Jira: Forge **Custom UI** (frontend) calls **resolvers** (backend) through `invoke` from `@forge/bridge`. The data stays in Atlassian (no outside server).
- Business logic is plain TypeScript functions behind the resolvers, tested with golden values (inputs → expected outputs).
- Use standard names and patterns ("API client", "hooks", "service", "resolver"). No custom architecture terms or layers.
- **Functional, not object-oriented:** plain data (Zod types) and pure functions; classes only where an SDK requires them.
- **Presentational components** (props in, events out) fed by **hooks** that call the API client. Components hold no logic and call no API directly.
- No named design patterns by prescription; use one only where it fits naturally.
- Reuse by composition: schemas extended with `.extend`, `.pick`, `.omit`; types combined with `&` and generics. No inheritance.

## Stack

- TypeScript, pnpm, React, Zod, MSW, Vitest, Atlassian Forge (Custom UI + resolvers).
- UI: every rule in `docs/ui-guidelines.md` (follow it for every screen; a new pattern is added there before it is used).

## Structure and commands

- pnpm workspace:
  - `packages/design`: the design tokens (`tokens.css`) and the brand (the logo built from its specification, export presets, contrast);
  - `apps/site`: the marketing site, one static page prerendered at build;
  - `apps/brand`: the logo generator, a local tool (`pnpm --filter @ov/brand dev`, port 4190).
  - The Forge app joins as `apps/jira` when its first feature starts.
- `pnpm check`: type check, lint, formatting, duplicate check, tests (all must pass). `pnpm build`: `check`, then every app's build.
- Site: `pnpm --filter @ov/site dev` (live preview), `pnpm --filter @ov/site preview` (the built static page).
- `pnpm deploy:site`: build, then publish the site to Firebase Hosting (project and site `outcome-vault`, outcomevault.com). Needs the Firebase CLI signed in (`pnpm exec firebase login --reauth` when it says the credentials expired). Deploy only when the owner asks.

## Rules (few, and enforced by the build where possible)

1. Business logic only behind the API; the UI holds no rules.
2. The shared Zod contract is the single source of truth for every request and response.
3. Contract-first, then tests, then code, for every feature. Four kinds of tests, all blocking the build:
   - golden tests for business functions (real inputs → expected values);
   - component tests (React Testing Library: given these props, the screen shows this);
   - contract tests (the mock API and the real resolvers both answer in the contract's shape);
   - adapter tests (recorded Jira responses → the right contract data).
4. No silent fallbacks: missing data fails loudly.
5. Small changes: one endpoint or one screen per session.
6. Clean code is checked, not promised: strict TypeScript, ESLint, Stylelint (CSS uses only design tokens), Prettier, a cap on function complexity and file size, a duplicate-code check; all block the build.

## Working with the owner

- The owner (Marcos) designs features, not code; don't ask them to read code. Explain in product terms.
- The owner's input is the **what**: features, contracts in product terms (what data each screen asks for and gets back), metric definitions and their expected values. Turn contracts into Zod schemas and expected values into golden tests; the **how** follows standard conventions.
- Be a peer: say when a request is wrong or has a better alternative, before acting.
- Short answers. Commit only when asked; push only when asked.
