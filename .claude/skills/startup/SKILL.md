---
name: startup
description: Start a fresh session on Outcome Vault (OV3) - what the project is, its technical and commercial challenges, where it stopped and the next action. Use when the owner types /startup or opens a new chat to continue the work.
---

# Startup: pick up where we left off

CLAUDE.md (the rules and the docs map) loads on its own; don't re-read it. Spend few tokens: read sections, not whole files.

## 1. Where things stand

- `git status -sb` and `git log --oneline -8`: anything uncommitted or unpushed is the first thing to mention.
- `docs/context.md`: read § "Where it stands", § "Next actions" and § "Challenges ahead" (from `## Where it stands` to `## Test data`). They are the record; trust them over memory.
- Only if the owner's request touches it: § "The product", § "Positioning", § "The MVP" in the same file, or `docs/ui-guidelines.md` (headings first).

## 2. The live site (only if relevant to the request)

- outcomevault.com is deployed from `main` with `pnpm deploy:site`; nothing to start unless the owner wants a local preview (`pnpm --filter @ov/site dev`).
- New contact messages are read by the owner in the Firebase console (Firestore, `contactMessages`); there is no notification.

## 3. Report, then wait

At most 8 lines, in the owner's style (short, plain words):

- what OV3 is, in one line;
- the last thing done (commit), anything uncommitted;
- where it stands and the next action, per `docs/context.md`;
- the main open challenge (commercial or technical) that bears on that next action.

End by asking what to work on. Change nothing before the owner says. If the request runs ahead of demand (building before pilots or LinkedIn have shown interest), say so first.
