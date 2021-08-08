const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');
const CopyPlugin = require('copy-webpack-plugin');

const commonConfig = {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  stats: {
    modules: false,
  },
  plugins: [
    new Dotenv(),
    new CopyPlugin({
      patterns: [{ from: 'public', to: path.join(__dirname, 'dist') }],
    }),
  ],
};

const clientConfig = {
  entry: {
    client: './src/front/index.tsx',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve('babel.config.js'),
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
    ],
  },
  ...commonConfig,
};

const serverConfig = {
  target: 'node',
  externalsPresets: { node: true },
  externals: [
    nodeExternals({
      allowlist: ['pupa', 'escape-goat'],
    }),
  ],
  entry: {
    server: './src/back/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.[j|t]sx?$/,
        exclude: {
          and: [/node_modules/], // Exclude libraries in node_modules ...
          not: [
            // Except for a few of them that needs to be transpiled because they use modern syntax
            /pupa/,
          ],
        },
        use: {
          loader: 'babel-loader',
          options: {
            configFile: path.resolve('babel.config.js'),
          },
        },
      },
    ],
  },
  ...commonConfig,
};

module.exports = [clientConfig, serverConfig];
