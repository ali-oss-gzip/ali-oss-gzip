# ALIYUN OSS Uploading Compressed

This node.js module allows the user to upload big files to ALIYUN OSS by compressing the file beforehand and taking care of all uploading operations. 

## Usage

Install the package:
```
npm install --save ali-oss-gzip
```

1. Import the module:
```
var AOG = require('ali-oss-gzip')
```
2. Create a new AOG object. The constructor takes in the following parameters:

| Parameters    | Type          | Description   |
| ------------- | ------------- | ------------- |
| accessKeyId | String | ALIYUN OSS Access Key ID  |
| secretAccessKey  | String  | ALIYUN OSS Secret Access Key  |
| endpoint | String | ALIYUN OSS endpoint |
| bucket | String | Destination bucket |

Example:
```
const AOG_u = new AOG(
  process.env.ALIYUN_OSS_ACCESS_KEY_ID,
  process.env.ALIYUN_OSS_SECRET_ACCESS_KEY,
  http://oss-cn-hangzhou.aliyuncs.com,
  'testing-bucket'
);
```
3. Upload the file using the ```upload_GZIP()``` function that takes in the following parameters: 

| Parameters    | Type          | Description   |
| ------------- | ------------- | ------------- |
| sourcePath | String | local path to the file  |
| targetPath  | String  | designated path within the OSS bucket  |
| deleteBool | boolean | (optional, default=false) delete the file in the local directory |

Example:
```
AOG_u.upload_GZIP('test2.txt', 'test/test2.txt')
AOG_u.upload_GZIP('test2.txt', 'test/test2.txt', true)
```

## Other Usages (including using it with Docker for periodic backups)
The ```examples/``` directories contain folders that have working uses of this module for certain tasks.
Within the ```examples/``` directory there are:
  - ```multiple-files/``` - By specifying the parameters in the ```tester.js``` file, the user can choose a directory, which will be looped through to be uploaded to ALIYUN OSS.
  - ```docker-cronjob/``` - This is a use of this module in integration with Docker to have periodic backups in a remote server. Refer to its own ```README.md``` file in the directory that documents its usage.

## Contents
  - lib/: Pre-compiled Javascript files that uses ES7. The actual module consists of compiled version of these using Babel.
  - .babelrc: Presets definitions used in compiling with Babel.
  - docker-start.sh: This module can be run on Docker using this bash script. This may be preferable to those using this module in a remote server.
  - index.js: The main script.
  - tester.js: An example script using this module.
  - uploader.js: The script that handles zipping and uploading to ALIYUN OSS.
  
## License

ali-oss-gzip is under the <a href="https://github.com/ali-oss-gzip/ali-oss-gzip/blob/master/LICENSE">MIT</a> license.
