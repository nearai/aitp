#!/bin/sh
set -e
if command -v openapi-generator-cli 2>&1 /dev/null
then
  OPENAPI_GENERATOR="openapi-generator-cli"
elif command -v openapi-generator 2>&1 /dev/null
then
  OPENAPI_GENERATOR="openapi-generator"
else
  echo "openapi-generator-cli or openapi-generator not found"
  echo "Install it from https://openapi-generator.tech/docs/installation"
  exit 1
fi

$OPENAPI_GENERATOR generate \
  -i ./schemas/capabilities/aitp-01-payments/v1.0.0/schema.json \
  -i ./schemas/capabilities/aitp-02-decisions/v1.0.0/schema.json \
  -g python-pydantic-v1 \
  -o /tmp/aitp/ \
  --package-name aitp.stubs

rm -rf ./packages/aitp-py/stubs/
cp -r /tmp/aitp/aitp/stubs/ ./packages/aitp-py/src/