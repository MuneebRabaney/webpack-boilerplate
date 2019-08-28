/* eslint-disable */
require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const merge = require("webpack-merge");
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = (env, argv) => {
  
  console.log(`> ${env} env...`);
  console.log(`=============================================`);
  console.log(`> ${argv} mode...`);

  const { 
    PLATFORM, VERSION, 
    DEV_SERVER_PORT, HOST, 
  } = process.env;
  
  const loaders = {
    babel: {
      // Adding support for transpiling using the babel loader
      // on all js and jsx files
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    },
    fonts: {
      // Adding support for reading fonts
      // on all js and jsx files
      test: /\.(ttf|eot|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 1,
          name: `fonts/[name].[hash:6].[ext]`,
        },
      },
    },
    files: {
      test: /\.pdf$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 1,
            mimetype: 'application/pdf',
            name: `pdf/[name].[hash:6].[ext]`,
          },
        },
      ],
    },
    images: {
      test: /\.(png|jpg|jpeg|gif|svg)$/,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 1,
            name: `images/[name].[hash:6].[ext]`,
          },
        },
      ],
    },
    styles: {
      test: /\.(css|scss|sass)$/,
      use: [
        PLATFORM === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
        'css-loader',
        'sass-loader'
      ]
    },
  }

  const devServer = {
    host: HOST || '0.0.0.0',
    clientLogLevel: 'error',
    hot: true,
    open: true,
    https: true,
    overlay: true,
    progress: true,
    compress: true,
    historyApiFallback: true,
    port: DEV_SERVER_PORT || 8080,
    contentBase: path.join(__dirname, 'dist'),
  }

  const plugins = [
    new Dotenv(),
    new ErrorOverlayPlugin(),
    // Adding ability to have the index.html created
    new HtmlWebpackPlugin({
      // filename: path.resolve(__dirname, 'dist', 'index.html'),
      // template: path.resolve(__dirname, 'src', 'template', 'index.html'),
      template: './src/template/index.html',
      filename: './index.html'
    }),
    new CopyWebpackPlugin([ { from: 'src/static' } ]),
    new webpack.DefinePlugin({ 
      'process.env.VERSION': JSON.stringify(VERSION),
      'process.env.PLATFORM': JSON.stringify(PLATFORM)
    }),
  ];

  if (PLATFORM === 'production') {
    const CleanWebpackPlugin = new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['**/*', '!static/**', '!.htaccess'],
    });
    const MiniCssExtractPlugin = new MiniCssExtractPlugin({
      filename: `styles/[name].css`,
      chunkFilename: `styles/[id].css`,
    });
    plugins.push(CleanWebpackPlugin, MiniCssExtractPlugin);
  }
  
  const config = {  
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, '../dist'),
      filename: 'js/main.[hash:6].js',
    },
    module: {
      rules: [
        loaders.babel,
        loaders.fonts,
        loaders.files,
        loaders.images,
        loaders.styles,
      ]
    },
    devtool: 'source-map',
    resolve: { extensions: ['*', '.js', '.jsx', '.json'] },
    plugins: plugins,
    devServer: devServer,
  };

  return merge([ config ]);
};