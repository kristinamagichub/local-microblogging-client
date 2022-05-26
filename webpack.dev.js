const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const plugins = [
  new HtmlWebpackPlugin({
    template: './src/index-template.html',
  }),
];

const config = {
  mode: 'development',
  plugins,
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              // modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  optimization: {
    moduleIds: 'named',
  },
  devtool: 'inline-source-map',
  devServer: {
    static: './',
    port: 9000,
    hot: true,
    open: true,
  },
};

module.exports = config;
