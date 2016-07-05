'use strict';

var _createServerConfig = require('./createServerConfig');

var _createServerConfig2 = _interopRequireDefault(_createServerConfig);

var _extendDefaultConfig = require('./util/extendDefaultConfig');

var _extendDefaultConfig2 = _interopRequireDefault(_extendDefaultConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('createServerConfig()', function () {

  it('should merge extra webpack config', function () {

    var config = (0, _createServerConfig2.default)((0, _extendDefaultConfig2.default)({

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
//# sourceMappingURL=createServerConfig.test.js.map