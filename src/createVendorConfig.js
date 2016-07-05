import path from 'path';
import webpack from 'webpack';

import merge from './util/merge';
import createAppConfig from './util/createAppConfig';

export default function createVendorConfig(tradieConfig) {
  const {optimize, src, dest, tmp, scripts: {vendors}, webpack: extraWebpackConfig} = tradieConfig;

  let webpackConfig = createAppConfig(tradieConfig);

  //merge common and test config
  webpackConfig = {
    ...webpackConfig,

    target: 'web',
    devtool: optimize ? 'hidden-source-map' : 'cheap-module-eval-source-map',

    entry: {vendor: vendors},
    context: src,

    output: {
      path: dest,
      filename: optimize ? '[name].[chunkhash].js' : '[name].js',
      library: '[name]' //FIXME: '[name]_[chunkhash]' in prod
    },

    plugins: [
      ...webpackConfig.plugins,
      new webpack.DllPlugin({
        path: path.join(tmp, '[name]-manifest.json'),
        name: '[name]' //FIXME: '[name]_[chunkhash]' in prod
      })
    ]

  };

  //merge extra webpack config
  webpackConfig = merge(webpackConfig, extraWebpackConfig);

  return webpackConfig;
}
