const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    home: ['./client/src/bundles/home/home.js'],
    dashboard: ['./client/src/bundles/dashboard/dashboard.js'],
    vendor: ['lodash', 'jquery', 'bootstrap-sass']
  },
  output: {
    path: path.resolve('./public/bundles'),
    filename: '[name].learn.hackbu.js',
    chunkFilename: '[id].learn.hackbu.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        loader: ExtractTextPlugin.extract(
            'style',
            'css!sass!postcss'
        )
      },
      {
        test: /\.(jpg|png)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'file?name=[name].[hash].[ext]'
      },
      {
        test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff&name=[name].[ext]'
      },
      {
        test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/octet-stream&name=[name].[ext]'
      },
      {
        test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file?name=[name].[ext]'
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml&name=[name].[ext]'
      }
    ]
  },
  resolve: {
    root: path.resolve('./client/src'),
    modulesDirectories: ['node_modules', 'bower_components']
  },
  plugins: [
    new ExtractTextPlugin('[name].learn.hackbu.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.learn.hackbu.js', Infinity),
    new webpack.ProvidePlugin({
      'jQuery': 'jquery'
    }),
    new CleanWebpackPlugin(['bundles'], {
      root: path.resolve('./public'),
      verbose: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      mangle: false
    })
  ],
  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};
