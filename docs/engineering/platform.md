# Platform, test data and lessons from OV2

How OV stays safe as Forge and Jira change, how it is tested without a real Jira team, how its forecasts are checked and its usage measured, and what OV2 taught. Read when touching Forge, Jira APIs, dependencies, tests or measurement. The rules these explain are in `CLAUDE.md`.

## Platform risk: Forge and Jira API changes

- **Forge is the safer choice:** Atlassian's strategic platform; Connect is being phased out.
- **Jira Cloud has no version to pin:** it updates continuously. What changes are the Jira REST APIs (versioned, deprecated with advance notice), the Forge packages (versioned npm packages), the Forge runtime and manifest, and Preview features such as Forge Realtime (the most exposed part of OV).
- **Past examples:** the old issue-search endpoint replaced by a new JQL search endpoint; the original UI Kit deprecated; the sandboxed runtime replaced by a Node.js runtime (check details against Atlassian's developer changelog).

How OV stays safe:

1. All Jira calls go through one adapter (Jira response → contract); all Forge-specific code (Realtime, storage, UI bridge) behind small interfaces. A platform change touches one adapter, never the forecasting logic or the board.
2. Contract tests on recorded Jira responses run in every build; recordings refreshed periodically from a test site.
3. Dependency versions pinned; Forge packages updated deliberately.
4. Atlassian's developer changelog and deprecation notices watched.
5. `forge lint` and a deploy to a test site in the build.
6. A fallback for Realtime (periodic refresh of the board state): a change in a Preview feature degrades the experience, never breaks it.
7. About 10–20% of development time budgeted for maintenance.

### Limits and costs (research, 2026-10-15; check again before relying on them)

- **Forge Realtime:** still labelled Preview; 50 operations per second per installation (3,000 per minute), counting subscribe, publish and token signing; excess requests fail and must be retried.
- **Forge invocations:** 300 per second and 7,000 per minute per installation; 1,200 per minute per user.
- **Forge consumption pricing** applies since January 1, 2026: heavy real-time use has a direct cost.

### Scopes

- An update that adds permissions (scopes) needs every customer's admin to approve it; until then they stay on the old version. Updates without new scopes reach customers automatically.
- The Reality Check: read scopes only.
- The board: read scopes plus the write scopes "Apply to Jira" needs, planned up front, nothing broader.
- Adding a scope is the owner's decision (`CLAUDE.md`).

## Test data without a real Jira team

OV2 relied on synthetic data and a tunnel to a Jira site with no real team. API-first removes that dependency:

- **Business logic:** tested on fixtures cut from the **Public Jira Dataset** (research dataset, 2022: millions of real issues from 16 public Jira instances such as Apache, MongoDB, Red Hat, Hyperledger, Spring, Atlassian's own, with their change history, and sprints and story points where teams used them), converted to the Zod contract's shape, with contributors' names anonymised. Also the source of the calibration back-test and the demo board. Check its licence before commercial use.
- **Jira adapter** (Jira response → contract): tested with a few real responses recorded once from a public instance (e.g. `issues.apache.org/jira`, REST API without login; read gently).
- **UI:** runs on the mock API (MSW) fed with the same fixtures.
- **End to end:** OV's own free Jira Cloud developer site with an imported subset; it loses transition history, so it checks screens, not metrics.
- **Later:** anonymized data from pilot customers, with their written consent.

The tunnel becomes an occasional check of the adapter, not the way to test.

## Calibrated forecasts

If OV says 85%, it should come true about 85% of the time.

- Back-test on the Public Jira Dataset: forecast past sprints and PIs from earlier history, compare with what was delivered.
- A report script run on demand, not a build step (too slow for every build).
- Publish the method and results: it answers "can we trust these numbers on our data?" and is credible content.
- Repeat on pilot data (with consent).

## Measuring usage without leaving Atlassian

Sending any data out of Jira, including product analytics or error reporting, removes the "Runs on Atlassian" status. Usage is measured with:

- the Atlassian developer console (installations, invocations, errors) and Marketplace evaluation and licence data;
- usage counters stored inside the app (Forge storage), visible to the admin and reported only if they choose;
- Umami on the website and the public demo board (outside Jira, not affected);
- direct feedback: an in-app link to the contact form, and beta calls.

## Why not OV2 as it was

OV2 ran one React app inside Jira, ServiceNow and the web (write once, run anywhere), with a custom architecture (passive views, App as sole orchestrator, `IModel`, one adapter per host) and 37 rules. The AI developer kept drifting back to its default patterns as its context filled; validators, golden tests and a specialist reviewer could not stop new technical debt, and fixes broke other parts. Its business logic also existed twice (App TypeScript and Forge resolver JavaScript, the "pipeline twins").

OV3's answer: an architecture made of the most common patterns (API-first, thin client), so the AI's defaults are the architecture; logic in one place, behind the API. The same forecasting logic serves the Reality Check, the board and the public demo.

## From OV2, reusable as knowledge

- `../OV2/docs/model/METRICS.md`: metric definitions (population, windows, formulas, edge cases), checked against an independent calculation. The source for OV3's golden tests.
- `../OV2/docs/mockups/`: screen ideas.
