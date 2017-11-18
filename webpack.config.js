const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const Config = require('./settings.config')

module.exports = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: ['./scss/styles.js', './index.js'],
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    host: Config.shared ? '0.0.0.0' : null,
    port: Config.port,
    inline: Config.inline,
    proxy: Config.proxy,
    https: Config.https,
    historyApiFallback: true,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['env', {
                targets: {
                  browsers: Config.browsersTarget,
                },
              }],
            ],
          },
        }],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin
          .extract({
            fallbackLoader: 'style-loader',
            loader: [
              { loader: 'css-loader', query: { modules: false, sourceMaps: Config.sourceMap } },
              { loader: 'sass-loader' },
            ],
          }),
      },
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'raw-loader',
          },
        ],
      },
      {
        test: /\.(glsl|frag|vert)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'glslify-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'styles.css',
      allChunks: true,
    }),
  ],
}
