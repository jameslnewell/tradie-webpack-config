'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getClientBundles;

var _fileName = require('file-name');

var _fileName2 = _interopRequireDefault(_fileName);

var _warnAboutBundle = require('./warnAboutBundle');

var _warnAboutBundle2 = _interopRequireDefault(_warnAboutBundle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getClientBundles(bundles) {
  var filtered = bundles.filter(function (bundle) {
    return (0, _fileName2.default)(bundle) !== 'server';
  });
  filtered.forEach(_warnAboutBundle2.default);
  return filtered;
}
//# sourceMappingURL=getClientBundles.js.map