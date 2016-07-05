'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = warnAboutBundle;

var _fileName = require('file-name');

var _fileName2 = _interopRequireDefault(_fileName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function warnAboutBundle(bundle) {
  var basename = (0, _fileName2.default)(bundle);

  //check for reserved bundle names
  if (basename === 'vendor' || basename === 'common') {
    throw new Error('\'' + basename + '\' is a reserved bundle name. Please use a different name.');
  }

  //TODO: check if the bundle starts with './' and warn if it doesn't
}
//# sourceMappingURL=warnAboutBundle.js.map