import 'babel-polyfill';


import fs from 'fs';
import ALY from 'aliyun-sdk';
const zlib = require('zlib');

var newSourcePath;
var newTargetPath;

export async function uploader(sourcePath, targetPath, r_oss, bucket, deleteBool = false, options){
	const oss = r_oss;
	newSourcePath = sourcePath;
	newTargetPath = targetPath;
	await zipFiles(sourcePath);

	var ossStream = require('aliyun-oss-upload-stream')(oss);

	return new Promise((resolve, reject) => {
		var upload = ossStream.upload({
			Bucket: bucket,
			Key: newTargetPath,
			...options
		});
		upload.on('error', (err) => {
			console.log(err);
			reject();
		});
		upload.on('uploaded', ()=>{
			console.log('Upload complete.');
			if(deleteBool){
				fs.unlinkSync(sourcePath);
				console.log('Deleted original file ('+sourcePath+')');
			}
			fs.unlinkSync(newSourcePath);
			console.log('Deleted generated compressed file ('+newSourcePath+')');
			resolve();
		});
		var read = fs.createReadStream(newSourcePath);
		read.pipe(upload);
	});
};

export function zipFiles(sourcePath){
	var gzip = zlib.createGzip();

	newSourcePath = newSourcePath+'.gz';
	newTargetPath = newTargetPath+'.gz';
	const inp = fs.createReadStream(sourcePath);
	const out = fs.createWriteStream(newSourcePath)
	console.log('newTargetPath = ', newTargetPath);
	console.log('new source path = ', newSourcePath);

	return new Promise((resolve, reject) => {
		console.log("running promise");
		out.on('finish', () => {
			console.log('zipping complete');
			resolve();
		});
		out.on('error', (err) => {
			console.log('error in output stream');
			console.log(err);
			reject(err);
		});
		inp.pipe(gzip).pipe(out);
	 });
}
