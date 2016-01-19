#!/bin/sh
## [Usage] EXEC_PUSH=true $0 "./build.sh && git add -u"
## リモートのBASE_BRANCHから作業用ブランチをcheckoutし、ビルドコマンドを実行する。
## ビルド結果はリモートのTARGET_BRANCHにpushする。
## checkoutするとこのスクリプト自身もcheckoutされる点に注意する。
##
## - git add までがビルドコマンドの仕事
## - ローカルのブランチには一切タッチしない。リモートからcheckoutしてリモートにpushする
## - 作業用のブランチと同名のブランチが存在してたら死ね
## - staged/non stagedが残ってたら死ね。UntrackedはOK
## - 変更がなかったら何もせずに終了
set -eu
[ ${SET_X:=false} = true ] && set -x
SCRIPT_DIR=$(cd $(dirname $0); pwd) && cd ${SCRIPT_DIR}
: ${REMOTE_NAME:=origin}
: ${BASE_BRANCH:=master}
: ${TARGET_BRANCH:=master}
: ${LOCAL_TEMP_BRANCH:="tmp/${TARGET_BRANCH}/$(date +%Y%m%d_%H%M%S)"}
: ${EXEC_PUSH:=false}
DEFAULT_COMMIT_MSG_HEAD="$0 \"$@\""
: ${COMMIT_MSG_HEAD:=${DEFAULT_COMMIT_MSG_HEAD}}
: ${COMMIT_MSG_BODY:=}
echo BASE_BRANCH=${BASE_BRANCH}
echo TARGET_BRANCH=${TARGET_BRANCH}
echo EXEC_PUSH=${EXEC_PUSH}

if [ 0 -ne $(git status --porcelain | grep -v "^??" | wc -l) ]; then
    git status
    echo '[ERROR] "Changes to be committed:" or "Changes not staged for commit:" exists!!'
    exit 1
fi
(set -x
    git fetch
)
current_branch=$(git rev-parse --abbrev-ref @)
git checkout ${LOCAL_TEMP_BRANCH} 2>/dev/null && echo "[ERROR] LOCAL_TEMP_BRANCH:${LOCAL_TEMP_BRANCH} exists!!" && git checkout ${current_branch} && exit 1
(set -x
    git checkout --detach ${REMOTE_NAME}/${BASE_BRANCH}
    git checkout -b ${LOCAL_TEMP_BRANCH}
)
echo "[INFO] ******************** build start ********************"
eval $@
if [ 0 -eq $(git status --porcelain | grep -v "^??" | wc -l) ]; then
    echo "[INFO] no change. delete LOCAL_TEMP_BRANCH:${LOCAL_TEMP_BRANCH}"
    (set -x
        git checkout --detach HEAD
        git branch -d ${LOCAL_TEMP_BRANCH}
    )
else
    cat <<EOM | git commit --file=-
[${TARGET_BRANCH}] ${COMMIT_MSG_HEAD}

${COMMIT_MSG_BODY}
EOM
    if [ ${EXEC_PUSH:=false} = false ]; then
        echo "[INFO] (dryrun!!) git push ${REMOTE_NAME} ${LOCAL_TEMP_BRANCH}:${TARGET_BRANCH}"
    else
        (set -x
            git push ${REMOTE_NAME} ${LOCAL_TEMP_BRANCH}:${TARGET_BRANCH}
        ) &&:
        if [ $? -ne 0 ]; then
            echo "[INFO] try rebase.."
            (set -x
                git fetch
                git rebase ${REMOTE_NAME}/${BASE_BRANCH}
                git push ${REMOTE_NAME} ${LOCAL_TEMP_BRANCH}:${TARGET_BRANCH}
            )
        fi
    fi
    echo "[INFO] local build commit is ${LOCAL_TEMP_BRANCH}"
fi
(set -x
    git checkout ${current_branch}
)

