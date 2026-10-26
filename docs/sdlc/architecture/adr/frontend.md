<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-10-26

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v2.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because The entire product lives here: React 19 renders the responsive button grid and display, handles on-screen and keyboard input, and runs all arithmetic and error handling in the browser as a single-page app that loads once (US-001..US-022).

## Consequences

A full framework is heavier than vanilla JS for a calculator, but it keeps the responsive layout and instant display updates maintainable and aligns with the approved stack and platform scaffold.
<!-- sdlc:auto:end adr -->