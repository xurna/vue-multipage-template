const commonConfig = require('./webpack.common.conf')
const webpackMerge = require('webpack-merge')
const path = require('path')
const process = require('process')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeModuleDir = path.resolve(process.cwd(), 'node_module')
const appDir = path.resolve(process.cwd(), 'app')
const ip = require('ip')
const port = 9000
const host = ip.address()

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
    historyApiFallback: true, // 404页面被定向到默认页面
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
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: '',
      template: path.join(appDir, 'index.html'),
      inject: true,
      chunks: ['app']
    })
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
module.exports = config
