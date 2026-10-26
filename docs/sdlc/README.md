# simple calculator-2 — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
basic calculator

**Documentation version:** v8
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v5 approved |
| [Architecture](architecture/README.md) | 13 entries |
| [Development](development/README.md) | 0 entries |
| [Testing](testing/README.md) | 0 entries |
| [Deployment](deployment/README.md) | 0 entries |
| [Maintenance](maintenance/README.md) | 0 entries |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | not generated yet |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 route |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 19 requirements |
| [Changelog](CHANGELOG.md) | 8 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- No architecture or App Design phase input yet to confirm how/whether this stack is actually applied (e.g. FastAPI/PostgreSQL/AWS specifics are not yet relevant since the app is client-side only).
- US-009: 'sensible digit limit' and whether overflow is truncated, rounded, or shown compactly is left open -- exact digit count and chosen display strategy are not specified in requirements.
- NFR-005 does not specify the exact digit limit or which single overflow strategy (truncate vs round vs compact form) will be used -- same gap as flagged under EPIC-003/US-009.

### Architecture

- Data model is empty and API spec is empty by design in this version; no schema or endpoints exist to trace against requirements.
- Out-of-scope scientific functions and a memory/history tape remain explicitly undesigned; confirm these are intentionally excluded from current requirement scope.
- Input does not specify which individual requirement (US-xxx) ids map to specific SPA behaviors; mapping left to requirements/design phase.
- No API spec exists for this component; it is intentionally empty in this version — confirm no current requirement depends on server-side behavior.
- Data model is empty by design; no schema exists to document or trace.
- No explicit requirement ids were given in architecture input for this path; exact US-xxx traceability should be confirmed against requirements phase.
<!-- sdlc:auto:end open-gaps -->
