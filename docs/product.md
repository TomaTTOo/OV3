# Product: positioning, audience, jobs, scope, principles (2026-10-15)

Who OV is for, what it promises, what it does and does not do, and the principles every feature is checked against. Read when writing a feature spec or product copy. The MVP's details: `docs/mvp.md`. Why each choice was made: `docs/decisions.md`.

## Positioning

- **The board is the product; the forecasting is why teams choose OV's board.** Predictability alone is a single feature, and the person who wants it rarely has the power to buy it (`docs/decisions.md`). PI planning solves a pain shared by many people at once: moving issues between Jira and Miro/Mural, keeping both in sync, and not knowing which one is true.
- **Planning is a painkiller; analytics alone is a vitamin.** PI planning (or any quarterly planning) is a recurring, painful, deadline-driven event, today done in Miro/Mural with manual copying to and from Jira.
- **Planning is the root:** planning → sprints → portfolio follows how decisions flow (commitments are made at planning). OV2 went the other way (sprints → portfolio).
- **What only OV does: plan against real capacity, at the moment of commitment.** While work is placed in sprints, each sprint's load is shown against the team's measured throughput, with the probability of delivering it. No Jira-native competitor computes capacity from historical throughput or shows a delivery probability during planning (`docs/business/market.md`). Later, a feature placed on the board is linked to a key result and a hypothesis, or flagged: the truth layer meets the decision.
- **The business case to lead with:** no copy-paste between whiteboard and Jira, no double maintenance, one source of truth. Not "cancel your Miro licences": companies use Miro for much more than PI planning and usually keep the seats.
- **A flywheel for data quality:** once teams see their capacity and probabilities come from their own history, keeping Jira clean pays off at their next planning. The product creates the incentive for the data it needs.
- **Honest metrics:** forecasts as ranges with confidence; works on a messy Jira with no setup; a data-health report (mass closures, items finished without being started, reopened, zombies, and their effect on each number); story points used as hours detected as findings, never as verdicts. Throughput needs only finish dates, so it survives messy data best.
- **Framing:** the truth is said forward ("which bets are paying off, which to stop before they cost more"), never as "how much you lost to political decisions": the people who approved those decisions often sign the purchase.
- **Search and naming:** "PI Planning" in the Marketplace title, keywords and headings (what people search for); "PI or quarterly planning" in descriptions and site copy, so teams that don't follow SAFe strictly also recognise themselves. In practice few companies follow SAFe PI planning as defined; they adopt parts of it.
  - Example title: "PI Planning board for Jira: plan PI or quarterly sprints against your teams' real capacity."
- **The Jira admin is the gatekeeper** and must be won deliberately (`docs/mvp.md`, for the Jira admin).
- **Leads:** Pernod Ricard was looking for a planning tool like this and testing plugins: ask what they tried and why it fell short (competitive analysis, and a possible first design partner). RTEs and agile coaches as design partners.
- **A signature visual** (value against cost, in 2D): tested as a mockup or short video on public Jira data before it is built.

## Target audience

### Companies (ideal customer)

- **Jira Cloud** (required by Forge).
- **Several teams planning together:** roughly 3 to 15 teams in a release train or programme, about 30 to 150 people per planning event.
- **Recurring quarterly or PI planning**, done today on a whiteboard (Miro, Mural) or in spreadsheets, then copied into Jira.
- **Following SAFe partially or adapting it,** which is the common case.
- **Under pressure to be predictable:** commitments to executives, a board, a regulator, or a customer.
- **Size:** mid-size to large organisations with digital or IT delivery teams, often outside the software industry (pharma, consumer goods, telecom, financial services, retail).

### Segments, in priority order

1. **Mid-size organisations and business units with one or a few release trains.** Decisions are faster, the RTE is often close to the Jira admin, and the whole-site licence is smaller. Best for first pilots and first revenue.
2. **Large enterprises, one train or department at a time.** Bigger potential, but the slowest buying and the largest licence tiers. Entry through a champion with the free Reality Check, then the board.
3. **Agile coaches, consultancies and Atlassian Solution Partners.** They run plannings and trainings for clients and often have their own Jira sites or client sandboxes where they can install the Reality Check and the board; they bring OV to decision makers. A channel more than a customer.

### Roles (see Jobs to be done)

| Role                                           | Part in the purchase                                     | What reaches them                                                  |
| ---------------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| RTE, Scrum Master, delivery lead               | User and usually the champion                            | Marketplace search, communities, the demo board, the Reality Check |
| Teams, product managers, business owners       | Watchers; their reaction decides whether it's used again | The planning itself                                                |
| Jira admin                                     | Gatekeeper                                               | "Runs on Atlassian", the security sheet, the admin page            |
| New CIO, CTO, PMO head, transformation office  | Economic buyer                                           | Predictability results, case studies, the Atlassian invoice        |
| CFO, owners, private-equity operating partners | Sponsors once OV is in place                             | Later: the outcome layer (which bets pay off)                      |

**First buyers:** someone whose interest is the company's money and who has no past decisions to defend: a newly appointed CIO, CTO or PMO head (first 100 days); the CIO Office or transformation office; owners (private-equity operating partners, founder-led companies). The CFO is an ally and sponsor once OV is in place, not the first buyer.

### Not targeted now

- Single-team companies or startups (no multi-team planning; the free tier covers them anyway).
- Jira Data Center or Server, Azure DevOps and Rally customers.
- Organisations already planning in Jira Align (heavy existing investment), unless one train wants something lighter.
- Organisations looking for resource, hours or cost-per-person planning.

## Jobs to be done

Who OV must serve, from the people in the planning room to the person who signs. Functional jobs are what they need done; emotional jobs are how they want to feel (or avoid feeling); social jobs are how they want to be seen.

Status: functional jobs come from the research and observed practice; emotional and social jobs are **hypotheses** (marked ⚠) to check in the Pernod Ricard conversation and the first beta calls (Questions to verify). Remove the marks once verified.

### The person driving the planning (RTE, Scrum Master, release or delivery lead)

- **Functional:**
  - Prepare the planning: pull the right features and stories from Jira into one place, set up sprints, teams, holidays and days off.
  - Run it: place work into sprints quickly while others watch; see when a sprint is full.
  - Close it: the plan ends up in Jira, with no copy-paste and no second source to keep in sync.
  - Follow up: compare what was committed with what was delivered.
- **Emotional:**
  - ⚠ Not to be embarrassed live: the tool freezing, cards lost, a mistake in front of 50–150 people.
  - ⚠ Not to dread the days after planning spent transferring sticky notes into Jira.
  - ⚠ Not to be blamed when the plan slips; to have evidence that the commitment was reasonable.
- **Social:**
  - ⚠ Be seen as the person who runs a well-organised, credible planning.
  - ⚠ Be able to push back on overcommitment with data instead of opinion, without looking obstructive.

### The watchers (team members, product managers, business owners)

- **Functional:**
  - See where their work landed and whether it fits.
  - Product managers: get their priorities committed, and know which are at risk.
  - Business owners: know how likely the plan is, not just that it "fits".
- **Emotional:**
  - ⚠ Teams: not to be pushed into a commitment they know they can't keep.
  - ⚠ Business owners: confidence that what they hear is real, not optimism.
- **Social:**
  - ⚠ Teams: be seen as reliable (deliver what they commit).
  - ⚠ Product managers: be seen as having fought for their features with good arguments.

### The champion (whoever takes OV to the Jira admin, often the RTE)

- **Functional:** have something convincing to show (the demo board, their own data in the Reality Check) and answers ready for the admin's questions.
- **Emotional:** ⚠ not to spend credibility on a tool that turns out badly; not to look naive about security.
- **Social:** ⚠ be seen as someone who brings improvements, not someone who adds tools and risk.

### The Jira admin (the gatekeeper)

- **Functional:**
  - Assess risk quickly: data leaving Jira, scopes requested, writes to Jira, vendor credibility.
  - Control who uses it, on which projects and issue types; undo or audit what it changed.
  - Not add maintenance or support work.
- **Emotional:**
  - ⚠ Not to be blamed for approving an app that breaks data, slows Jira or fails a security review.
  - ⚠ Not to be overwhelmed by another round of user requests.
- **Social:**
  - ⚠ Be seen as protecting the instance, and also as enabling teams, not blocking them.

### The economic buyer (new CIO, CTO, PMO head, transformation office)

- **Functional:**
  - Predictable delivery across teams; visibility on what was committed against what teams can deliver.
  - A cost easy to justify, on an existing invoice.
- **Emotional:**
  - ⚠ Confidence that commitments made to the board or executives are realistic.
  - ⚠ In the first 100 days: a quick, visible win without a long implementation.
- **Social:**
  - ⚠ Be seen as bringing discipline and facts to planning, without blaming predecessors (Positioning, framing).

### Forces of progress: switching from the whiteboard to OV

| Force                                  | What drives it                                                                                                                                                                                                |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Push** (pain of the current way)     | Copying between Miro/Mural and Jira, before and after planning; two sources drifting apart; capacity guessed or entered by hand; overcommitment discovered mid-quarter.                                       |
| **Pull** (what OV promises)            | The plan lives in Jira from the start; capacity from the team's real history, with a probability; one "Apply to Jira" at the end; nothing new to learn for watchers.                                          |
| **Anxiety** (fears about switching)    | ⚠ Will it hold up live in front of everyone? Will it write something wrong into Jira? Will the admin approve it? Is the vendor going to be around next year? Are the forecasts trustworthy on our messy data? |
| **Habit** (comfort of the current way) | Everyone knows Miro; templates already exist; facilitators like the free canvas for the rest of the event (vision, retros, risks).                                                                            |

Push and pull must outweigh anxiety and habit. Features address push and pull; anxiety and habit are addressed by the points below.

### What this changes in the product

- **Against fear of a live failure:**
  - Practice: every plan is a draft until "Apply to Jira", so a rehearsal is a draft that's discarded.
  - Undo, and nothing written to Jira until "Apply to Jira".
  - Offline-tolerant board state: a dropped connection never loses moves.
- **Against fear of a wrong write:** "Apply to Jira" shows every change first; the audit log lets the admin see and reverse changes.
- **Against distrust of the forecasts:** every number explainable (which issues, which period, which data-health findings affect it); ranges, not single numbers; published calibration results (`docs/engineering/platform.md`).
- **Against habit:** coexist with the whiteboard rather than replace it ("keep the whiteboard for vision and retros; plan the sprints where the data lives"); minimal learning for watchers (they only look).
- **Against "will the vendor be around?":** the plan lives in Jira, so customers lose nothing if OV stops.
- **For the admin:** the settings page, read-only by default, the security sheet and "Runs on Atlassian" (`docs/mvp.md`).
- **For the champion:** a short "send this to your Jira admin" page answering the admin's questions, linked from the apps, the demo and the website.

### What this changes in the copy

- **To the driver:** "Run your PI planning in Jira. No copy-paste before or after."
- **To teams and business owners:** "Commit to what your teams can actually deliver, with the odds."
- **To the admin:** "Runs on Atlassian. Read-only by default. Every change shown before it's applied."
- **To the buyer:** "Predictable quarters without a new platform, on your Atlassian invoice."
- One page or section per role on the website and in the Marketplace listing, not one generic pitch.

### What this changes in the beta

- Ask about fears, not only features: what would make them not use it live, what their admin would ask.
- Watch where people stop in the funnel (`docs/business/go-to-market.md`, the beta): stopping before the admin step suggests anxiety; stopping after trying the board suggests weak pull.
- Track which role signs up; if only drivers sign up and none reach an admin, the champion and admin jobs are underserved.

### Questions to verify (first conversations and beta calls)

1. How long does the transfer between whiteboard and Jira take, before and after planning? Who does it?
2. What went wrong in a past planning, live? What did it cost the person running it?
3. How is capacity set today? Has anyone been blamed for an overcommitment?
4. Who would need to approve a Jira app, and what would they ask first?
5. What would make you keep using the whiteboard for the planning even with OV?
6. Who would care most if planning became predictable, and would they pay for it?

## What the product does and does not do

### Does: by stage

**Free Reality Check (a separate Forge app)**

- Read-only, "Runs on Atlassian", free for every site size.
- Per team: throughput from history, an 85th-percentile capacity range for the next sprints, the unplanned share of past work, data-health findings, story points compared with actual duration.
- A demo and lead magnet, not a product sold on its own; the smallest possible request to an admin.

**MVP (PI planning board, paid; details in `docs/mvp.md`)**

- Brings epics (and other grouping types) with their stories from Jira into a parking lot; issue types and boards chosen by the admin.
- One plan, two views: breakout (one team, edited in parallel with the other teams) and global (all teams, presenter mode for the review).
- Shows each sprint's load against the team's capacity measured from its own history (throughput in items, minus the unplanned allowance), with the probability of delivering it.
- Reduces capacity for holidays and days off (manual team totals); range estimates for teams without history.
- Shows story points as the team reported them, and flags when points don't match how long work actually takes.
- Reports findings that lower confidence: data health, sizing, team changes.
- Writes the plan to Jira in one explicit "Apply to Jira" step that shows every change first; keeps an audit log.
- Practice: every plan is a draft until applied.
- Admin settings: boards, issue types, permissions (plan owner, team editor, viewer), read-only by default.

**Public demo board** (on the website): the planning experience on public Jira data, nothing to install; also serves self-training.

**Later, only once the MVP is used**

- Dependencies between teams, confidence votes, risks (ROAM), PI objectives.
- The training PI for coaches (example data, never applied to Jira).
- Comparing what was committed with what was delivered, PI after PI.

**Long-term vision, only if it sells**

- Link each feature to a key result and a hypothesis, or flag it when it has none.
- After release: check whether the expected outcome happened (pivot or adjust).
- Portfolio view: which bets are paying off, which to stop.
- Integration with Atlassian Goals and Focus; then ServiceNow portfolio approval.
- Agents as a second face over the same API (Rovo actions, MCP).

### Does not

- **Not a whiteboard:** no free canvas, sticky notes, drawing, vision boards or retrospectives. The whiteboard stays for those; OV handles the sprints.
- **Not a replacement for Jira:** Jira stays the source of truth; OV reads from it and writes back only through "Apply to Jira".
- **Not resource or timesheet management:** no hours, no individual allocation, no cost per person.
- **Not a tool to judge individuals:** capacity and throughput are measured per team, never per person. Data-health findings describe the data, never who caused it.
- **Not a promise or a date:** forecasts are ranges with a probability, never a single date or a guarantee.
- **Not a SAFe compliance or certification tool:** supports PI and quarterly planning as companies really run them.
- **Not a general dashboard or BI tool:** numbers appear where decisions are made (on the board), not in standalone reports.
- **Not an AI that plans for you** (in the MVP): it shows the facts and the odds; people decide.
- **Does not take data out of Jira:** no exports, no external storage, no outside analytics ("Runs on Atlassian").
- **Not for Jira Data Center or Server, Azure DevOps or Rally** (Forge runs on Jira Cloud only). Check Atlassian's current Data Center end-of-life plans: they decide how much of the market moves to Cloud and when.

## Product principles

Rules to check every feature against, so the product doesn't drift as it grows.

1. **Jira is the source of truth.** OV never keeps a second version of the plan that can drift from Jira.
2. **Facts at the moment of decision.** Numbers appear where commitments are made, not in a report afterwards.
3. **Honest numbers.** Ranges with confidence, data health shown alongside, every number explainable down to the issues behind it.
4. **Teams, never individuals.** Nothing in OV ranks or judges a person.
5. **Safe by default.** Read-only until "Apply to Jira"; every change shown first; nothing leaves Atlassian.
6. **Built for the person driving, readable for the people watching.**
7. **Narrow before broad.** A feature is added only when the existing ones are used.
8. **Framed forward.** "Which bets to keep or stop", never "who decided wrong".
