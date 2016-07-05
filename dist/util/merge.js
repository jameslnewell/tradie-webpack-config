'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (cfg1, cfg2) {
  return (0, _lodash2.default)({}, cfg1, cfg2, function (prev, next) {
    if (Array.isArray(prev)) {
      return prev.concat(next);
    } else {
      return undefined; //eslint-disable-line no-undefined
    }
  });
};

var _lodash = require('lodash.mergewith');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=merge.js.map