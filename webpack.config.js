const path = require('path');
const webpack = require('webpack');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const pkg = require('./package.json');

const isProd = process.env.NODE_ENV === 'production';
const distPath = path.resolve(__dirname, 'lib');

const commonCssLoaders = [
  'style-loader',
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
    filename: `${pkg.name}.min.js`
  },
  externals: isProd ? [ 'react', 'react-dom', 'd3' ] : [],
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
          new webpack.HotModuleReplacementPlugin()
        ]
  )
};
