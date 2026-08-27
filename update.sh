#!/bin/sh
set -eu
tmp=$(mktemp "${TMPDIR:-/tmp}/trestle-update-loader.XXXXXX")
trap 'rm -f "$tmp"' EXIT INT TERM
curl -fsSL https://raw.githubusercontent.com/trestle-dev/trestle/main/update.sh -o "$tmp"
exec sh "$tmp" "$@"
