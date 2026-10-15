# Decisions and why

Each decision with its date, its reason and what was rejected, so it isn't reopened without new evidence. Read before reopening a topic; change a decision here, with its reason, never silently in code. The MVP's detailed choices live in `docs/mvp.md`.

## Sell a PI planning board, not a predictability product (2026-10-15)

- **Predictability alone is a feature, not a product.** On its own it competes with established forecasting and metrics apps (ActionableAgile, Monte Carlo gadgets, Great Gadgets, Agile Reports, Screenful) that have years of reviews and purchase history. A new app with one feature and no reviews loses that comparison.
- **The person who wants it can't buy it.** Interest in forecasting usually comes from a project manager, Scrum Master or similar, who rarely has the budget or influence to push an app through enterprise governance (admin approval, budget, procurement).
- **A board solves a pain many people share at once.** Copying issues between Jira and Miro/Mural, keeping both in sync, and not knowing which one is true affects RTEs, Scrum Masters, product managers and teams every quarter. More people feeling the same pain gives more chance of reaching someone with budget.
- **Forecasting is still the moat.** It is the reason to choose OV's board over Jira Plans, BigPicture or Easy Agile, which all set capacity manually. The board gets OV bought; the forecasting gets it chosen.
- **Rejected:** selling the Reality Check as a paid product. Kept free, as a demo and lead magnet.

## Two apps: a free Reality Check and a paid board (2026-10-15)

- **The smallest first request:** a free, read-only app is the easiest approval an admin can give; the board's write scopes come later, once there is evidence.
- **Early Marketplace presence:** installs and reviews start before the board exists.
- **Trade-off accepted:** two listings and two admin approvals; the first makes the second easier.

## Build before testing demand (2026-10-15, reversed from "demand first")

- **Opinions about an idea are unreliable.** People are polite about ideas; they react honestly to their own data on a working screen.
- **The money cost is low**; the real cost is time, hence the time box and the stop rule (`docs/context.md`, the plan).
- **Real screenshots and a working demo** make every later step (posts, beta, conversations with admins) concrete.
- **Planning runs on a calendar:** ready by early December catches the December–January planning season; missing it pushes the next real test to April.
- **Risk accepted:** building something nobody wants. Limited by the 8-week time box and the stop rule at the end of January 2027.

## Inside Jira only: no CSV exports (2026-10-15)

- **Trust:** "your data never leaves Jira" is OV's strongest argument with admins; asking for exports contradicts it, and nobody can easily verify that a web page processes a file locally.
- **Policy and personal data:** many companies forbid exports outside approved tools; exports include names (GDPR). A beta user could get into trouble because of OV.
- **Quality:** CSV exports have no transition history, so data-health findings and duration analysis would be weak: the least convincing first impression.
- **Rejected:** the browser Reality Check from a CSV export; a standalone web version fed with exports.

## Why LinkedIn signals can mislead (2026-10-15)

- **False positives from a personal network:** friends and former colleagues say "this is great, I'd use it immediately" out of kindness or loyalty. It costs them nothing, so it predicts nothing.
- **False negatives from a new company page:** with zero followers, silence measures reach, not demand.
- **Likes and comments measure attention, not intent to buy:** content about predictability and story points can be popular with people who will never install or buy anything.
- **What counts instead:** behaviour that costs something. Installing the Reality Check on a real site, booking a call, forwarding to an RTE or PMO, starting a board evaluation, committing a real planning date.
- **LinkedIn's role:** a channel for reach and credibility, not a measurement tool.

## The founder is not part of the brand (2026-10-15)

- **Unbiased signal:** promotion that reaches strangers under the OV brand avoids the network bias above.
- **A person's past results are not OV's.** Presenting them as the product's proof would be misleading; OV has to earn its own case studies from pilots.
- **Enterprises buy from a company, not a person.** Security review and procurement ask for a registered vendor, a support contact and continuity beyond one individual.
- **A separate brand can grow, be sold or be handed over;** a personal brand can't, and it ties one person's other professional activity to the product's fate.
- **Consistency:** the website already speaks as the product, never a person.
- **Trade-off accepted:** less warm reach and borrowed credibility at the start. Compensated by showing the method on public Jira data (findings anyone can check), published calibration and, later, pilot case studies.
- **Line not to cross:** never posting as an independent user who "discovered" OV.

## Few editors, many viewers (2026-10-15)

- **How PI planning actually runs:** many people attend, but few move cards: one or two per team in breakouts, and the RTE in the global review; most participants watch.
- **Fewer moving parts:** it removes the biggest technical risk. Forge Realtime is limited to 50 operations per second per installation; a few editors broadcasting to many viewers stays well within that, while 150 simultaneous editors would not.
- **Better product:** the work goes into what matters, speed for the person driving and legibility for the people watching (presenter mode).
- **Fallback if the load test fails:** a capacity and probability panel used alongside Miro or Jira Plans, instead of a full board.

## Stay on the Atlassian Marketplace, built as "Runs on Atlassian" (2026-10-15)

- **The Atlassian invoice** avoids new-vendor onboarding, the slowest part of enterprise buying.
- **"Runs on Atlassian"** (no data leaves Jira, data residency inherited) is what security teams check first. BigPicture and Easy Agile don't carry it today (Easy Agile still processes some data on its own platform). Keeping OV egress-free is worth more than any feature, including outside analytics.
- **100% of revenue retained** until $1M lifetime Forge revenue (17% share after that; Connect apps pay 25%).
- **Atlassian handles tax on sales** to customers worldwide.
- **Rejected:** a standalone web SaaS (needs data access through admins anyway, plus a full vendor security review); selling outside the Marketplace for editor-only or per-ART pricing (loses the invoice advantage, adds multi-country tax).

## Keep the MVP narrow (2026-10-15)

- **No free canvas:** Miro's job and a large build.
- **No SAFe parity first** (dependencies, ROAM, PI objectives): added only once the core is used. Building them first repeats OV2's mistake of breadth before use.
- **No OKR/portfolio layer or ServiceNow** until someone pays. Atlassian is investing in that layer (Focus, Strategy Collection), so integrate with it later rather than compete.
- **Rejected for the MVP:** mixed sprint lengths in one PI (rare, not good practice); the Innovation and Planning sprint (rarely used in practice); holidays from an online service (breaks "Runs on Atlassian"); per-person availability (personal data, works council concerns).
- "Foundational" means a clean architecture, not a broad feature set.

## Say "PI Planning" for search, "quarterly planning" for reach (2026-10-15)

- People search the Marketplace for "PI Planning", so it belongs in the title and keywords.
- Most organisations adapt SAFe or use their own approach, so the copy also names quarterly planning so they recognise themselves.

## Win the Jira admin deliberately (2026-10-15)

- Admins look for reasons to say no; an admin who feels in control (settings, read-only by default, audit log, security sheet) is far more likely to approve.
- The beta funnel ends with the admin: the earlier steps exist to give an RTE something convincing to take to them.

## Teams, never individuals (2026-10-15)

- Works councils in several EU countries can block tools able to monitor employees' performance.
- Fear of being judged is a common reason teams resist metrics tools.
- Per-team metrics with a minimum team size answer both, and match the product's principles.
- Absences are therefore entered as team totals per sprint, never per person.

## Practice and training as a channel (2026-10-15)

- **Rehearsal** answers the driver's fear of failing live (`docs/product.md`, jobs to be done); it costs nothing, since every plan is a draft until applied.
- **Training on example data** lets coaches run workshops without anyone's Jira data and without an admin: every session puts the board in front of RTEs, Scrum Masters and their managers.
- **Kept out of the 8 weeks:** the training PI comes right after the MVP; until then, the public demo serves self-training.
- **Possible later offer:** paid training PIs or simulations for coaches and training companies.

## Docs split by subject and audience (2026-10-15)

- **A short `docs/context.md` for every session,** the rest in one file per subject, so each session loads only what its task needs.
- **Why:** Claude Code reads files whole by default; one long file means either reading everything or fragile section searches. OV2's drift came from context filled with material competing with the rules.
- **Markdown, not a data format:** the docs are reasoning (decisions, trade-offs, why); settings and their defaults live in code (`CLAUDE.md`, rule 7).
- **Rejected:** one `context.md` with every section (about 770 lines); TOON or JSON for docs.

## The website's Firebase key stays in the code, restricted (2026-10-15)

- **The key is public by design:** the contact form needs it in every visitor's browser, so it ships on outcomevault.com whatever the repo holds. GitHub's secret scan flagged it; that alert is a false positive.
- **What protects it:** `firestore.rules` (only creating a valid message) and the key's restrictions in the Google Cloud console: the three site addresses only, the Cloud Firestore API only. Tested with a live message.
- **Rejected:** rewriting the git history (force push, and the key stays readable on the live site); moving it to `.env` (it still ships in the bundle, and deploys need one more file); a server function to hide it (needs the paid Blaze plan). App Check only if spam appears.
