FROM node:4
MAINTAINER hell0again <hell00again@gmail.com>

## imagemagick
RUN apt-get -y install wget &&\
    mkdir -p /bbcompass/ImageMagick &&\
    wget -O - http://www.imagemagick.org/download/ImageMagick.tar.gz | tar zxv --strip=1 -C /bbcompass/ImageMagick &&\
    cd /bbcompass/ImageMagick &&\
    ./configure && make && make install && rm -rf $(pwd)

RUN npm install -g\
    bower\
    local-web-server\
    js-beautify\
    webpack\
    browserify\
    testling

## clone bbCompass
## - いきなりmasterをcloneすると頻繁に変更が入ってビルドキャッシュが死ぬので安定版をcheckout。
## - npm installを一気に実行するとlow memoryで死ぬのでnpm install は分割 :(
## - masterのcheckoutは後回し
# RUN cd ${WORKDIR} && git clone https://github.com/hell0again/bbCompass.git ${WORKDIR} && npm install --dev --unsafe-perm
RUN \
    mkdir -p /bbcompass &&\
    git clone --no-checkout --branch 20160218 https://github.com/hell0again/bbCompass.git /bbcompass &&\
    cd /bbcompass &&\
    git reset HEAD package.json bower.json && git checkout package.json bower.json
RUN npm install file-loader css-loader json-loader style-loader url-loader
RUN npm install babel-loader intelli-espower-loader eslint-loader espower-loader
RUN npm install babel-core babel-preset-es2015 babelify es6-collections es6-map eslint
RUN npm install lodash power-assert request-json webpack
RUN npm install extract-text-webpack-plugin bower-webpack-plugin
RUN npm install tape
# RUN npm install --dev --unsafe-perm


## 最低限agは欲しい
RUN apt-get update && apt-get -y install silversearcher-ag

## rootでnpmのpostinstallが動かない対策
## see: http://stackoverflow.com/questions/28763958/nodejs-unsafe-perm-not-working-on-package-json
RUN echo 'unsafe-perm = true' >/root/.npmrc

RUN npm install -g react-tools
RUN cd /bbcompass && git checkout --force master && npm install --dev --unsafe-perm

CMD npm run start
EXPOSE 8000

