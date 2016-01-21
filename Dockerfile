FROM node:4
MAINTAINER hell0again <hell00again@gmail.com>

ENV HOME /root
ENV USER root

## imagemagick
RUN cd ${HOME} &&\
    wget http://www.imagemagick.org/download/ImageMagick.tar.gz &&\
    tar zxvf ImageMagick.tar.gz &&\
    cd ImageMagick-* &&\
    ./configure && make && make install &&\
    cd .. && rm -rf ImageMagick.tar.gz ImageMagick-*

RUN npm install -g\
    bower\
    local-web-server\
    js-beautify\
    webpack\
    browserify\
    testling

WORKDIR ${HOME}/git/bbCompass

# RUN mkdir ${HOME}/git/bbCompass || git clone https://github.com/hell0again/bbCompass.git ${HOME}/git/bbCompass
COPY . ${HOME}/git/bbCompass

RUN npm install


CMD npm run start
EXPOSE 8000

