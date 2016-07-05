'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createVendorConfig;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _merge = require('./util/merge');

var _merge2 = _interopRequireDefault(_merge);

var _createAppConfig = require('./util/createAppConfig');

var _createAppConfig2 = _interopRequireDefault(_createAppConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createVendorConfig(tradieConfig) {
  var optimize = tradieConfig.optimize;
  var src = tradieConfig.src;
  var dest = tradieConfig.dest;
  var tmp = tradieConfig.tmp;
  var vendors = tradieConfig.scripts.vendors;
  var extraWebpackConfig = tradieConfig.webpack;


  var webpackConfig = (0, _createAppConfig2.default)(tradieConfig);

  //merge common and test config
  webpackConfig = _extends({}, webpackConfig, {

    target: 'web',
    devtool: optimize ? 'hidden-source-map' : 'cheap-module-eval-source-map',

    entry: { vendor: vendors },
    context: src,

    output: {
      path: dest,
      filename: optimize ? '[name].[chunkhash].js' : '[name].js',
      library: '[name]' //FIXME: '[name]_[chunkhash]' in prod
    },

    plugins: [].concat(_toConsumableArray(webpackConfig.plugins), [new _webpack2.default.DllPlugin({
      path: _path2.default.join(tmp, '[name]-manifest.json'),
      name: '[name]' //FIXME: '[name]_[chunkhash]' in prod
    })])

  });

  //merge extra webpack config
  webpackConfig = (0, _merge2.default)(webpackConfig, extraWebpackConfig);

  return webpackConfig;
}
//# sourceMappingURL=createVendorConfig.js.map