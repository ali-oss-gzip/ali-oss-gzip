# ALIYUN Uploader Compressed

This node.js module allows the user to upload big files to ALIYUN OSS by compressing the file beforehand and taking care of all uploading operations. 

## Usage

### NPM

Install the package:
```
npm install --save ali-oss-gzip
```


Example use:
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
3. Upload the file using the upload_GZIP() function that takes in the following parameters: 

| Parameters    | Type          | Description   |
| ------------- | ------------- | ------------- |
| sourcePath | String | local path to the file  |
| targetPath  | String  | designated path within the OSS bucket  |
| delete | boolean | (optional) delete the file in the local directory |

Example:
```
AOG_u.upload_GZIP('test2.txt', 'test/test2.txt', true)

```
