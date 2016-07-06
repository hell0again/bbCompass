#!/bin/sh
set -eu && [ ${SET_X:-false} = true ] && set -x
SCRIPT_DIR=$(cd $(dirname $0) && pwd)
cd ${SCRIPT_DIR}

DEFAULT_BUILD_VERSION=master
: ${BUILD_VERSION:=${DEFAULT_BUILD_VERSION}}
echo "BUILD_VERSION=${BUILD_VERSION}"
SRC_DIR=${SCRIPT_DIR}/src
TMP_DIR=${SCRIPT_DIR}/public/_tmp
BAK_DIR=$(mktemp -d 2>/dev/null || mktemp -d -t bbc-build)
DST_DIR=${SCRIPT_DIR}/public/${BUILD_VERSION}

## let $TMP_DIR exists and is empty
mv -f ${TMP_DIR} ${BAK_DIR}/_tmp 2>/dev/null ||:
mkdir -p ${TMP_DIR}

## let $DST_DIR exists and is empty
mv -f ${DST_DIR} ${BAK_DIR}/prev 2>/dev/null ||:
mkdir -p ${DST_DIR}

# js-beautify --replace src/js/*.js
webpack src/js/*
browserify -t babelify src/mapdiff.jsx -o ${TMP_DIR}/mapdiff.js
for f in Changelog.txt; do
    cp -r ${f} ${TMP_DIR}/${f}
done
cd ${SRC_DIR}
for f in css data image map ./*.html; do
    cp -r ${f} ${TMP_DIR}/${f}
done

mv -f ${TMP_DIR}/* ${DST_DIR} && rmdir ${TMP_DIR}
rm -rf ${BAK_DIR} ||: ## docker環境で rm -rf できないケースを考慮
