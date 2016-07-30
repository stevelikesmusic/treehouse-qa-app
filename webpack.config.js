'use strict'
const path = require('path')
const webpack = require('webpack')
const production = process.env.NODE_ENV === 'production'
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './app/index.jsx',
  output: {
    filename: 'bundle.js',
    publicPath: '/',
    path: 'public'
  },
  resolve: {
    root: './public',
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [
      { test: /\.(js|jsx)$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'] 
        }
      },
      {
        test: /\.scss$/,
        loader: production ? ExtractTextPlugin.extract("css!sass") : 'style!css!sass'
      },
      {
        test: /\.svg$/,
        loader: 'file?name=images/[name].[ext]'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=8192&name=images/[name].[ext]'
      }
    ]
  },
  plugins: production ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin("global.css", {
      allChucnks: true
    }),
    new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
  ] : []
}