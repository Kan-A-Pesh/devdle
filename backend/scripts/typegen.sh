#!/bin/bash
set -e
cd "$(dirname "$0")/.."

docker run --rm \
    -v "$(pwd)/types:/types" \
    -v "$(pwd)/../database/data/data.db:/data.db" \
    -w / \
    node:20-alpine \
    npx --yes pocketbase-typegen --db /data.db --out /types/pocketbase.ts
