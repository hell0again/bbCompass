## extends from https://github.com/whilp/ssh-agent
FROM alpine:3.2

ENV SOCKET_DIR /sshagent
ENV SSH_AUTH_SOCK ${SOCKET_DIR}/socket
RUN apk add --update openssh && rm -rf /var/cache/apk/*
RUN mkdir /sshagent && echo "export SSH_AUTH_SOCK=${SSH_AUTH_SOCK}" >/sshagent/env
COPY run.sh /run.sh
VOLUME /sshagent
ENTRYPOINT ["/run.sh"]
CMD ["ssh-agent"]
