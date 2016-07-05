'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = configureAssets;

var _mapExtensionsToRegExp = require('./mapExtensionsToRegExp');

var _mapExtensionsToRegExp2 = _interopRequireDefault(_mapExtensionsToRegExp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var extensions = ['.jpeg', '.jpg', '.gif', '.png', '.svg', '.woff', '.ttf', '.eot'];

function configureAssets(options, webpack) {

  webpack.module.loaders.push({
    test: (0, _mapExtensionsToRegExp2.default)(extensions),
    loader: 'file-loader'
  });
}
//# sourceMappingURL=configureAssets.js.map