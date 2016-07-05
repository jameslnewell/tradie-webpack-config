import path from 'path';
import fileName from 'file-name';
import webpack from 'webpack';

import merge from './util/merge';
import configureStyles from './util/configureStyles';
import configureAssets from './util/configureAssets';
import createAppConfig from './util/createAppConfig';
import getClientBundles from './util/getClientBundles';

export default function createClientConfig(tradieConfig) {
  const {
    optimize,
    src, dest, tmp,
    scripts: {
      bundles: scriptBundles,
      vendors
    },
    styles: {
      bundles: styleBundles,
      extensions: styleExtensions
    },
    webpack: extraWebpackConfig
  } = tradieConfig;

  let webpackConfig = createAppConfig(tradieConfig);

  //configure all the bundles
  const clientBundles = getClientBundles(scriptBundles);
  webpackConfig.entry = clientBundles.reduce((accum, bundle) => {
    const key = path.join(path.dirname(bundle), fileName(bundle));
    return {
      ...accum,
      [key]: bundle
    };
  }, {});

  //configure the style bundles
  styleBundles.forEach(bundle => {
    const key = path.join(path.dirname(bundle), fileName(bundle));
    if (webpackConfig.entry[key]) {
      webpackConfig.entry[key] = [].concat(webpackConfig.entry[key], bundle);
    } else {
      throw new Error(`Style bundle "${bundle}" must have a matching script bundle.`);
    }
  });

  //create a common.js bundle for modules that are shared across multiple bundles
  if (clientBundles.length > 1) {
    webpackConfig.plugins = webpackConfig.plugins.concat([
      new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: optimize ? '[name].[chunkhash].js' : '[name].js',
        chunks: clientBundles, //exclude modules from the vendor chunk
        minChunks: clientBundles.length //modules must be used across all the chunks to be included
      })
    ]);
  }//TODO: what about for a single page app where require.ensure is used - I want a common stuff for all chunks in the main entry point

  //use vendor modules from the vendor bundle
  if (vendors.length > 0) {
    //chose DLLPlugin for long-term-caching based on https://github.com/webpack/webpack/issues/1315
    webpackConfig.plugins = webpackConfig.plugins.concat([
      new webpack.DllReferencePlugin({
        context: dest,
        manifest: require(path.join(tmp, 'vendor-manifest.json')) //eslint-disable-line global-require
      })
    ]);
  }

  //stylesheets
  configureStyles({
    optimize, src, extensions: styleExtensions
  }, webpackConfig);

  //assets
  configureAssets({optimize}, webpackConfig);

  //merge common and client config
  webpackConfig = {
    ...webpackConfig,

    target: 'web',
    devtool: optimize ? 'hidden-source-map' : 'cheap-module-eval-source-map',

    context: src,

    output: {
      path: dest,
      filename: optimize ? '[name].[chunkhash].js' : '[name].js'
    }

  };

  //merge extra webpack config
  webpackConfig = merge(webpackConfig, extraWebpackConfig);

  return webpackConfig;
}
