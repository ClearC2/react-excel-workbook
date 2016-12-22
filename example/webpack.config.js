const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dirName = __dirname // eslint-disable-line no-undef

module.exports = function () {
  return {
    entry: {
      main: './src/index.js',
      vendor: [
        'react',
        'react-dom',
        'xlsx',
        'file-saver'
      ]
    },
    output: {
      path: path.join(dirName, 'dist'),
      publicPath: '/',
      filename: '[chunkhash].[name].js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          loaders: ['babel-loader'],
          include: [path.join(dirName, 'src'), path.join(dirName, '../src')],
        },
        {test: /\.json$/, loader: "json-loader"}
      ],
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({names: ['vendor', 'manifest']}),
      new HtmlWebpackPlugin({template: 'src/index.ejs'})
    ],
    node: {fs: 'empty'},
    externals: [
      {'./cptable': 'var cptable'},
      {'./jszip': 'jszip'}
    ]
  }
}
