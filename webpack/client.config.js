import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import * as config from '../config';
import { variableImporter } from '../utils/sass';

export default {
  target: 'web',
  context: __dirname,
  cache: false,
  debug: false,
  devtool: false,
  entry: config.entries.styleGuide.client,
  output: {
    path: config.output.path,
    filename: config.output.styleGuide.clientProdJSFilename,
  },
  resolve: {
    alias: {
      axiom: config.paths.axiom,
      'style-guide': config.paths.styleGuide,
    },
  },
  plugins: [
    ...config.webpack.aliases,
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.DefinePlugin({
      ...config.webpack.globals,
      __CLIENT__: true,
      __SERVER__: false,
      __PRODUCTION__: true,
      __DEVELOPMENT__: false,
      'process.env': {
        NODE_ENV: '"production"',
      },
    }),
    new ExtractTextPlugin(config.output.styleGuide.clientProdCSSFilename, {
      allChunks: true,
    }),
  ],
  module:  {
    loaders: [{
      test: /\.json$/,
      loader: 'json',
    }, {
      test: /\.yml$/,
      loader: 'json!yaml'
    }, {
      test: /\.(scss|css)$/,
      loader: ExtractTextPlugin.extract(
        'style',
        `css!autoprefixer!sass`,
      ),
    }, {
      test: /\.(woff(2)?|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader?name=fonts/font-awesome.[hash].[ext]',
      include: [
        config.nodeModules.fontAwesome,
      ],
    }],
    postLoaders: [{
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/,
    }],
  },
  sassLoader: {
    importer: variableImporter(config.paths.sassConfig, 'axiom-vars'),
  }
};