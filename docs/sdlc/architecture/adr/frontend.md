<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Proposed  
Date: 2026-10-26

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte
- Vanilla JS

## Decision Outcome

Chosen option: React 19, because The entire product lives in the browser. React 19 renders the responsive button grid and drives instant display updates for both on-screen taps and keyboard input, and ships as a single-page app that loads once with no server round-trips, matching NFR-002 and NFR-004.

## Consequences

React is heavier than vanilla JS for a calculator this small, but it gives a maintainable component model (Display, Keypad, engine) and an easy path to future features; bundle size is mitigated by CDN delivery.
<!-- sdlc:auto:end adr -->