'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createClientConfig;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fileName = require('file-name');

var _fileName2 = _interopRequireDefault(_fileName);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _merge = require('./util/merge');

var _merge2 = _interopRequireDefault(_merge);

var _configureStyles = require('./util/configureStyles');

var _configureStyles2 = _interopRequireDefault(_configureStyles);

var _configureAssets = require('./util/configureAssets');

var _configureAssets2 = _interopRequireDefault(_configureAssets);

var _createAppConfig = require('./util/createAppConfig');

var _createAppConfig2 = _interopRequireDefault(_createAppConfig);

var _getClientBundles = require('./util/getClientBundles');

var _getClientBundles2 = _interopRequireDefault(_getClientBundles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function createClientConfig(tradieConfig) {
  var optimize = tradieConfig.optimize;
  var src = tradieConfig.src;
  var dest = tradieConfig.dest;
  var tmp = tradieConfig.tmp;
  var _tradieConfig$scripts = tradieConfig.scripts;
  var scriptBundles = _tradieConfig$scripts.bundles;
  var vendors = _tradieConfig$scripts.vendors;
  var _tradieConfig$styles = tradieConfig.styles;
  var styleBundles = _tradieConfig$styles.bundles;
  var styleExtensions = _tradieConfig$styles.extensions;
  var extraWebpackConfig = tradieConfig.webpack;


  var webpackConfig = (0, _createAppConfig2.default)(tradieConfig);

  //configure all the bundles
  var clientBundles = (0, _getClientBundles2.default)(scriptBundles);
  webpackConfig.entry = clientBundles.reduce(function (accum, bundle) {
    var key = _path2.default.join(_path2.default.dirname(bundle), (0, _fileName2.default)(bundle));
    return _extends({}, accum, _defineProperty({}, key, bundle));
  }, {});

  //configure the style bundles
  styleBundles.forEach(function (bundle) {
    var key = _path2.default.join(_path2.default.dirname(bundle), (0, _fileName2.default)(bundle));
    if (webpackConfig.entry[key]) {
      webpackConfig.entry[key] = [].concat(webpackConfig.entry[key], bundle);
    } else {
      throw new Error('Style bundle "' + bundle + '" must have a matching script bundle.');
    }
  });

  //create a common.js bundle for modules that are shared across multiple bundles
  if (clientBundles.length > 1) {
    webpackConfig.plugins = webpackConfig.plugins.concat([new _webpack2.default.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: optimize ? '[name].[chunkhash].js' : '[name].js',
      chunks: clientBundles, //exclude modules from the vendor chunk
      minChunks: clientBundles.length //modules must be used across all the chunks to be included
    })]);
  } //TODO: what about for a single page app where require.ensure is used - I want a common stuff for all chunks in the main entry point

  //use vendor modules from the vendor bundle
  if (vendors.length > 0) {
    //chose DLLPlugin for long-term-caching based on https://github.com/webpack/webpack/issues/1315
    webpackConfig.plugins = webpackConfig.plugins.concat([new _webpack2.default.DllReferencePlugin({
      context: dest,
      manifest: require(_path2.default.join(tmp, 'vendor-manifest.json')) //eslint-disable-line global-require
    })]);
  }

  //stylesheets
  (0, _configureStyles2.default)({
    optimize: optimize, src: src, extensions: styleExtensions
  }, webpackConfig);

  //assets
  (0, _configureAssets2.default)({ optimize: optimize }, webpackConfig);

  //merge common and client config
  webpackConfig = _extends({}, webpackConfig, {

    target: 'web',
    devtool: optimize ? 'hidden-source-map' : 'cheap-module-eval-source-map',

    context: src,

    output: {
      path: dest,
      filename: optimize ? '[name].[chunkhash].js' : '[name].js'
    }

  });

  //merge extra webpack config
  webpackConfig = (0, _merge2.default)(webpackConfig, extraWebpackConfig);

  return webpackConfig;
}
//# sourceMappingURL=createClientConfig.js.map