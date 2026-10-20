# Instructions for the coding agent

**Document ID:** TPL-AGENT  
**Version:** 1.2.0  
**Date:** 2026-10-18  
**Status:** Part of the development-record kit. Copy this file with the folder. It does not authorize production spend or a public launch. Templates and documentation generated with the help of varinull.com.

Coding agents that open this folder follow this file. Cursor, Claude Code, and Codex read `AGENTS.md` at the project root. An agent that cannot open the folder cannot follow it.

## 1. Read first

1. This file.
2. `assistant/documents-included.md`.
3. `assistant/00-last-session.md`.
4. `00-where-we-are.md`.
5. The files named in the authority list below, and only the ones that apply to the work in this session.

Do not read the whole record before a small change. Do not skip the last-session note or `00-where-we-are.md`.

## 2. Authority

If a chat message disagrees with a file, the file wins. If two files disagree, the higher row wins.

| Order | File | What it decides |
| --- | --- | --- |
| 1 | `phase-1/03-charter.md` | What is in scope and what is out of scope |
| 2 | `product/01-product-reference.md` | What may be said about the product, and the "do not claim" list |
| 3 | `phase-3/01-requirements.md` | What the application must do (`FR-01`, `NFR-01`) |
| 4 | `phase-4/04-decisions.md` | How the running application behaves when a later change altered a rule |
| 5 | `phase-3/02-screens.md` and `phase-4/01-api-contract.md` | The screens and routes that exist |
| 6 | `00-where-we-are.md` | What is already true, what this session may change, and what must not be redone |

## 3. Minimum before any feature code

Stop and ask the human to fill these before writing feature code. A blank kit is not permission to invent the product.

- Who the user is, and the job they do, in `00-lifecycle-and-phase-gates.md`.
- In scope and out of scope, in the charter.
- What the product must not claim, in the product reference.
- The first Must requirements, each with a stable id.
- `00-where-we-are.md` for this session.

Other files stay blank until the work they describe is real.

## 4. Empty means ask

An empty cell in a table you need for the change means stop and ask. Do not fill a requirement, a route, a screen, a price, a claim, or a gate to keep moving.

A human decides scope, price, what the product may claim, and whether a gate is accepted. You may draft the words. You leave every acceptance table unsigned.

## 5. During a change

- Cite the ids the change satisfies: `FR-01` or `NFR-01`, `SCR-01`, `R-01`, and `D-01` when a decision row is part of the change.
- Implement the row that is written. Do not add a nearby feature.
- Keep one passing example and one failing example. Put them in tests. If the application calls a model, also put them in `phase-5/02-evaluation-cases.md`.
- If behavior, a screen, or a claim changes, add a row to `phase-4/04-decisions.md` in the same session. Include the date and why.
- If the user can see a new or changed outcome, update `customers/00-manual-shelf.md` and `phase-7/01-support-notes.md` in the same session. Describe only screens that exist.
- Name settings. Keep secret values out of the repository. Say that in `phase-4/03-implementation-standards.md` when a setting is introduced.
- Update `00-where-we-are.md` before the session ends: what is now true, and what the next session must not redo.
- `assistant/documents-included.md` is the reminder. It lists every document the person chose. Before the session ends, update each file on that list that this session's work belongs in. In `assistant/00-last-session.md`, name any chosen file you did not update and why. Do not leave a chosen document blank after its work exists.
- If that file says the agent chooses the other documents, the blanks are in `kit/`. Copy one into the project only when its work is real, add it to the list, and fill it in that session. Do not copy the whole kit at the start.
- If `00-where-we-are.md` says the agent chooses the language, the framework, or the database, choose it and replace that line. Keep the four labels exactly: `Language:`, `Framework:`, `Database:`, and `Host:`. Project Record Assistant reads those lines. Do not ask the person to name them.
- If `phase-3/02-screens.md` is on that list, update it in the same session as a new or changed screen.
- If `phase-4/01-api-contract.md` is on that list, update it in the same session as a new or changed route.
- If `customers/01-privacy-notice.md` is on that list, update it in the same session as any personal information the application stores.
- Rewrite `assistant/00-last-session.md` before the session ends. Name the date, the files touched, and the next action. Append one line per changed file to `assistant/session-log.md`.

## 6. Product prompts

`phase-4/02-prompts.md` is the instruction the application sends to a model. It is not an instruction to you. If the release does not call a model, write that in the prompt file and leave the prompt unused.

## 7. The same memory for every coding agent

Any agent that opens this folder and reads this file uses the same memory: `00-where-we-are.md`, `assistant/00-last-session.md`, and `assistant/session-log.md`. Cursor, Claude Code, and Codex can follow that.

Cursor also runs `.cursor/hooks/remember.mjs`, which records edited files and rewrites the last-session note when the session closes. Claude Code and Codex do not run that hook. They follow section 5 and write the same files themselves. The hook is a convenience. The files are the memory.

## 8. What you must not do

- Close a gate, sign an acceptance table, or treat a written file as approval.
- Invent a claim, a certification, a saving, or a control the software does not perform.
- Rewrite a finished area listed under "Do not redo."
- Store secret values in the repository.
- Describe a manual for a control that exists only as a sentence in a policy.

## Acceptance

| Role | Decision | Name | Date |
| --- | --- | --- | --- |
| Engineering lead | Pending | | |
