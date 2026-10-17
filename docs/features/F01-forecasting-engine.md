# F01: the forecasting engine

Status: **draft, not approved** (2026-10-17). Shaped with the owner in a brainstorm on 2026-10-17; the thresholds are starting values, to be confirmed by the calibration back-test before launch.

Relies on `docs/mvp.md` § Capacity and probability, § Findings that lower confidence, § Teams and Jira data, § What the MVP is (the Reality Check). Privacy: `docs/engineering/privacy.md`. Calibration: `docs/engineering/platform.md` § Calibrated forecasts.

## What it is

The numbers behind every screen, for one team: how many stories it finishes per sprint, how much of that was unplanned, how likely it is to finish a given load in one sprint or over the PI, how far to trust that, and the evidence behind it. Plain functions behind the API, with no Jira, Forge or screen: the Reality Check, the board and the demo board all call them.

## Principles it follows

- **Advise, never block.** Every load gets its probability; adding stories lowers it. People decide what risk to accept.
- **Teams, never individuals.** No per-person capacity, throughput or chart: a team's work is not the sum of its people, one person's numbers are noise, and per-person figures invite gaming and need works council approval (`docs/engineering/privacy.md`).
- **No meaningless number.** When history can't support a forecast, the engine says why instead of showing "0" or "2 a quarter".
- **Every number explainable.** Each figure comes with the stories behind it and a track record from the team's own past.
- **Symptoms, never blame.** Findings describe the way of working (stories too big, plans not kept), never a person, and say what to change.

## In scope

- Throughput per window, by calendar, from the stories' done dates.
- The unplanned share and capacity after deducting it.
- The probability of a load in one window and over several (the PI).
- The confidence level and the capacity at that level.
- Three states: forecast, not enough history, not fit; and a confidence grade.
- Range estimates for new teams, replaced by history window by window.
- Team changes: a "changed on" date, scaling for team size.
- The evidence: the per-window breakdown, each story's timeline, the track record.
- The PI figures across teams.
- The settings, with their defaults in one place.

## Not in scope (later features)

- **F02, the Jira adapter:** reading a board's sprints, stories and their status and sprint history from Jira into this contract. It needs each story's change history (for start dates and sprint moves), which is slower to read; F02 decides how.
- **F03, the Reality Check screen:** the numbers, the track record and the story timeline. The per-window breakdown chart comes after it.
- **F04, findings:** data health, sizing, story points against duration. F01 computes only what the states and grades need.
- **Board only:** days off and the fits / at risk / over capacity statuses on sprint slots.
- **Not in the MVP:** a stretch zone (stories planned between the confidence level and 50%, like SAFe's "uncommitted objectives"). Teams rarely deliver more than they commit; the probability shown for each added story already makes the risk visible.

## What the engine is given (input, per team)

- The **window length**: the PI's sprint length (or, in the Reality Check, the team's usual sprint length).
- The team's **stories** (plannable types only, `docs/mvp.md` § Teams and Jira data) finished in the period read, each with: key, type, created date, start date (first move to "in progress", if any), done date, the sprints it was in and when it entered and left each, story points if any.
- The team's **sprints**, if it uses them: start and end dates.
- Optional, set by the team: a **range estimate** (low and high stories per window), a **"changed on"** date, an **unplanned allowance** of its own, **team size** for the history and for the plan, **excluded windows** with a reason.
- No account IDs and no names reach the engine.

## What it answers (output, per team)

- The **state**: forecast, not enough history, or not fit (with the diagnosis).
- The **confidence grade** (High, Medium, Low) and the reasons for it.
- **Capacity** at the confidence level for the next window and for the PI, and the probability of any given load.
- The **unplanned share** and the allowance in use (measured, approximated, or the team's own), always labelled.
- The **evidence**: per window, committed, delivered (planned and unplanned), carried over, removed, each with its stories; each story's start and done dates and markings (unplanned, bug or incident, bulk closure, carried over); the track record.
- The windows used, and those left out with the reason.

## Definitions

- **Windows:** consecutive periods of the window length, counted back from the end of the team's last closed sprint (or from today if the team doesn't use sprints). Throughput doesn't depend on the team using or respecting Jira sprints.
- **Throughput:** the stories done in a window, by done date.
- **Committed, carried over, removed:** from the sprint data, when the team uses sprints. Committed = in the sprint when it started; carried over = committed, not done, moved to a later sprint; removed = taken out before the sprint ended.
- **Unplanned:** done stories added to the sprint after it started. Without sprints, approximated as stories created after the window started, and labelled "approximation". **Unplanned share** = unplanned ÷ all done, over the history.
- **Capacity after the allowance:** each window's throughput × (1 − allowance). The allowance is the measured share unless the team enters its own; the screen shows which.
- **Probability of a load of _k_ stories in one window:** the share of past windows whose capacity was at least _k_.
- **Over several windows (the PI):** every combination of past windows is counted exactly (8 past windows over 3 future ones: 8 × 8 × 8 = 512 combinations). Nothing random: the same history always gives the same answer, and the golden tests are exact.
- **Capacity at the confidence level:** the largest load whose probability is at least that level.
- **Confidence level:** 85% by default; the plan owner sets it once per PI, between 50% and 95%. With _n_ windows, the highest level history can support is (_n_ − 1) ÷ _n_ (87.5% with 8); above it, a warning says the history is too short for that level.
- **Range estimate (new teams):** every whole number in the team's range is equally likely. Until the minimum history is reached, the real windows are completed with estimated ones: with 1 real window and a minimum of 4, the forecast is 1 part history, 3 parts estimate. Shown as "Estimate, not history". The range is what the team can plan: no allowance is deducted from it.
- **"Changed on":** windows before the date are ignored; if fewer than the minimum remain, the range estimate fills the gap.
- **Team size:** capacity × (plan size ÷ history size), e.g. 6 people to 5 gives 5/6. Someone at 50% counts as 0.5. A change of more than 20% lowers the grade.
- **Excluded windows:** removed by a team editor with a reason, listed on screen. The first item to defer if time runs short.
- **Track record:** the team's past replayed: for each of the last 10 windows with enough history before it, the capacity at 85% forecast from the windows before it, compared with what was delivered. "Met 7 times out of 10."
- **Bulk closure:** 10 or more stories set to done within the same hour.

## States and grades

**Not fit** (any one is enough):

- more than half of the stories took longer than one window from start to done;
- more than a third of the windows finished nothing;
- more than a quarter of the done stories came from bulk closures.

The diagnosis says which, in plain words, with what to change (e.g. "Most stories take 5 to 9 weeks from start to done; a sprint is 2 weeks. Split stories so most finish within a sprint."). No number is shown; the board plans the team with a range estimate.

**Not enough history:** fewer windows than the minimum and no range estimate. With a range estimate, the state is "forecast", graded Low.

**Grades** (state "forecast"):

| Grade  | When                                                                                                               |
| ------ | ------------------------------------------------------------------------------------------------------------------ |
| High   | 8+ windows since any change, track record met in at least 7 of 10 replayed windows, no serious data-health finding |
| Medium | 4–7 windows, or team size changed by more than 20%, or one serious finding                                         |
| Low    | an estimate in use, or a poor track record (below 7 of 10), or two or more serious findings                        |

"Serious findings" are defined by F04; until it exists, the grade uses history length, size changes and the track record.

## The PI figures (across teams)

- Each team's PI total, with its probability.
- **The headline:** the expected share of committed stories delivered (e.g. "expected to deliver 94% of committed stories").
- The teams below the confidence level, named.
- The probability that **every** team delivers **everything**, shown only with its explanation: it multiplies (8 teams at 85% each give 27%), so it looks alarming even in a healthy plan.

## Settings and defaults

All in one place; the starting values are tuned by the calibration back-test.

| Setting                    | Default        | Why                                                                                     |
| -------------------------- | -------------- | --------------------------------------------------------------------------------------- |
| History window             | 8 windows      | About 4 months at 2 weeks: recent enough, and enough windows for 85% to mean something. |
| Minimum history            | 4 windows      | With fewer, one odd window decides the number.                                          |
| Confidence level           | 85% (50%–95%)  | The usual level in throughput forecasting, and the highest 8 windows can support.       |
| Minimum team size          | 3 people       | Below it, team numbers point to individuals.                                            |
| Not fit: long stories      | over 50%       | Most stories don't fit a window: counting per window is meaningless.                    |
| Not fit: empty windows     | over 1/3       | Delivery too irregular to forecast.                                                     |
| Not fit: bulk closures     | over 25%       | Done dates don't reflect real delivery.                                                 |
| Bulk closure               | 10+ in an hour | A cleanup, not delivery.                                                                |
| Grade: good track record   | 7 of 10        | Close to what 85% should give.                                                          |
| Grade: team size change    | over 20%       | One person in five changed.                                                             |
| PI windows (Reality Check) | 3              | Next-3-sprints range on the Reality Check.                                              |

## Worked examples (golden tests)

**1. A steady team,** 8 windows:

| Window             | 1   | 2   | 3   | 4   | 5   | 6   | 7   | 8   |
| ------------------ | --- | --- | --- | --- | --- | --- | --- | --- |
| Done stories       | 7   | 9   | 10  | 8   | 12  | 6   | 9   | 11  |
| Of which unplanned | 1   | 2   | 1   | 0   | 2   | 1   | 2   | 1   |

- 72 done, 10 unplanned: **unplanned share 13.9%**.
- Capacity per window after the allowance: 6.03, 7.75, 8.61, 6.89, 10.33, 5.17, 7.75, 9.47.
- **Next window:** 6 stories at 85% (87.5%); a 7th drops it to 62.5%, an 8th to 37.5%.
- **Next 3 windows:** 20 stories at 85% (85.5%); 22 stories give 67.2%.
- With only 3 windows and no estimate: "not enough history (3 of 4)".

**2. A new team** with a range of 6 to 10 and 1 real window of 8 done, none unplanned:

- 1 part history, 3 parts estimate: **7 stories at 85%** (exactly 85%); 8 stories give 70%. Labelled "Estimate, not history", grade Low.

**3. A team whose history is not fit:** 8 windows, 3 of them with nothing done (37.5%, over a third): state "not fit", no number, diagnosis "Delivery is too irregular to forecast: 3 of the last 8 sprints finished nothing."

## Open

- **Team size for the history:** entered by the team, or counted from the people who completed stories (a count only)? Recommended: entered, on the board; the Reality Check doesn't scale.
- **Story points:** carried in the input for F04, unused here.
- **The Public Jira Dataset's licence:** checked before its fixtures are committed.

## Done when

- The contract (Zod) and the functions exist; `pnpm check` passes.
- The three worked examples and at least 3 teams from the Public Jira Dataset pass as golden tests.
- The calibration back-test script runs on the same fixtures and reports how often "85%" came true.
- Package names: `packages/contract` (the Zod schemas and settings) and `packages/engine` (the functions).
