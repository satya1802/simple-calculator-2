<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Proposed  
Date: 2026-10-26

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Flask
- Express
- No backend

## Decision Outcome

Chosen option: FastAPI 0.115, because There is no server-side logic in this client-only calculator, so FastAPI 0.115 is provisioned only as a lightweight, ready place to add an endpoint later (e.g. usage analytics or shared history) without re-platforming.

## Consequences

Carrying an idle backend adds a small amount of operational surface for no immediate function, accepted so the stack is future-ready and consistent across layers.
<!-- sdlc:auto:end adr -->