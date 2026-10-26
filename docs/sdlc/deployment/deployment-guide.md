# Deployment Guide

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start how-it-deploys -->
Pushes to `main` run `.github/workflows/deploy.yml`, which builds the API image (if there is a backend) and deploys the SPA to AWS Amplify. Commits touching only `docs/sdlc/**` don't deploy. Deployments can also be started from the platform's Deployment tab.
<!-- sdlc:auto:end how-it-deploys -->

<!-- sdlc:auto:start environments -->
| Name | Service | Runtime | Scaling | Environment |
|---|---|---|---|---|
| SPA Bundle (S3) | AWS S3 | Static object storage | Managed by AWS, effectively unlimited for static assets | dev |
| Global CDN (CloudFront) | AWS CloudFront | Edge CDN over HTTPS | Auto-scaled global edge network | dev |
<!-- sdlc:auto:end environments -->

<!-- sdlc:auto:start live -->
_Not deployed yet._
<!-- sdlc:auto:end live -->

<!-- sdlc:auto:start topology -->
```mermaid
graph LR
  n_SPA_Bundle__S3_["SPA Bundle (S3)<br/>AWS S3"]
  n_Global_CDN__CloudFront_["Global CDN (CloudFront)<br/>AWS CloudFront"]
  n_Global_CDN__CloudFront_ -->|"HTTPS"| n_SPA_Bundle__S3_
```
<!-- sdlc:auto:end topology -->
