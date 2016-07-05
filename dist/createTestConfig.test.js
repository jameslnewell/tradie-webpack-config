'use strict';

var _createTestConfig = require('./createTestConfig');

var _createTestConfig2 = _interopRequireDefault(_createTestConfig);

var _extendDefaultConfig = require('./util/extendDefaultConfig');

var _extendDefaultConfig2 = _interopRequireDefault(_extendDefaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('createTestConfig()', function () {

  it('should merge extra webpack config', function () {

    var config = (0, _createTestConfig2.default)((0, _extendDefaultConfig2.default)({

      watch: false, optimize: false,

      webpack: {

        module: {
          loaders: [{
            test: /\.foobar$/,
            loader: 'foobar'
          }]
        },

        externals: {
          'react/addons': true,
          'react/lib/ExecutionEnvironment': true,
          'react/lib/ReactContext': true
        }

      }

    }));

    expect(config).to.have.property('module').to.have.property('loaders');
    expect(config.module.loaders).to.contain({
      test: /\.foobar$/,
      loader: 'foobar'
    });

    expect(config).to.have.property('externals');
    expect(config.externals).to.have.property('react/addons', true);
    expect(config.externals).to.have.property('react/lib/ExecutionEnvironment', true);
    expect(config.externals).to.have.property('react/lib/ReactContext', true);
  });
});
//# sourceMappingURL=createTestConfig.test.js.map