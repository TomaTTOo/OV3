# OV3: why, what was decided, where it stands (updated 2026-10-15)

## The product

The pain: most digital work goes from portfolio approval to delivery without its investment tied to customer value. Features are often approved by politics rather than facts; story points are misused (1 point = 1 hour); nobody checks after release whether the expected outcome happened.

The vision (long term): link portfolio prioritization and approval (ServiceNow) with development execution (Jira), and close the loop with OKRs and hypothesis-driven development: no approval without a hypothesis tied to a key result, validated with customers after release (pivot or adjust).

The entry strategy (a Trojan horse): the Jira app and the control metrics leaders ask for get OV installed (Jira is already an approved vendor, billed on the Atlassian invoice); the truth layer (value delivered, as customers perceive it) is what makes it worth keeping. Control first, truth once OV is trusted.

The owner's proof: 95% delivery predictability across 12 teams with percentile-based probabilistic forecasting (Liberty Latin America); an OKR operating model cutting a sales cycle from 18 to 12 months (J&J); OKRs connected to execution for 200+ people (Roche).

## Positioning

- **Analytics alone is a vitamin; planning is a painkiller.** Better metrics alone won't make a company choose OV over apps with thousands of reviews. PI planning (or any quarterly planning) is a recurring, painful, deadline-driven event involving many people, today done in Miro/Mural with manual copying to and from Jira.
- **Planning is the root:** planning → sprints → portfolio follows how decisions flow (commitments are made at planning). OV2 went the other way (sprints → portfolio).
- **What only OV does: plan against real capacity, at the moment of commitment.** While teams place work in sprints, each sprint's load is shown against the team's measured throughput, with the probability of delivering it. Later, a feature placed on the board is linked to a key result and a hypothesis, or flagged: the truth layer meets the decision.
- **A flywheel for data quality:** once teams see their capacity and probabilities come from their own history, keeping Jira clean pays off at their next planning. The product creates the incentive for the data it needs.
- **The entry metrics are the honest version of the usual ones:** forecasts as ranges with confidence; works on a messy Jira with no setup; a data-health report first (mass closures, items finished without being started, reopened, zombies, and their effect on each number); story points used as hours detected as findings ("here, points don't predict duration"), never as verdicts. Throughput needs only finish dates, so it survives messy data best.
- **Framing:** the truth is said forward ("which bets are paying off, which to stop before they cost more"), never as "how much you lost to political decisions": the people who approved those decisions often sign the purchase.
- **First buyers:** someone whose interest is the company's money and who has no past decisions to defend: a newly appointed CIO, CTO or PMO head (first 100 days); the CIO Office or transformation office; owners (private-equity operating partners, founder-led companies). The CFO is an ally and sponsor once OV is in place, not the first buyer (not in the room where features are prioritized).
- **Leads:** Pernod Ricard was looking for a planning tool like this and testing plugins: ask what they tried and why it fell short (competitive analysis, and a possible first design partner). RTEs and coaches from the owner's network as design partners.
- **A signature visual** (value against cost, in 2D): tested as a mockup or short video on public Jira data posted on LinkedIn before any code; spread or not decides whether it is built.

## The website (2026-10-14)

Chosen from nine directions explored on a design canvas: **D6, "Signal"**, a near-black page whose hero shows a cube of particles forming from chaos (scattered Jira history becoming a plan), and a second cube with red particles above it ("over capacity") beside the problems. Red is kept for that one meaning. The site has its own small design system (its look is outside Atlaskit); the Jira app stays Atlaskit-native, and the site's colours come from Atlassian's palette so screenshots sit well on it. Rules: `ui-guidelines.md` § 8.

What was decided while building it (2026-10-15):

- **Live** at outcomevault.com: Firebase Hosting, project `outcome-vault`, free (Spark) plan. One static page, prerendered so search engines and LinkedIn previews read it.
- **Voice:** the product speaks, never a person (no founder name, no "we"); section titles state the reader's job; PI and quarterly planning named. The owner's own results were removed (they are not Outcome Vault's).
- **One action: the contact form.** Messages are stored in Firestore (`contactMessages`, EU location `eur3`) and read by hand in the Firebase console: no notification on the free plan (Blaze plus a Cloud Function and an email service would add one). Rules allow only creating a valid message; a hidden trap stops simple bots; no rate limit (App Check if spam appears).
- **Analytics:** Umami Cloud, cookieless, so no consent banner; counted only on the real domain.
- **Brand:** the logo is drawn from its specification by `packages/design` (gold accent, graphite instead of the old navy, the wordmark as shapes); the website builds its logo and favicons; every other file (LinkedIn logo 400 × 400, LinkedIn cover 1128 × 191, email signature) comes from the logo generator (`apps/brand`). Specification: `docs/brand/logo.md`.
- **Still open on the site:** the statement "Status reports are performance. Plans shouldn't be." (ambiguous: "performance" can read as "results"; suggested "A plan is only as good as the capacity behind it", or drop it); the trademark line (kept for now); the "How it works" steps still describe a product not yet designed.

## The MVP: a planning board with real capacity

- A parking lot of features or stories from Jira; drag and drop into predefined sprint containers (Sprint 1, Sprint 2…).
- Each team's capacity from its history; a sprint over capacity shown live, with the probability (percentile) of delivering it.
- Configurable holidays reduce capacity.
- Not a whiteboard: no free canvas (that's Miro's job and a large build).
- Later: a full program board, dependencies, then the key-result and hypothesis links, then the portfolio.

To decide in its spec:

- **Items or story points:** probabilities from throughput in items (the robust measure); points shown as the team reported them, their disagreement being a finding.
- **Writing to Jira:** one explicit "Apply to Jira" (showing what changes: sprint per issue, sprints created) rather than a write on every drag; write access is what admins scrutinize.
- **Real-time editing by many people at once** (a planning event has 50–150): check what Forge supports before promising it.

## Why not OV2 as it was

OV2 ran one React app inside Jira, ServiceNow and the web (write once, run anywhere), with a custom architecture (passive views, App as sole orchestrator, `IModel`, one adapter per host) and 37 rules. The AI developer kept drifting back to its default patterns as its context filled; validators, golden tests and a specialist reviewer could not stop new technical debt, and fixes broke other parts. Its business logic also existed twice (App TypeScript and Forge resolver JavaScript, the "pipeline twins").

OV3's answer: an architecture made of the most common patterns (API-first, thin client), so the AI's defaults are the architecture; logic in one place, behind the API.

## The business, honestly assessed

- Enterprise buying is slow: Jira/ServiceNow admins test, budget is approved, procurement and legal may follow (often 3–9 months for a first deal).
- ServiceNow costs before it pays (partner program, certification, security review); the integrated Jira + ServiceNow offer sells to few at first. Later, only when a customer pays for it.
- Crowded space: Atlassian's own reports and analytics, Jira Align, Planview, ServiceNow SPM, Broadcom Clarity; for forecasting, ActionableAgile on the Atlassian Marketplace; for planning in Jira, BigPicture (Appfire), Easy Agile, Jira Plans (Premium), and Miro/Mural with Jira sync; for control metrics, several Marketplace apps (Great Gadgets, Agile Reports, Screenful). The edge must be the method (planning against measured probabilities, data health, OKR/hypothesis gates), not data access. To be checked against the competitors' current products before any public claim.
- Rough odds (a judgment, not a measure): the full vision profitable within 6–12 months of launch, about 10–15%; Jira only, covering its costs in the mid term, about 25–35%, higher with pilots from the owner's network.
- The buyer of the outcome layer is whoever pays for waste (CFO, CEO, transformation office), not whoever approved the features.

## The plan

1. Before code: talk to 10 people from the owner's network (delivery leads, PMO, agile coaches); start LinkedIn posts on predictability and OKRs (also helps the owner's job search). The website is ready for this (live, with the contact form).
2. Then the MVP (§ The MVP) as a Forge app, built API-first. Weeks, not months.
3. Success decided in advance, e.g. 3 pilots from the network, or a set number of trials in 3 months. If not reached, stop without regret.
4. Later, only if it sells: more tools, Rovo actions or MCP over the same API (agents as a second face, not the product), then ServiceNow.

## Where it stands (2026-10-15)

- **Done:** the project's foundation (workspace, checks, docs); the website, live with its contact form and analytics; the brand system (design tokens, logo package, logo generator).
- **Not started:** the LinkedIn page or group; the 10 conversations; the MVP (the Jira app, `apps/jira`). No product code exists yet, deliberately: demand first.

## Next actions

1. **LinkedIn:** create the Outcome Vault page (logo and cover from the logo generator's presets) and test ideas there (posts on predictability, story-point misuse, planning against real capacity). Watch the website's visits by source in Umami and the messages in Firestore.
2. **The 10 conversations**, Pernod Ricard first (what planning tools they tried, why they fell short).
3. **Close the site's open content items** (see § The website).
4. **Only with a signal from 1 or 2:** the MVP's mini-spec (§ The MVP), then the Jira app, API-first.

## Challenges ahead

- **Commercial:** demand is unproven; enterprise buying is slow (admins, budget, procurement); the planning space is crowded, so the edge must be planning against measured probabilities and data health; the first buyer is a new CIO, CTO or PMO head, or a transformation office, not whoever approved past decisions; pricing and pilot terms are undecided (what pilots get afterwards, what they are asked to give).
- **Technical (when the MVP starts):** real-time editing by many people during a planning event (what Forge supports is unchecked); writing to Jira needs write access that admins scrutinize ("Apply to Jira" shows changes first); test data from the Public Jira Dataset (licence to check); keeping the AI developer on standard patterns (OV2's failure): small changes, contract first, checks in the build.

## Test data without a real Jira team

OV2 relied on synthetic data and a tunnel to a Jira site with no real team. API-first removes that dependency:

- **Business logic:** tested on fixtures cut from the **Public Jira Dataset** (research dataset, 2022: millions of real issues from 16 public Jira instances such as Apache, MongoDB, Red Hat, Hyperledger, Spring, Atlassian's own, with their change history, and sprints and story points where teams used them), converted to the Zod contract's shape. Check its licence before commercial use.
- **Jira adapter** (Jira response → contract): tested with a few real responses recorded once from a public instance (e.g. `issues.apache.org/jira`, REST API without login; read gently).
- **UI:** runs on the mock API (MSW) fed with the same fixtures.
- **End to end:** a free Jira Cloud developer site with a CSV-imported subset; it loses transition history, so it checks screens, not metrics.
- **Later:** anonymized exports from pilot customers, with their written consent.

The tunnel becomes an occasional check of the adapter, not the way to test.

## From OV2, reusable as knowledge

- `../OV2/docs/model/METRICS.md`: metric definitions (population, windows, formulas, edge cases), checked against an independent calculation. The source for OV3's golden tests.
- `../OV2/docs/mockups/`: screen ideas.
