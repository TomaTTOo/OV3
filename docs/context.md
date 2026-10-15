# OV3: where it stands (updated 2026-10-15)

The one file every session reads. What OV3 is, the plan, where it stands, the last session and the next actions. Everything else lives in its own file (`CLAUDE.md`, docs map); this file points to it, never repeats it.

## The product

The pain: most digital work goes from portfolio approval to delivery without its investment tied to customer value. Features are often approved by politics rather than facts; story points are misused (1 point = 1 hour); nobody checks after release whether the expected outcome happened.

The vision (long term): link portfolio prioritization and approval (ServiceNow) with development execution (Jira), and close the loop with OKRs and hypothesis-driven development: no approval without a hypothesis tied to a key result, validated with customers after release (pivot or adjust).

The entry strategy (a Trojan horse): a PI planning app inside Jira gets OV installed (Jira is already an approved vendor, billed on the Atlassian invoice); the truth layer (value delivered, as customers perceive it) is what makes it worth keeping. Control first, truth once OV is trusted.

What gets built now: a free, read-only **Reality Check** app and a paid **PI planning board** (two Forge apps on the Atlassian Marketplace), plus a **public demo board** on the website. The board plans against real capacity: each team's capacity measured from its own history, with the probability of delivering what is committed. Details: `docs/product.md`, `docs/mvp.md`.

## The plan

Build the MVP now (low cost), promote under the OV brand, and test demand with a working product rather than with opinions (`docs/decisions.md`). **Week 1 starts 2026-10-19.**

1. **Weeks 1–3:** the forecasting engine and the free Reality Check as a Forge app (read-only, "Runs on Atlassian"). Back-test the forecasts on the Public Jira Dataset (`docs/engineering/platform.md`). Submit the Reality Check to the Marketplace at the end of week 3 (review takes time; the vendor account must exist first). First posts with findings from public Jira data.
2. **Weeks 4–8:** the PI planning board on top of it (`docs/mvp.md`): parking lot, breakout and global views, sprint slots with live capacity and probability, unplanned allowance, holidays and days off, range estimates for new teams, plan owner / team editor / viewer, presenter mode, practice drafts, "Apply to Jira", admin settings, audit log. Plus the public demo board and the load test. Ready by early December, for the December–January planning season.
3. **Beta** (`docs/business/go-to-market.md`), measured by behaviour.
4. **Stop rule, by the end of January 2027:**
   - at least 30 Reality Check installs on real sites (not OV's own);
   - at least 5 board evaluations;
   - at least 1 real planning event run on the board, or committed for the next one.

   Below that, stop.

5. Later, only if it sells: dependencies, confidence votes, risks and objectives; the training PI; more tools, Rovo actions or MCP over the same API; then the OKR/portfolio layer (integrated with Atlassian's Strategy Collection where possible); then ServiceNow.

The time box matters more than the money: "foundational" means a clean architecture, not a broad feature set.

## Where it stands (2026-10-15)

- **Done:** the project's foundation (workspace, checks, docs); the website, live with its contact form and analytics; the brand system (design tokens, logo package, logo generator); the competitive and market research; the product and MVP decisions; the docs split by subject.
- **Not started:** the planning journey; the first feature spec; the company registration and Marketplace vendor account; the LinkedIn page; the MVP (the Reality Check app, the board, the demo board); the beta.

## Last session

Rewritten at the end of every working session: what was done, where it stopped, the next step, open questions.

- **Date:** 2026-10-15 (a product and business session in chat, no code).
- **Done:** competitive and market research; positioning, audience, jobs to be done; decisions (board over predictability, two apps, inside Jira only, OV brand not a person, build before demand with a stop rule); the MVP draft (team = Jira board, grouping and plannable issue types, one sprint length per PI, breakout and global views, three permission levels, unplanned allowance, manual holidays and days off as team totals, range estimates for new teams); privacy, platform risk, tax; the docs split into these files.
- **Also done (code):** the logo generator is again one self-contained file, `docs/brand/logo-generator.html`, built from `apps/brand`; the website's Firebase key restricted and tested (`docs/decisions.md`).
- **Stopped at:** the planning-cycle journey. The owner is to tell the story of one real PI planning (preparation, the event, the days after, what went wrong); Claude drafts the journey as tables, then the MVP is checked against it.
- **Open questions:**
  - Does the training PI come before dependencies after the MVP? (Default: dependencies first, unless coaches show strong interest.)
  - The thresholds and windows (history window, minimum history, fits / at risk / over capacity): set in the first feature spec.

## Next actions

1. **The planning journey** (the owner's story → journey tables → MVP checked against it; results added to `docs/product.md` and `docs/mvp.md`).
2. **The first feature spec,** `docs/features/F01-*.md`: the forecasting engine (contract, how capacity and probability are computed, golden values), then the Reality Check screens.
3. **Company and vendor account:** register the company (choose the country with an accountant: it decides how Atlassian's payments are taxed); create the Marketplace vendor account; privacy policy, terms and DPA template (`docs/business/go-to-market.md`, before launch).
4. **LinkedIn:** create the Outcome Vault page (logo and cover from the logo generator's presets); post findings from public Jira data once the engine runs. Watch visits by source in Umami and messages in Firestore.
5. **Pernod Ricard:** what planning tools they tried, why they fell short; use the questions in `docs/product.md` (questions to verify).
6. **Close the site's open content items** (`docs/business/go-to-market.md`, the website).
7. **Check before any public claim:** competitors' current features, Atlassian's user-based billing for Forge, Forge Realtime limits, Data Center end-of-life plans.

## Challenges ahead

- **Commercial:** demand is unproven; enterprise buying is slow; the planning space is crowded; the first buyer is a new CIO, CTO or PMO head, or a transformation office; the Jira admin must say yes; works councils may need to agree in some countries; whole-site licensing makes pricing for a few editors hard; pilot terms undecided.
- **Technical:** real-time updates for many viewers on Forge (load test); write access that admins scrutinize ("Apply to Jira" shows changes first); test data from the Public Jira Dataset (licence to check); keeping the AI developer on standard patterns (OV2's failure): small changes, contract first, checks in the build.
- **Platform:** Atlassian may add real-time collaboration or automatic capacity to its Program board; Rovo may learn capacity-based sprint scoping; competitors may copy throughput-based forecasting; Forge APIs and Preview features change (`docs/engineering/platform.md`).
