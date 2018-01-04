
# Use this module for periodic backups using cronjob

### Build the docker image
```
docker build -t cron-test .
```

### Run the docker image
```
bash update-backup.sh
```

Requirements:
Edit paths to directories in the volume tag in the bash script.
Make sure there's a file called env.dev.list that contains the environment variables, and specify the path to the file. Do not edit the path of the file in the virtual machine - this path is used to specify where the cronjob can look for the environment variables.

### Check the logs to make sure that node file is being executed every minute.

```
docker exec cron-test cat /var/log/cron.log
```

### Features & things to keep in mind

In the ```tester.js``` file, there is a parameter in the ```main()``` function for a boolean value, ```leaveOutLastFile```. If this is set to true, the node file will not delete the last file in the directory. This may be useful if it is uncertain if the last file has finished being written into.
 
The period in which this cronjob is executed is specified in the ```cronjob``` file. Refer to [CronHowTo](https://help.ubuntu.com/community/CronHowto) for configuration. Currently, this is set to create a backup every minute.
