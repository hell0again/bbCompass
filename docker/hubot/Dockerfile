FROM node:latest
RUN npm install -g yo generator-hubot coffee-script
RUN useradd -ms /bin/bash docker && echo "docker:docker" | chpasswd

COPY bot /hubot/bot
RUN chown -R docker:docker /hubot/bot

USER docker
WORKDIR /hubot/bot
#CMD bin/hubot
#CMD bin/hubot_slack
CMD bin/hubot_slack_daemon

