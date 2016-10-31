const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'demo/index': path.resolve(__dirname, './demo/index.demo.js'),
    'dist/d2recharts': path.resolve(__dirname, './lib/index.js'),
    'spec/index': path.resolve(__dirname, './spec/index.spec.js'),
  },
  output: {
    filename: '[name].js',
    library: 'd2recharts',
    libraryTarget: 'var',
    path: path.resolve(__dirname),
    publicPath: '/',
  },
  alias: {},
  resolveLoader: {},
  module: {
    loaders: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        exclude: /locale/,
        query: {
          presets: [
            'es2015',
            'react',
          ]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, // images
        loader: 'url?name=[path][name].[ext]'
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/, // font files
        loader: 'url?name=[path][name].[ext]'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
    ]
  },
  externals: {
    'd2recharts': 'd2recharts',
    'echarts': 'echarts',
    'jquery': 'jQuery',
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    // new webpack.BannerPlugin('eslint-disable\n'),
    new webpack.optimize.DedupePlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.optimize\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    })
  ],
};
