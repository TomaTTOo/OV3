# Outcome Vault (OV3)

A PI planning board for Jira that plans against real capacity: each team's capacity measured from its own history, with the probability of delivering what is committed. Successor of OV2 (`../OV2`, reference only: read its metric definitions, never port its architecture).

## Docs map

Each file is the one owner of its subject: point to it, never restate it. Read only what the task needs.

| File                            | Owns                                                                                                           | Read when                                       |
| ------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- |
| `docs/context.md`               | What OV3 is, the plan and stop rule, where it stands, **last session**, next actions, challenges               | Every session (`/startup`)                      |
| `docs/features/Fxx-name.md`     | One feature's spec                                                                                             | Working on that feature                         |
| `docs/mvp.md`                   | The MVP's decisions: teams, PI, views, permissions, capacity, findings, "Apply to Jira", practice and training | Writing or building a feature                   |
| `docs/product.md`               | Positioning, audience, jobs to be done, does / does not, product principles                                    | Writing a spec or product copy                  |
| `docs/decisions.md`             | Every decision with its reason and what was rejected                                                           | Before reopening a topic                        |
| `docs/ui-guidelines.md`         | Every rule about screens (§ 1–8 the Jira apps, § 9 the website)                                                | Any screen                                      |
| `docs/engineering/platform.md`  | Forge and Jira API changes, scopes, limits, test data, calibration, usage measurement, OV2 lessons             | Touching Forge, Jira, dependencies or tests     |
| `docs/engineering/privacy.md`   | What is stored and never stored; works councils; GDPR                                                          | Touching stored data, people in schemas, scopes |
| `docs/business/go-to-market.md` | Pricing, the beta, promotion, the website's decisions, launch checklist, tax                                   | Site content, pricing, launch work              |
| `docs/business/market.md`       | Competitors, research, the business assessed                                                                   | Rarely: positioning or copy                     |
| `docs/how-we-build.md`          | The concepts behind the rules here, in plain words                                                             | When a rule needs explaining                    |
| `docs/brand/logo.md`            | The logo's specification                                                                                       | Brand work                                      |

A fresh session starts with `/startup`. Every working session ends by rewriting `docs/context.md` § Last session (what was done, where it stopped, the next step, open questions) and updating § Where it stands and § Next actions if they changed.

## Scope

- **Jira Cloud only**, as a commercial proof of concept. No ServiceNow, no Data Center, no "later integration" code until a paying customer asks for it.
- **What gets built** (`docs/mvp.md`, `docs/context.md` § The plan): a free, read-only Reality Check app and a paid PI planning board, both Forge apps on the Marketplace; a public demo board on the website. Built now, within the plan's time box; the stop rule decides whether work continues.
- **One feature at a time:** a mini-spec in `docs/features/Fxx-name.md`, pointing to the sections of `docs/mvp.md` it relies on → the owner approves → contract, tests, code → demo → the owner validates → the next.
- No code outside the approved feature's scope; no speculative packages or abstractions.

## Architecture: API-first, thin client

- A React SPA that only renders data and sends user actions; **all business logic lives behind a typed API**. The frontend never computes business rules.
- The contract is defined once (Zod schemas, shared by both sides); a broken contract fails the build.
- The frontend is built against a mock API (MSW) until the real one exists.
- On Jira: Forge **Custom UI** (frontend) calls **resolvers** (backend) through `invoke` from `@forge/bridge`.
- Business logic is plain TypeScript functions behind the resolvers, tested with golden values (inputs → expected outputs). The same functions serve both apps and the demo.
- **The demo board** on the static website has no backend: its forecasts are computed at build time from the fixtures and shipped as data. The browser still computes nothing.
- **Platform edges:** every Jira call goes through one adapter (Jira response → contract); Forge-specific code (Realtime, storage, the UI bridge) sits behind small interfaces. Realtime always has a fallback (periodic refresh of the board state). Why: `docs/engineering/platform.md`.
- Use standard names and patterns ("API client", "hooks", "service", "resolver"). No custom architecture terms or layers.
- **Functional, not object-oriented:** plain data (Zod types) and pure functions; classes only where an SDK requires them.
- **Presentational components** (props in, events out) fed by **hooks** that call the API client. Components hold no logic and call no API directly.
- No named design patterns by prescription; use one only where it fits naturally.
- Reuse by composition: schemas extended with `.extend`, `.pick`, `.omit`; types combined with `&` and generics. No inheritance.

## Data and privacy (why: `docs/engineering/privacy.md`)

- **Nothing leaves Atlassian** from the Forge apps: no analytics, error reporting, logging services, CDNs, online APIs or any outside call. This keeps the "Runs on Atlassian" status; one outside call loses it.
- **Teams, never individuals:** no schema has a per-person metric or per-person absence; metrics are computed and shown per team, above a minimum team size (a setting).
- **Account IDs only:** never store names or emails; fetch display names from Jira when showing them.
- Store plan state and team aggregates, not copies of issues or their history.
- **Scopes are the owner's decision:** never add a Forge scope without approval. A new scope makes every customer's admin re-approve the app. The Reality Check has read scopes only.
- Fixtures committed to the repo have contributors' names anonymised.

## Stack

- TypeScript (6.0: the TypeScript linter does not support 7 yet), pnpm, React, Zod, MSW, Vitest, Atlassian Forge (Custom UI + resolvers) for the apps (not started). Dependency versions pinned; Forge packages updated deliberately.
- The website: React prerendered to static HTML by Vite; CSS Modules using only the design tokens (Stylelint enforces it); Sora served by the site (Fontsource, never Google Fonts); `zod/mini` for the contact form's schema; Firebase's lite Firestore SDK, loaded only when a message is sent; Umami analytics (cookieless, website only, never in the Forge apps).
- Firebase project `outcome-vault` (free Spark plan): Hosting (outcomevault.com) and Firestore (`eur3`, contact messages only, `firestore.rules`).
- Brand tooling: `sharp` renders images at build, `opentype.js` turned the wordmark into shapes once.
- UI: every rule in `docs/ui-guidelines.md` (follow it for every screen; a new pattern is added there before it is used).

## Structure and commands

- pnpm workspace:
  - `packages/design`: the design tokens (`tokens.css`) and the brand (the logo built from its specification, export presets, contrast);
  - `apps/site`: the marketing site, one static page prerendered at build;
  - `apps/brand`: the logo generator's source. `pnpm --filter @ov/brand build` writes it as one self-contained file, `docs/brand/logo-generator.html`, opened straight from disk (`dev`, port 4190, for live editing).
  - Joining when their first feature starts: the shared contract and business logic (packages), the Reality Check app and the board app (two Forge apps, two Marketplace listings). Names and boundaries decided in the first feature's spec.
- `pnpm check`: type check, lint, formatting, duplicate check, tests (all must pass); `forge lint` joins it with the first Forge app. `pnpm build`: `check`, then every app's build.
- Site: `pnpm --filter @ov/site dev` (live preview), `pnpm --filter @ov/site preview` (the built static page).
- `pnpm test:rules`: the Firestore rules tests on the emulator (needs Java). `pnpm deploy:rules`: publish `firestore.rules` to the project (after any change to them).
- `pnpm deploy:site`: build, then publish the site to Firebase Hosting (project and site `outcome-vault`, outcomevault.com). Needs the Firebase CLI signed in (`pnpm exec firebase login --reauth` when it says the credentials expired). Deploy only when the owner asks.

## Rules (few, and enforced by the build where possible)

1. Business logic only behind the API; the UI holds no rules.
2. The shared Zod contract is the single source of truth for every request and response.
3. Contract-first, then tests, then code, for every feature. Four kinds of tests, all blocking the build:
   - golden tests for business functions (real inputs → expected values);
   - component tests (React Testing Library: given these props, the screen shows this);
   - contract tests (the mock API and the real resolvers both answer in the contract's shape);
   - adapter tests (recorded Jira responses → the right contract data).

   The forecast calibration back-test (`docs/engineering/platform.md`) is a report script, run on demand, not a build step.

4. No silent fallbacks: missing data fails loudly. (A designed fallback, like Realtime → periodic refresh, is not silent: it is specified and shown.)
5. Small changes: one endpoint or one screen per session.
6. Clean code is checked, not promised: strict TypeScript, ESLint, Stylelint (CSS uses only design tokens), Prettier, a cap on function complexity and file size, a duplicate-code check; all block the build.
7. No configuration values in code: business parameters (percentiles, history windows, thresholds, minimum history, minimum team size, unplanned allowance) are settings with their defaults in one place; visual values are design tokens.

## Working with the owner

- **A partner, not an executor, on every prompt.** Before acting, check whether the request makes sense and what its consequences are; give your advice, suggestions or recommendations first; agree or disagree, and say why. The decision is the owner's (no need to say so in replies). Hold every feature to the time box and the stop rule (`docs/context.md` § The plan): flag scope that would push the MVP past it.
- The owner (Marcos) designs features, not code; don't ask them to read code. Explain in product terms.
- The owner's input is the **what**: features, contracts in product terms (what data each screen asks for and gets back), metric definitions and their expected values. Turn contracts into Zod schemas and expected values into golden tests; the **how** follows standard conventions.
- Quality over completion: no workarounds or hacks; if the clean way is blocked, say so instead.
- Check your own earlier statements too: correct a mistake openly as soon as you spot it.
- Before re-opening a decided topic, read `docs/decisions.md`; change a decision there, with its reason, never silently in code.
- A single source of truth for docs as well as code: a rule or decision is written once, in its owner's file (Docs map); elsewhere, point to it.
- UI work is done only once seen: screenshots on desktop and phone (no sideways scroll), with motion and without.
- Short answers, in plain words; a recommendation, not a survey of options.
- Commit, push and deploy only when asked. Work on `main` only; no feature branches or extra worktrees.
- Claude runs local previews and servers for the owner when needed (`pnpm --filter @ov/site dev`, the logo generator).
- Never print `.env*` files: they hold credentials. Customer data is never pasted into prompts or outside tools.
