#!/usr/bin/env bash
BASEDIR="$( cd "$(dirname "")" ; pwd -P )"
echo "Executing stop in '$BASEDIR'"

docker stop example-0-nest-postgres
docker stop example-0-nest-pgadmin
docker stop example-0-nest-nest
