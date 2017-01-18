'use strict';

var path = require('path');
var webpack = require('webpack');

var env = process.env.NODE_ENV || 'development';

var definePlugin = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify(env)
  }
});
var dedupePlugin = new webpack.optimize.DedupePlugin();
var uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: {
    warnings: false,
    properties: true,
    sequences: true,
    dead_code: true,
    conditionals: true,
    comparisons: true,
    evaluate: true,
    booleans: true,
    unused: true,
    loops: true,
    hoist_funs: true,
    cascade: true,
    if_return: true,
    join_vars: true,
    drop_debugger: true,
    unsafe: true,
    hoist_vars: true,
    negate_iife: true
  },
  sourceMap: Boolean(process.env.SOURCE_MAP),
  mangle: {
    toplevel: false,
    sort: false,
    eval: false,
    props: {
      regex: /^_/ // only mangle properties that start with underscore
    }
  },
  output: {
    space_colon: false,
    comments: false
  }
});


var config = module.exports = {
  context: __dirname,

  entry: {
  },

  module: {
    loaders: [
      {
        test: /\.json/,
        loader: require.resolve('json-loader')
      }
    ]
  },

  output: {
    libraryTarget: 'var',
    library: process.env.npm_package_name,
    filename: '[name].js',
    sourceMapFilename: '[name].map',
    path: path.resolve('./dist'),
    publicPath: '/dist/'
  },

  plugins: [definePlugin],

  recordsPath: path.resolve('/tmp/webpack.json')
};

config.entry[process.env.npm_package_name] = path.resolve(process.env.npm_package_main);

if (env === 'production') {
  if (process.env.SOURCE_MAP) {
    config.devtool = 'source-map';
  }

  config.output.pathinfo = true;

  var COMMIT_SUFFIX = process.env.COMMIT_HASH || '';
  if (COMMIT_SUFFIX) {
    config.output.filename = `[name].${COMMIT_SUFFIX}.js`;
    config.output.sourceMapFilename = `[name].${COMMIT_SUFFIX}.map`;
  } else {
    config.output.filename = '[name].min.js';
    config.output.sourceMapFilename = '[name].min.map';
  }

  config.plugins.unshift(dedupePlugin, uglifyPlugin);
}
