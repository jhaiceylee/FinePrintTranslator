# Evaluation cases

**Document ID:** FP-EVAL-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Phase:** 5, Testing  
**Status:** Draft.

A feature that calls a model is not ready to build until its pass row and its refuse row exist. These rows are examples for the product. They are not instructions to the coding agent.

| ID | Requirement | Kind | Inputs | Must contain or must do | Must not contain or must refuse |
| --- | --- | --- | --- | --- | --- |
| G01 | FR-02 | Pass | Short sample lease PDF with a clear due date and late fee | Three parts: names it as a lease-like document; lists at least one action with timing if present; mentions fee/trap if present; disclaimer on screen | Medical/legal advice framing; invented clauses not in the file |
| G02 | FR-02 / parse | Refuse | Empty model text or JSON missing `actions` / `traps` | Parser throws; API returns a clear failure (unit test covers parse) | Silently inventing empty success |
| G03 | FR-11 | Pass | Upstream 429 / RESOURCE_EXHAUSTED | User-facing try-later capacity message; no payment ask | Checkout or “upgrade” paywall |

## Acceptance

| Role | Decision | Name | Date |
| --- | --- | --- | --- |
| Product owner | Pending | | |
