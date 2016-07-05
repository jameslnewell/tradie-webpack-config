'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createCommonBundleConfig;

var _mapExtensionsToRegExp = require('./mapExtensionsToRegExp');

var _mapExtensionsToRegExp2 = _interopRequireDefault(_mapExtensionsToRegExp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createCommonBundleConfig(options) {
  var src = options.src;
  var scriptExtensions = options.scripts.extensions;
  var styleExtensions = options.styles.extensions;


  var loaders = []

  //transpile project scripts with the babel loader
  .concat({
    test: (0, _mapExtensionsToRegExp2.default)(scriptExtensions),
    //TODO: pass babel config
    include: src,
    loader: 'babel-loader',
    query: {
      cacheDirectory: true
      //TODO: pass babel config
    }
  })

  //node and browserify loads JSON files like NodeJS does... emulate that for compatibility
  .concat({
    test: /\.json$/,
    loader: 'json-loader'
  });

  //TODO: enable/disable optimize/minimize
  //new webpack.LoaderOptionsPlugin({
  //  minimize: true,
  //  debug: false
  //})

  return {

    entry: {},

    resolve: {
      extensions: [''].concat(scriptExtensions, '.json', styleExtensions)
    },

    module: {
      preLoaders: [],
      loaders: loaders,
      postLoaders: []
    },

    plugins: []

  };
}
//# sourceMappingURL=createCommonConfig.js.map