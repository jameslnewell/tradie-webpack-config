'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ignoreStyles;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _mapExtensionsToRegExp = require('./mapExtensionsToRegExp');

var _mapExtensionsToRegExp2 = _interopRequireDefault(_mapExtensionsToRegExp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ignoreStyles(options, config) {
  var extensions = options.extensions;


  config.plugins.push(new _webpack2.default.NormalModuleReplacementPlugin((0, _mapExtensionsToRegExp2.default)(extensions), require.resolve('node-noop')));
}
//# sourceMappingURL=ignoreStyles.js.map