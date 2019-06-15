const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtraWatchWebpackPlugin = require('extra-watch-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const NunjucksWebpackPlugin = require('nunjucks-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');
const nunjuckspages = require('./nunjuckspages');

module.exports = env => {
  const devMode = !env || !env.production;

  return {
    mode: devMode ? 'development' : 'production',
    entry: {
      main: './src/index.js',
      typescript_demo: './src/typescript_demo.ts',
      vendor: './src/vendor.js'
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'assets/js/[name].js',
      library: 'MainModule',
    },
    module: {
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          exclude: ["/node_modules/", "/assets/", "/dist/**/*"], // exclude more files
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.ts(x?)$/,
          enforce: 'pre',
          exclude: ["/node_modules/", "/assets/", "/dist/**/*"], // exclude more files
          use: [
            {
              loader: 'tslint-loader',
              options: { /* Loader options go here */ }
            }
          ]
        },
        {
          test: /\.ts(x?)$/,
          exclude: ["/node_modules/", "/assets/", "/dist/**/*"], // exclude more files
          use: [
            {
              loader: 'babel-loader',
              query: {
                presets: [
                  '@babel/preset-env'
                ]
              }
            },
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: ["/node_modules/", "/assets/", "/dist/**/*"], // exclude more files
          loader: 'eslint-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: ["/node_modules/", "/assets/", "/dist/**/*"], // exclude more files
          query: {
            presets: [
              '@babel/preset-env'
            ]
          }
        },
        {
          test: /\.(png|jpg|gif)$/i,
          exclude: ["/node_modules/", "/assets/", "/dist/**/*"], // exclude more files
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192
              }
            }
          ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          exclude: ["/node_modules/", "/assets/", "/dist/**/*"], // exclude more files
          use: [{
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }]
        }
      ]
    },
    stats: {
      colors: true
    },
    devtool: 'source-map',
    plugins: [
      new CleanWebpackPlugin(),
      new NunjucksWebpackPlugin({
        templates: nunjuckspages
      }),
      new MiniCssExtractPlugin({
        filename: 'assets/css/[name].css',
      }),
      new StyleLintPlugin(),
      new BrowserSyncPlugin({
        host: 'localhost',
        port: 3000,
        cors: true,
        injectChanges: false,
        watchOptions: {
          // ignoreInitial: true,
          // ignored: '*.map'
        },
        server: { baseDir: ['dist'] }
      }),
      new ExtraWatchWebpackPlugin({
        dirs: ['templates']
      }),
      new CopyWebpackPlugin([
        // copyUmodified is true because of https://github.com/webpack-contrib/copy-webpack-plugin/pull/360
        { from: 'assets/**/*', to: '.' },
        { from: '../developer-dashboard/', to: './developer-dashboard/' },
        { from: '../developer-dashboard/src/assets/img', to: './assets/img' }
      ], { copyUnmodified: true })
    ],
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          sourceMap: true,
          parallel: true
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            map: {
              inline: false
            }
          }
        })
      ]
    }
  };
};
