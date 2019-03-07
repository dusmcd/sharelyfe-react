const path = require('path')

module.exports = {
  mode: process.env.NODE_ENV,
  entry: ['babel-polyfill', './client/index'],
  output: {
    path: path.resolve(__dirname, 'client', 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
