'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

require('babel-polyfill');

var _aliyunSdk = require('aliyun-sdk');

var _aliyunSdk2 = _interopRequireDefault(_aliyunSdk);

var _uploader = require('./uploader');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

module.exports = function () {
  function ALIYUN_UPLOADER(accessKeyId, secretAccessKey, endpoint, apiVersion, bucket) {
    _classCallCheck(this, ALIYUN_UPLOADER);

    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
    this.endpoint = endpoint;
    this.apiVersion = apiVersion;
    this.bucket = bucket;
    this.OSS = new _aliyunSdk2.default.OSS({
      accessKeyId: this.accessKeyId,
      secretAccessKey: this.secretAccessKey,
      endpoint: this.endpoint,
      apiVersion: this.apiVersion
    });
  }

  _createClass(ALIYUN_UPLOADER, [{
    key: 'upload',
    value: function upload(sourcePath, targetPath, deleteBool) {
      return (0, _uploader.uploader)(sourcePath, targetPath, this.OSS, this.bucket, deleteBool);
    }
  }]);

  return ALIYUN_UPLOADER;
}();