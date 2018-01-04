require('babel-register')({
  presets: [ 'env', 'stage-2', /*'react'*/],
});
require('babel-polyfill');

require('./tester.js');
