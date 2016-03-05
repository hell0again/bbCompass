FROM node:4
MAINTAINER hell0again <hell00again@gmail.com>

ENV WORKDIR /bbcompass
ENV USER root

WORKDIR ${WORKDIR}

## imagemagick
RUN apt-get -y install wget &&\
    cd ${WORKDIR} &&\
    wget http://www.imagemagick.org/download/ImageMagick.tar.gz &&\
    tar zxvf ImageMagick.tar.gz &&\
    cd ImageMagick-* &&\
    ./configure && make && make install &&\
    cd ${WORKDIR} && rm -rf ImageMagick.tar.gz ImageMagick-*

RUN npm install -g\
    local-web-server\
    js-beautify\
    browserify\
    testling

## bbCompassの必要なファイルをもってくる
## - いきなりmasterをcloneすると頻繁に変更が入ってビルドキャッシュが死ぬので安定版をcheckout。
## - low memory対策で npm install を分割 :(
## - masterのcheckoutは後回し
# RUN cd ${WORKDIR} && git clone https://github.com/hell0again/bbCompass.git ${WORKDIR} && npm install --dev --unsafe-perm
RUN cd ${WORKDIR} &&\
    git clone --no-checkout --branch 20160218 https://github.com/hell0again/bbCompass.git ${WORKDIR} &&\
    git reset HEAD package.json bower.json && git checkout package.json bower.json
RUN npm install file-loader css-loader json-loader style-loader url-loader
RUN npm install babel-loader intelli-espower-loader eslint-loader espower-loader
RUN npm install babel-core babel-preset-es2015 babelify es6-collections es6-map eslint
RUN npm install lodash power-assert request-json webpack
RUN npm install extract-text-webpack-plugin bower-webpack-plugin
RUN npm install tape
# RUN npm install --dev --unsafe-perm

## 最低限の読み書き
RUN apt-get update &&\
    apt-get -y install vim silversearcher-ag

ENV HOME /root
## rootでnpmのpostinstallが動かない対策
## see: http://stackoverflow.com/questions/28763958/nodejs-unsafe-perm-not-working-on-package-json
RUN echo 'unsafe-perm = true' >${HOME}/.npmrc


CMD npm run start
EXPOSE 8000

RUN npm install -g react-tools
RUN cd ${WORKDIR} && git checkout --force master && npm install --dev --unsafe-perm

