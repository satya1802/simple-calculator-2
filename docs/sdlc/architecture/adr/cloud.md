<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-10-26

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v2.

## Considered Options

- AWS
- Azure
- Cloudflare

## Decision Outcome

Chosen option: AWS, because A free, public SPA needs reliable worldwide reach; AWS static hosting (S3) plus a global CDN (CloudFront) keeps load times low for all visitors and keeps every layer on one provider for billing and operations (NFR-003).

## Consequences

AWS static+CDN setup is slightly more configuration than an all-in-one host, but gives global performance and consistency with the rest of the approved stack.
<!-- sdlc:auto:end adr -->