'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (stats) {
  var manifest = {};

  stats.chunks.forEach(function (chunk) {
    chunk.names.forEach(function (chunkName) {
      chunk.files.forEach(function (chunkFile) {

        //FIXME: hack assuming the hash has been added to the file in the format `[name].[hash].[ext]`
        var extensions = chunkFile.replace(/\?.*/, '').split('.');
        extensions.shift();
        extensions.shift();

        manifest[chunkName + '.' + extensions.join('.')] = chunkFile;
      });
    });
  });

  return manifest;
};
//# sourceMappingURL=getRevManifestFromStats.js.map