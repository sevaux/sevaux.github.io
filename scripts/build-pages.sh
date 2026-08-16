#!/usr/bin/env sh

set -eu

repository_root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
output_dir="$repository_root/_site"

mkdir -p "$output_dir"

rsync -a --delete \
  --exclude '/.git/' \
  --exclude '/.github/' \
  --exclude '/.agents/' \
  --exclude '/.codex/' \
  --exclude '/_site/' \
  --exclude '/scripts/' \
  --exclude '/README.md' \
  --exclude '/LICENSE' \
  --exclude '/.gitignore' \
  "$repository_root/" "$output_dir/"

touch "$output_dir/.nojekyll"
test -f "$output_dir/index.html"

printf 'Built GitHub Pages site in %s\n' "$output_dir"

