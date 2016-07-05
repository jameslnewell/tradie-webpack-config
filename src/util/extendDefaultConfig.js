
export default function(config) {
  return {

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
    },

    ...config

  };
}
