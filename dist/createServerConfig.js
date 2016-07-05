'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createServerConfig;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _merge = require('./util/merge');

var _merge2 = _interopRequireDefault(_merge);

var _ignoreStyles = require('./util/ignoreStyles');

var _ignoreStyles2 = _interopRequireDefault(_ignoreStyles);

var _configureAssets = require('./util/configureAssets');

var _configureAssets2 = _interopRequireDefault(_configureAssets);

var _createAppConfig = require('./util/createAppConfig');

var _createAppConfig2 = _interopRequireDefault(_createAppConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createServerConfig(tradieConfig) {
  var optimize = tradieConfig.optimize;
  var src = tradieConfig.src;
  var dest = tradieConfig.dest;
  var bundles = tradieConfig.scripts.bundles;
  var styleExtensions = tradieConfig.styles.extensions;
  var extraWebpackConfig = tradieConfig.webpack;


  var webpackConfig = (0, _createAppConfig2.default)(tradieConfig);

  //configure the server bundles
  var entries = bundles.reduce(function (accum, bundle) {

    var dirname = _path2.default.dirname(bundle);
    var basename = _path2.default.basename(bundle, _path2.default.extname(bundle));

    //skip the server bundle
    if (basename !== 'server') {
      return accum;
    }

    return _extends({}, accum, _defineProperty({}, _path2.default.join(dirname, basename), bundle));
  }, {});

  //replace/ignore (S)CSS on the server - it doesn't get displayed
  (0, _ignoreStyles2.default)({ extensions: styleExtensions }, webpackConfig);

  //assets
  (0, _configureAssets2.default)({ optimize: optimize }, webpackConfig);

  //merge common and server config
  webpackConfig = _extends({}, webpackConfig, {

    target: 'node',
    node: {
      __dirname: false,
      __filename: false
    },

    //TODO: source-map-support only works with external maps - there is a PR to work with inline maps
    devtool: optimize ? 'source-map' : 'cheap-module-source-map',

    entry: entries,
    context: src,

    output: {
      path: dest,
      filename: '[name].js',
      libraryTarget: 'commonjs'
    },

    plugins: [].concat(_toConsumableArray(webpackConfig.plugins), [

    //make error traces use source maps
    new _webpack2.default.BannerPlugin('require(\'source-map-support\').install();', { raw: true, entryOnly: true })])

  });

  //merge extra webpack config
  webpackConfig = (0, _merge2.default)(webpackConfig, extraWebpackConfig);

  return webpackConfig;
}
//# sourceMappingURL=createServerConfig.js.map