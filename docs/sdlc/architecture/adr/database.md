<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-10-26

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v2.

## Considered Options

- PostgreSQL 16
- MySQL
- SQLite

## Decision Outcome

Chosen option: PostgreSQL 16, because Nothing is persisted between sessions so no database is used today; PostgreSQL 16 is named as the approved default so any later need to remember data (saved calculations, usage counts) has a dependable store ready.

## Consequences

Provisioned-but-unused capacity if deployed, but removes the risk of introducing a store under pressure later.
<!-- sdlc:auto:end adr -->