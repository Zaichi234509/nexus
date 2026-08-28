#!/bin/bash
set -e

PSQL_PWD=$POSTGRES_PASSWORD psql -h localhost -U nexus -d nexus -f migrations/001_init.sql || true
PSQL_PWD=$POSTGRES_PASSWORD psql -h localhost -U nexus -d nexus -f migrations/002_seed.sql || true
echo "Database initialized."
