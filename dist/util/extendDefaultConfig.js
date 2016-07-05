'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = function (config) {
  return _extends({

    tmp: './tmp',
    src: './src',
    dest: './dist',

    scripts: {
      extensions: ['.js'],
      bundles: ['./index.js'],
      vendors: []
    },

    styles: {
      extensions: ['.scss', '.css'],
      bundles: ['./index.scss']
    }

  }, config);
};
//# sourceMappingURL=extendDefaultConfig.js.map