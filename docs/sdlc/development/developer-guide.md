# Developer Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start status -->
_Up to date._
<!-- sdlc:auto:end status -->

<!-- sdlc:auto:start source -->
Generated from commit `de87803` · model `claude-sonnet-5`
<!-- sdlc:auto:end source -->

<!-- sdlc:auto:start overview -->
simple calculator-2 is a generated two-app repository: a Vite + React 19 single-page frontend containing the approved, reviewed UI (currently running on seeded sample data, not wired to the API), and a FastAPI 0.115 backend scaffold that currently exposes only a health-check endpoint because no backend architecture had been approved when it was generated. The backend uses SQLAlchemy with a SQLite file by default (swappable via DATABASE_URL to Postgres, per the approved stack), and a docker-compose file provisions a local Postgres 16 instance for when that swap happens.
<!-- sdlc:auto:end overview -->

<!-- sdlc:auto:start prerequisites -->
- Node.js (compatible with Vite 6 / React 19, e.g. 20+)
- Python 3.12 (matches backend/Dockerfile)
- pip
- Docker and Docker Compose (optional, for the Postgres service in docker-compose.yml)
<!-- sdlc:auto:end prerequisites -->

<!-- sdlc:auto:start setup -->
1. Clone the repository
2. cd frontend && npm install
3. (optional) Set VITE_API_BASE_URL and VITE_API_SECRET_KEY as environment variables if the frontend should call a non-default/secured backend (frontend/src/lib/api.ts defaults to http://localhost:8000 with no auth header)
4. cd backend && pip install -r requirements.txt
5. (optional) Set DATABASE_URL to point at Postgres instead of the default SQLite file (backend/app/database.py); set ALLOWED_ORIGINS (comma-separated) if the frontend runs on a non-default origin (backend/app/main.py)
6. (optional) docker compose up -d db -- starts a local Postgres 16 container on port 5432 if DATABASE_URL targets it
<!-- sdlc:auto:end setup -->

<!-- sdlc:auto:start run -->
| Name | Command | Description |
|---|---|---|
| frontend dev | `npm run dev` | Starts the Vite dev server for the React SPA (run from frontend/) |
| frontend build | `npm run build` | Bundles the app with Vite; does not typecheck |
| frontend preview | `npm run preview` | Serves the production build locally |
| backend dev | `uvicorn app.main:app --reload` | Runs the FastAPI app with auto-reload (run from backend/); creates SQLite tables on startup and serves GET /health |
<!-- sdlc:auto:end run -->

<!-- sdlc:auto:start structure -->
| Path | Purpose |
|---|---|
| `backend` | FastAPI service: app package, routers, models, schemas, tests, Dockerfile, requirements.txt |
| `backend/app` | Application code: main.py (entrypoint/CORS/health route), database.py (engine/session), models.py, schemas.py, routers/ |
| `backend/tests` | Pytest test suite (currently test_health.py) |
| `frontend` | Vite + React 19 SPA: approved screens, component library, Playwright e2e tests, configs |
| `frontend/src` | Application source: main.tsx entrypoint, lib/ (api client, UI/icon vocabulary, navigation), index.css |
| `frontend/e2e` | Playwright acceptance test specs |
| `docker-compose.yml` | Defines a local Postgres 16 service for development |
| `.quorq` | Platform handoff metadata (handoff.json) for the Quorq AI SDLC platform |
<!-- sdlc:auto:end structure -->

<!-- sdlc:auto:start conventions -->
- Backend routers are organized one per architecture component that owns endpoints (backend/app/routers/)
- Unimplemented backend routes return a typed StubResponse (schemas.py) rather than raising, keeping the OpenAPI spec complete before handlers exist
- SQLAlchemy models all inherit the shared Base from app/database.py; main.py imports models before calling Base.metadata.create_all
- Backend configuration is environment-variable driven: DATABASE_URL for the database, ALLOWED_ORIGINS for CORS
- Frontend configuration is environment-variable driven via Vite's import.meta.env: VITE_API_BASE_URL and VITE_API_SECRET_KEY (frontend/src/lib/api.ts)
- Frontend screens currently render seeded sample data rather than calling the API; src/lib/api.ts is the designated integration seam
- Frontend uses path alias '@' mapped to src/ (tsconfig.json, vite.config.ts)
- Code style enforced via ESLint + Prettier on the frontend and Ruff on the backend
<!-- sdlc:auto:end conventions -->

<!-- sdlc:auto:start testing -->
| Name | Command | Description |
|---|---|---|
| frontend unit tests | `npm test` | Runs Vitest component tests located beside the components they cover |
| frontend typecheck | `npm run typecheck` | Runs tsc --noEmit (not run by npm run build) |
| frontend lint | `npm run lint` | Runs ESLint over the app; used as a gate during development |
| frontend e2e | `npm run test:e2e` | Runs Playwright specs from e2e/; builds/serves the app locally unless E2E_BASE_URL is set |
| frontend e2e browser install | `npm run test:e2e:install` | Installs the Chromium browser Playwright needs |
| backend tests | `pytest` | Runs the backend test suite (run from backend/; pytest.ini sets pythonpath) |
| backend lint | `ruff check .` | Lints the backend codebase |
| backend format | `ruff format .` | Formats the backend codebase |
<!-- sdlc:auto:end testing -->

<!-- sdlc:auto:start troubleshooting -->
| Problem | Solution |
|---|---|
| Frontend requests to the backend fail with a CORS error | Set ALLOWED_ORIGINS on the backend to include the frontend's origin, or run the frontend on the default dev origins (http://localhost:5173 or http://127.0.0.1:5173) that main.py already allows |
| `pytest` fails with 'ModuleNotFoundError: app' | Run pytest from the backend/ directory; pytest.ini sets pythonpath = . to make `import app` work from there |
| Backend data doesn't persist or seems to reset | By default DATABASE_URL is unset and the backend uses a local SQLite file (./app.db); set DATABASE_URL to the Postgres instance from docker-compose.yml for persistent/shared storage |
| `npm run build` succeeds but deployment/type-checking fails later | Run `npm run typecheck` (tsc --noEmit) explicitly, since the Vite build does not typecheck |
| Playwright e2e tests fail to start the backend | Ensure `pip install -r requirements.txt` succeeds for backend/ since playwright.config.ts's webServer runs that install and then uvicorn automatically when E2E_BASE_URL is not set |
<!-- sdlc:auto:end troubleshooting -->
