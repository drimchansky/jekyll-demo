const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const config = require('./buildConfig')

module.exports = {
  entry: {
    App: `${config.root}${config.jsSrc}`,
  },
  output: {
    path: path.resolve(__dirname, config.root + config.jsDistPath),
    filename: config.jsDistName,
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
  mode: 'production',
}
