const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProd = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, 'lib');

const commonCssLoaders = [
  isProd ? MiniCssExtractPlugin.loader : 'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      plugins: [ require('postcss-preset-env')() ]
    }
  }
];

module.exports = {
  mode: isProd ? 'production' : 'development',
  entry: isProd ? './src/index.tsx' : './example/index.tsx',
  output: {
    path: distPath,
    libraryTarget: 'umd',
    library: 'ReactOrgChart',
    filename: 'react-org-chart.min.js'
  },
  externals: isProd ? [ 'react', 'react-dom' ] : [],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.scss$/,
        use: [ ...commonCssLoaders, 'sass-loader' ]
      },
      {
        test: /\.css$/,
        use: commonCssLoaders
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'imgs/[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    },
    extensions: [ '.js', '.ts', '.tsx' ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devtool: 'source-map',
  devServer: {
    historyApiFallback: true,
    port: 3000,
    contentBase: [ './' ],
    inline: true,
    publicPath: '/',
    hot: true
  },
  plugins: [ new CleanWebpackPlugin() ].concat(
    isProd
      ? []
      : [
          new HTMLWebpackPlugin({
            title: 'React Org Chart',
            template: 'example/index.ejs'
          }),
          new MiniCssExtractPlugin({
            allChunks: true
          }),
          new webpack.HotModuleReplacementPlugin()
        ]
  )
};
