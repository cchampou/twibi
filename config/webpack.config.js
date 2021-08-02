const path = require('path');
const nodeExternals = require('webpack-node-externals');
const Dotenv = require('dotenv-webpack');

const commonConfig = {
  mode: 'development',
  devtool: 'inline-cheap-module-source-map',
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  stats: {
    modules: false,
  },
  plugins: [new Dotenv()],
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
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: { version: '3.13', proposals: true },
                },
              ],
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
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
  externals: [nodeExternals()],
  entry: {
    server: './src/back/index.ts',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-typescript'],
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

module.exports = [clientConfig, serverConfig];
