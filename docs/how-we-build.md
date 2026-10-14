# How OV is built: the concepts

For the owner, and for anyone assessing how Outcome Vault is built (a partner, a buyer, an investor).

This page only explains concepts in plain words. It states no rules: the rules live only in `CLAUDE.md`, and the decisions and their reasons only in `docs/context.md`.

## API-first, thin client

An app split in two: **screens** that only show data and send what the user does, and **business logic** behind an **API** (a set of requests, each with a fixed shape for what goes in and comes back). On Jira, the screens are a Forge _Custom UI_ and the logic runs in Forge _resolvers_, both inside Atlassian. It is the most common way modern apps are built.

## Contract

The exact shape of a piece of data that crosses between screens and logic. Example: a forecast is "a team, and the dates by which the work is 50%, 85% and 95% likely to be done".

## Zod

The TypeScript library contracts are written with. One Zod description gives two things: a **type** (code that doesn't match the shape is refused before it runs) and a **check** (data arriving while the app runs is verified, and anything wrong fails loudly).

```ts
const Forecast = z.object({
  team: z.string(),
  p50: z.string().date(),
  p85: z.string().date(),
  p95: z.string().date(),
});
```

For those who knew Flash Builder: like an ActionScript value object that also validates the data it receives.

## Contract-first and test-driven development (TDD)

Building the interface and the expected results before the code, so the code is judged against them rather than the other way round.

## Golden, component, contract and adapter tests

- **Golden test:** real input data and the expected output, fixed in advance; proves a calculation is right.
- **Component test:** proves a screen shows the right thing for the data it's given.
- **Contract test:** proves two sides (e.g. a fake API used while building screens, and the real one) answer in the same shape.
- **Adapter test:** proves data from an outside system (Jira) is turned into the right contract data.

## Functional programming, and reuse by composition

Instead of classes and inheritance (object-oriented programming): **plain data** and **functions** (data in, result out; the same input always gives the same output, which makes them easy to test). Reuse comes from **composition**: a contract extends another or takes some of its fields; small functions are combined into bigger ones. Any data with the right shape fits a contract; there is no family tree of classes.

## Presentational components and hooks (passive views)

A screen split into **presentational components**, which receive data, show it and report what the user did, and **hooks**, which ask the API for data and hand it to the components. It is React's standard form of passive views.

## Lint, formatter, complexity and duplicate checks

Tools that read the code on every change and refuse it when it breaks agreed limits: style and likely mistakes (ESLint), CSS that uses anything but the design tokens (Stylelint), layout (Prettier), how complex a function or how long a file may be, and repeated code.

## Design tokens and a design system

**Design tokens** are named visual values (a colour, a spacing, a font size) defined once, such as `space.200` or `color.text.subtle`; screens use the name, never the value, so changing a token changes every screen at once. A **design system** is a set of ready-made components styled only with those tokens; Atlassian's is called Atlaskit. Together they are the single source of truth for how screens look, which utility-class styles such as Tailwind are not.
