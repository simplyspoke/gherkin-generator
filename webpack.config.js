const path = require('path');
const webpack = require('webpack');

const libraryName = 'contemplated';

module.exports = {
  entry: {
    [libraryName]: `./src/${libraryName}.ts`,
  },
  devtool: 'inline-source-map',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [new DtsBundlePlugin()],
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  }
};

/**
 * DtsBundlePlugin allows for the bundling of all the types into a single d.ts file.
 * @constructor
 */
function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function(compiler) {
  compiler.plugin('done', function() {
    const dts = require('dts-bundle');

    dts.bundle({
      name: libraryName,
      main: `dist/src/${libraryName}.d.ts`,
      out: `../${libraryName}.d.ts`,
      removeSource: true,
      outputAsModuleFolder: true // to use npm in-package typings
    });
  });
};
