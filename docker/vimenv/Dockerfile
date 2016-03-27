## vim(env) provider for ubuntu based container
## TODO: 1つでもvimが入ってたら2つ目以降は何もしないのをfixする

FROM ubuntu:latest

RUN \
  apt-get update && apt-get install -y openssl git bash wget curl gcc ncurses-dev make &&\
  mkdir -p /vimenv/vimenv &&\
  wget -O - https://github.com/raa0121/vimenv/archive/master.tar.gz | tar zxv --strip=1 -C /vimenv/vimenv &&\
  mkdir -p /vimenv/vimenv/plugins/vim-build &&\ 
  wget -O - https://github.com/yasu-n/vim-build/archive/master.tar.gz | tar zxv --strip=1 -C /vimenv/vimenv/plugins/vim-build

RUN \
  echo 'export VIMENV_ROOT=/vimenv/vimenv'       >/vimenv/env &&\
  echo 'export PATH=${PATH}:${VIMENV_ROOT}/bin' >>/vimenv/env &&\
  echo 'eval "$(vimenv init -)"'                >>/vimenv/env &&\
  echo '#!/bin/bash'    >/vimenv/run &&\
  echo '. /vimenv/env' >>/vimenv/run &&\
  echo 'eval "$@"'     >>/vimenv/run &&\
  chmod a+x /vimenv/run &&\
  echo '#!/bin/bash'    >/vimenv/install-tag &&\
  echo '[ -f ${VIMENV_ROOT}/version ] && exit 0' >>/vimenv/install-tag &&\
  echo 'vimenv install -t $1' >>/vimenv/install-tag &&\
  echo 'vimenv global $1'     >>/vimenv/install-tag &&\
  echo 'ln -s ${VIMENV_ROOT}/versions/$(cat ${VIMENV_ROOT}/version)/share/vim/vimrc /vimenv/vimrc' >>/vimenv/install-tag &&\
  chmod a+x /vimenv/install-tag

VOLUME /vimenv
ENTRYPOINT ["/vimenv/run"]


