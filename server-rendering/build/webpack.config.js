const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path')

const client = {
  target: 'web',
  mode: 'production',
  entry: path.resolve(__dirname, '..', 'client.js'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'app.js',
    publicPath: '/'
  },
  // plugins: [
  //   new HtmlWebpackPlugin({ template: path.resolve(__dirname, '..', 'public', 'index.html') })
  // ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  }
}

const server = {
  target: 'node',
  mode: 'development',
  entry: path.resolve(__dirname, '..', 'server.js'),
  output: {
    path: path.resolve(__dirname, '..', 'dist'),
    filename: 'server.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      }
    ]
  }
}

module.exports = [ client, server ]
