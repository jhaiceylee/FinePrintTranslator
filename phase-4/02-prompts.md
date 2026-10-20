# Prompt and instruction repository

**Document ID:** FP-PROMPT-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Phase:** 4, Implementation  
**Status:** Draft. Active — this release calls Gemini.

This file is the instruction the application sends to a model. Instructions to the coding agent live in `AGENTS.md`. Source of truth in code: `app/lib/prompt.mjs`.

| ID | Status | Purpose | What the instruction must not change |
| --- | --- | --- | --- |
| P-01 | Active | Ask Gemini for JSON with whatItIs, actions, traps from an uploaded document | Must not claim medical, legal, or money advice; must not invent facts not in the document |

## Acceptance

| Role | Decision | Name | Date |
| --- | --- | --- | --- |
| Engineering lead | Pending | | |
