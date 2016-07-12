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
      }
    ]
  }
}