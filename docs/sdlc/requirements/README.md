# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-STACK · approved · source: requirements:stack

Product owner approved a fixed technology stack for this lightweight, client-side calculator: React 19 frontend, FastAPI 0.115 backend, PostgreSQL 16 database, AWS cloud. Design/build must use exactly these, no substitutions.

Approved stack and stated rationale:
- Frontend: React 19 -- the entire product (buttons, keyboard input, running display, divide-by-zero handling, arithmetic) runs client-side in the browser; React handles the responsive button grid and instant display updates on desktop and mobile as a single-page app with no further server round-trips.
- Backend: FastAPI 0.115 -- there is no server-side logic today (no accounts, saved data, or payments); FastAPI is the platform default, lightweight, and leaves a ready place to add a server endpoint later (e.g. usage analytics, shared history) without re-platforming.
- Database: PostgreSQL 16 -- nothing is stored or persisted between sessions, so no database is needed today; named as the default so a dependable store is already chosen if persistence (saved calculations, usage counts) is added later.
- Cloud: AWS -- a free, public single-page app needs to be reliably reachable worldwide; AWS static hosting plus a global CDN keeps load times low, and keeps all layers on one provider for billing/ops.
This is a requirements-phase decision; no architecture/design phase input has been provided yet to confirm how it will be implemented.

**Related:** US-012, US-013, US-014

- ⚠ No architecture or App Design phase input yet to confirm how/whether this stack is actually applied (e.g. FastAPI/PostgreSQL/AWS specifics are not yet relevant since the app is client-side only).

### REQ-SCOPE · draft · source: requirements:scope

Delivery scope is 'lightweight', requirements are at version 5. In-scope capabilities and explicit out-of-scope exclusions are both defined to bound the calculator's functionality.

Delivery scope: lightweight. Requirements version: 5.
In-scope capabilities: addition, subtraction, multiplication, division; percent calculation; clear/reset; on-screen button input; physical keyboard input; decimal point entry; sign toggle; backspace/delete of last entry; divide-by-zero error handling; numeric display with sensible digit limits; responsive layout for desktop and mobile; open public access with no login; free with no payments; client-side only with nothing stored between sessions.
Explicitly out of scope -- not to be designed or built: scientific functions (powers, roots, trig, logarithms, parentheses) and memory/history tape.

**Related:** US-001, US-002, US-003, US-004, US-016, US-020, US-005, US-006, US-007, US-019, US-008, US-021, US-022, US-009, US-010, US-011, US-012, US-013, US-014

### EPIC-001 · draft · source: requirements:EPIC-001

Core Arithmetic Operations epic: standard arithmetic (add, subtract, multiply, divide, percent), multi-step chaining using the running result, and clear/reset. Scientific functions and memory/history are explicitly out of scope.

US-001 [critical] Perform addition -- enter first operand, plus operator, second operand, equals; display shows the sum (AC-001). Example: 2 + 3 -> 5 (AC-080).
US-002 [critical] Perform subtraction -- display shows first operand minus second operand (AC-002). Example: 5 - 3 -> 2 (AC-081).
US-003 [critical] Perform multiplication -- display shows the product (AC-003). Example: 4 x 3 -> 12 (AC-082).
US-004 [critical] Perform division -- for non-zero operands, display shows the quotient (AC-004). Example: 12 / 4 -> 3 (AC-083).
US-016 [high] Calculate a percentage -- percent action converts displayed number to its percentage value (divide by 100) (AC-084). Example: 200 x 10, percent, equals -> 20 (AC-085).
US-020 [medium] Chain operations -- after a result is shown, entering a new operator/operand plus equals applies the operation to the existing result (AC-086). Example: 2 + 3, then x 4, equals -> 20 (AC-087).
US-005 [high] Clear and reset -- clear/reset returns display to initial zero state and discards pending operation (AC-005); also clears an error state back to zero, ready for new input (AC-088).

**Related:** US-001, US-002, US-003, US-004, US-016, US-020, US-005

### EPIC-002 · draft · source: requirements:EPIC-002

Input Methods epic: the calculator must be operable via on-screen buttons (touch/pointer) and via a physical keyboard, so it works on both touch and keyboard devices.

US-006 [critical] On-screen button input -- tapping/clicking a digit or operator button registers the value/operation and updates the display (AC-006); on touchscreen mobile browsers, each tap in a sequence registers exactly once with the display updating accordingly (AC-089).
US-007 [high] Physical keyboard input -- when the page is focused, number and operator keys (+, -, *, /, Enter for equals) register the same as the equivalent on-screen buttons (AC-007); pressing Enter or the equals key evaluates the current operation and displays the result (AC-090).

**Related:** US-006, US-007

### EPIC-003 · draft · source: requirements:EPIC-003

Display, Decimals and Error Handling epic: the display reflects current entry and result, supports decimal entry, sign toggling, backspace, a sensible digit limit, and graceful error handling for divide-by-zero and other invalid operations.

US-019 [critical] See current entry and result -- display updates to show current entry as inputs are registered (AC-091) and shows the result after equals (AC-092).
US-008 [high] Decimal entry -- pressing decimal point adds it and subsequent digits form the fractional part (AC-008); pressing decimal point again when one already exists adds no second point (AC-093).
US-021 [medium] Sign toggle -- toggling a non-zero displayed number reverses its sign (AC-094); toggling a negative number makes it positive (AC-095).
US-022 [medium] Backspace/delete -- removes the most recently entered digit/character and updates the display (AC-096); deleting the last remaining digit returns the entry to zero (AC-097).
US-009 [medium] Digit limit -- a result/entry exceeding the display's maximum digit limit is truncated, rounded, or shown compactly so it fits without breaking layout (AC-009); extra digits typed beyond the max input length are ignored (AC-098). No specific maximum digit count is stated in the input.
US-010 [high] Divide-by-zero error -- entering number, divide, zero, equals shows an error indication instead of a numeric result (AC-010); clear/reset clears the error back to the initial zero state (AC-099).
US-011 [medium] Other invalid-operation error -- an undefined/invalid result shows an error indication instead of an invalid numeric value (AC-011); clear/reset clears the error state back to zero, ready for new input (AC-100).

**Related:** US-019, US-008, US-021, US-022, US-009, US-010, US-011

- ⚠ US-009: 'sensible digit limit' and whether overflow is truncated, rounded, or shown compactly is left open -- exact digit count and chosen display strategy are not specified in requirements.

### EPIC-004 · draft · source: requirements:EPIC-004

Delivery, Access Model and Privacy epic: the calculator is a responsive single-page web app, open to anyone with no accounts or payments, and performs all computation client-side with nothing stored or transmitted.

US-012 [high] Responsive layout -- desktop load shows buttons/display usable on a large screen with no horizontal scrolling (AC-012); mobile load adapts to the smaller viewport with touch-friendly controls and no broken layout (AC-101).
US-013 [high] Free, no accounts/billing -- all calculator functions are usable without account creation, login, or payment (AC-013); no payment, billing, or login prompt is ever presented (AC-102) (assumption stated in input: product is free and open, no accounts or monetization).
US-014 [medium] Client-side only, nothing stored -- all computation occurs in-browser with no calculation data transmitted to a server (AC-014); closing and reopening the calculator starts fresh at initial zero state with no history retained (AC-103) (assumption stated in input: nothing persisted between sessions).

**Related:** US-012, US-013, US-014

### REQ-NFR · draft · source: requirements:NFR-001,NFR-002,NFR-003,NFR-004,NFR-005,NFR-006

Six non-functional requirements cover privacy, performance, compatibility, usability/feedback, display readability, and error recovery -- all applied to the relevant arithmetic, input, display, and access stories above.

NFR-001 [privacy] All calculations stay in the browser; nothing sent to a server or persisted between sessions; reopening starts fresh. Applies to US-014.
NFR-002 [performance] Each tap/keypress registers once with immediate display update, no noticeable delay. Applies to US-006, US-007, US-019.
NFR-003 [compatibility] Works as a single-page app on desktop and mobile browsers, layout adapts to screen size, no horizontal scrolling or broken layout. Applies to US-012.
NFR-004 [usability] Touch-friendly controls on mobile, each tap registers once, every input clearly reflected on display. Applies to US-006, US-012.
NFR-005 [usability] Numbers stay within a sensible digit limit; overflow is truncated/rounded/compact; extra digits beyond the limit are ignored. Applies to US-009.
NFR-006 [usability] Clear/reset recovers from division-by-zero or other invalid-operation errors back to initial zero state with no page reload needed. Applies to US-005, US-010, US-011.

**Related:** US-005, US-006, US-007, US-009, US-010, US-011, US-012, US-014, US-019

- ⚠ NFR-005 does not specify the exact digit limit or which single overflow strategy (truncate vs round vs compact form) will be used -- same gap as flagged under EPIC-003/US-009.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v5  
**Delivery scope:** lightweight  
**Approved:** 2026-10-26

**Capabilities in scope:** Addition, subtraction, multiplication and division, Percent calculation, Clear / reset of the current calculation, On-screen button input, Physical keyboard input, Decimal point entry, Sign toggle (positive/negative), Backspace / delete of last entry, Divide-by-zero error handling, Numeric display with sensible digit limits, Responsive layout for desktop and mobile browsers, Open public access with no login, Free to use with no payments, Client-side only, nothing stored between sessions

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | Your calculator does all its work in the browser and stores nothing, so there is genuinely no server-side logic for it to perform — no accounts, no saved data, no payments. The platform still asks for a backend choice, and FastAPI is the sensible default: it is light, and gives you a ready place to add a server endpoint later (for example if you ever wanted usage analytics or a shared history feature) without re-platforming. |
| cloud | AWS | A free, public single-page app needs to be reliably reachable from any desktop or mobile browser worldwide, and AWS covers that comfortably — static hosting plus a global CDN keeps load times low for all visitors. As the platform default it also keeps every layer on one well-understood provider for billing and operations. |
| database | PostgreSQL | You confirmed nothing is stored or persisted between sessions, so the calculator writes no data at all and needs no database today. PostgreSQL is named here as the default so that if you later add anything that must be remembered — saved calculations, usage counts — you already have a dependable, well-supported store rather than having to introduce one under pressure. |
| frontend | React | This is where your entire product actually lives. The whole calculator — the on-screen buttons, keyboard input, the running display, divide-by-zero handling and the arithmetic itself — runs in the visitor's browser, exactly as you described. React handles the responsive button grid and instant display updates cleanly on both desktop and mobile, and ships as a single-page app that loads once and needs no further server round-trips. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: Core Arithmetic Operations

The calculator performs standard arithmetic — addition, subtraction, multiplication, division, and percent — and lets the user clear/reset the current calculation. Scientific functions (powers, roots, trig, logarithms, parentheses) and memory/history tape are out of scope for this version.

### US-001: Perform addition

**Priority:** critical

> As a visitor using the calculator, I want to add two numbers together, so that I can get their sum.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | the display shows a first operand | I enter the plus operator, a second operand, and the equals action | the display shows the arithmetic sum of the two operands |
| AC-080 | I have entered 2 + 3 | I press equals | the display shows 5 |

### US-002: Perform subtraction

**Priority:** critical

> As a visitor using the calculator, I want to subtract one number from another, so that I can get their difference.

| ID | Given | When | Then |
|---|---|---|---|
| AC-002 | the display shows a first operand | I enter the minus operator, a second operand, and the equals action | the display shows the first operand minus the second operand |
| AC-081 | I have entered 5 - 3 | I press equals | the display shows 2 |

### US-003: Perform multiplication

**Priority:** critical

> As a visitor using the calculator, I want to multiply two numbers, so that I can get their product.

| ID | Given | When | Then |
|---|---|---|---|
| AC-003 | the display shows a first operand | I enter the multiply operator, a second operand, and the equals action | the display shows the product of the two operands |
| AC-082 | I have entered 4 × 3 | I press equals | the display shows 12 |

### US-004: Perform division

**Priority:** critical

> As a visitor using the calculator, I want to divide one number by another, so that I can get their quotient.

| ID | Given | When | Then |
|---|---|---|---|
| AC-004 | the display shows a non-zero first operand | I enter the divide operator, a non-zero second operand, and the equals action | the display shows the first operand divided by the second operand |
| AC-083 | I have entered 12 ÷ 4 | I press equals | the display shows 3 |

### US-016: Calculate a percentage

**Priority:** high

> As a visitor using the calculator, I want to apply the percent function to a number, so that I can work out percentages without manual conversion.

| ID | Given | When | Then |
|---|---|---|---|
| AC-084 | the display shows a number | I press the percent action | the displayed number is converted to its percentage value (divided by 100) |
| AC-085 | I have entered 200 × 10 | I press the percent action and then equals | the display shows 20 (10% of 200) |

### US-020: Chain operations across multiple steps

**Priority:** medium

> As a visitor using the calculator, I want to continue calculating using the running result, so that I can perform multi-step calculations without re-entering values.

| ID | Given | When | Then |
|---|---|---|---|
| AC-086 | a calculation has produced a result on the display | I enter a new operator and operand followed by equals | the new operation is applied to the existing result and the new result is displayed |
| AC-087 | I enter 2 + 3 and then press the multiply operator, 4, and equals | I complete the second operation | the running result is used so the display shows 20 |

### US-005: Clear and reset the calculator

**Priority:** high

> As a visitor using the calculator, I want to clear the current entry or reset the whole calculation, so that I can correct mistakes or start a fresh calculation.

| ID | Given | When | Then |
|---|---|---|---|
| AC-005 | the display shows an entry, operator, or result | I press the clear/reset action | the display returns to its initial zero state and any pending operation is discarded |
| AC-088 | the calculator is in an error state | I press the clear/reset action | the error is cleared and the calculator returns to its initial zero state ready for new input |

## EPIC-002: Input Methods

Users can operate the calculator with either on-screen buttons or a physical keyboard, so it is usable on both touch and keyboard devices.

### US-006: Enter numbers and operators via on-screen buttons

**Priority:** critical

> As a visitor on a touch or pointer device, I want to tap or click on-screen buttons for digits and operators, so that I can use the calculator without a physical keyboard.

| ID | Given | When | Then |
|---|---|---|---|
| AC-006 | the calculator is displayed | I tap or click an on-screen digit or operator button | the corresponding value or operation is registered and reflected on the display |
| AC-089 | I am using a touchscreen mobile browser | I tap a sequence of on-screen buttons | each tap registers once and the display updates accordingly |

### US-007: Enter numbers and operators via physical keyboard

**Priority:** high

> As a visitor on a device with a physical keyboard, I want to type digits and operators using my keyboard, so that I can calculate faster without clicking buttons.

| ID | Given | When | Then |
|---|---|---|---|
| AC-007 | the calculator page is focused | I press number keys and operator keys (such as +, -, *, /, Enter for equals) | the corresponding input is registered and the display updates the same as the equivalent on-screen button |
| AC-090 | the calculator page is focused | I press Enter or the equals key | the current operation is evaluated and the result is displayed |

## EPIC-003: Display, Decimals and Error Handling

The display shows the current entry and result, supports decimal entry and sign toggling, limits digits to a sensible length, and handles division by zero and other invalid operations gracefully.

### US-019: See the current entry and result on the display

**Priority:** critical

> As a visitor using the calculator, I want to see my current entry and the computed result on a clear display, so that I can follow what I am entering and read the outcome.

| ID | Given | When | Then |
|---|---|---|---|
| AC-091 | I am entering numbers and operators | each input is registered | the display updates to show the current entry |
| AC-092 | I complete an operation with equals | the result is computed | the display shows the result |

### US-008: Enter and display decimal numbers

**Priority:** high

> As a visitor using the calculator, I want to enter numbers with a decimal point, so that I can calculate with non-whole numbers.

| ID | Given | When | Then |
|---|---|---|---|
| AC-008 | I am entering a number | I press the decimal point | a decimal point is added to the current number and subsequent digits are entered as the fractional part |
| AC-093 | the current number already contains a decimal point | I press the decimal point again | no additional decimal point is added and the number remains validly formatted |

### US-021: Toggle the sign of the current number

**Priority:** medium

> As a visitor using the calculator, I want to switch the current number between positive and negative, so that I can work with negative values.

| ID | Given | When | Then |
|---|---|---|---|
| AC-094 | the display shows a non-zero number | I press the sign-toggle action | the sign of the displayed number is reversed (positive becomes negative and vice versa) |
| AC-095 | the display shows a negative number | I press the sign-toggle action | the number becomes positive |

### US-022: Delete the last entry with backspace

**Priority:** medium

> As a visitor using the calculator, I want to remove the last digit or character I entered, so that I can correct a typo without clearing the whole calculation.

| ID | Given | When | Then |
|---|---|---|---|
| AC-096 | I am entering a multi-digit number | I press backspace/delete | the most recently entered digit or character is removed and the display updates |
| AC-097 | the current entry has a single remaining digit | I press backspace/delete | the entry returns to zero |

### US-009: Keep displayed numbers within a reasonable digit limit

**Priority:** medium

> As a visitor using the calculator, I want numbers to stay within a sensible digit limit on the display, so that the display stays readable and does not overflow.

| ID | Given | When | Then |
|---|---|---|---|
| AC-009 | a result or entry exceeds the display's maximum digit limit | the number is shown | it is truncated, rounded, or shown in a compact form so it fits within the display without breaking the layout |
| AC-098 | I continue to enter digits beyond the maximum input length | I press another digit | the extra digit is ignored and the displayed number does not exceed the digit limit |

### US-010: Show an error message for division by zero

**Priority:** high

> As a visitor using the calculator, I want to see a clear error when I divide by zero, so that I understand the operation is invalid instead of seeing a confusing value.

| ID | Given | When | Then |
|---|---|---|---|
| AC-010 | I have entered a number followed by the divide operator and zero | I press equals | the display shows an error indication rather than a numeric result |
| AC-099 | the display shows a division-by-zero error | I press the clear/reset action | the error clears and the calculator returns to its initial zero state |

### US-011: Show an error state for other invalid input or operations

**Priority:** medium

> As a visitor using the calculator, I want to see a clear error state when an operation is otherwise invalid, so that I am not misled by an undefined or nonsensical result.

| ID | Given | When | Then |
|---|---|---|---|
| AC-011 | an operation produces an undefined or otherwise invalid result | the calculation is evaluated | the display shows an error indication instead of an invalid numeric value |
| AC-100 | the display shows an error state | I press the clear/reset action | the error clears and the calculator returns to its initial zero state ready for new input |

## EPIC-004: Delivery, Access Model and Privacy

The calculator is delivered as a responsive single-page web app that works on desktop and mobile browsers, is open to anyone with no accounts or payments, and performs all computation client-side with nothing stored or transmitted.

### US-012: Use the calculator responsively on desktop and mobile browsers

**Priority:** high

> As a visitor on any device, I want the calculator layout to adapt to my screen size, so that I can use it comfortably on both desktop and mobile browsers.

| ID | Given | When | Then |
|---|---|---|---|
| AC-012 | I open the calculator on a desktop browser | the page loads | the buttons and display are laid out and usable for a large screen without horizontal scrolling |
| AC-101 | I open the calculator on a mobile browser | the page loads | the layout adapts to the smaller viewport with touch-friendly controls and no broken layout |

### US-013: Use the calculator free, with no accounts and no billing

**Priority:** high

> As a any visitor, I want to use the calculator immediately without signing up or paying, so that I can calculate with no barriers.

| ID | Given | When | Then |
|---|---|---|---|
| AC-013 | I navigate to the calculator | the page loads | I can use all calculator functions without creating an account, logging in, or making any payment |
| AC-102 | I am using the calculator | I perform any operation | no payment, billing, or login prompt is presented at any point (assumption: the product is free and open to anyone, with no accounts or monetization) |

### US-014: Keep all calculation client-side with no stored or transmitted data

**Priority:** medium

> As a privacy-conscious visitor, I want all computation to happen in my browser with nothing stored or sent, so that my calculations remain private and are not retained between sessions.

| ID | Given | When | Then |
|---|---|---|---|
| AC-014 | I perform calculations in the calculator | the operations are computed | all computation occurs client-side in the browser with no calculation data transmitted to a server |
| AC-103 | I close and reopen the calculator (assumption: nothing is persisted between sessions) | the page reloads | the calculator starts in its initial zero state with no previous entries, results, or history retained |
<!-- sdlc:auto:end epics -->
