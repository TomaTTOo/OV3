# UI guidelines

The single owner of every rule about how OV looks and behaves on screen. A new pattern is added here before it is used.

## 1. Principles

- **Every screen earns trust** (Trustworthiness = (Credibility + Reliability + Intimacy) / Self-orientation). The rules below serve its terms: credibility through honest numbers; reliability through a native look and behaviour (§ 2); intimacy through the user's own data in leaders' words; self-orientation kept low: no upsell prompts, no nags, nothing asked of the user that doesn't serve them.
- **One job per screen.** The reader knows at once what the screen answers ("When will this be done?") and what to do next. One primary action at most.
- **Leaders' words.** Delivery and portfolio terms the reader already uses (throughput, forecast, commitment, key result). Nothing technical: no ids, field names, error codes, API or Jira internals.
- **Minimal.** The fewest numbers, words and elements that answer the question. One number or chart per element, with a short label; details open on demand.
- **Honest numbers.** A forecast is a range with its likelihood (50% / 85% / 95%), never a single date. An estimate never looks like a fact. Every figure says its period and its population ("last 12 sprints, 240 done issues").
- **Never silent.** Every view has its four states designed: loading, empty, error, data.

## 2. The visual system: Atlaskit and design tokens only

- **Components:** Atlaskit (Atlassian's design system), so OV looks native in Jira, light and dark. A custom component only when Atlaskit has none, built from Atlaskit primitives and tokens, and added to § 7 first.
- **Drag and drop:** Atlassian's Pragmatic drag and drop (the library Jira and Trello use), so OV also behaves natively.
- **Layout:** Atlaskit primitives only (`Box`, `Stack`, `Inline`, `Grid`), spaced with space tokens. No margins on components; space belongs to the layout around them.
- **Every visual value is a design token** (`@atlaskit/tokens`): colours, spacing, typography, radii, shadows, motion. Never a raw value (`#333`, `12px`, `1.2rem`).
- **Styling only through `xcss` with tokens.** No CSS files of our own, no CSS modules, no `style` or `className` attribute, no styled-components or Tailwind. The one stylesheet is Atlassian's own reset (`@atlaskit/css-reset`), part of the design system.
- **Charts** use the chart colour tokens (`color.chart.*`); the same series keeps the same colour on every screen.
- **Enforced by the build** (set up with the Jira app, `apps/jira`):
  - `@atlaskit/eslint-plugin-design-system`, recommended rules as errors (raw values, unsafe token use, deprecated components);
  - a lint rule refusing `.css` imports and the `style` attribute.

## 3. Meaning of colour

Through the tokens' meanings, never chosen by eye:

- **success** (green): on track, likely;
- **warning** (orange): at risk, needs attention;
- **danger** (red): off track, or destroying something (only inside its confirmation);
- **discovery** (purple): AI or new;
- **information** (blue): neutral facts and primary actions.

Colour is never the only signal: an icon or a word always goes with it.

## 4. Page layout

- A full page inside Jira: Atlaskit `PageHeader` with the title on the left and page-level actions on the right.
- Filters (team, period, scope) in one bar under the header; changing them updates the page in place.
- Content in a `Grid` of cards: the headline answer first (top left), its supporting charts after it.
- One column on narrow screens; nothing scrolls sideways except wide tables.

## 5. Actions, feedback and states

- **One primary button per view** (`appearance="primary"`); others default or subtle. Labels are verbs naming the result ("Run forecast", "Link to key result"), never "OK" or "Submit".
- **Loading:** a spinner inside the card that is loading, never a whole-page spinner; layout never jumps when data arrives.
- **Empty:** says what will appear and offers the first action, in one sentence.
- **Error:** plain words and a way out ("Couldn't read this board. Try again."), with Retry; details go to the logs.
- **Confirm only what loses work;** say the consequence.

## 6. Words, motion, accessibility

- **Sentence case** everywhere, as Atlassian does.
- **The same thing has the same name on every screen.**
- **Motion:** Atlaskit's own transitions and motion tokens only; none added; reduced motion respected.
- **Accessibility:** everything works with the keyboard; icon-only buttons have a name; contrast comes from the tokens in both themes.

## 7. Custom components

None yet. Each one added here with its purpose, before it is built.

## 8. The website: the Signal theme

The marketing site (`apps/site`) follows § 1 (principles), § 3's meaning of colour and § 6 (words, accessibility). Its look is its own: sections 2, 4 and 7 (Atlaskit) apply to the Jira app only. Why: the site's look (a near-black ground, Sora type, pill buttons, very large type, the particle cube) is outside Atlaskit; forcing it there would mean overriding Atlaskit everywhere.

### Tokens and styling

- **Every visual value is a token** in `apps/site/src/styles/tokens.css` (`--ov-*`), the one place raw values live. Components style themselves with CSS Modules using only those variables; Stylelint refuses raw colours, sizes, spacing and fonts.
- **Shared patterns are composed, not copied:** section titles, item titles, plain lists, column grids and centred stacks live in `ui/patterns.module.css`, reused with `composes`.
- No inline `style`, no global classes besides `styles/base.css` (page basics).

### Colour

- A near-black ground, Atlassian's dark-mode text greys, one light band ("How it works") and one blue band (the pilot). All values come from Atlassian's palette, so Jira screenshots sit well on the site.
- **Blue** is capacity and action. **Red means over capacity, and nothing else:** the red particles, the words "over capacity" in the heading beside them, and their legend. Never decoration.
- A colour is never the only signal: red text says what it means.

### Type

- **Sora** for everything: light (300) for statements, leads and large figures; semibold (600) for headings. **Syncopate** bold, in capitals, only for the wordmark.
- Fonts are served by the site itself (Fontsource), never by Google Fonts (visitors' addresses would go to Google).
- Sizes scale with the screen (`clamp` in the tokens). Media queries are the one place a raw width is written (CSS can't read a variable there): only for what can't scale, such as hiding the wordmark under 30rem.

### Layout

- Sections in this order: the hero (the header over it), the statement, planning today (with the overload cube), how it works, numbers you can defend, the method's results, the pilot, the footer.
- Each section a full-width band, its content centred at the text width (`--ov-content-width`) or, for two columns, the wide one; generous space (`--ov-space-section`) above and below.
- **One action across the site: "Join the pilot".** Links shaped as pills: light on dark (the main action), outline (secondary), dark on blue (the pilot).

### The particle cube

- One component (`cube/ParticleCube.tsx`), its geometry pure and tested (`cube/geometry.ts`).
- **Hero, the story** (`sections/heroCube.ts`, its one definition): scattered particles form the blue cube (your history becoming a plan), red ones arrive above it (the overload), all holds, scatters, and starts again.
- **First paint:** a still of the story's formed moment, drawn at build time from the same geometry (`scripts/stills.ts`), shows at once; the live cube starts from that same moment and fades in over it, so nothing jumps. The same still, at 1200 × 630, is the image link previews show.
- **Planning today:** the overload cube, with red particles hovering above it, and its legend under it.
- Decorative: hidden from screen readers. Still for visitors who turn motion off; paused while off screen. Its colours are read from the tokens.

### The hero

- The line above the headline names the reader (who it's for), not the category.
- A soft dark halo behind the text keeps it readable over the particles.
- It reserves the header's height and grows with its content; on narrow screens the header shows the logo without the wordmark.

### The chart

- "How it works" ends with the idea as a chart (`chart/CapacityChart.tsx`, its layout pure and tested): each sprint's planned work against the capacity the team really has, the part beyond it in red, the likelihood above each bar, "Example data" in its caption. Drawn from data, described in words for screen readers.
- On the light band, red is the darker red (`--ov-color-over-on-light`) so it stays visible on light.
- Every picture with colours has its legend (`ui/Legend.tsx`): what each colour or line means, in words.

### Content and voice

- One static page, prerendered at build so search engines and link previews read it without JavaScript; its title, description and preview tags come from the same content.
- **Every word in one file** (`apps/site/src/content.ts`); components only lay it out.
- **The product speaks, not a person:** no names, no "we"; results are the method's, described by scale and sector, never by client name.

### Brand

- The header shows the logo (`public/brand/logo-dark.svg`) beside the wordmark. The logo's specification and source files: `docs/brand/` (to be revised).
