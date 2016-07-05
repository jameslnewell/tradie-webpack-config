'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = mapExtensionsToRegExp;

var _extToRegex = require('ext-to-regex');

var _extToRegex2 = _interopRequireDefault(_extToRegex);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function mapExtensionsToRegExp(extensions) {
  return (0, _extToRegex2.default)(extensions);
}
//# sourceMappingURL=mapExtensionsToRegExp.js.map