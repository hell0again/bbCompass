#!/bin/sh
set -eu && [ ${SET_X:-false} = true ] && set -x
SCRIPT_DIR=$(cd $(dirname $0) && pwd)
cd ${SCRIPT_DIR}

node ./bin/get-current-calendar.js | node ./bin/update-current.js |tee src/json/current.json
git diff src/json/current.json | cat

