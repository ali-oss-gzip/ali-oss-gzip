import 'babel-polyfill';

const fs = require('fs');
const folder = '/backups/';

var Uploader = require('ali-oss-gzip')

const AOG = new Uploader(
  process.env.ALIYUN_OSS_ACCESS_KEY_ID,
  process.env.ALIYUN_OSS_SECRET_ACCESS_KEY,
  'http://'+process.env.ALIYUN_OSS_ENDPOINT,
  '2013-10-15',
  process.env.ALIYUN_OSS_BUCKET
);

var arr = [];
async function main(leaveOutLastFile){

	/*
		This function uploads all files in the specified directory.
		@param: leaveOutLastFile: boolean
			if this is set to true, the last file in the specified directory will be ignored from this operation.
	*/

	arr = fs.readdirSync(folder);
	for(let i in arr){
		if(leaveOutLastFile){
			if(i==arr.length-1){
				break;
			}
		}
		await AOG.upload_GZIP(filename,process.env.BUCKET_PATH+'/'+arr[i], true);
	}
}
main(true);
