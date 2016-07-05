'use strict';

var _getRevManifestFromStats = require('./getRevManifestFromStats.js');

var _getRevManifestFromStats2 = _interopRequireDefault(_getRevManifestFromStats);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('getRevManifest()', function () {

  it.skip('should return asset revisions', function () {

    var stats = {};

    expect((0, _getRevManifestFromStats2.default)(stats)).to.be.deep.equal({});
  });
});
//# sourceMappingURL=getRevManifestFromStats.test.js.map