import fs from 'fs';
import path from 'path';
import resolve from 'resolve';
import extToRegex from 'ext-to-regex';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default function(tradieConfig, webpackConfig) {
  const {optimize, src, extensions} = tradieConfig;

  //import style modules like `sass-composer`:
  // - resolve modules without the standard webpack prefix (`~`)
  webpackConfig.sassLoader = {
    importer: (url, prev, done) => {

      //FIXME: pending https://github.com/jtangelder/sass-loader/issues/234
      const basedir = prev === 'stdin' ? src : path.dirname(prev);

      //resolve the module to a file
      resolve(url, {

        basedir,
        extensions,

        //look for the entry module under a few properties
        // e.g. `main.scss` or `main.css`
        packageFilter(pkg) {

          extensions.forEach(ext => {
            if (pkg[`main.${ext}`]) {
              pkg.main = pkg[`main.${ext}`];
            }
          });

          if (!pkg.main) {
            pkg.main = pkg.style;
          }

          return pkg;
        }

      }, (resolveError, file) => {

        //
        if (resolveError) {
          return done(resolveError);
        } else if (path.extname(file) === '.css') {

          //read the file contents so that CSS is treated as SCSS
          return fs.readFile(file, (readError, data) => {
            if (readError) {
              return done(readError);
            } else {
              return done({file, contents: data.toString()});
            }
          });

        } else {
          return done({file});
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
    test: extToRegex(extensions),
    loader: ExtractTextPlugin.extract('style', [
      'css-loader?sourceMap',
      'postcss-loader?sourceMap',
      'resolve-url-loader?sourceMap',
      'sass-loader?sourceMap'
    ])
  });
  webpackConfig.postcss = [
    autoprefixer({browsers: ['last 2 versions']})
    //NOTE: css-loader looks for NODE_ENV=production and performs minification so we don't need cssnano or similar here
  ];
  webpackConfig.plugins.push(
    new ExtractTextPlugin(
      optimize ? '[name].[contenthash].css' : '[name].css',
      {allChunks: true}
    )
  );

}
