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


// connect-history-api-fallback 路由重写使用
// https://github.com/bripkens/connect-history-api-fallback
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

