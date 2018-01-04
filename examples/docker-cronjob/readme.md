
# Using this module for periodic backups using cronjob

### Build the docker image
```
docker build -t cron-test .
```
Alternatively, pull it from DockerHub if the configurations showed in this repository is perfectly applicable.
```
docker pull cwkeam/backups-cron-aog
```
**Note**: this docker image contains the ```tester.js```, ```index.js```, and ```corntab``` files shown in this repository. If any of the configurations in these files are not applicable, it is highly recommend to edit those files and re-build the image.


### Run the docker image
```
bash update-backup.sh
```

#### Requirements:

##### Make sure env.dev.list contains the following values:

```
ALIYUN_OSS_ACCESS_KEY_ID
ALIYUN_OSS_SECRET_ACCESS_KEY
ALIYUN_OSS_ENDPOINT // remove the http:// in this variable. The script adds this automatically.
ALIYUN_OSS_BUCKET 
BUCKET_PATH // this specifies the folder in the bucket in which the user designates the backups to be stored in.
```
The ```BUCKET_PATH``` variable is kept flexible and is set in the bash script.
```-e BUCKET_PATH=backups \```

##### Edit paths to directories in the volume tag in the bash script.
1. ```-v /Users/chanwookim/documents/docker/docker-nodejs-cron-demo/env.dev.list:/env.dev.list \```
 - Edit the local directory to the file containing the environment variables.
2. ```-v /Users/chanwookim/documents/docker/testing:/backups``` 
 - Edit the local directory to the folder containing the backups 

### Check the logs to make sure that node file is being executed every minute.

```
docker exec cron-test cat /var/log/cron.log
```

### Features & things to keep in mind

In the ```tester.js``` file, there is a parameter in the ```main()``` function for a boolean value, ```leaveOutLastFile```. If this is set to true, the node file will not delete the last file in the directory. This may be useful if it is uncertain if the last file has finished being written into.
 
The period in which this cronjob is executed is specified in the ```cronjob``` file. Refer to [CronHowTo](https://help.ubuntu.com/community/CronHowto) for configuration. Currently, this is set to create a backup every minute.
