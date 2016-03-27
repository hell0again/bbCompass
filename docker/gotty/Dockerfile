FROM alpine:3.2
RUN \
  apk add --update openssl && rm -rf /var/cache/apk/* &&\
  mkdir -p /gotty &&\
  wget -O - https://github.com/yudai/gotty/releases/download/v0.0.12/gotty_linux_amd64.tar.gz | tar zxv -C /gotty

RUN echo 'export PATH=${PATH}:/gotty' >/gotty/env

VOLUME /gotty
EXPOSE 8080
ENTRYPOINT ["/gotty/gotty"]
CMD ["-w", "sh"]

