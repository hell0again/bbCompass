FROM node:4
MAINTAINER hell0again <hell00again@gmail.com>

ENV HOME /root
ENV USER root

RUN npm install -g\
    bower\
    local-web-server\
    js-beautify\
    webpack

WORKDIR ${HOME}/git/bbCompass

# RUN mkdir ${HOME}/git && git clone https://github.com/hell0again/bbCompass.git ${HOME}/git/bbCompass
COPY . ${HOME}/git/bbCompass

RUN npm install

## imagemagick
RUN cd ${HOME} &&\
    wget http://www.imagemagick.org/download/ImageMagick-6.9.2-6.tar.gz &&\
    tar zxvf ImageMagick-6.9.2-6.tar.gz &&\
    cd ImageMagick-6.9.2-6 &&\
    ./configure && make && make install &&\
    cd .. && rm -rf ImageMagick-6.9.2-6.tar.gz ImageMagick-6.9.2-6

CMD npm run start
EXPOSE 8000

