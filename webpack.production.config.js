const webpack = require('webpack');
const path = require('path');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  entry: {
    app: path.resolve(__dirname, 'app/main.js'),
    vendors: ['react','react-dom']
  },
  output: {
    path: __dirname + '/build',
    filename: '[name]-[hash].js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      { 
        test: /\.css$/, 
        include: path.resolve(__dirname, 'app'), 
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
      },
      { 
        test: /\.scss$/, 
        loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader!sass-loader?outputStyle=expanded")

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
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    new HtmlwebpackPlugin({
      title: 'Hello World app',
      template: __dirname + "/app/templates/index.tem.html",
      chunks: ['app', 'vendors'],
    }),
    new webpack.DefinePlugin({
      'process.env':{
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({minimize: true}),
    new ExtractTextPlugin("[name]-[hash].css"),

  ]
}
