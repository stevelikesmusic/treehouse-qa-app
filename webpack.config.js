'use strict'
const path = require('path')

module.exports = {
  entry: './app/index.jsx',
  output: {
    filename: 'bundle.js',
    publicPath: '',
    path: 'public'
  },
  resolve: {
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
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.svg|.png$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.png$/,
        loader: 'url?limit=300&name=[name].[ext]'
      }
    ]
  }
}