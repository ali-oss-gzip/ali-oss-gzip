docker run \
	--name cron-test \
	-e BUCKET_PATH=backups \
	-v /Users/chanwookim/documents/docker/docker-nodejs-cron-demo/env.dev.list:/env.dev.list \
	-v /Users/chanwookim/documents/docker/testing:/backups \
	-d cwkeam/backups-cron-aog
