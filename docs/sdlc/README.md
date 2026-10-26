# simple calculator-2 — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
basic calculator

**Documentation version:** v6
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
| [Changelog](CHANGELOG.md) | 6 versions |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- No architecture or App Design phase input yet to confirm how/whether this stack is actually applied (e.g. FastAPI/PostgreSQL/AWS specifics are not yet relevant since the app is client-side only).
- US-009: 'sensible digit limit' and whether overflow is truncated, rounded, or shown compactly is left open -- exact digit count and chosen display strategy are not specified in requirements.
- NFR-005 does not specify the exact digit limit or which single overflow strategy (truncate vs round vs compact form) will be used -- same gap as flagged under EPIC-003/US-009.

### Architecture

- Architecture input does not state which specific requirement IDs (US-001..US-022) each capability (e.g. addition, percent, chaining) maps to -- requirement-to-architecture traceability is not explicit in this input.
- No request handlers, routes, or contracts are defined yet since the component is a placeholder -- expected and noted, not a defect.
- No schema design exists yet; will need definition if/when a persistence feature is approved.
- Specific requirement IDs behind each arithmetic operation (add/subtract/multiply/divide/percent) are not stated in this input.
- NFR-002 and NFR-004 are referenced by this decision but are not present in the known requirement key list provided for this phase -- confirm these NFR IDs exist and are tracked.
- NFR-003 is referenced by this decision but is not present in the known requirement key list provided for this phase -- confirm this NFR ID exists and is tracked.
<!-- sdlc:auto:end open-gaps -->
