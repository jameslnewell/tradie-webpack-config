'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (tradieConfig, webpackConfig) {
  var optimize = tradieConfig.optimize;
  var src = tradieConfig.src;
  var extensions = tradieConfig.extensions;

  //import style modules like `sass-composer`:
  // - resolve modules without the standard webpack prefix (`~`)

  webpackConfig.sassLoader = {
    importer: function importer(url, prev, done) {

      //FIXME: pending https://github.com/jtangelder/sass-loader/issues/234
      var basedir = prev === 'stdin' ? src : _path2.default.dirname(prev);

      //resolve the module to a file
      (0, _resolve2.default)(url, {

        basedir: basedir,
        extensions: extensions,

        //look for the entry module under a few properties
        // e.g. `main.scss` or `main.css`
        packageFilter: function packageFilter(pkg) {

          extensions.forEach(function (ext) {
            if (pkg['main.' + ext]) {
              pkg.main = pkg['main.' + ext];
            }
          });

          if (!pkg.main) {
            pkg.main = pkg.style;
          }

          return pkg;
        }
      }, function (resolveError, file) {

        //
        if (resolveError) {
          return done(resolveError);
        } else if (_path2.default.extname(file) === '.css') {

          //read the file contents so that CSS is treated as SCSS
          return _fs2.default.readFile(file, function (readError, data) {
            if (readError) {
              return done(readError);
            } else {
              return done({ file: file, contents: data.toString() });
            }
          });
        } else {
          return done({ file: file });
        }
      });
    }
  };

  //parse `require()`'d style files:
  // - parse `@import`s in SASS
  // - extract `url()`s in SASS
  // - expand vendor prefixes with autoprefix
  // - extract styles to a separate `*.css` file
  webpackConfig.module.loaders.push({
    test: (0, _extToRegex2.default)(extensions),
    loader: _extractTextWebpackPlugin2.default.extract('style', ['css-loader?sourceMap', 'postcss-loader?sourceMap', 'resolve-url-loader?sourceMap', 'sass-loader?sourceMap'])
  });
  webpackConfig.postcss = [(0, _autoprefixer2.default)({ browsers: ['last 2 versions'] })
  //NOTE: css-loader looks for NODE_ENV=production and performs minification so we don't need cssnano or similar here
  ];
  webpackConfig.plugins.push(new _extractTextWebpackPlugin2.default(optimize ? '[name].[contenthash].css' : '[name].css', { allChunks: true }));
};

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _resolve = require('resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _extToRegex = require('ext-to-regex');

var _extToRegex2 = _interopRequireDefault(_extToRegex);

var _autoprefixer = require('autoprefixer');

var _autoprefixer2 = _interopRequireDefault(_autoprefixer);

var _extractTextWebpackPlugin = require('extract-text-webpack-plugin');

var _extractTextWebpackPlugin2 = _interopRequireDefault(_extractTextWebpackPlugin);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=configureStyles.js.map