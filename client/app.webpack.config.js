const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

module.exports = {
  entry: {
    home: ['./client/src/bundles/home/home.jsx'],
    dashboard: ['./client/src/bundles/dashboard/dashboard.jsx'],
    login: ['./client/src/bundles/login/login.jsx'],
  },
  output: {
    path: path.resolve(__dirname, '../public/bundles'),
    filename: '[name].learn.hackbu.js',
    chunkFilename: '[id].learn.hackbu.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'babel-loader',
            query: {
              presets: ['react', 'es2015', 'stage-0'],
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /(node_modules|bower_components)/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader',
          ],
        }),
      },
      {
        test: /\.(jpg|png)$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash].[ext]',
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/font-woff',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.ttf(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'application/octet-stream',
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.eot(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              mimetype: 'image/svg+xml',
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, './client/src'),
      'node_modules', 'bower_components',
    ],
    extensions: ['.js', '.jsx'],
    alias: {
      components: path.resolve(__dirname, './src/components'),
      reducers: path.resolve(__dirname, './src/reducers'),
      containers: path.resolve(__dirname, './src/containers'),
      actions: path.resolve(__dirname, './src/actions'),
    },
  },
  plugins: [
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require(path.resolve(__dirname, '../public/bundles/vendor.json')),
    }),
    new ExtractTextPlugin('[name].learn.hackbu.css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      mangle: false,
    }),
  ],
};
