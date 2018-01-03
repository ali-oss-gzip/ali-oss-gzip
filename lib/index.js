import 'babel-polyfill';
import ALY from 'aliyun-sdk';
import {uploader} from './uploader';



module.exports = class ALIYUN_UPLOADER{
  constructor(accessKeyId, secretAccessKey, endpoint, apiVersion, bucket){
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.endpoint = endpoint;
    this.apiVersion = apiVersion;
    this.bucket = bucket;
    this.OSS = new ALY.OSS({
  		accessKeyId: this.accessKeyId,
  		secretAccessKey: this.secretAccessKey,
  		endpoint: this.endpoint,
  		apiVersion: this.apiVersion
  	});
  }
  upload(sourcePath, targetPath){
    uploader(sourcePath, targetPath, this.OSS, this.bucket);
  }


}
