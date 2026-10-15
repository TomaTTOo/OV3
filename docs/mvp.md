# The MVP: a PI planning board with real capacity

Status: draft (2026-10-15), to be checked against the planning journey before the board's feature specs. Read when writing or building a feature. Feature specs (`docs/features/Fxx-name.md`) point to the sections here they rely on. Screen rules: `docs/ui-guidelines.md` § 7.

## What the MVP is

- **The free Reality Check** (a Forge app, read-only, built first): per team, throughput from history, an 85th-percentile capacity range, the unplanned share of past work, data-health findings, story points against actual duration. Proves the forecasting engine before the board exists.
- **The PI planning board** (a second Forge app, paid): the rest of this file.
- **The public demo board** (on the website): the board on public Jira data with names anonymised, forecasts computed at build time; nothing to install.

All three share one forecasting engine behind the API (`CLAUDE.md`, architecture).

## How PI planning actually runs

- Teams plan in **breakouts**, each on its own board, at the same time; then everyone gathers for the **global review** of the whole plan (presentation, dependencies, confidence vote).
- Many people attend (often 50–150), but few edit at once: one or two per team in breakouts, the RTE in the global review. Most participants watch.
- Each team usually has its own Jira board.
- Grouping items are mostly epics, sometimes custom types (feature, enabler), often used for work sized as features; plannable items are mostly stories.
- Teams in one planning usually share one sprint length; mixed lengths (e.g. 2 and 4 weeks) exist but are rare and not good practice.

## Teams and Jira data

- **One team = one Jira board.** Capacity comes from that board's sprint history.
- **Issue types configured by the admin** in two roles:
  - **grouping** (epic, feature, enabler): shown in the parking lot with their stories under them, never placed in sprints;
  - **plannable** (story, task, bug, spike): what goes into sprints. Only standard-level types can be chosen (Jira allows only those in sprints); sub-tasks excluded.
- **Epics are never placed; their stories are.** Dragging a grouping item moves its stories. An epic whose stories sit in several teams' boards appears under each of those teams: that is how an epic is split between teams. An epic with no stories shows "Needs breaking down" and can't be dragged.
- **A story goes only into its own team's sprints.** Jira accepts any sprint, but a story outside a board's filter doesn't show on that board. Moving work between teams is done in Jira first.

## The PI

- Set by the plan owner: name, start and end dates, one sprint length for all teams (1, 2, 3 or 4 weeks). The sprint slots are generated from them.
- OV uses each board's existing future sprints when they match, and proposes the missing ones, created only on "Apply to Jira".
- A board whose sprints don't match the PI's cadence gets a clear message, not a broken grid.

## Views

- **One plan, two views:**
  - **breakout view:** one team's row; teams work in parallel, each on its own row;
  - **global view:** all teams (rows) by sprint (columns), the parking lot beside it; driven by the plan owner for the review, in **presenter mode** (larger type, editing hidden).
- Viewers receive changes live; a moved card is briefly highlighted.
- Fast for the person driving: drag and drop, keyboard shortcuts and a "Move to…" menu, undo, capacity visible at a glance.

## Practice and training

Two uses, kept apart:

- **Rehearsal** (MVP): a run-through of the real plan before the event, on real Jira data. Every plan is a draft until "Apply to Jira"; a rehearsal is a draft that's discarded, marked by a banner on every screen.
- **Training and simulation:** coaches and RTEs teach the board, or PI planning itself, on **example data** (example teams with history, epics and stories), never the company's Jira.
  - **MVP:** the public demo board, for self-training (single-user, nothing to install).
  - **Right after the MVP:** a training PI inside the app, created from built-in example teams; multi-user, usable in a coach's own Jira site or a free site; can never be applied to Jira.
  - **Later:** scripted simulations, where the coach triggers events mid-session (a priority change, a team losing people).

## Permissions

Three levels, mapped by the admin to Jira groups and project roles:

- **Plan owner** (RTE): creates the PI, sets dates and sprint length, chooses teams, runs the global view, applies to Jira. Best mapped to a group, since a PI spans several projects.
- **Team editor** (Scrum Master, product owner, team members as allowed): places items and enters days off in their own team's row only. Best mapped to a role in the team's project.
- **Viewer:** everyone else.

"Apply to Jira" runs as the person clicking it, so Jira's own permissions still apply: OV can never write more than that person could in Jira.

## Capacity and probability

- **Throughput in items per sprint,** sampled from the team's last sprints (window is a setting).
- **Each slot shows its capacity as percentiles** ("10 at 85%": 85% likely to finish at least 10 items). Placing an 11th item lowers the likelihood (e.g. to 70%) and changes the status; every item added lowers it further. Thresholds for fits, at risk and over capacity are settings.
- **Unplanned allowance:** the share of past throughput added after sprint start (bugs, expedited work) is measured and deducted from capacity, shown explicitly, editable by the team. Without it, a plan of planned stories compared with total throughput overcommits.
- **Holidays and days off:** entered manually as team totals per sprint ("12 days off in sprint 3"), with the team's size as a number; capacity is scaled by the share of person-days available. No per-person data.
- **New teams, or teams that changed a lot:** a range estimate ("6 to 10 items per sprint"), marked "Estimate, not history", with low confidence; blended with real throughput as sprints complete, until enough history exists (minimum is a setting). A changed team can also shorten its history window.
- **Story points** shown as the team reported them, beside the item count; their disagreement with duration is a finding.
- **What throughput assumes:** the future looks like the past. Items need not be exactly sprint-sized; they need to be sliced the way the team usually slices them. The findings below say when that assumption is weak.

## Findings that lower confidence (never blocks)

- **Data health:** mass closures, items finished without being started, reopened items, zombies, and their effect on each number.
- **Sizing:** how often items of a type took longer than a sprint; placed items much bigger than the team's usual; items that keep rolling over.
- **Team changes:** short history, or recent sprints very different from earlier ones.

## Apply to Jira

- One action for the plan owner, with the number of changes in its label.
- Before anything is written: every change listed, by team and sprint (issue moved, sprint created).
- After: what was applied, and anything that failed (which issue and why), with retry for the failed ones only.
- Issues changed in Jira since they were placed are listed before applying; nothing is overwritten silently.
- An audit log keeps every applied change.

## Concurrency

- The draft lives in Forge storage until applied.
- Issues changed in Jira during planning are refreshed on the board.
- Two editors moving the same card: last move wins, both see it. Rare, since team editors work on separate rows.
- A dropped connection never loses an editor's moves: kept locally, sent when the connection returns.

## For the Jira admin

- A settings page they control: boards, issue types (grouping and plannable), permission mapping.
- Read-only by default; write access used only by "Apply to Jira".
- An audit log of every change applied to Jira.
- A one-page security sheet: "Runs on Atlassian" (no data leaves Jira, data residency inherited), scopes used and why, the continuity answer (the plan lives in Jira), and the works council sheet (`docs/engineering/privacy.md`).

## Technical notes

- **Real time:** Forge Realtime (still labelled Preview), limited to 50 operations per second per installation. About one editor per team in breakouts plus viewers stays well within it; load-test a simulated full session before the first real event. Fallback: periodic refresh, shown to users.
- **Scopes:** the Reality Check reads only; the board adds the write scopes "Apply to Jira" needs, planned up front (`docs/engineering/platform.md`).
- **Privacy:** per-team metrics, a minimum team size, account IDs only (`docs/engineering/privacy.md`).

## What to cut first if time runs short

- Presenter mode (people can zoom), the PI-level figure per team, dragging a grouping item to move all its stories.
- Never cut: the review before "Apply to Jira", undo, the keyboard alternative to drag and drop, "not enough data" and "estimate" states, the unplanned allowance.

## Out of the MVP

- **Next, in this order:** dependencies; confidence votes (per team, recorded on the plan); risks (ROAM); PI objectives. The training PI comes right after dependencies, or before them if coaches show strong interest during the beta.
- **Later, if pilots ask:**
  - per-person availability (days marked unavailable, no reason recorded, visible to the team and plan owner only, deleted after the PI; an admin setting chooses per-person or team total);
  - a reference team to borrow history for new teams;
  - public holidays from data bundled in the app, for major countries (an online service would break "Runs on Atlassian");
  - moving stories between teams from the board.
- **Not planned:** mixed sprint lengths in one PI; the Innovation and Planning sprint (rarely used in practice).
- **Then:** the key-result and hypothesis links, then the portfolio.
