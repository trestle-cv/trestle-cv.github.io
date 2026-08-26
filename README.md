# Trestle public website

This Nift source repository builds the public site for Trestle. Generated output
is stored in the nested `public/` Git repository for deployment.

The product is currently at definition/scaffold stage. See `PLAN.md` for the
intended information architecture and the sibling Trestle repository for the
authoritative engineering contracts.

## Build and commit

```sh
nift status
nift build
```

After validation, commit `public/` first and this source repository second. This
preserves the generated commit referenced by the source repository.
