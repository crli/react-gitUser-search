const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true, 
    contentBase: './app',
    progress: true
  },
  entry: [
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname, 'app/main.js')
  ],

  output: {
    path: __dirname + '/build',
    publicPath: '/',
    filename: '[name]-[hash].js'
  },
  module: {
    perLoaders: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'app'),
        loader: 'jshint-loader'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      { 
        test: /\.css$/, 
        include: path.resolve(__dirname, 'app'), 
        loader: 'style-loader!css-loader!postcss-loader' 
        // ?modules&localIdentName=[path][name]---[local]---[hash:base64:5]
      },
      { 
        test: /\.scss$/,
        loader: 'style-loader!css-loader!postcss-loader!sass-loader?outputStyle=expanded'
      },
      { 
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf|svg)$/, 
        loader: 'url-loader?limit=8192'
      },
      {
        test: /\.json$/,
        loader: "json"
      }
    ]
  },
  postcss: function () {
    return [require('autoprefixer')];
  },
  jshint: {
    "esnext": true
  },

  devtool: 'eval-source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      template: __dirname + "/app/templates/index.tem.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
}