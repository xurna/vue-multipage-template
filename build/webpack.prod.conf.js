const commonConfig = require('./webpack.common.conf')
const utils = require('./utils')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')
const path = require('path')
const process = require('process')
const glob = require('glob')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const outputPath = path.resolve(process.cwd(), 'dist')
const assestPathName = 'static'
const PAGE_PATH = path.join(appDir, 'pages')

const config = webpackMerge(commonConfig, {
  mode: 'production',
  output: {
    path: outputPath,
    chunkFilename: assestPathName + `/js/[name].[chunkhash:8].js`,
    publicPath: '',
    filename: assestPathName + `/js/[id].[chunkhash].js`
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true, // 开启并行压缩，充分利用cpu
        sourceMap: false,
        terserOptions: {
          compress: { drop_console: true },
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    // 为每个入口提取出webpack runtime模块
    runtimeChunk: { name: 'manifest' },
    splitChunks: {
      automaticNameDelimiter: '~',
      name: true,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      minChunks: 1,
      minSize: 30000,
      cacheGroups: {
        // 处理入口chunk
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendors',
          reuseExistingChunk: true,
          priority: 3
        },
        // 处理异步按需加载chunk
        'async-vendors': {
          test: /[\\/]node_modules[\\/]/,
          minChunks: 2,
          chunks: 'async',
          name: 'async-vendors',
          reuseExistingChunk: true,
          priority: 2
        },
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    // 从js中提取css，目前缺失HMR，所以只能在生成环境中使用
    new MiniCssExtractPlugin({
      filename: assestPathName + `/css/[name].[contenthash:8].css`,
    }),
    new webpack.HashedModuleIdsPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2, // 0 => no loaders (default); 2 => postcss-loader, less-loader
            },
          },
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                require("autoprefixer")
              ]
            }
          }, // 位置不可与less-loader反过来，因为是从下到上做处理的
          'less-loader',
        ],
        include: [appDir],
        exclude: [nodeModuleDir]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [{
          loader: 'url-loader', // 需要安装file-loader
          options: {
            limit: 10000,
            name: '[name].[hash:8].[ext]',
            outputPath: assestPathName + '/img/',
            publicPath: '',
          },
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      }
    ]
  },
  // 打印打包信息配置
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
  }
})

let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
entryHtml.forEach((filePath) => {
  let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
  let conf = {
    filename: filename + '.html', 
    template: filePath,
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      conservativeCollapse: true
    },
    inject: true,
    chunksSortMode: 'dependency',
    chunks: ['manifest', 'vendors', filename],
  }
  config.plugins.push(new HtmlWebpackPlugin(conf))
})
// 需放在HtmlWebpackPlugin下面
config.plugins.push(new InlineManifestWebpackPlugin('manifest'))

module.exports = config