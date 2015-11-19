#!/bin/sh
set -eu && [ ${SET_X:-false} = true ] && set -x
SCRIPT_DIR=$(cd $(dirname $0); pwd) && cd ${SCRIPT_DIR}/..
./docker/conn bash

