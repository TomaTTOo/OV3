# Go to market: pricing, beta, promotion, website, launch, tax

How OV reaches, convinces and charges its customers. Read for pricing, the beta, the website's content or launch work. Why each choice was made: `docs/decisions.md`. The website's screen rules: `docs/ui-guidelines.md` § 9.

## Pricing and licensing

- **Two apps:** the Reality Check, free for every site size; the board, paid.
- **Direction for the board:** plan owner, team editor and viewer, with viewers free and editors (plan owners and team editors) paid.
- **Constraint:** paid Marketplace apps are licensed for the whole Jira site's user tier, so charging only editors is not possible in the standard model. Atlassian is trialling user-based billing for Forge apps; check the current rules.
- **Until then:** build plan owner, team editor and viewer as permissions; set a per-user price low enough that paying for the whole site feels reasonable, falling steeply at large tiers; free up to 10 users; Atlassian's 30-day free evaluation; move to editor-only pricing when Atlassian allows it.
- **Stay on the Marketplace:** selling outside it would allow editor-only pricing but loses the Atlassian invoice, the main way past procurement, and brings multi-country tax obligations (Tax, below).
- **Revenue share:** a qualifying "Runs on Atlassian" Forge app keeps 100% of revenue until $1M lifetime Forge revenue (17% after that).
- **Costs to price in:** Forge consumption pricing (real-time use has a direct cost).
- Pilot terms still undecided (what pilots get afterwards, what they are asked to give).
- Later, possibly: paid training PIs or simulations for coaches and training companies.

## The beta: inside Jira only

No CSV export path: data never leaves Jira, from the first contact (`docs/decisions.md`).

The funnel, from easiest to hardest:

1. **Public demo board** on public Jira data (Public Jira Dataset): try the planning experience with nothing to install.
2. **Free Reality Check app** on the Marketplace: read-only, "Runs on Atlassian", full history, so real results. The smallest possible request to an admin, and an early Marketplace presence with reviews.
3. **The PI planning board**, with Atlassian's 30-day free evaluation. The Reality Check already installed makes this second request easier.
4. **Paid use** after a real planning event.

Also target people who can install themselves: agile coaches and consultancies with their own Jira sites, smaller companies where the RTE is also the admin, Atlassian Solution Partners and their sandboxes.

**Measure behaviour, not opinions:** demo sessions, Reality Check installs on real sites, board evaluations, a committed date for a real planning event, return use. Count how many move from each step to the next (how usage is measured without leaving Atlassian: `docs/engineering/platform.md`).

Trade-off accepted: the admin is needed earlier, so the funnel is slower; the free, read-only, egress-free first step keeps the ask as small as possible.

## Promotion

- **Under the OV brand only**, never a person; never posing as an independent user recommending it (deceptive, against LinkedIn's rules, and damaging to a new brand if noticed). Enterprises will ask who is behind it: a registered company, a support email and an address cover that.
- **Reach strangers where they already are:** the Marketplace listings (title and keywords around "PI Planning"); Atlassian Community answers to people asking how to run big-room planning in Jira; agile and SAFe communities; Reddit (r/jira, r/agile, r/scrum); the OV LinkedIn page posting findings from public Jira data (names anonymised); a small LinkedIn ad budget targeting RTE and PMO job titles.
- **Content that builds trust:** the forecast calibration results (`docs/engineering/platform.md`); data-health findings on public projects.
- **Coaches as a channel:** the public demo now, the training PI after the MVP (`docs/mvp.md`, practice and training).
- **Later:** a monthly live demo of PI planning in Jira; Atlassian Solution Partners with SAFe practices as a channel; a talk with a pilot customer at Atlassian Team '27; content timed to Miro renewals in 2027 (factual, not fear-based). The Scaled Agile partner route is less neutral than it looks (Scaled Agile, Inc. owns piplanning.io). "SAFe" is Scaled Agile's trademark: use it descriptively and sparingly.

## The website (2026-10-14)

Chosen from nine directions explored on a design canvas: **D6, "Signal"**, a near-black page whose hero shows a cube of particles forming from chaos (scattered Jira history becoming a plan), and a second cube with red particles above it ("over capacity") beside the problems. Red is kept for that one meaning. The site has its own small design system (its look is outside Atlaskit); the Jira apps stay Atlaskit-native, and the site's colours come from Atlassian's palette so screenshots sit well on it. Rules: `docs/ui-guidelines.md` § 9.

What was decided while building it (2026-10-15):

- **Live** at outcomevault.com: Firebase Hosting, project `outcome-vault`, free (Spark) plan. One static page, prerendered so search engines and LinkedIn previews read it.
- **Voice:** the product speaks, never a person (no founder name, no "we"); section titles state the reader's job; PI and quarterly planning named; no results claimed until OV has its own.
- **One action: the contact form.** Messages are stored in Firestore (`contactMessages`, EU location `eur3`) and read by hand in the Firebase console: no notification on the free plan (Blaze plus a Cloud Function and an email service would add one). Rules allow only creating a valid message; a hidden trap stops simple bots; no rate limit (App Check if spam appears). Needs a privacy notice and a retention rule (`docs/engineering/privacy.md`).
- **Analytics:** Umami Cloud, cookieless, so no consent banner; counted only on the real domain.
- **Brand:** the logo is drawn from its specification by `packages/design` (gold accent, graphite instead of the old navy, the wordmark as shapes); the website builds its logo and favicons; every other file (LinkedIn logo 400 × 400, LinkedIn cover 1128 × 191, email signature) comes from the logo generator (`apps/brand`). Specification: `docs/brand/logo.md`.
- **Still open on the site:**
  - The statement "Status reports are performance. Plans shouldn't be." (ambiguous: "performance" can read as "results"; suggested "A plan is only as good as the capacity behind it", or drop it).
  - The trademark line (kept for now).
  - The "How it works" steps still describe a product not yet designed.
  - Later: the public demo board, a page per role (`docs/product.md`, what this changes in the copy), the "send this to your Jira admin" page, privacy policy and terms.

## Before launch: what's easy to forget

### Legal and listing

- A registered company: signs the Marketplace partner agreement and appears as vendor. Needed before the Reality Check is submitted (end of week 3).
- Terms of use (EULA), privacy policy, DPA template.
- Atlassian's personal data reporting for apps storing user account IDs.
- Trademarks: "SAFe" belongs to Scaled Agile, Inc.; follow Atlassian's rules for naming apps ("for Jira"); check "Outcome Vault" for conflicts in target markets.

### Support and continuity

- A published support channel and response time (Cloud Fortified requires defined SLAs).
- A security contact and a vulnerability process (Cloud Fortified involves Atlassian's bug bounty).
- Continuity answer for the security sheet: the plan lives in Jira, so customers lose nothing if OV stops.

### Accessibility

- Enterprises and public bodies ask about WCAG. The screen rules (keyboard alternative to drag and drop, status never by colour alone) are in `docs/ui-guidelines.md` § 6.

### Insurance

- Some enterprise contracts ask for professional liability or cyber insurance. Not needed to launch; know the cost before a pilot becomes a contract.

## Tax

- **Marketplace sales:** Atlassian resells the app and handles most tax on sales to customers worldwide (VAT, GST, US sales tax and others). OV normally doesn't need to register for VAT in customers' countries.
- **OV's customer, for tax purposes, is Atlassian** (Atlassian Pty Ltd, Australia, in the published agreements; confirm the entity in the current Marketplace Partner Agreement). OV is paid its revenue share in USD (held until US$500 is due, net of any withholding).
- **OV's obligations:** income tax on what Atlassian pays, and the VAT treatment of a cross-border service sale to an Australian company in OV's own country. To confirm with a local tax adviser before the first payment.
- **Outside the Marketplace** (direct sales of reports, services or licences), OV would handle VAT or sales tax in each customer's country itself: one more reason to keep all paid products on the Marketplace.
