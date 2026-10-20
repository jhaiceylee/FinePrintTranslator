# Definition of Ready and Definition of Done

**Document ID:** FP-DOD-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Phase:** 3, Planning  
**Status:** Draft. The engineering lead has not adopted these definitions.

## Ready

A story may be built only when every line below is true.

- The user outcome is written, with the requirement ids it satisfies.
- Inputs, outputs, and the error text are named.
- The data it reads or writes is listed, including what must not be logged.
- One passing example and one failing example are named in the test plan. If the feature calls a model, the same pair is named in the evaluation cases.
- The story fits the current charter.

## Done

A story is done only when every line below is true.

- Someone other than the author has reviewed the change. When a coding agent wrote the change, the person accepting it is the reviewer.
- The change cites the requirement ids it satisfies, and it adds no claim past the product reference.
- Automated tests cover the passing and failing examples.
- The decision log is updated when the story changes a requirement, a screen, a claim, or an operating rule.
- Customer manuals and support notes are updated when the story changes what a user sees.
- Secret values are not in the repository. Setting names are recorded in the implementation standards.

## Acceptance

| Role | Decision | Name | Date |
| --- | --- | --- | --- |
| Engineering lead | Pending | | |
| Product owner | Pending | | |
