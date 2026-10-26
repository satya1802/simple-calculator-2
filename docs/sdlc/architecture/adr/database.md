<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-10-26

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- SQLite
- DynamoDB
- No database

## Decision Outcome

Chosen option: PostgreSQL 16, because Nothing is stored or persisted between sessions, so PostgreSQL 16 defines no schema today; it is named as the default dependable store should a future feature (saved calculations, usage counts) need persistence.

## Consequences

A provisioned but unused database is pure future-readiness cost with no MVP benefit, accepted to avoid introducing a store under pressure later.
<!-- sdlc:auto:end adr -->