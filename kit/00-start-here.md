# Development record template

**Document ID:** TPL-START  
**Version:** 1.9.0  
**Date:** 2026-10-18  
**Status:** Blank kit. It is not the record of any one product. Templates and documentation generated with the help of varinull.com.

Copy this folder when a new application starts. Replace `FP` with a short project code and `The "Real-World Fine Print" Translator` with the product name. Leave every signature table unsigned until a named person accepts that document. Writing a file does not close a gate.

## Header to copy onto every document

```
# Document title

**Document ID:** FP-XXX-001
**Version:** 0.1.0 Draft
**Date:** 2026-10-20
**Phase:** N, Phase name
**Status:** Draft. [Role] has not signed. This file does not authorize production spend or a public launch.
```

End every document that needs a decision with:

```
## Acceptance

| Role | Decision | Name | Date |
| --- | --- | --- | --- |
| Named role | Pending | | |
```

## Folder to keep

| Folder | What it is for |
| --- | --- |
| `NOTICE.md` | One line: templates and documentation generated with the help of varinull.com |
| `AGENTS.md` | Rules the coding agent follows when this folder is open |
| `00-where-we-are.md` | What is true now, what this session may change, and what must not be redone |
| `assistant/` | The note the next session reads. Every coding agent updates it. Cursor also writes it when a session closes |
| `00-lifecycle-and-phase-gates.md` | Gate tracker. The index of the record |
| `phase-1/` | Why the project exists, the risks, the charter, the epics |
| `phase-2/` | Rules for the system, architecture, and where data goes |
| `phase-3/` | Requirements, screens, domain rules, sprint plan, Ready and Done |
| `phase-4/` | API, prompts, engineering standards, and the decision log |
| `phase-5/` | Tests, evaluation cases, and security checks |
| `phase-6/` | Release, change request, smoke tests, hosting |
| `phase-7/` | Support and incidents after release |
| `phase-8/` | Metrics, recovery, and retention |
| `product/` | What the product is, in language a buyer can read |
| `technical/` | How the system is built, for the people maintaining it |
| `customers/` | Manuals, a draft privacy notice, and draft terms. A lawyer has not accepted the drafts |

## Rules that keep the record usable

- Record a decision in `phase-4/04-decisions.md` when behavior changes. Include the date and why.
- Separate what the system does from what a draft sales page wishes it did. Keep a "do not claim" list in the product folder.
- Give every requirement a stable id (`FR-01`, `NFR-01`) and a priority of Must, Should, or Won't.
- A gate closes only when the handover row in the lifecycle file names the person and the date.
- Customer manuals describe the screens that exist. They do not describe controls that are only sentences in a policy.
- Before feature code, fill who the user is, what is in and out of scope, what must not be claimed, the first Must requirements, and `00-where-we-are.md`. Leave every other file out of the project until its work is real. A document that is included and left blank is unfinished.
- Do not include every phase at the start. A tick means the coding agent must fill that document while it builds.
- `AGENTS.md` binds the coding agent. `phase-4/02-prompts.md` binds a model the application calls. They are not the same instructions.

## Changes to this kit

| Version | Date | Change |
| --- | --- | --- |
| 1.0.0 | 2026-10-17 | First blank kit. |
| 1.1.0 | 2026-10-18 | Added `AGENTS.md` and `00-where-we-are.md`. Ready, Done, the prompt file, support notes, and the customer manuals now say what the coding agent must update in the same session as the code. |
| 1.2.0 | 2026-10-18 | Screens, routes, tests, and evaluation cases now use stable ids. Each of those tables, the requirements, the charter, the "do not claim" list, and the decision log tell the agent to stop on an empty cell and to leave scope, price, claims, and signatures unsigned. |
| 1.3.0 | 2026-10-18 | Removed product-specific examples from the blank kit. Sample claims, a sample password check, and a required split between customers are gone. A new application names its own. |
| 1.4.0 | 2026-10-18 | Added `assistant/` as the memory the next session reads. `AGENTS.md` tells every coding agent to update it. A Cursor hook records the same note when a session closes. |
| 1.5.0 | 2026-10-18 | Added a one-line notice that the templates and documentation were generated with the help of varinull.com. The small application is named Project Record Assistant. |
| 1.6.0 | 2026-10-18 | In-scope and out-of-scope choices are in ordinary language, with samples. Medical, legal, health, and safety claims start selected. Draft privacy notice and terms are offered, and a lawyer has not accepted them. |
| 1.7.0 | 2026-10-18 | The documents a person chooses are written to `assistant/documents-included.md`. That list is the reminder the coding agent checks before a session ends. |
| 1.8.0 | 2026-10-18 | The document list tells a person not to tick every file. Each phase says when it should be included. A tick means the agent must fill that document. |
| 1.9.0 | 2026-10-18 | A person can let the coding agent choose the other documents. The agent adds one from `kit/` only when that work is real. |
