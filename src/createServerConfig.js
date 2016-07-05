import path from 'path';
import webpack from 'webpack';

import merge from './util/merge';
import ignoreStyles from './util/ignoreStyles';
import configureAssets from './util/configureAssets';
import createAppConfig from './util/createAppConfig';

export default function createServerConfig(tradieConfig) {
  const {optimize, src, dest, scripts: {bundles}, styles: {extensions: styleExtensions}, webpack: extraWebpackConfig} = tradieConfig;

  let webpackConfig = createAppConfig(tradieConfig);

  //configure the server bundles
  const entries = bundles.reduce((accum, bundle) => {

    const dirname = path.dirname(bundle);
    const basename = path.basename(bundle, path.extname(bundle));

    //skip the server bundle
    if (basename !== 'server') {
      return accum;
    }

    return {
      ...accum,
      [path.join(dirname, basename)]: bundle
    };

  }, {});

  //replace/ignore (S)CSS on the server - it doesn't get displayed
  ignoreStyles({extensions: styleExtensions}, webpackConfig);

  //assets
  configureAssets({optimize}, webpackConfig);

  //merge common and server config
  webpackConfig = {
    ...webpackConfig,

    target: 'node',
    node: {
      __dirname: false,
      __filename: false
    },

    //TODO: source-map-support only works with external maps - there is a PR to work with inline maps
    devtool: optimize ? 'source-map' : 'cheap-module-source-map',

    entry: entries,
    context: src,

    output: {
      path: dest,
      filename: '[name].js',
      libraryTarget: 'commonjs'
    },

    plugins: [
      ...webpackConfig.plugins,

      //make error traces use source maps
      new webpack.BannerPlugin(
        'require(\'source-map-support\').install();',
        {raw: true, entryOnly: true}
      )

    ]

  };

  //merge extra webpack config
  webpackConfig = merge(webpackConfig, extraWebpackConfig);

  return webpackConfig;
}
