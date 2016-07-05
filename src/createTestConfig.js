import webpack from 'webpack';

import merge from './util/merge';
import createCommonConfig from './util/createCommonConfig';

const runner = `

(function() {

  const fs = require('fs');
  const Mocha = require('mocha');
  Mocha.reporters.Base.window.width = ${process.stdout.columns || 80};
  Mocha.reporters.Base.symbols.dot = '.';

  const _mocha = new Mocha({});
  _mocha.ui('bdd');
  _mocha.reporter('spec');
  _mocha.useColors(true);
  _mocha.suite.emit('pre-require', global, '', _mocha);

  setTimeout(function() {
    _mocha.run(failures => {
      process.send(
        JSON.stringify({
          coverage: global.__coverage__ //FIXME: this is a hack for tradie-plugin-coverage
        }),
        () => process.exit(failures ? 1 : 0)
      );
    });
  }, 1);

})();

`;

export default function createTestConfig(tradieConfig) {
  const {src, dest, files, webpack: extraWebpackConfig} = tradieConfig;

  let webpackConfig = createCommonConfig(tradieConfig);

  webpackConfig.plugins.push(
    new webpack.BannerPlugin(
      runner,
      {raw: true, entryOnly: true}
    )
  );

  //merge common and test config
  webpackConfig = {

    ...webpackConfig,

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

  };

  //merge extra webpack config
  webpackConfig = merge(webpackConfig, extraWebpackConfig);

  return webpackConfig;
}
