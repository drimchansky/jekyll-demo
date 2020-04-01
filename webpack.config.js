const path = require('path');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const settings = require('./settings');

module.exports = {
  entry: {
    App: settings.projectRoot + 'js/scripts.js',
  },
  output: {
    path: path.resolve(__dirname, settings.projectRoot + 'bundled'),
    filename: 'scripts-bundled.js',
  },
  plugins: [new MinifyPlugin()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  mode: 'development',
};
