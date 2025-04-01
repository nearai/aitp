#!/usr/bin/env bash
#
# Typechecks the codebase.
#
# Usage: ./scripts/type_check.sh

set -e
uv run mypy --config pyproject.toml src/
