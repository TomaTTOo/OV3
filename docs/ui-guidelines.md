# UI guidelines

The single owner of every rule about how OV looks and behaves on screen. A new pattern is added here before it is used. What the screens do: `docs/mvp.md`.

## 1. Principles

- **Every screen earns trust** (Trustworthiness = (Credibility + Reliability + Intimacy) / Self-orientation). The rules below serve its terms: credibility through honest numbers; reliability through a native look and behaviour (§ 2); intimacy through the user's own data in leaders' words; self-orientation kept low: no upsell prompts, no nags, nothing asked of the user that doesn't serve them.
- **One job per screen.** The reader knows at once what the screen answers ("Can this team deliver this sprint?") and what to do next. One primary action at most.
- **Leaders' words.** Delivery and planning terms the reader already uses (throughput, capacity, forecast, commitment, sprint). Nothing technical: no ids, field names, error codes, API or Jira internals.
- **Minimal.** The fewest numbers, words and elements that answer the question. One number or chart per element, with a short label; details open on demand.
- **Honest numbers.** A forecast is a range with its likelihood (50% / 85% / 95%), never a single date. An estimate never looks like a fact. Every figure says its period and its population ("last 12 sprints, 240 done issues").
- **Teams, never individuals.** Metrics are shown per team only. No person's name or avatar is ever attached to a metric, a chart or a data-health finding. Issue cards may show the assignee as Jira does; that is the issue's data, not a measure of the person.
- **Never silent.** Every view has its four states designed: loading, empty, error, data.

## 2. The visual system: Atlaskit and design tokens only

- **Components:** Atlaskit (Atlassian's design system), so OV looks native in Jira, light and dark. A custom component only when Atlaskit has none, built from Atlaskit primitives and tokens, and added to § 8 first.
- **Drag and drop:** Atlassian's Pragmatic drag and drop (the library Jira and Trello use), so OV also behaves natively. Its accessibility rules: § 6.
- **Layout:** Atlaskit primitives only (`Box`, `Stack`, `Inline`, `Grid`), spaced with space tokens. No margins on components; space belongs to the layout around them.
- **Every visual value is a design token** (`@atlaskit/tokens`): colours, spacing, typography, radii, shadows, motion. Never a raw value (`#333`, `12px`, `1.2rem`).
- **Styling only through `xcss` with tokens.** No CSS files of our own, no CSS modules, no `style` or `className` attribute, no styled-components or Tailwind. The one stylesheet is Atlassian's own reset (`@atlaskit/css-reset`), part of the design system.
- **Charts** use the chart colour tokens (`color.chart.*`); the same series keeps the same colour on every screen.
- **Nothing loaded from outside Atlassian:** no fonts, images, scripts or styles from any other server (it would break "Runs on Atlassian").
- **Enforced by the build** (set up with the first Forge app):
  - `@atlaskit/eslint-plugin-design-system`, recommended rules as errors (raw values, unsafe token use, deprecated components);
  - a lint rule refusing `.css` imports and the `style` attribute.

## 3. Meaning of colour

Through the tokens' meanings, never chosen by eye:

- **success** (green): on track, likely;
- **warning** (orange): at risk, needs attention;
- **danger** (red): over capacity, off track, or destroying something (only inside its confirmation);
- **discovery** (purple): AI or new;
- **information** (blue): neutral facts and primary actions.

Colour is never the only signal: an icon or a word always goes with it.

## 4. Page layout

- A full page inside Jira: Atlaskit `PageHeader` with the title on the left and page-level actions on the right.
- Filters (team, period, scope) in one bar under the header; changing them updates the page in place.
- Analysis pages (the Reality Check): content in a `Grid` of cards, the headline answer first (top left), its supporting charts after it.
- The planning board: § 7.
- One column on narrow screens; nothing scrolls sideways except wide tables and the board's sprint columns.

## 5. Actions, feedback and states

- **One primary button per view** (`appearance="primary"`); others default or subtle. Labels are verbs naming the result ("Apply 12 changes to Jira", "Start practice"), never "OK" or "Submit".
- **Loading:** a spinner inside the card that is loading, never a whole-page spinner; layout never jumps when data arrives.
- **Empty:** says what will appear and offers the first action, in one sentence.
- **Error:** plain words and a way out ("Couldn't read this board. Try again."), with Retry; details go to the app's logs (inside Atlassian).
- **Confirm only what loses work or changes Jira;** say the consequence.

## 6. Words, motion, accessibility

- **Sentence case** everywhere, as Atlassian does.
- **The same thing has the same name on every screen.**
- **"SAFe"** (a Scaled Agile, Inc. trademark) only where needed, descriptively; prefer "PI planning" and "quarterly planning".
- **Motion:** Atlaskit's own transitions and motion tokens only; none added; reduced motion respected.
- **Accessibility:**
  - Everything works with the keyboard; icon-only buttons have a name; contrast comes from the tokens in both themes.
  - **Drag and drop always has an alternative:** every card can be moved with the keyboard and with a "Move to…" menu (team, sprint, parking lot). A pointer is never required.
  - Every move, and every change of a sprint's status (fits / at risk / over capacity), is announced to screen readers in words.

## 7. Planning screens

The rules specific to the PI planning board and the Reality Check. What each screen does lives in `docs/mvp.md` and its feature spec; the rules here apply to all of them. Example figures below are placeholders: real thresholds are settings (`CLAUDE.md`, rule 7).

### Editors and viewers

- **Viewers see no editing controls** (not disabled ones): a "View only" label in the header says why.
- **Team editors** see drag handles, "Move to…" menus, undo and days off for their own team's row; **plan owners** also see the PI settings, the global view's controls and "Apply to Jira".
- Live changes appear for everyone without reloading; a moved card is briefly highlighted so watchers see what changed.

### Breakout and global views

- **Breakout:** one team's row, with its parking lot (its epics and their stories).
- **Global:** all teams (rows) by sprint (columns), the parking lot beside it.
- **Presenter mode** (global view, for projectors and shared screens): larger type and spacing (typography and space tokens, never raw sizes), editing controls hidden. Readable from the back of a room: sprint status in words and icons, never small numbers alone.

### Practice

- A plan not yet applied is a draft. A rehearsal is marked by a banner on every screen ("Practice: this plan will be discarded").
- Discarding says what is lost.

### Capacity and probability

- Each sprint shows its load against the team's capacity, and the likelihood of delivering it: "18 items planned · capacity 14–17 · 35% likely".
- Status in three steps, each with colour, icon and word: **fits** (success), **at risk** (warning), **over capacity** (danger), with the size of the gap ("over by 4 items").
- Capacity always says where it comes from on demand: the period, the done issues counted, the unplanned allowance deducted, holidays and days off deducted, findings that affect it.
- **Holidays and days off** appear as reduced capacity with their total ("12 days off: −15%"), never as a silent change.
- **Estimates** (new teams) are marked "Estimate, not history", with low confidence; they never look like measured capacity.
- **Not enough data** is a state, not an error: "Not enough history for this team yet (3 sprints found, 6 needed)". Teams below the minimum size: "Team too small to show, to protect individuals' privacy".

### Epics in the parking lot

- An epic shows its stories under it; dragging the epic moves its stories.
- An epic with no stories shows "Needs breaking down" and can't be dragged.
- A story can only be dropped in its own team's sprints; other teams' rows refuse it, with the reason in words.

### Apply to Jira

- One primary action, for plan owners only, with the number of changes in its label.
- Before anything is written: a review listing every change, grouped by team and sprint (issue moved, sprint created), each line in plain words; issues changed in Jira since they were placed are listed first.
- After: what was applied and, for anything that failed, which issue and why, in plain words, with Retry for the failed ones only. Nothing fails silently.

### Findings

- **Findings, never verdicts:** each describes the data ("38 issues were closed on the same day without being started"), its effect on a number ("capacity may be overstated by about 10%"), and what would fix it.
- Never who caused it: no names, no blame.
- "Story points don't predict duration here" is shown as a finding with its evidence, never as a judgement on the team.

### Live updates

- If live updates drop, the board says so ("Live updates paused, refreshing every 30 seconds") and keeps working; when they return, it says so.
- An editor's unsent moves are never lost: kept locally, sent when the connection returns, with a visible "Saving…" state.

## 8. Custom components

None yet. Each one added here with its purpose, before it is built. Expected with the board (to be specified in its feature spec): the issue card, the sprint cell with its capacity status, the parking lot.

## 9. The website: the Signal theme

The marketing site (`apps/site`) follows § 1 (principles), § 3's meaning of colour and § 6 (words, accessibility). Its look is its own: sections 2, 4, 7 and 8 (Atlaskit) apply to the Jira apps only. Why: the site's look (a near-black ground, Sora type, pill buttons, very large type, the particle cube) is outside Atlaskit; forcing it there would mean overriding Atlaskit everywhere.

### Tokens and styling

- **Every visual value is a token** in `packages/design/src/tokens.css` (`--ov-*`), the one place raw values live. Components style themselves with CSS Modules using only those variables; Stylelint refuses raw colours, sizes, spacing and fonts.
- **Shared patterns are composed, not copied:** section titles, item titles, plain lists, column grids and centred stacks live in `ui/patterns.module.css`, reused with `composes`.
- No inline `style`, no global classes besides `styles/base.css` (page basics).

### Colour

- A near-black ground, Atlassian's dark-mode text greys, one light band ("How it works") and one blue band (contact). All values come from Atlassian's palette, so Jira screenshots sit well on the site.
- **Blue** is capacity and action. **Red means over capacity, and nothing else:** the red particles, the words "over capacity" in the heading beside them, and their legend. Never decoration.
- A colour is never the only signal: red text says what it means.

### Type

- **Sora** for everything: light (300) for statements, leads and large figures; semibold (600) for headings. **Syncopate** bold, in capitals, only for the wordmark.
- Fonts are served by the site itself (Fontsource), never by Google Fonts (visitors' addresses would go to Google).
- Sizes scale with the screen (`clamp` in the tokens). Media queries are the one place a raw width is written (CSS can't read a variable there): only for what can't scale, such as hiding the wordmark under 30rem.

### Layout

- Sections in this order: the hero (the header over it), the statement, planning today (with the overload cube), how it works (with the chart), numbers you can defend, contact, the footer.
- **Section titles state the reader's job** (what they need to get done: "See which sprints are over capacity before the quarter starts"), not a feature or a claim about the product.
- Each section a full-width band, its content centred at the text width (`--ov-content-width`) or, for two columns, the wide one; generous space (`--ov-space-section`) above and below.
- **One primary action per page.** Today: the contact form, at the end of the page; the header carries only the logo; the hero's one button leads to how it works. When the demo board and the Marketplace listings exist, the primary action becomes "Try the demo", and contact moves to secondary. Links shaped as pills, light on the dark ground.

### The particle cube

- One component (`cube/ParticleCube.tsx`), its geometry pure and tested (`cube/geometry.ts`).
- **Hero** (`sections/heroCube.ts`, its one definition): scattered particles form the blue cube (your history becoming a plan). Blue only: the red belongs to planning today, where it is explained. (A story mode, the red arriving above the formed cube, exists in the component, unused.)
- **First paint:** a still of the formed cube, drawn at build time from the same geometry (`scripts/stills.ts`), shows at once; the live cube starts from that same moment and fades in over it, so nothing jumps. The same still, at 1200 × 630, is the image link previews show.
- **Planning today:** the overload cube, with red particles hovering above it, and its legend under it.
- Decorative: hidden from screen readers. Still for visitors who turn motion off; paused while off screen. Its colours are read from the tokens.

### The hero

- The line above the headline names the reader (who it's for), not the category.
- A soft dark halo behind the text keeps it readable over the particles.
- It reserves the header's height and grows with its content.

### The chart

- "How it works" ends with the idea as a chart (`chart/CapacityChart.tsx`, its layout pure and tested): each sprint's planned work against the capacity the team really has, the part beyond it in red, the likelihood above each bar, "Example data" in its caption. Drawn from data, described in words for screen readers.
- On the light band, red is the darker red (`--ov-color-over-on-light`) so it stays visible on light.
- Every picture with colours has its legend (`ui/Legend.tsx`): what each colour or line means, in words.

### The demo board (when built)

- **Shows the product as it is:** its own page, with the app's look (Atlaskit), not the Signal theme, framed by the site's header. A preview that looks better than the product would break trust.
- Public Jira data with contributors' names anonymised; "Example data from public projects" always visible.
- Forecasts computed at build time; the page computes nothing.

### Content and voice

- One static page, prerendered at build so search engines and link previews read it without JavaScript; its title, description and preview tags come from the same content.
- **Every word in one file** (`apps/site/src/content.ts`); components only lay it out.
- **The product speaks, not a person:** no names, no "we".
- **No results claimed until OV has its own:** no figures from anyone's past work or clients. Results come later from published calibration (how often forecasts came true) and from pilots, with their consent.
- Screenshots and posts show public or example data only, with names anonymised.

### The contact form

- Name, work email, company (optional), message; labels above the fields, each problem said in words under its field once the field is left (or on send), never colour alone.
- Sending stores the message in Firestore (`contactMessages`); the owner reads them in the Firebase console (the free plan sends no notifications). Firebase loads only when someone sends, never with the page.
- `firestore.rules` lets anyone create a message with exactly these fields and sizes, and nobody read, change or delete one from outside; the limits match the form's (`contact/message.ts`), a test checks them on the emulator.
- Bots: a hidden field people never see; when it is filled, nothing is sent.
- A one-line privacy note says what the details are used for, where they are stored, how long they are kept, and that they are deleted on request; it links to the privacy policy once it exists.

### Measurement

- Visits are counted with Umami Cloud (`apps/site/src/analytics.ts`): no cookies and no personal data, so no consent banner. Counted only on outcomevault.com, never on previews. No other tracking on the page. Never in the Jira apps (§ 2).

### Brand

- **One source:** the logo is drawn from its specification (`docs/brand/logo.md`) by `packages/design`, its colours read from the tokens. No logo file is made by hand.
- **The website's files are built with it:** the horizontal logo in the header (one image: mark and wordmark), the favicon (SVG, 32 px), the phone home-screen icon (180 px) and the app icon (512 px).
- **Every other file** (LinkedIn logo and cover, email signature, anything new) is exported from the logo generator (`apps/brand`), whose presets are the same list.
- The gold appears only in the logo: on the page, blue and red keep their meanings.
