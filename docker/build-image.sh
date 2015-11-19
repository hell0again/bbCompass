#!/bin/sh
set -eu && [ ${SET_X:-false} = true ] && set -x
SCRIPT_DIR=$(cd $(dirname $0); pwd) && cd ${SCRIPT_DIR}/..
source ./docker/env.source
docker build --force-rm -t ${CONTAINER_IMAGE_NAME}:${CONTAINER_IMAGE_TAG} -f ./Dockerfile .

