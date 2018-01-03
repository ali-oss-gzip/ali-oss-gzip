npm run build ;

docker run \
	--name chanwoo-nod \
	--env-file /Users/chanwookim/documents/env.dev.list \
	-v /Users/chanwookim/documents/modules/aliyun-gzip:/src \
	-w /src \
	rickydunlop/nodejs-ffmpeg \
	npm run serve

