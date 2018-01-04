FROM node:latest

RUN apt-get update && apt-get -y install cron rsyslog

# Add crontab file in the cron directory
ADD crontab /etc/cron.d/crontab
ADD index.js /index.js
ADD tester.js /tester.js
ADD package.json /package.json

WORKDIR /

# install required node packages
RUN npm install


# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/crontab

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Run the command on container startup
CMD cron && tail -f /var/log/cron.log
