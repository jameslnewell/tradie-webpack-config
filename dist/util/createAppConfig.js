'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.default = createApplicationConfig;

var _objectValues = require('object-values');

var _objectValues2 = _interopRequireDefault(_objectValues);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackBundleUpdateHookPlugin = require('webpack-bundle-update-hook-plugin');

var _webpackBundleUpdateHookPlugin2 = _interopRequireDefault(_webpackBundleUpdateHookPlugin);

var _createCommonConfig = require('./createCommonConfig');

var _createCommonConfig2 = _interopRequireDefault(_createCommonConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BundleUpdatedPlugin = function () {
  function BundleUpdatedPlugin(callback) {
    _classCallCheck(this, BundleUpdatedPlugin);

    this.callback = callback;
  }

  _createClass(BundleUpdatedPlugin, [{
    key: 'apply',
    value: function apply(compiler) {
      var _this = this;

      compiler.plugin('bundle-update', function (newModules, changedModules, removedModules) {
        _this.callback((0, _objectValues2.default)(newModules), (0, _objectValues2.default)(changedModules), (0, _objectValues2.default)(removedModules));
      });
    }
  }]);

  return BundleUpdatedPlugin;
}();

function createApplicationConfig(options) {
  var watch = options.watch;
  var optimize = options.optimize;
  var onFileChange = options.onFileChange;


  var config = (0, _createCommonConfig2.default)(options);

  //plugins
  if (optimize) {

    config.plugins = config.plugins.concat([

    //set env so non-prod code can be removed by uglify-js
    new _webpack2.default.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }), new _webpack2.default.optimize.OccurenceOrderPlugin(), new _webpack2.default.optimize.DedupePlugin(), new _webpack2.default.optimize.UglifyJsPlugin({
      output: { comments: false },
      compress: { warnings: false }
    })]);
  }

  //emit bundle update events
  if (watch) {
    config.plugins = config.plugins.concat([new _webpackBundleUpdateHookPlugin2.default(), new BundleUpdatedPlugin(onFileChange)]);
  }

  return config;
}
//# sourceMappingURL=createAppConfig.js.map