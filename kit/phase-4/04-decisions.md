# Decision log

**Document ID:** FP-DEC-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Phase:** 4, Implementation  
**Status:** Living record. A row here does not close a gate.

Add a row in the same session as the code whenever the running application changes a rule, a screen, or a claim. Future troubleshooting starts here. The agent may draft the row. A person decides whether the change was allowed.

| ID | Date | Decision | Why | Requirement, screen, or route |
| --- | --- | --- | --- | --- |
| D-01 | 2026-10-20 | Save and open sends the Short description typed in Part 1 with the rest of the form. | The Save screen refused every save with “Write a short description of what the application is” even when the field was filled, because the browser payload left `description` out. | Start project Part 1 Short description; Part 5 Save and open; `/api/save` |

## Still outside this release

-
