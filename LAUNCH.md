# Trestle launch draft

## Suggested title

Trestle: a self-hosted backend platform in one Go executable, with SQLite, auth, realtime and durable automation

## Post

I built Trestle for people who want the convenience of a backend platform without giving up inspectable infrastructure.

It is one self-hosted Go service with an embedded administration dashboard and SQLite-first storage. It provides typed collections, application-user auth, access rules, files, realtime SSE, durable jobs, signed webhooks, AWS Lambda delivery, audit history, backups and a language-neutral HTTP/OpenAPI boundary.

The project is at release-candidate quality but the first public release is still pre-1.0. The boundaries are deliberate: one process owns one database; you operate TLS and deployment; relation fields are currently record IDs rather than target-aware foreign keys; and application-specific workflows remain in your application.

There is now a separate Incident Desk example that uses only published HTTP APIs. It demonstrates browser users, scoped server credentials, rules, records, realtime and files without importing internal packages or opening Trestle's database.

I would value feedback from self-hosters on installation, backups, proxy guidance and the operational model more than feature requests at this stage.

- Project: https://github.com/trestle-cv/trestle
- Five-minute quickstart: https://trestle.cv/quickstart.html
- Incident Desk example: https://github.com/trestle-cv/trestle-example
- Security and deployment boundaries: https://trestle.cv/security.html

## Material to attach

1. Dashboard overview screenshot.
2. Incident Desk screenshot.
3. A short terminal capture showing install, start, health and the first record write.

Do not claim a stable API or effortless horizontal scaling. Lead with inspectability, resource efficiency, recovery and the complete external example.
