<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-10-26

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- Vercel
- Netlify
- Cloudflare Pages

## Decision Outcome

Chosen option: AWS, because A free, public SPA must be reliably reachable worldwide; AWS S3 static hosting plus a CloudFront CDN keeps load times low for all desktop and mobile visitors (NFR-003) and keeps every layer on one provider for billing and operations.

## Consequences

Configuring S3 + CloudFront is slightly more setup than a one-click static host, offset by consistent provider operations and a straightforward path to add the FastAPI/PostgreSQL layers later.
<!-- sdlc:auto:end adr -->