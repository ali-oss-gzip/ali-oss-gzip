import 'babel-polyfill';

var Uploader = require('./index.js')

const mALIYUN_UPLOADER = new Uploader(
  process.env.ALIYUN_OSS_ACCESS_KEY_ID,
  process.env.ALIYUN_OSS_SECRET_ACCESS_KEY,
  'http://'+process.env.ALIYUN_OSS_ENDPOINT,
  '2013-10-15',
  process.env.ALIYUN_OSS_BUCKET
);

mALIYUN_UPLOADER.upload('test2.txt', 'test/test2.txt')
