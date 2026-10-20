# Implementation standards

**Document ID:** FP-CICD-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Phase:** 4, Implementation  
**Status:** Draft.

## Checks that must pass before a change is kept

- `cd app && npm test` passes
- No `.env` or API key values committed
- Upload path does not write user files to durable storage

## Secrets

| Setting | Where the value lives |
| --- | --- |
| `GEMINI_API_KEY` | `app/.env` on the machine that runs the server — not in the repository |
| `GEMINI_MODEL` | Optional in `app/.env` (default `gemini-2.0-flash`) |
| `PORT` | Optional in `app/.env` (default `3847`) |

Copy from `app/.env.example`. Keep Gemini billing off for the free path (`D-05`).

## Acceptance

| Role | Decision | Name | Date |
| --- | --- | --- | --- |
| Engineering lead | Pending | | |
