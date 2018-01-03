'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.uploader = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var uploader = exports.uploader = function () {
	var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sourcePath, targetPath, r_oss, bucket) {
		var deleteBool = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
		var options = arguments[5];
		var oss, ossStream;
		return regeneratorRuntime.wrap(function _callee$(_context) {
			while (1) {
				switch (_context.prev = _context.next) {
					case 0:
						oss = r_oss;

						newSourcePath = sourcePath;
						newTargetPath = targetPath;
						_context.next = 5;
						return zipFiles(sourcePath);

					case 5:
						ossStream = require('aliyun-oss-upload-stream')(oss);
						return _context.abrupt('return', new Promise(function (resolve, reject) {
							var upload = ossStream.upload(_extends({
								Bucket: bucket,
								Key: newTargetPath
							}, options));
							upload.on('error', function (err) {
								console.log(err);
								reject();
							});
							upload.on('uploaded', function () {
								console.log('Upload complete.');
								if (deleteBool) {
									_fs2.default.unlinkSync(sourcePath);
									console.log('Deleted original file (' + sourcePath + ')');
								}
								_fs2.default.unlinkSync(newSourcePath);
								console.log('Deleted generated compressed file (' + newSourcePath + ')');
								resolve();
							});
							var read = _fs2.default.createReadStream(newSourcePath);
							read.pipe(upload);
						}));

					case 7:
					case 'end':
						return _context.stop();
				}
			}
		}, _callee, this);
	}));

	return function uploader(_x, _x2, _x3, _x4) {
		return _ref.apply(this, arguments);
	};
}();

exports.zipFiles = zipFiles;

require('babel-polyfill');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _aliyunSdk = require('aliyun-sdk');

var _aliyunSdk2 = _interopRequireDefault(_aliyunSdk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var zlib = require('zlib');

var newSourcePath;
var newTargetPath;

;

function zipFiles(sourcePath) {
	var gzip = zlib.createGzip();

	newSourcePath = newSourcePath + '.gz';
	newTargetPath = newTargetPath + '.gz';
	var inp = _fs2.default.createReadStream(sourcePath);
	var out = _fs2.default.createWriteStream(newSourcePath);
	console.log('newTargetPath = ', newTargetPath);
	console.log('new source path = ', newSourcePath);

	return new Promise(function (resolve, reject) {
		console.log("running promise");
		out.on('finish', function () {
			console.log('zipping complete');
			resolve();
		});
		out.on('error', function (err) {
			console.log('error in output stream');
			console.log(err);
			reject(err);
		});
		inp.pipe(gzip).pipe(out);
	});
}