# vue-multipage-template
vue多页项目模板

## vue单页改成多页步骤
- 此步骤是基于上一篇[vue单页项目模板](https://github.com/xurna/vue-template)搭建的，有不清楚的可以去仓库查询
- 修改目录结构：将pages下的页面结构修改成如下，`文件夹名`-`js文件名`-`html文件名`需要一致，且`路由`也需要与文件名一致，页面内容不详讲。
  ```
  .
  ├── assets
  ├── components
  └── pages
      ├── home
      │   ├── home.html
      │   ├── home.js
      │   └── main.vue
      └── user
          ├── main.vue
          ├── user.html
          └── user.js
  ```
- 修改webpack配置
  - 修改入口配置
    ```js
    // 新建文件 utils.js
    const path = require('path')
    const glob = require('glob')
    const PAGE_PATH = path.resolve(__dirname, '../app/pages')

    //多入口配置：通过js文件名
    exports.entries = function () {
      // 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件
      var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
      var map = {}
      entryFiles.forEach((filePath) => {
        // 获取文件名
        var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
        map[filename] = filePath
      })
      return map
    }
    ```
    修改入口：
    ```js
      entry: utils.entries(),
    ```
    
  - 修改html生成配置
    - webpack.dev.conf.js：注释掉原来定义的HtmlWebpackPlugin，并改成下面的
      ```js
      plugins: [
        // new HtmlWebpackPlugin({
        //   filename: 'index.html',
        //   title: '',
        //   template: path.join(appDir, 'index.html'),
        //   inject: true,
        //   chunks: ['app']
        // })
      ],
      ```
      ```js
      const glob = require('glob')
      const PAGE_PATH = path.resolve(__dirname, '../app/pages')

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
      ```
    - webpack.prod.conf.js：注释掉原来定义的HtmlWebpackPlugin，并改成下面的
     ```js
      plugins: [
        // new HtmlWebpackPlugin({
        //   filename: 'index.html', 
        //   template: path.join(appDir, 'index.html'),
        //   title: '',
        //   inject: true,
        //   minify: {
        //     removeComments: true,
        //     collapseWhitespace: true,
        //     removeAttributeQuotes: true,
        //     conservativeCollapse: true
        //   },
        //   chunks: ['manifest', 'vendors', 'app']
        // }),
        new webpack.HashedModuleIdsPlugin(),
        // new InlineManifestWebpackPlugin('manifest') 
      ],
      ```
      ```js
      const glob = require('glob')
      const PAGE_PATH = path.resolve(__dirname, '../app/pages')

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
      ```
  - 到这步，已经可以正常执行打包`npm run build`，但是开发调试的时候`npm run dev`,发现页面输入的页面路由`http://xxxx:9001/home`直接404了，解决办法是，需要在`devServer`中配置重写操作指定页面，不然都是直接默认查找index.html页面的。
    ```js
      // utils.js
      exports.rewrites = function () {
        const entries = exports.entries();
        const rewrites = [];
        Object.keys(entries).forEach((name) => {
          const reg = new RegExp(`^\/${name}`);
          rewrites.push({ from: reg, to: `\/${name}.html` });
        });
        console.log(rewrites);
        return rewrites;
      };
    ```
    ```js
    // webpack.dev.conf.js
    devServer: {
     ...
      historyApiFallback: {
        rewrites: utils.rewrites() // 重要！路由匹配html页面，不配置则通过路由找不到页面
      }, 
      ...
    },

    ```
    配置完后就可以正常按照路由打开页面了。


## 笔记
- `glob`: 匹配文件, 该模块允许你使用 * 等符号, 例如lib/*.js就是获取lib文件夹下的所有js后缀名的文件
- 