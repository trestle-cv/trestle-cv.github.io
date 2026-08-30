# Trestle public website

This Nift source repository builds the public site for Trestle. Generated output
is stored in the nested `public/` Git repository for deployment.

The product is currently at definition/scaffold stage. See `PLAN.md` for the
intended information architecture and the sibling Trestle repository for the
authoritative engineering contracts.

## Public scripts

`install.sh`, `download.sh` and `update.sh` at the repository root are the
standalone public copies served from the website root. Their canonical source is
the Trestle application repository (`scripts/public/*.sh`), regenerated
deterministically from `scripts/checksum.sh` + the repository scripts. The
application's `scripts/test-public-scripts.sh` gate fails if these copies drift
from the canonical output. Copy the regenerated `scripts/public/*.sh` files here
whenever the canonical scripts change.

## Build and commit

```sh
nift status
nift build
```

After validation, commit `public/` first and this source repository second. This
preserves the generated commit referenced by the source repository.
