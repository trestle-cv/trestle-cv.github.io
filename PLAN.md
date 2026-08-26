# Trestle website plan

The website should explain the product honestly at each stage, make the
language-neutral API position obvious, and provide enough operational detail for
a visitor to decide whether Trestle fits their project.

## Design contract

- Dark authored theme, restrained accent color, strong typography, minimal
  decoration, and no framework dependency.
- Fast static pages with progressive enhancement and useful content when
  JavaScript is unavailable.
- Responsive layouts, keyboard navigation, visible focus, reduced motion,
  sufficient contrast, meaningful landmarks, and no inaccessible code tabs.
- Shared Nift templates for navigation, footer, metadata, documentation sidebars,
  release notices, and status/roadmap callouts.
- Never use fictional metrics, testimonials, adopters, security guarantees, or
  screenshots. Label planned and experimental features precisely.

## Initial information architecture

1. Home - concise value proposition, current status, architecture shape, and
   links to source/docs.
2. Product - collections, auth, files, realtime, administration, backups, and
   integrations, separated into available/planned states.
3. Why Trestle - self-hosting, single-binary operation, SQLite-first clarity,
   vanilla dashboard, and language-neutral API; no competitor disparagement.
4. Documentation - install, first project, collections, records, auth/rules,
   files, realtime, service accounts, administration, backup/restore, and API.
5. Architecture - transaction/event model, embedded frontend, storage adapters,
   single-node boundary, and explicit non-goals.
6. Functions - transactional outbox, AWS Lambda first, idempotency, scoped
   callbacks, operations, and deferred local runtime.
7. Security - trust model and implemented controls, with a reporting path when
   one exists. Do not convert design intentions into claims.
8. Roadmap - phase status linked to evidence and releases.
9. Releases/install - supported archives, checksums, configuration, proxy/TLS,
   upgrades, and rollback once artifacts exist.

## Delivery checkpoints

### A. Foundation

Create page templates, navigation, responsive type/spacing/color tokens, syntax
highlighting, metadata, canonical URLs, sitemap, robots file, favicon/social
assets, 404 page, and automated internal-link/accessibility checks.

### B. Product-definition launch

Publish the home, product, architecture, functions, security, roadmap, and
contributing pages using explicitly future-facing language. Link the GitHub
organization and license only after their final URLs and terms are verified.

### C. Runnable alpha

Add installation, quickstart, configuration, API examples in curl plus unrelated
languages, deployment guidance, real dashboard captures, and a version/status
banner. Every command must be tested against the released artifact.

### D. Stable documentation

Generate or validate API reference from OpenAPI, version docs, add upgrade and
restore drills, security reporting, release archive tables, checksums, and an
honest compatibility/import guide.

## Definition of done for any site change

- Nift source and generated output reproduce and both diffs were reviewed.
- Internal links, metadata, canonical URLs, code samples, and asset paths pass.
- Mobile/desktop layouts and keyboard/focus behavior were checked.
- Claims match the current application repository and release evidence.
- Generated output is committed before the source gitlink.
