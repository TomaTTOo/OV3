---
name: startup
description: Start a fresh session on Outcome Vault (OV3) - what the project is, where the last session stopped, the next action, and where it stands against the plan's time box. Use when the owner types /startup or opens a new chat to continue the work.
---

# Startup: pick up where we left off

CLAUDE.md (the rules and the docs map) loads on its own; don't re-read it. Spend few tokens: read only the files the task needs.

## 1. Where things stand

- `git status -sb` and `git log --oneline -8`: anything uncommitted or unpushed is the first thing to mention.
- Today's date (`date`), to place the work in the plan's time box (week 1 starts 2026-10-19; the stop rule is at the end of January 2027).
- `docs/context.md`, whole (it is short): the plan, where it stands, **last session**, next actions, challenges. It is the record; trust it over memory.
- `docs/features/`: list the files; read the spec of the feature in progress, if any (the one named in § Last session, or the newest not yet validated).

## 2. Only if the owner's request touches it

Use the docs map in CLAUDE.md; read the file, not every file:

- the MVP or a feature's scope: `docs/mvp.md`;
- the product, its audience or copy: `docs/product.md`;
- re-opening a past decision: `docs/decisions.md`;
- stored data, people in schemas, scopes: `docs/engineering/privacy.md`;
- Forge, Jira APIs, dependencies, tests: `docs/engineering/platform.md`;
- a screen: `docs/ui-guidelines.md` (headings first);
- pricing, the beta, the website's content, launch: `docs/business/go-to-market.md`;
- the live site: outcomevault.com is deployed from `main` with `pnpm deploy:site`; nothing to start unless the owner wants a local preview (`pnpm --filter @ov/site dev`). New contact messages are read in the Firebase console (Firestore, `contactMessages`); there is no notification.

## 3. Report, then wait

At most 8 lines, in the owner's style (short, plain words):

- what OV3 is, in one line;
- the last thing done (commit), anything uncommitted;
- where the last session stopped and its open questions, per § Last session;
- the feature in progress, if any, and its state (spec, approved, built, validated);
- where it stands in the time box (which week of the plan, how long until the stop rule's date) and the next action;
- the main open challenge (commercial or technical) that bears on that next action.

End by asking what to work on: resume the last task, or start another. Change nothing before the owner says. If the request would push the MVP past the time box, or falls outside the approved feature, say so first.

## 4. At the end of the session

Before the session closes (or when the owner says it's done), rewrite `docs/context.md` § Last session: date, what was done, where it stopped (file, step), the next step, open questions for the owner. Update § Where it stands and § Next actions if they changed.
