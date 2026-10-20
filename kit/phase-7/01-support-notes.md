# Support notes

**Document ID:** FP-SUP-001  
**Version:** 0.1.0 Draft  
**Date:** 2026-10-20  
**Phase:** 7, Operations  
**Status:** Draft.

Update a row in the same session as a change the user can see. Describe the outcome that exists. Leave the row blank until that outcome is real.

| What the user sees | What it means | What to tell them |
| --- | --- | --- |
| “Write a short description of what the application is.” on Save and open | The Short description field in Part 1 is blank or only spaces | Open Part 1, write one or two sentences about what the application is, then save again |
| Save and open succeeds after a Short description was typed in Part 1 | The description is included in the save payload and written into the documents (`D-01`) | No action. If an older installed copy still refuses a filled description, restart from this folder or install a build that includes the `D-01` fix |

## Acceptance

| Role | Decision | Name | Date |
| --- | --- | --- | --- |
| Product owner | Pending | | |
