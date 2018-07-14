const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = function () {
  const API_HOST = process.env.API_HOST || "http://localhost:8001";

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)?$/,
          loader: 'babel-loader',
        },
        {
          test: /\.(scss|css)$/,
          loader: ['style-loader', 'css-loader', 'sass-loader']
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx']
    },
    plugins: [
      new HtmlWebpackPlugin({ template: './index.html' }),
      new webpack.DefinePlugin({
        LOHA_ENV: JSON.stringify(process.env.NODE_ENV),
      }),
    ],
    devServer: {
      port: 9000,
      historyApiFallback: true,

    },
    devtool: 'source-map',
  }
};
