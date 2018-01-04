
# Docker nodejs cron job Demo

#### Build the docker image
docker build . --tag cron-test

#### Run the docker image
docker run --name cron-test -d cron-test

#### Check the logs to make sure that node file is being executed every minute.
docker exec cron-test cat /var/log/cron.log
