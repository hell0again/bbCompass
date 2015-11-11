#!/bin/sh
set -eu && [ ${SET_X:-false} = true ] && set -x
SCRIPT_DIR=$(cd $(dirname $0) && pwd)
cd ${SCRIPT_DIR}

DEFAULT_BUILD_VERSION=$(git name-rev --name-only HEAD)
: ${BUILD_VERSION:=${DEFAULT_BUILD_VERSION}}
echo "BUILD_VERSION=${BUILD_VERSION}"
SRC_DIR=${SCRIPT_DIR}/src
TMP_DIR=${SCRIPT_DIR}/public/_tmp
DST_DIR=${SCRIPT_DIR}/public/${BUILD_VERSION}

rm -rf ${SCRIPT_DIR}/public/_tmp
# js-beautify --replace src/js/*.js
webpack src/js/*
for f in Changelog.txt; do
    cp -r ${f} ${TMP_DIR}/${f}
done
cd ${SRC_DIR}
for f in css data image map ./*.html; do
    cp -r ${f} ${TMP_DIR}/${f}
done
rm -rf ${DST_DIR}
mkdir -p ${DST_DIR}
mv ${TMP_DIR}/* ${DST_DIR}
rmdir ${SCRIPT_DIR}/public/_tmp

