'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = createTestConfig;

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _merge = require('./util/merge');

var _merge2 = _interopRequireDefault(_merge);

var _createCommonConfig = require('./util/createCommonConfig');

var _createCommonConfig2 = _interopRequireDefault(_createCommonConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var runner = '\n\n(function() {\n\n  const fs = require(\'fs\');\n  const Mocha = require(\'mocha\');\n  Mocha.reporters.Base.window.width = ' + (process.stdout.columns || 80) + ';\n  Mocha.reporters.Base.symbols.dot = \'.\';\n\n  const _mocha = new Mocha({});\n  _mocha.ui(\'bdd\');\n  _mocha.reporter(\'spec\');\n  _mocha.useColors(true);\n  _mocha.suite.emit(\'pre-require\', global, \'\', _mocha);\n\n  setTimeout(function() {\n    _mocha.run(failures => {\n      process.send(\n        JSON.stringify({\n          coverage: global.__coverage__ //FIXME: this is a hack for tradie-plugin-coverage\n        }),\n        () => process.exit(failures ? 1 : 0)\n      );\n    });\n  }, 1);\n\n})();\n\n';

function createTestConfig(tradieConfig) {
  var src = tradieConfig.src;
  var dest = tradieConfig.dest;
  var files = tradieConfig.files;
  var extraWebpackConfig = tradieConfig.webpack;


  var webpackConfig = (0, _createCommonConfig2.default)(tradieConfig);

  webpackConfig.plugins.push(new _webpack2.default.BannerPlugin(runner, { raw: true, entryOnly: true }));

  //merge common and test config
  webpackConfig = _extends({}, webpackConfig, {

    target: 'node',
    devtool: 'inline-source-map',

    context: src,

    entry: {
      tests: files
    },

    output: {
      path: dest,
      filename: '[name].js'
    }

  });

  //merge extra webpack config
  webpackConfig = (0, _merge2.default)(webpackConfig, extraWebpackConfig);

  return webpackConfig;
}
//# sourceMappingURL=createTestConfig.js.map