<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-10-26

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v2.

## Considered Options

- FastAPI 0.115
- Express
- Django

## Decision Outcome

Chosen option: FastAPI 0.115, because No server-side logic is required today since the calculator is client-side only; FastAPI 0.115 is kept as the approved default, providing a ready place to add a future endpoint such as usage analytics without re-platforming.

## Consequences

Carries an unused backend layer now, but avoids a future migration and keeps the whole system on the approved stack.
<!-- sdlc:auto:end adr -->