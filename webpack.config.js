var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./public/main.js",
  output: {
    path: __dirname+'/public',
    filename: "bundle.min.js"
  },
  module: {
    loaders: [
          {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react', 'es2015']
            }
        },
        {
        test: /\.css$/, // Only .css files
        loader: 'style!css'// Run both loaders
        },
        {
        test: /\.scss$/,
        loader: 'style!css!sass'
        }
    ]
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
  ],
};