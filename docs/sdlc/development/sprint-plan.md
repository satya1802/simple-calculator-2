# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Core calculator foundation: display, on-screen and keyboard input, and basic arithmetic (add, subtract, multiply, divide, clear/reset)

Capacity: 20 points · Committed: 19

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Perform addition | 3 | frontend-agent | US-019, US-006 |
| US-002 | Story | Perform subtraction | 1 | frontend-agent | US-001 |
| US-003 | Story | Perform multiplication | 1 | frontend-agent | US-001 |
| US-004 | Story | Perform division | 1 | frontend-agent | US-001 |
| US-005 | Story | Clear and reset the calculator | 2 | frontend-agent | US-001 |
| US-006 | Story | Enter numbers and operators via on-screen buttons | 5 | frontend-agent | US-019 |
| US-007 | Story | Enter numbers and operators via physical keyboard | 3 | frontend-agent | US-006 |
| US-019 | Story | See the current entry and result on the display | 3 | frontend-agent | — |

## Sprint 2: Sprint 2

Extended calculation features and display behaviors: percent, chained operations, decimals, sign toggle, backspace, digit limits, and error handling

Capacity: 20 points · Committed: 18

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-016 | Story | Calculate a percentage | 2 | frontend-agent | US-001 |
| US-020 | Story | Chain operations across multiple steps | 3 | frontend-agent | US-001, US-002, US-003, US-004 |
| US-008 | Story | Enter and display decimal numbers | 2 | frontend-agent | US-019, US-006 |
| US-021 | Story | Toggle the sign of the current number | 2 | frontend-agent | US-019, US-006 |
| US-022 | Story | Delete the last entry with backspace | 2 | frontend-agent | US-019, US-006 |
| US-009 | Story | Keep displayed numbers within a reasonable digit limit | 3 | frontend-agent | US-019 |
| US-010 | Story | Show an error message for division by zero | 2 | frontend-agent | US-004 |
| US-011 | Story | Show an error state for other invalid input or operations | 2 | frontend-agent | US-010 |

## Sprint 3: Sprint 3

Delivery polish: responsive layout, open/free access, and client-side privacy guarantees

Capacity: 20 points · Committed: 6

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-012 | Story | Use the calculator responsively on desktop and mobile browsers | 3 | frontend-agent | US-006 |
| US-013 | Story | Use the calculator free, with no accounts and no billing | 1 | frontend-agent | — |
| US-014 | Story | Keep all calculation client-side with no stored or transmitted data | 2 | frontend-agent | — |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
