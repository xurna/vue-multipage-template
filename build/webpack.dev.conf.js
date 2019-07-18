const commonConfig = require('./webpack.common.conf')
const utils = require('./utils')
const webpackMerge = require('webpack-merge')
const path = require('path')
const process = require('process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const glob = require('glob')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const ip = require('ip')
const port = 9001
const host = ip.address()
const PAGE_PATH = path.join(appDir, 'pages')

const config = webpackMerge(commonConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    publicPath: '/',
    contentBase: path.resolve(process.cwd(), 'dist'),
    compress: true,
    port,
    host,
    open: true, // open browser
    hot: true, // webpack.HotModuleReplacementPlugin,不需要重新在plugins里面再定义
    historyApiFallback: {
      rewrites: utils.rewrites() // 重要！路由匹配html页面，不配置则通过路由找不到页面
    }, 
    overlay: { // show errors on the page
      warnings: false,
      errors: true
    },
    // 打印打包信息配置
    stats: {
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false
    },
    proxy: {
      // '/api': {
      //   target: 'http://localhost:3000',
      //   changeOrigin: true,
      // }
    },
  },
  plugins: [
  ],
  module: {
    rules: [
      {
        test: /\.(le|c)ss$/,
        use: [
          'vue-style-loader',
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
          },
        }],
        include: [appDir],
        exclude: [nodeModuleDir]
      }
    ]
  }
})

let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
entryHtml.forEach((filePath) => {
  let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
  let conf = {
    filename: filename + '.html',
    template: filePath,
    inject: true,
    chunks: [filename], // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
  }
  config.plugins.push(new HtmlWebpackPlugin(conf))
})


module.exports = config
